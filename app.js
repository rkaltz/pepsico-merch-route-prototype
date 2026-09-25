const route = [
  {
    name: "Checkout coolers / X|32",
    minutes: 20,
    type: "Register cooler",
    aisle: "X|32",
    section: "Checkout queue",
    priority: "High",
    verified: false,
    x: 18,
    y: 68,
    description:
      "Start here. Meijer data found Pepsi-family hits in X|32, so treat the checkout queue as a must-check cooler/impulse zone until a rep verifies each door.",
    products: ["Pepsi singles", "Dew singles", "Aquafina", "Gatorade", "Energy"],
    sequence: [
      "Walk the full checkout line from one end to the other.",
      "Stock 20 oz Pepsi family and Mountain Dew first.",
      "Fill water and sports drink singles next.",
      "Fill energy, tea, coffee, and functional singles last.",
      "Record cooler door numbers once this store is field-verified."
    ]
  },
  {
    name: "Front promo / lobby",
    minutes: 10,
    type: "Lobby display",
    aisle: "Front",
    section: "Front",
    priority: "High",
    verified: false,
    x: 29,
    y: 64,
    description:
      "Still up front. Work lobby, seasonal, and ad displays now so you do not walk back later.",
    products: ["12 packs", "2 liters", "Gatorade", "Poppi check"],
    sequence: [
      "Build or tighten any active ad display first.",
      "Work cubes and 24 packs before loose shelf packs.",
      "Fill 12 packs and mini cans by flavor block.",
      "Fill 2 liters only after bulky display cases are cleared.",
      "Core hit: service sale displays even if the full aisle is skipped."
    ]
  },
  {
    name: "Deli chicken rack",
    minutes: 8,
    type: "Secondary display",
    aisle: "Deli",
    section: "Rotisserie chicken",
    priority: "High",
    verified: false,
    x: 45,
    y: 20,
    description:
      "Do not miss this. Go to deli, find rotisserie chicken, then locate the 7.5 oz mini-can promo rack.",
    products: ["7.5 oz mini cans", "6 packs", "Chicken promo"],
    sequence: [
      "Walk to deli and find the rotisserie chicken area.",
      "Look around the chicken rack or warmer; exact placement varies by store.",
      "Fill 7.5 oz 6-pack mini cans tied to the chicken promo.",
      "Face the display and remove damaged or loose packs.",
      "Record the exact placement for this store after verification."
    ]
  },
  {
    name: "B|4 soda section 2",
    minutes: 18,
    type: "Main aisle",
    aisle: "B|4",
    section: "2",
    priority: "High",
    verified: true,
    x: 41,
    y: 51,
    description:
      "First verified B|4 aisle section. The first export found multiple Pepsi-family packages here, including 24 packs.",
    products: ["Pepsi 24 packs", "Pepsi family multipacks", "Large packs"],
    sequence: [
      "Start with 24 packs and cubes to clear the heaviest product.",
      "Fill 12 packs only after the larger cases are out of the way.",
      "Face each Pepsi block before moving sections.",
      "Watch for secondary stacks tied to the same ad.",
      "Core hit: fill obvious large-pack holes first."
    ]
  },
  {
    name: "B|4 soda section 4",
    minutes: 22,
    type: "Main aisle",
    aisle: "B|4",
    section: "4",
    priority: "High",
    verified: true,
    x: 50,
    y: 52,
    description:
      "Known-good validation stop: Pepsi 12 oz 12-pack renders at B|4, Section 4 for Meijer #57.",
    products: ["Pepsi 12 packs", "Pepsi 12 oz cans", "Ad 12 packs"],
    sequence: [
      "Fill Pepsi Original 12-pack first as the validation anchor.",
      "Work adjacent Pepsi flavors in the same section.",
      "Keep 12-pack cases grouped by flavor block.",
      "Face the section before opening smaller packages.",
      "Core hit: this section must be checked even on a short day."
    ]
  },
  {
    name: "B|4 soda sections 6-14",
    minutes: 38,
    type: "Main aisle",
    aisle: "B|4",
    section: "6, 8, 12, 14",
    priority: "High",
    verified: true,
    x: 61,
    y: 58,
    description:
      "Continue down the verified B|4 soda aisle. The first export found Pepsi-family products across sections 6, 8, 12, and 14.",
    products: ["Pepsi family", "Mountain Dew candidates", "Starry/Mug/Crush candidates", "2 liters"],
    sequence: [
      "Work sections in order: 6, 8, 12, then 14.",
      "Stock 12 packs and mini cans by brand block before 2 liters.",
      "Stock 2 liters next, working bottom shelves before upper shelves.",
      "Fill 6 packs, 8 packs, and small-format items after the heavy cases.",
      "Record exact Mountain Dew, Starry, Mug, and Crush placements as they are verified."
    ]
  },
  {
    name: "Grocery-side odd location G|27",
    minutes: 6,
    type: "Main aisle",
    aisle: "G|27",
    section: "1",
    priority: "Medium",
    verified: true,
    x: 73,
    y: 47,
    description:
      "One first-pass Pepsi row appeared outside the main B|4 cluster at G|27, Section 1. Treat this as a check-only stop until product group is confirmed.",
    products: ["Pepsi-family outlier", "Possible display or alternate grocery shelf"],
    sequence: [
      "Go only after the main B|4 work unless the route owner says otherwise.",
      "Check whether this is a real permanent shelf, temporary display, or data artifact.",
      "Fill only visible PepsiCo product assigned to the route.",
      "Add a note if the location does not exist in the store.",
      "Do not waste time hunting if this is a core-hit day."
    ]
  },
  {
    name: "Backroom cleanup",
    minutes: 15,
    type: "Backstock",
    aisle: "Back",
    section: "Back",
    priority: "Medium",
    verified: true,
    x: 88,
    y: 33,
    description:
      "End here near the back wall. Handle overstock, credits, cardboard, and Store #57 notes without crossing the grocery side again.",
    products: ["Overstock", "Credits", "Cardboard", "Pallet wrap"],
    sequence: [
      "Separate sellable overstock from credits and damages.",
      "Label or stage backstock by next route stop or pack type.",
      "Break down cardboard and wrap after all sellable product is handled.",
      "Log location changes and unverified brands.",
      "Core hit: leave a note for the route owner if anything was skipped."
    ]
  }
];

let activeIndex = 0;
let mode = "pallet";
const completed = new Set();
const savedDisplays = JSON.parse(localStorage.getItem("soldDisplays") || "[]");

const routeList = document.querySelector("#routeList");
const storeMap = document.querySelector("#storeMap");
const routePath = document.querySelector("#routePath");
const productChips = document.querySelector("#productChips");
const currentStopPanel = document.querySelector(".current-stop");
const sequenceList = document.querySelector("#sequenceList");
const stopMeta = document.querySelector("#stopMeta");
const stopName = document.querySelector("#stopName");
const stopTime = document.querySelector("#stopTime");
const stopDescription = document.querySelector("#stopDescription");
const remainingTime = document.querySelector("#remainingTime");
const completeCount = document.querySelector("#completeCount");
const completeButton = document.querySelector("#completeButton");
const verifyButton = document.querySelector("#verifyButton");
const verifyDialog = document.querySelector("#verifyDialog");
const verifyTitle = document.querySelector("#verifyTitle");
const locationType = document.querySelector("#locationType");
const aisleInput = document.querySelector("#aisleInput");
const sectionInput = document.querySelector("#sectionInput");
const priorityInput = document.querySelector("#priorityInput");
const notesInput = document.querySelector("#notesInput");
const saveVerifyButton = document.querySelector("#saveVerifyButton");
const routeMode = document.querySelector("#routeMode");
const modeNote = document.querySelector("#modeNote");
const soldDisplayList = document.querySelector("#soldDisplayList");
const displayDialog = document.querySelector("#displayDialog");
const addDisplayButton = document.querySelector("#addDisplayButton");
const saveDisplayButton = document.querySelector("#saveDisplayButton");
const displayNameInput = document.querySelector("#displayNameInput");
const displayDepartmentInput = document.querySelector("#displayDepartmentInput");
const displayPlacementInput = document.querySelector("#displayPlacementInput");
const displayProductInput = document.querySelector("#displayProductInput");
const displayPriorityInput = document.querySelector("#displayPriorityInput");
const displayNotesInput = document.querySelector("#displayNotesInput");
const jumpScanButton = document.querySelector("#jumpScanButton");
const locationLookupInput = document.querySelector("#locationLookupInput");
const cameraScanButton = document.querySelector("#cameraScanButton");
const stopCameraButton = document.querySelector("#stopCameraButton");
const cameraVideo = document.querySelector("#cameraVideo");
const scannerStatus = document.querySelector("#scannerStatus");
const locationResult = document.querySelector("#locationResult");
const selectedStoreLabel = document.querySelector("#selectedStoreLabel");
const storeLocationData = window.STORE_LOCATION_DATA || {
  stores: [],
  locations: [],
  defaultStoreId: "meijer-57",
  findStoreLocation: () => null,
  locationLabel: () => "LOCATION NOT MAPPED"
};
const productCatalog = window.PRODUCT_CATALOG || [];
let currentStoreId = storeLocationData.defaultStoreId;
let activeScanStream = null;
let activeScanLoop = 0;
let cameraDetector = null;
let zbarLoadPromise = null;
let zxingLoadPromise = null;
let zxingReader = null;
let zxingControls = null;
let cameraDecodedValue = "";
let lastDecodedBarcode = "";
let lastDecodedAt = 0;

function makeDisplayStop(display) {
  return {
    name: display.name,
    minutes: 8,
    type: "Rep-sold display",
    aisle: display.department,
    section: display.placement,
    priority: display.priority,
    verified: false,
    repAdded: true,
    x: 34,
    y: 35,
    description:
      "Rep-sold display. Check this store-specific display before finishing the standard route.",
    products: [display.product],
    notes: display.notes,
    sequence: [
      `Go to ${display.department} and find ${display.placement}.`,
      `Fill and face ${display.product}.`,
      "Confirm the display is still approved and active.",
      "Record any placement change for the route owner.",
      "If the display is gone, leave a note before marking complete."
    ]
  };
}

savedDisplays.forEach((display) => {
  route.splice(route.length - 1, 0, makeDisplayStop(display));
});

function formatMinutes(total) {
  if (total < 60) return `${total}m`;
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

function render() {
  const current = route[activeIndex];
  currentStopPanel?.setAttribute("data-stop-number", String(activeIndex + 1));
  stopName?.setAttribute("data-stop-number", String(activeIndex + 1));
  stopMeta.textContent = `Stop ${activeIndex + 1} of ${route.length}`;
  stopName.textContent = current.name;
  stopTime.textContent = `${current.minutes} min`;
  stopDescription.textContent = current.description;
  productChips.innerHTML = current.products
    .map((product) => `<span class="chip">${product}</span>`)
    .join("");
  sequenceList.innerHTML = current.sequence.map((item) => `<li>${item}</li>`).join("");

  completeButton.textContent = completed.has(activeIndex) ? "Reopen stop" : "Mark complete";
  const remaining = route.reduce((sum, stop, index) => {
    return completed.has(index) ? sum : sum + stop.minutes;
  }, 0);
  remainingTime.textContent = formatMinutes(remaining);
  completeCount.textContent = `${completed.size} / ${route.length}`;

  routePath.setAttribute("points", route.map((stop) => `${stop.x},${stop.y}`).join(" "));
  storeMap.querySelectorAll(".map-stop").forEach((button) => button.remove());
  route.forEach((stop, index) => {
    const button = document.createElement("button");
    button.className = "map-stop";
    button.dataset.stop = String(index);
    button.style.setProperty("--x", `${stop.x}%`);
    button.style.setProperty("--y", `${stop.y}%`);
    button.textContent = String(index + 1);
    button.setAttribute("aria-label", stop.name);
    button.classList.toggle("active", index === activeIndex);
    button.classList.toggle("done", completed.has(index));
    button.addEventListener("click", () => setActive(index));
    storeMap.appendChild(button);
  });

  routeList.innerHTML = route
    .map((stop, index) => {
      const status = stop.verified ? "Confirmed" : "Needs rep verification";
      return `
        <li class="route-card ${index === activeIndex ? "active" : ""} ${completed.has(index) ? "done" : ""}">
          <div class="route-card-head">
            <div>
              <h3>${index + 1}. ${stop.name}</h3>
              <p>${stop.type} / ${stop.minutes} min / ${stop.priority}</p>
            </div>
            <div class="order-tools" aria-label="Reorder ${stop.name}">
              <button data-move="up" data-index="${index}" aria-label="Move up">Up</button>
              <button data-move="down" data-index="${index}" aria-label="Move down">Dn</button>
            </div>
          </div>
          <span class="verification-status ${stop.verified ? "confirmed" : ""}">${status}</span>
          <span class="micro-sequence">First: ${stop.sequence[0]}</span>
        </li>
      `;
    })
    .join("");

  const soldDisplays = route.filter((stop) => stop.repAdded);
  soldDisplayList.innerHTML = soldDisplays.length
    ? soldDisplays
        .map(
          (display) => `
            <div class="display-item">
              <strong>${display.name}</strong>
              <span>${display.aisle} / ${display.section} / ${display.products.join(", ")}</span>
              <span>${display.notes || "Rep-added display. Verify during this store visit."}</span>
            </div>
          `
        )
        .join("")
    : `<div class="display-item"><strong>No extra sold displays yet</strong><span>Route owner can add lobby, deli, seasonal, or manager-approved displays here.</span></div>`;
}

function setActive(index) {
  activeIndex = Math.max(0, Math.min(route.length - 1, index));
  render();
}

function barcodeCheckDigitIsValid(digits) {
  if (!/^\d+$/.test(digits) || digits.length < 2) return false;
  const body = digits.slice(0, -1);
  const expected = Number(digits.slice(-1));
  const sum = body
    .split("")
    .reverse()
    .reduce((total, char, index) => total + Number(char) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === expected;
}

function normalizeDecodedBarcode(rawValue = "", format = "") {
  const text = String(rawValue || "").trim();
  const digits = String(rawValue || "").replace(/\D/g, "");
  const normalizedFormat = String(format || "").toLowerCase();

  if (digits.length === 13 && digits.startsWith("0") && barcodeCheckDigitIsValid(digits)) {
    return digits.slice(1);
  }

  if (normalizedFormat === "upc_a" && digits.length === 12 && barcodeCheckDigitIsValid(digits)) return digits;
  if (normalizedFormat === "ean_13" && digits.length === 13 && barcodeCheckDigitIsValid(digits)) return digits;
  if (normalizedFormat === "upc_e" && digits.length === 8) return digits;
  if (normalizedFormat === "ean_8" && digits.length === 8 && barcodeCheckDigitIsValid(digits)) return digits;
  if ([8, 12, 13].includes(digits.length) && barcodeCheckDigitIsValid(digits)) return digits;
  return text;
}

function scannerDiagnostics() {
  return {
    isSecureContext: Boolean(window.isSecureContext || location.hostname === "localhost" || location.hostname === "127.0.0.1"),
    hasMediaDevices: Boolean(navigator.mediaDevices),
    hasGetUserMedia: Boolean(navigator.mediaDevices?.getUserMedia),
    hasNativeBarcodeDetector: Boolean(window.BarcodeDetector)
  };
}

function scannerDiagnosticsText(diag = scannerDiagnostics()) {
  return `secure=${diag.isSecureContext ? "yes" : "no"}, media=${diag.hasMediaDevices ? "yes" : "no"}, getUserMedia=${diag.hasGetUserMedia ? "yes" : "no"}, native=${diag.hasNativeBarcodeDetector ? "yes" : "no"}`;
}

function cameraUnavailableReason(diag = scannerDiagnostics()) {
  if (!diag.isSecureContext) return `Camera blocked: open the HTTPS GitHub Pages link. ${scannerDiagnosticsText(diag)}`;
  if (!diag.hasMediaDevices) return `Camera unavailable: mediaDevices missing. ${scannerDiagnosticsText(diag)}`;
  if (!diag.hasGetUserMedia) return `Camera unavailable: getUserMedia missing. ${scannerDiagnosticsText(diag)}`;
  return "";
}

function setCameraActive(isActive) {
  if (cameraVideo) cameraVideo.hidden = !isActive;
  if (stopCameraButton) stopCameraButton.hidden = !isActive;
  if (cameraScanButton) cameraScanButton.disabled = isActive;
}

function setCameraStatus(message) {
  if (scannerStatus) scannerStatus.textContent = message;
}

function targetBarcodeFormats() {
  return ["upc_a", "upc_e", "ean_13", "ean_8"];
}

function barcodeFormats(DetectorClass = window.BarcodeDetector) {
  const commonFormats = targetBarcodeFormats();
  if (!DetectorClass?.getSupportedFormats) return Promise.resolve(commonFormats);
  return DetectorClass.getSupportedFormats()
    .then((formats) => commonFormats.filter((format) => formats.includes(format)))
    .catch(() => []);
}

function loadZbarBarcodeDetector() {
  if (zbarLoadPromise) return zbarLoadPromise;
  zbarLoadPromise = import("https://cdn.jsdelivr.net/npm/@undecaf/barcode-detector-polyfill@0.9.23/dist/main.js").then(
    (module) => module.BarcodeDetectorPolyfill
  );
  return zbarLoadPromise;
}

function loadZxingBrowser() {
  if (zxingLoadPromise) return zxingLoadPromise;
  zxingLoadPromise = import("https://cdn.jsdelivr.net/npm/@zxing/browser@0.2.1/+esm");
  return zxingLoadPromise;
}

function decodedTextFromResult(result) {
  return result?.getText ? result.getText() : result?.text || "";
}

function productAssetFor(location) {
  const catalogMatch = productCatalog.find((item) => item.sku === location?.sku);
  if (catalogMatch?.imageUrl) return catalogMatch.imageUrl;
  if (/pepsi/i.test(location?.brand || location?.product || "")) return "assets/products/pepsi-12pk.jpg";
  if (/gatorade/i.test(location?.brand || location?.product || "")) return "assets/products/gatorade-glacier-freeze-28oz.jpg";
  if (/mountain dew/i.test(location?.brand || location?.product || "")) return "assets/products/mountain-dew-2l.jpg";
  return "";
}

function renderLocationResult(location, query = "") {
  if (!location) {
    locationResult.className = "location-result unmapped";
    locationResult.innerHTML = `
      <strong>LOCATION NOT MAPPED</strong>
      <span>No Store #57 shelf location matched "${query || "that scan"}". Add it to pending rep verification before treating it as a route stop.</span>
    `;
    scannerStatus.textContent = "No mapped location found.";
    return;
  }

  const label = storeLocationData.locationLabel(location);
  const isMapped = label !== "LOCATION NOT MAPPED";
  const productImage = productAssetFor(location);
  locationResult.className = `location-result featured-product ${isMapped ? "mapped" : "unmapped"}`;
  const mapLink = location.mapTarget
    ? `<a class="secondary-button compact-button result-map-link" href="${location.mapTarget}">Show on map</a>`
    : "";
  locationResult.innerHTML = `
    ${productImage ? `<img src="${productImage}" alt="${location.product}">` : `<div class="product-placeholder" aria-hidden="true">${location.brand?.slice(0, 1) || "P"}</div>`}
    <div>
      <strong>${location.product} - ${location.package}</strong>
      <span class="result-upc">${(location.upcs || [])[0] ? `UPC ${(location.upcs || [])[0]}` : location.sku}</span>
      <div class="result-facts">
        <span><b>Location</b>${isMapped ? location.aisle : "LOCATION NOT MAPPED"}</span>
        <span><b>Section</b>${location.section || "Verify"}</span>
        <span><b>Status</b>${location.verificationStatus || location.status || "unknown"}</span>
        <span><b>Source:</b>${location.source || "unknown"}</span>
      </div>
      <span>Route stop: ${location.routeStop || "Pending rep review"}</span>
      <span class="result-evidence">${location.evidence}</span>
      ${mapLink}
    </div>
  `;
  scannerStatus.textContent = isMapped ? "Mapped location found." : "Product found; location still needs mapping.";
}

function lookupStoreProduct(rawQuery) {
  const query = String(rawQuery || "").trim();
  if (!query) {
    renderLocationResult(null, "");
    scannerStatus.textContent = "Enter a UPC, Meijer item ID, or product name.";
    return null;
  }
  const digits = query.replace(/\D/g, "");
  const shouldUseBarcodeKey = digits.length >= 8 && digits.length === query.replace(/\s/g, "").length;
  const normalized = shouldUseBarcodeKey ? normalizeDecodedBarcode(query) : query;
  const location = storeLocationData.findStoreLocation(currentStoreId, normalized) || storeLocationData.findStoreLocation(currentStoreId, query);
  renderLocationResult(location, query);
  return location;
}

function stopCameraScan() {
  if (activeScanLoop) {
    cancelAnimationFrame(activeScanLoop);
    activeScanLoop = 0;
  }
  if (zxingControls) {
    if (typeof zxingControls.stop === "function") zxingControls.stop();
    if (typeof zxingControls.reset === "function") zxingControls.reset();
    zxingControls = null;
  }
  if (zxingReader && typeof zxingReader.reset === "function") {
    zxingReader.reset();
  }
  if (activeScanStream) {
    activeScanStream.getTracks().forEach((track) => track.stop());
    activeScanStream = null;
  }
  if (cameraVideo) {
    if (typeof cameraVideo.pause === "function") cameraVideo.pause();
    cameraVideo.hidden = true;
    cameraVideo.srcObject = null;
  }
  cameraDetector = null;
  setCameraActive(false);
}

async function handleDecodedBarcode(rawValue, decoder = "camera", format = "") {
  const normalized = normalizeDecodedBarcode(rawValue, format);
  const normalizedFormat = String(format || "").toLowerCase();
  const rawDigits = String(rawValue || "").replace(/\D/g, "");
  const validationDigits = normalized.length === 12 ? normalized : rawDigits;
  const validLength = /^\d{8}$|^\d{12}$|^\d{13}$/.test(normalized);
  const validChecksum = normalizedFormat === "upc_e" ? normalized.length === 8 : barcodeCheckDigitIsValid(validationDigits);
  const now = Date.now();

  if (!validLength || !validChecksum) {
    setCameraStatus("Unsupported barcode format.");
    return false;
  }

  if (normalized === lastDecodedBarcode && now - lastDecodedAt < 1500) {
    setCameraStatus(`Duplicate scan ignored: ${normalized}`);
    return false;
  }

  lastDecodedBarcode = normalized;
  lastDecodedAt = now;
  cameraDecodedValue = normalized;
  locationLookupInput.value = normalized;
  const location = lookupStoreProduct(normalized);
  const label = storeLocationData.locationLabel(location);
  setCameraStatus(location ? `Decoded with ${decoder}: ${normalized}. ${label}` : `Decoded with ${decoder}: ${normalized}. Location not mapped.`);
  if (navigator.vibrate) navigator.vibrate(60);
  stopCameraScan();
  return normalized;
}

async function startZbarWasmScan() {
  const DetectorClass = await loadZbarBarcodeDetector();
  if (!DetectorClass) throw new Error("ZBar WASM decoder unavailable.");
  const formats = await barcodeFormats(DetectorClass);
  if (!formats.length) throw new Error("Unsupported barcode format.");
  cameraDetector = new DetectorClass({ formats });
  activeScanStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: "environment" },
      width: { ideal: 1280 },
      height: { ideal: 720 },
      focusMode: { ideal: "continuous" }
    },
    audio: false
  });
  cameraVideo.srcObject = activeScanStream;
  cameraVideo.setAttribute("autoplay", "true");
  cameraVideo.setAttribute("muted", "true");
  cameraVideo.setAttribute("playsinline", "true");
  await cameraVideo.play();
  setCameraStatus("Decoder: ZBar WASM. Center barcode in box.");

  async function scanFrame() {
    if (cameraDecodedValue || !cameraDetector || !cameraVideo?.srcObject) return;
    const codes = await cameraDetector.detect(cameraVideo).catch(() => []);
    const supportedCode = codes.find((code) => formats.includes(code.format));
    if (supportedCode?.rawValue) {
      await handleDecodedBarcode(supportedCode.rawValue, "ZBar WASM", supportedCode.format);
      return;
    }
    setCameraStatus("Decoder: ZBar WASM. Scanning barcode...");
    activeScanLoop = requestAnimationFrame(scanFrame);
  }

  activeScanLoop = requestAnimationFrame(scanFrame);
}

async function startZxingScan() {
  const zxing = await loadZxingBrowser();
  const Reader = zxing?.BrowserMultiFormatOneDReader || zxing?.BrowserMultiFormatReader;
  if (!Reader) throw new Error("ZXing browser scanner did not load.");
  zxingReader = new Reader(undefined, {
    delayBetweenScanAttempts: 75,
    delayBetweenScanSuccess: 250,
    tryPlayVideoTimeout: 8000
  });
  setCameraStatus("Decoder: ZXing. Center barcode in box.");
  zxingControls = await zxingReader.decodeFromVideoDevice(undefined, cameraVideo, (result, error) => {
    if (cameraDecodedValue) return;
    const rawValue = decodedTextFromResult(result);
    if (rawValue) {
      const format = result?.getBarcodeFormat ? String(result.getBarcodeFormat()).toLowerCase() : "";
      handleDecodedBarcode(rawValue, "ZXing", format);
      return;
    }
    if (error) setCameraStatus("Decoder: ZXing. Scanning barcode...");
  });
}

async function startCameraScan() {
  const diag = scannerDiagnostics();
  const unavailable = cameraUnavailableReason(diag);
  if (unavailable) {
    setCameraStatus(unavailable);
    return false;
  }

  stopCameraScan();
  cameraDecodedValue = "";
  setCameraActive(true);
  setCameraStatus(`Camera starting. ${scannerDiagnosticsText(diag)}`);

  try {
    await startZbarWasmScan();
  } catch (zbarError) {
    try {
      stopCameraScan();
      cameraDecodedValue = "";
      setCameraActive(true);
      setCameraStatus("ZBar WASM unavailable. Loading ZXing fallback...");
      await startZxingScan();
    } catch (zxingError) {
      stopCameraScan();
      setCameraStatus(`Decoder unavailable. Type the UPC manually. ${zxingError.message || zbarError.message || ""}`.trim());
      return false;
    }
  }

  return true;
}

function moveStop(index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= route.length) return;
  const [stop] = route.splice(index, 1);
  route.splice(nextIndex, 0, stop);

  const remapped = new Set();
  completed.forEach((doneIndex) => {
    if (doneIndex === index) remapped.add(nextIndex);
    else if (direction === -1 && doneIndex === nextIndex) remapped.add(index);
    else if (direction === 1 && doneIndex === nextIndex) remapped.add(index);
    else remapped.add(doneIndex);
  });
  completed.clear();
  remapped.forEach((doneIndex) => completed.add(doneIndex));
  activeIndex = nextIndex;
  render();
}

routeList.addEventListener("click", (event) => {
  const moveButton = event.target.closest("[data-move]");
  const card = event.target.closest(".route-card");
  if (moveButton) {
    const index = Number(moveButton.dataset.index);
    moveStop(index, moveButton.dataset.move === "up" ? -1 : 1);
    return;
  }
  if (card) {
    setActive([...routeList.children].indexOf(card));
  }
});

completeButton.addEventListener("click", () => {
  if (completed.has(activeIndex)) {
    completed.delete(activeIndex);
  } else {
    completed.add(activeIndex);
    const nextOpen = route.findIndex((_, index) => !completed.has(index));
    if (nextOpen !== -1) activeIndex = nextOpen;
  }
  render();
});

verifyButton.addEventListener("click", () => {
  const current = route[activeIndex];
  verifyTitle.textContent = current.name;
  locationType.value = current.type;
  aisleInput.value = current.aisle;
  sectionInput.value = current.section;
  priorityInput.value = current.priority;
  notesInput.value = current.notes || "";
  verifyDialog.showModal();
});

saveVerifyButton.addEventListener("click", () => {
  const current = route[activeIndex];
  current.type = locationType.value;
  current.aisle = aisleInput.value || current.aisle;
  current.section = sectionInput.value;
  current.priority = priorityInput.value;
  current.notes = notesInput.value;
  current.verified = true;
  render();
});

addDisplayButton.addEventListener("click", () => {
  displayNameInput.value = "";
  displayDepartmentInput.value = "";
  displayPlacementInput.value = "";
  displayProductInput.value = "";
  displayPriorityInput.value = "High";
  displayNotesInput.value = "";
  displayDialog.showModal();
});

saveDisplayButton.addEventListener("click", () => {
  const department = displayDepartmentInput.value || "Store display";
  const placement = displayPlacementInput.value || "Placement needs verification";
  const product = displayProductInput.value || "PepsiCo beverage display";
  const name = displayNameInput.value || `${department} display`;
  const display = {
    name,
    department,
    placement,
    product,
    priority: displayPriorityInput.value,
    notes: displayNotesInput.value
  };

  savedDisplays.push(display);
  localStorage.setItem("soldDisplays", JSON.stringify(savedDisplays));
  route.splice(route.length - 1, 0, makeDisplayStop(display));
  render();
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    document.querySelectorAll(".segment").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    routeMode.textContent = mode === "pallet" ? "Pallet allowed" : "U-boat only";
    modeNote.textContent =
      mode === "pallet"
        ? "Bulk pull early, work front to back, finish near receiving."
        : "Build section carts from the backroom and keep aisles clear.";
  });
});

document.querySelector("#resetButton").addEventListener("click", () => {
  completed.clear();
  activeIndex = 0;
  render();
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const target =
      button.dataset.view === "scan"
        ? ".scanner-panel"
        : button.dataset.view === "map"
        ? ".map-panel"
        : button.dataset.view === "verify"
          ? ".current-stop"
          : ".status-strip";
    document.querySelector(target).scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

jumpScanButton?.addEventListener("click", () => {
  document.querySelector(".scanner-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  locationLookupInput?.focus();
});

if (selectedStoreLabel) {
  const selectedStore = storeLocationData.stores.find((store) => store.id === currentStoreId);
  selectedStoreLabel.textContent = selectedStore?.name || "Selected store";
}

locationLookupInput?.addEventListener("input", () => {
  lookupStoreProduct(locationLookupInput.value);
});

locationLookupInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    lookupStoreProduct(locationLookupInput.value);
  }
});

cameraScanButton?.addEventListener("click", () => {
  startCameraScan().catch((error) => {
    scannerStatus.textContent = `Camera scan failed: ${error.message}`;
    stopCameraScan();
  });
});

stopCameraButton?.addEventListener("click", () => {
  stopCameraScan();
  setCameraStatus("Camera stopped. Type or scan another UPC when ready.");
});

window.MERCH_APP = {
  route,
  setActive,
  barcodeCheckDigitIsValid,
  normalizeDecodedBarcode,
  scannerDiagnostics,
  lookupStoreProduct,
  handleDecodedBarcode,
  renderLocationResult,
  stopCameraScan,
  startCameraScan,
  get currentStoreId() {
    return currentStoreId;
  },
  set currentStoreId(value) {
    currentStoreId = value;
  }
};

render();
