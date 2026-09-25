const fs = require("fs");
const vm = require("vm");

function createElement(selector = "") {
  const listeners = {};
  return {
    selector,
    dataset: {},
    style: { setProperty() {} },
    value: "",
    hidden: false,
    innerHTML: "",
    textContent: "",
    srcObject: null,
    className: "",
    children: [],
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      }
    },
    addEventListener(type, handler) {
      listeners[type] = handler;
    },
    setAttribute(name, value) {
      this[name] = String(value);
    },
    getAttribute(name) {
      return this[name] || null;
    },
    scrollIntoView() {},
    showModal() {},
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    remove() {},
    play() {
      return Promise.resolve();
    },
    pause() {},
    querySelector() {
      return createElement(`${selector} child`);
    },
    querySelectorAll() {
      return [];
    },
    closest() {
      return null;
    }
  };
}

function loadPrototype() {
  const elements = new Map();
  const document = {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, createElement(selector));
      return elements.get(selector);
    },
    querySelectorAll() {
      return [];
    },
    createElement(tag) {
      return createElement(tag);
    }
  };
  const localStorageData = {};
  const context = {
    console,
    URL,
    location: { hostname: "127.0.0.1" },
    navigator: {},
    BarcodeDetector: undefined,
    requestAnimationFrame() {
      return 1;
    },
    cancelAnimationFrame() {},
    document,
    localStorage: {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(localStorageData, key) ? localStorageData[key] : null;
      },
      setItem(key, value) {
        localStorageData[key] = String(value);
      }
    }
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync("product-catalog.js", "utf8"), context);
  vm.runInContext(fs.readFileSync("store-location-data.js", "utf8"), context);
  vm.runInContext(fs.readFileSync("app.js", "utf8"), context);
  context.__elements = elements;
  return context;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function testKnownStoreLocation(context) {
  const data = context.STORE_LOCATION_DATA;
  const anchor = data.findStoreLocation("meijer-57", "1200080994");
  assert(anchor, "Known Pepsi anchor should resolve by Meijer item ID");
  assert(anchor.aisle === "B|4", "Known Pepsi anchor should return aisle B|4");
  assert(anchor.section === "4", "Known Pepsi anchor should return Section 4");
  assert(anchor.position === "15", "Known Pepsi anchor should preserve position 15");
  assert(anchor.source.includes("Meijer"), "Known Pepsi anchor should carry Meijer source provenance");
  assert(anchor.verificationStatus === "verified", "Known Pepsi anchor should be marked verified");
  assert(anchor.lastVerified === "2026-09-24", "Known Pepsi anchor should carry last verified date");
  assert(data.locationLabel(anchor) === "B|4 / Section 4 / Position 15", "Known Pepsi anchor label changed");
}

function testScanNormalization(context) {
  const app = context.MERCH_APP;
  assert(app.barcodeCheckDigitIsValid("012000002946"), "Physical Pepsi UPC should pass check-digit validation");
  assert(app.barcodeCheckDigitIsValid("0012000002946"), "EAN-13 camera representation should pass check-digit validation");
  assert(app.normalizeDecodedBarcode("012000002946", "upc_a") === "012000002946", "UPC-A should remain 12 digits");
  assert(app.normalizeDecodedBarcode("0012000002946", "ean_13") === "012000002946", "EAN-13 leading-zero UPC should normalize to UPC-A");
}

async function testDecodedBarcodeLocation(context) {
  const app = context.MERCH_APP;
  const input = context.__elements.get("#locationLookupInput");
  await app.handleDecodedBarcode("0012000002946", "test", "ean_13");
  assert(input.value === "012000002946", "Decoded barcode should write normalized UPC to location lookup input");
  assert(context.__elements.get("#locationResult").innerHTML.includes("Pepsi 20oz Bottle"), "Decoded Pepsi UPC should render Pepsi 20oz location result");
  assert(context.__elements.get("#locationResult").innerHTML.includes("X|32"), "Decoded Pepsi UPC should point to checkout X|32 working-map location");
  assert(context.__elements.get("#locationResult").innerHTML.includes("Source:"), "Decoded result should show source provenance");
}

async function testDuplicateScanSuppression(context) {
  const app = context.MERCH_APP;
  const first = await app.handleDecodedBarcode("012000809941", "test", "upc_a");
  const duplicate = await app.handleDecodedBarcode("012000809941", "test", "upc_a");
  assert(first === "012000809941", "First decoded Store #57 anchor scan should be accepted");
  assert(duplicate === false, "Immediate duplicate decoded scan should be suppressed");
  assert(context.__elements.get("#scannerStatus").textContent.includes("Duplicate scan ignored"), "Duplicate scan should report suppression");
}

function testCameraDiagnostics(context) {
  const diag = context.MERCH_APP.scannerDiagnostics();
  assert(diag.isSecureContext, "Local test host should be considered secure for camera diagnostics");
  assert(diag.hasNativeBarcodeDetector === false, "Node regression context should report no native BarcodeDetector");
}

function testUnmappedHandling(context) {
  const app = context.MERCH_APP;
  app.lookupStoreProduct("mountain dew 12pk");
  const html = context.__elements.get("#locationResult").innerHTML;
  assert(html.includes("LOCATION NOT MAPPED"), "Mapped identity with missing Store #57 shelf should show LOCATION NOT MAPPED");
  assert(html.includes("Pending rep review"), "Unmapped product should route to rep review");
}

function testStoreBoundary(context) {
  const data = context.STORE_LOCATION_DATA;
  assert(!data.findStoreLocation("other-store", "1200080994"), "Store #57 location leaked into another store");
}

function testNoOrderingWorkflow() {
  const source = fs.readFileSync("app.js", "utf8");
  [
    "autoOrderGap",
    "warehouseQoh",
    "smartOrder",
    "orderItemMatchesScannedProduct",
    "approvedBefore",
    "approved: true"
  ].forEach((needle) => {
    assert(!source.includes(needle), `Ordering workflow leaked into merch app: ${needle}`);
  });
}

function testRouteMapStillPresent(context) {
  assert(!context.MERCH_APP.route.some((stop) => /chicken/i.test(stop.name)), "Chicken-rack stop should not be in Meijer default route");
  assert(context.MERCH_APP.route.some((stop) => stop.name === "B|4 soda section 4"), "Known-good B|4 section 4 route stop is missing");
}

async function run() {
  const context = loadPrototype();
  testKnownStoreLocation(context);
  testScanNormalization(context);
  await testDecodedBarcodeLocation(context);
  await testDuplicateScanSuppression(context);
  testCameraDiagnostics(context);
  testUnmappedHandling(context);
  testStoreBoundary(context);
  testNoOrderingWorkflow();
  testRouteMapStillPresent(context);
  console.log("Merch map QA regression passed");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
