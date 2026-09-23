const fs = require("fs");
const vm = require("vm");

function createElement(selector = "") {
  return {
    selector,
    dataset: {},
    style: {},
    value: "",
    disabled: false,
    innerHTML: "",
    textContent: "",
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      }
    },
    addEventListener() {},
    setAttribute(name, value) {
      this[name] = String(value);
    },
    getAttribute(name) {
      return this[name] || null;
    },
    scrollIntoView() {},
    querySelector() {
      return createElement(`${selector} child`);
    },
    querySelectorAll() {
      return [];
    },
    closest() {
      return createElement(`${selector} closest`);
    }
  };
}

function loadPrototype() {
  const elements = new Map();
  const bodyClasses = new Set();
  const document = {
    body: {
      dataset: {},
      classList: {
        add(value) {
          bodyClasses.add(value);
        },
        remove(value) {
          bodyClasses.delete(value);
        },
        toggle(value, force) {
          const shouldAdd = force === undefined ? !bodyClasses.has(value) : Boolean(force);
          if (shouldAdd) bodyClasses.add(value);
          else bodyClasses.delete(value);
          return shouldAdd;
        },
        contains(value) {
          return bodyClasses.has(value);
        }
      }
    },
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, createElement(selector));
      return elements.get(selector);
    },
    querySelectorAll() {
      return [];
    }
  };
  const localStorageData = {};
  const context = {
    console,
    navigator: {
      vibrate() {}
    },
    URL,
    URLSearchParams,
    window: {
      location: { href: "http://127.0.0.1:8091/", search: "" },
      history: { replaceState() {} }
    },
    document,
    localStorage: {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(localStorageData, key) ? localStorageData[key] : null;
      },
      setItem(key, value) {
        localStorageData[key] = String(value);
      },
      removeItem(key) {
        delete localStorageData[key];
      }
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync("product-catalog.js", "utf8"), context);
  const appCode = fs
    .readFileSync("app.js", "utf8")
    .replace("const stores = [", "var stores = [")
    .replace("const productCatalog = window.PRODUCT_CATALOG || [];", "var productCatalog = window.PRODUCT_CATALOG || [];")
    .replace("const reorderPointOverrides =", "var reorderPointOverrides =")
    .replace("const storeCatalogOverrides =", "var storeCatalogOverrides =")
    .replace("const orderItemOverrides =", "var orderItemOverrides =")
    .replace("const orderSearchInput =", "var orderSearchInput =")
    .replace("const catalogSearchInput =", "var catalogSearchInput =")
    .replace("const scanInput =", "var scanInput =")
    .replace("let activeScannedProductSku =", "var activeScannedProductSku =")
    .replace("let activeViewTarget =", "var activeViewTarget =");
  vm.runInContext(appCode, context);
  return context;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function names(results) {
  return results.map((result) => result.product.name);
}

function includesName(results, expected) {
  return names(results).includes(expected);
}

function testSearch(context) {
  const catalog = context.window.PRODUCT_CATALOG;
  const broadCases = [
    ["2 liter", ["Pepsi 2 Liter Bottle", "Mountain Dew 2 Liter Bottle"], ["Alani Nu Cherry Slush 12oz Can"]],
    ["12 pack", ["Pepsi 12pk 12oz Cans", "Mountain Dew 12pk 12oz Cans"], ["Pepsi 20oz Bottle"]],
    ["20 oz", ["Pepsi 20oz Bottle", "Mountain Dew 20oz Bottle", "Gatorlyte 20oz Cherry Lime"], ["Pepsi 2 Liter Bottle"]],
    ["cooler", ["Pepsi 20oz Bottle", "Mountain Dew 20oz Bottle"], ["Pepsi 12pk 12oz Cans"]],
    ["energy", ["Alani Nu Cherry Slush 12oz Can", "Rockstar Original 16oz Can"], ["Pepsi 2 Liter Bottle"]],
    ["water", ["Aquafina 24pk 16.9oz Bottles", "LIFEWTR 1L Bottle", "Propel Berry 6pk"], ["Pepsi 12pk 12oz Cans"]],
    ["zero", ["Pepsi Zero Sugar 12pk 12oz Cans", "Gatorade Zero 28oz Glacier Cherry"], ["Alani Nu Cherry Slush 12oz Can"]]
  ];

  broadCases.forEach(([query, expected, forbidden]) => {
    const results = context.searchProducts(catalog, query);
    expected.forEach((name) => assert(includesName(results, name), `Search "${query}" missing ${name}`));
    forbidden.forEach((name) => assert(!includesName(results, name), `Search "${query}" incorrectly included ${name}`));
  });

  const specificCases = [
    ["pepsi 20oz", "Pepsi 20oz Bottle"],
    ["pepsi cooler", "Pepsi 20oz Bottle"],
    ["pepsi 12pk", "Pepsi 12pk 12oz Cans"],
    ["pepsi 12oz can", "Pepsi 12oz Can"],
    ["single can", "Pepsi 12oz Can"],
    ["2L", "Pepsi 2 Liter Bottle"],
    ["2 litre", "Pepsi 2 Liter Bottle"],
    ["12 pack", "Pepsi 12pk 12oz Cans"],
    ["20 oz", "Pepsi 20oz Bottle"],
    ["mountain dew 20oz", "Mountain Dew 20oz Bottle"],
    ["mountain dew 12pk", "Mountain Dew 12pk 12oz Cans"],
    ["01201303", "Pepsi 12oz Can"],
    ["012000000133", "Pepsi 12oz Can"],
    ["012000002946", "Pepsi 20oz Bottle"]
  ];
  specificCases.forEach(([query, expected]) => {
    assert(context.findProduct(query)?.name === expected, `Find "${query}" expected ${expected}`);
  });

  ["alani 2 liter", "pepsi 6 pack"].forEach((query) => {
    assert(!context.findProduct(query), `Bad-match guard failed for "${query}"`);
  });
}

function testInventory(context) {
  const source = fs.readFileSync("app.js", "utf8");
  [
    "sold + item.base * 6",
    "index * 7",
    "warehouseQoh(item, index)",
    "WH 109",
    "WH 80"
  ].forEach((needle) => {
    assert(!source.includes(needle), `Inventory fabrication pattern still present: ${needle}`);
  });
  assert(context.warehouseQoh({ sku: "No WH", sold: 99, base: 8 }) === null, "Unknown warehouse QOH should stay null");
  assert(context.warehouseText({ sku: "No WH", sold: 99, base: 8 }) === "Unavailable", "Unknown warehouse QOH should display Unavailable");
  assert(context.warehouseQoh({ warehouseQoh: 0 }) === 0, "Warehouse zero should remain zero, not unknown");
  const displayedWarehouseValues = context.stores
    .flatMap((store) => store.order)
    .map((item) => context.warehouseQoh(item))
    .filter((value) => value !== null);
  [86, 74, 230, 0, 4].forEach((value) => assert(displayedWarehouseValues.includes(value), `Missing explicit WH source ${value}`));
  [109, 80].forEach((value) => assert(!displayedWarehouseValues.includes(value), `Unexpected fabricated WH value ${value}`));
}

function testOrderingMath(context) {
  const walmart = context.stores[0];
  const kroger = context.stores[1];
  const walmartPepsi = walmart.order.find((item) => item.sku === "Pepsi 12pk");
  const krogerPepsi = kroger.order.find((item) => item.sku === "Pepsi 12pk");
  const walmartTwentyOunce = walmart.order.filter((item) => context.orderItemMatchesSearch(item, "20 oz"));
  const walmartKey = context.reorderOverrideKey(walmart, walmartPepsi);
  const krogerKey = context.reorderOverrideKey(kroger, krogerPepsi);
  context.reorderPointOverrides[walmartKey] = 50;

  assert(walmartTwentyOunce.some((item) => item.sku === "Pepsi 20oz"), "Order search for 20 oz should find Pepsi 20oz");
  assert(walmartTwentyOunce.some((item) => item.sku === "Mountain Dew 20oz"), "Order search for 20 oz should find Mountain Dew 20oz");
  assert(!walmart.order.some((item) => context.orderItemMatchesSearch(item, "2 liter")), "Order search should only search current store order assortment");
  assert(context.activeReorderPoint(walmart, walmartPepsi) === 50, "Rep override did not win for Walmart Pepsi 12pk");
  assert(context.activeReorderPoint(kroger, krogerPepsi) !== 50, "Walmart reorder override leaked into Kroger");
  assert(context.autoOrderGap(walmart, walmartPepsi) === 31, "Auto order gap should be reorder point minus QOH");
  assert(context.warehouseStatus({ warehouseQoh: 4, base: 8 }).level === "short", "Warehouse shortage warning did not trigger");
  assert(context.warehouseStatus({ warehouseQoh: 0, base: 1 }).level === "out", "Warehouse OOS warning did not trigger");
  assert(context.warehouseStatus({ base: 1 }).level === "unknown", "Missing warehouse data should be unknown");
  delete context.reorderPointOverrides[walmartKey];
  delete context.reorderPointOverrides[krogerKey];
}

function testScanOrderMatch(context) {
  const walmart = context.stores[0];
  const pepsiTwenty = walmart.order.find((item) => item.sku === "Pepsi 20oz");
  const scannedProduct = context.findProduct("pepsi 20oz");
  assert(scannedProduct?.sku === "PEP-PEPSI-20OZ", "Scan search should resolve Pepsi 20oz product");
  assert(context.orderItemMatchesScannedProduct(pepsiTwenty, scannedProduct.sku), "Pepsi 20oz scan should match the Walmart order line");
  context.orderSearchInput.value = "zero";
  context.activeViewTarget = ".scanner-panel";
  context.activeScannedProductSku = scannedProduct.sku;
  const hiddenSearchTerm = context.activeViewTarget === ".scanner-panel" ? "" : context.orderSearchInput.value.trim().toLowerCase();
  assert(context.orderItemMatchesSearch(pepsiTwenty, hiddenSearchTerm), "Scan view should ignore stale hidden order search text");
  const pepsiSingleCan = context.findProduct("01201303");
  const pepsiTwelvePack = walmart.order.find((item) => item.sku === "Pepsi 12pk");
  assert(pepsiSingleCan?.sku === "PEP-PEPSI-12OZ-CAN", "UPC-E 01201303 should resolve to Pepsi 12oz single can");
  assert(context.findProduct("012000000133")?.sku === "PEP-PEPSI-12OZ-CAN", "Expanded UPC-A should resolve to Pepsi 12oz single can");
  assert(!context.orderItemMatchesScannedProduct(pepsiTwelvePack, pepsiSingleCan.sku), "Single-can barcode must not trigger Pepsi 12pk order line");
  context.orderSearchInput.value = "";
  context.activeViewTarget = ".order-panel";
  context.activeScannedProductSku = "";
}

function testDecodedBarcodePipeline(context) {
  const walmart = context.stores[0];
  context.setActiveStore(0);

  assert(context.barcodeCheckDigitIsValid("012000002946"), "Physical Pepsi UPC should pass check-digit validation");
  assert(context.barcodeCheckDigitIsValid("0012000002946"), "EAN-13 representation of Pepsi UPC should pass check-digit validation");
  assert(context.normalizeDecodedBarcode("012000002946", "upc_a") === "012000002946", "UPC-A should remain the 12-digit UPC");
  assert(context.normalizeDecodedBarcode("0012000002946", "ean_13") === "012000002946", "EAN-13 leading-zero UPC-A should normalize to 12 digits");

  const handled = context.handleBarcode("0012000002946", "camera");
  const scannedProduct = context.findProduct(context.scanInput.value);
  const orderLine = walmart.order.find((item) => item.sku === "Pepsi 20oz");

  assert(handled, "handleBarcode should accept normalized camera UPC");
  assert(context.scanInput.value === "012000002946", "handleBarcode should write normalized UPC into scan input");
  assert(scannedProduct?.name === "Pepsi 20oz Bottle", "Decoded Pepsi UPC should resolve to Pepsi 20oz Bottle");
  assert(context.activeScannedProductSku === "PEP-PEPSI-20OZ", "Decoded Pepsi UPC should set active scanned product");
  assert(context.orderItemMatchesScannedProduct(orderLine, scannedProduct.sku), "Decoded Pepsi UPC should match Walmart Pepsi 20oz order line");

  context.scanInput.value = "";
  context.activeScannedProductSku = "";
  context.renderScanResult(null);
}

function testSmartOrder(context) {
  const walmart = context.stores[0];
  const approvedBefore = walmart.order.filter((item) => item.approved).length;
  const recommendation = context.smartOrder(walmart);
  const orderTotal = context.orderTotal(walmart);
  const normalTotal = walmart.order.reduce((sum, item) => sum + context.normalCases(item), 0);
  assert(recommendation.suggestedTotal === orderTotal, "Smart Order total should equal current recommended order total");
  assert(recommendation.normalTotal === normalTotal, "Smart Order normal total should come from preserved normal base");
  assert(recommendation.drivers.length <= 4, "Smart Order should stay compact");
  assert(recommendation.explanation.length <= 90, "Smart Order explanation should be short");
  assert(walmart.order.filter((item) => item.approved).length === approvedBefore, "Smart Order calculation must not approve items");
}

function testCatalogIsolation(context) {
  const walmart = context.stores[0];
  const kroger = context.stores[1];
  const sku = "PEP-MTDEW-2L";
  const twoLiterMatches = context.searchProducts(context.window.PRODUCT_CATALOG, "2 liter").map((result) => result.product.sku);
  const beforeKroger = context.storeAuthorizedCatalog(kroger).map((product) => product.sku);
  assert(twoLiterMatches.includes("PEP-PEPSI-2L"), "Catalog search for 2 liter should find Pepsi 2L");
  assert(twoLiterMatches.includes("PEP-MTDEW-2L"), "Catalog search for 2 liter should find Mountain Dew 2L");
  context.addProductToStoreCatalog(walmart, sku);
  const afterWalmart = context.storeAuthorizedCatalog(walmart).map((product) => product.sku);
  const afterKroger = context.storeAuthorizedCatalog(kroger).map((product) => product.sku);
  assert(afterWalmart.includes(sku), "Add product did not affect selected store catalog");
  assert(JSON.stringify(beforeKroger) === JSON.stringify(afterKroger), "Catalog add leaked into another store");
  context.removeProductFromStoreCatalog(walmart, sku);
}

function testStoreSwitchClearsFilters(context) {
  context.orderSearchInput.value = "2 liter";
  context.catalogSearchInput.value = "energy";
  context.scanInput.value = "pepsi 20oz";
  context.activeScannedProductSku = "PEP-PEPSI-20OZ";
  context.setActiveStore(1);
  assert(context.orderSearchInput.value === "", "Store switch should clear order search");
  assert(context.catalogSearchInput.value === "", "Store switch should clear catalog search");
  assert(context.scanInput.value === "", "Store switch should clear scan input");
}

function run() {
  const context = loadPrototype();
  testSearch(context);
  testInventory(context);
  testOrderingMath(context);
  testScanOrderMatch(context);
  testDecodedBarcodePipeline(context);
  testSmartOrder(context);
  testCatalogIsolation(context);
  testStoreSwitchClearsFilters(context);
  console.log("QA regression baseline passed");
}

run();
