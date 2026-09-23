const stores = [
  {
    id: "WM-2558",
    stop: 1,
    eta: "6:05 AM",
    name: "Walmart Supercenter - Grand Blanc",
    address: "Large format / high-volume",
    account: "Walmart",
    visitType: "Zebra order + displays",
    dataMode: "Demo retailer inventory signal",
    confidence: "High confidence",
    risk: "High",
    riskScore: 94,
    nextDelivery: "Full order",
    forecast: "92F weekend",
    timeSaved: "38 min",
    routeNote: "Start here before traffic builds. Use Zebra scans only on exceptions, not every SKU.",
    aiReason:
      "Retailer signal, heat, and strong weekend velocity show this store will lose sales before the next delivery without a heavier beverage order.",
    weather: [
      { day: "Fri", temp: 91, condition: "Sunny" },
      { day: "Sat", temp: 94, condition: "Sunny" },
      { day: "Sun", temp: 89, condition: "Humid" }
    ],
    lifts: [
      { category: "Gatorade", lift: 24 },
      { category: "Aquafina", lift: 20 },
      { category: "Propel", lift: 16 },
      { category: "Dew", lift: 10 }
    ],
    order: [
      { sku: "Pepsi 20oz", location: "Front cooler", onHand: 11, warehouseQoh: 86, sold: 32, base: 4, weather: 1, promo: 1, backroom: 0, approved: false },
      { sku: "Mountain Dew 20oz", location: "Front cooler", onHand: 9, warehouseQoh: 74, sold: 36, base: 5, weather: 1, promo: 1, backroom: 0, approved: false },
      { sku: "Gatorade 28oz Glacier Freeze", location: "Cold vault + feature", onHand: 8, warehouseQoh: 230, sold: 44, stockoutWeeks: 3, base: 9, weather: 4, promo: 2, backroom: 0, approved: false },
      { sku: "Aquafina 24pk", location: "Water aisle", onHand: 13, sold: 58, stockoutWeeks: 3, base: 12, weather: 4, promo: 0, backroom: -2, approved: false },
      { sku: "Pepsi 12pk", location: "Main soda", onHand: 19, sold: 36, stockoutWeeks: 2, base: 8, weather: 1, promo: 1, backroom: 0, approved: false },
      { sku: "Mountain Dew 12pk", location: "Main soda", onHand: 12, sold: 39, stockoutWeeks: 2, base: 7, weather: 1, promo: 1, backroom: 0, approved: false },
      { sku: "Mug Root Beer 12pk", location: "Main soda", onHand: 4, sold: 0, noSalesDays: 91, replacementCandidate: "Mountain Dew Baja Blast 12pk", base: 0, weather: 0, promo: 0, backroom: 0, approved: false },
      { sku: "Propel Variety 6pk", location: "Hydration set", onHand: 5, warehouseQoh: 0, sold: 22, base: 5, weather: 2, promo: 0, backroom: 0, approved: false },
      { sku: "Rockstar Energy 16oz", location: "Energy cooler", onHand: 9, sold: 11, base: 3, weather: 0, promo: 0, backroom: 0, approved: false }
    ],
    checks: [
      { zone: "Cold vault", item: "Gatorade 28oz", reason: "Scan to confirm low stock before the heat weekend", severity: "High" },
      { zone: "Water aisle", item: "Aquafina 24pk", reason: "Scan/verify backroom before building the final water order", severity: "High" },
      { zone: "Feature", item: "Gatorade display", reason: "Scan feature location because sales are below expected pace", severity: "Medium" },
      { zone: "Energy cooler", item: "Rockstar", reason: "Scan if shelf looks full but sales are flat", severity: "Medium" }
    ],
    returns: [
      { type: "OOD", item: "Gatorade 28oz Lemon Lime", cases: 1, note: "Cooler rotation issue" },
      { type: "Breakage", item: "Aquafina 24pk", cases: 1, note: "Crushed case in backroom" },
      { type: "Sellable", item: "Pepsi 12pk", cases: 2, note: "Moveable overstock, do not credit" }
    ]
  },
  {
    id: "KR-428",
    stop: 2,
    eta: "7:15 AM",
    name: "Kroger #428 - Grand Blanc",
    address: "Grocery / DSD heavy",
    account: "Kroger",
    visitType: "Zebra order + cooler check",
    dataMode: "Demo supplier activity feed",
    confidence: "Medium-high confidence",
    risk: "High",
    riskScore: 88,
    nextDelivery: "Full order",
    forecast: "92F weekend",
    timeSaved: "31 min",
    routeNote: "Kroger has activity data; Zebra should scan only the shelf/backroom exceptions.",
    aiReason:
      "Store activity, low shelf buffer, and upcoming heat point to Gatorade, Aquafina, and Dew risk before the next visit.",
    weather: [
      { day: "Fri", temp: 91, condition: "Sunny" },
      { day: "Sat", temp: 94, condition: "Sunny" },
      { day: "Sun", temp: 89, condition: "Humid" }
    ],
    lifts: [
      { category: "Gatorade", lift: 22 },
      { category: "Aquafina", lift: 18 },
      { category: "Propel", lift: 15 },
      { category: "Dew", lift: 10 }
    ],
    order: [
      { sku: "Gatorade 28oz Glacier Freeze", location: "Cold vault + display", onHand: 8, sold: 34, stockoutWeeks: 2, base: 7, weather: 3, promo: 2, backroom: 0, approved: false },
      { sku: "Aquafina 24pk", location: "Water aisle", onHand: 11, sold: 42, stockoutWeeks: 2, base: 9, weather: 3, promo: 0, backroom: -1, approved: false },
      { sku: "Pepsi 12pk", location: "Main soda", onHand: 16, sold: 28, stockoutWeeks: 1, base: 7, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "Mountain Dew 12pk", location: "Main soda", onHand: 12, sold: 31, base: 6, weather: 1, promo: 1, backroom: 0, approved: false },
      { sku: "Propel Variety 6pk", location: "Hydration set", onHand: 5, sold: 18, base: 4, weather: 1, promo: 0, backroom: 0, approved: false }
    ],
    checks: [
      { zone: "Cold vault", item: "Gatorade 28oz", reason: "Scan to confirm likely low stock before next delivery", severity: "High" },
      { zone: "Display", item: "Gatorade promo stack", reason: "Scan display because sales activity is below ad-week expectation", severity: "High" },
      { zone: "Backroom", item: "Aquafina 24pk", reason: "System shows 4 cases available; scan/verify before over-ordering", severity: "Medium" },
      { zone: "Main soda", item: "Mountain Dew 12pk", reason: "Scan shelf if weather lift meets low shelf buffer", severity: "High" }
    ],
    returns: [
      { type: "OOD", item: "Pepsi 2L", cases: 1, note: "Pulled from warm shelf" },
      { type: "Sellable", item: "Mountain Dew 12pk", cases: 1, note: "Restage to main aisle" }
    ]
  },
  {
    id: "MJ-64",
    stop: 3,
    eta: "8:25 AM",
    name: "Meijer - Hill Rd",
    address: "Supercenter / weekly ad",
    account: "Meijer",
    visitType: "Zebra ad support",
    dataMode: "Demo VendorNet-style data",
    confidence: "Medium confidence",
    risk: "Medium",
    riskScore: 73,
    nextDelivery: "Ad support",
    forecast: "90F Friday",
    timeSaved: "26 min",
    routeNote: "Use daily POS and order history, then scan promo displays and front cooler exceptions.",
    aiReason:
      "Daily sales trend is good, but the ad stack and front cooler need Zebra confirmation before the rep builds the order.",
    weather: [
      { day: "Thu", temp: 87, condition: "Clouds" },
      { day: "Fri", temp: 90, condition: "Sunny" },
      { day: "Sat", temp: 84, condition: "Rain" }
    ],
    lifts: [
      { category: "Aquafina", lift: 14 },
      { category: "Gatorade", lift: 12 },
      { category: "Pepsi", lift: 8 },
      { category: "Energy", lift: 5 }
    ],
    order: [
      { sku: "Aquafina 24pk", location: "Bulk water", onHand: 20, sold: 39, base: 8, weather: 2, promo: 0, backroom: -1, approved: false },
      { sku: "Gatorade 12pk Variety", location: "Promo stack", onHand: 10, warehouseQoh: 4, sold: 26, base: 5, weather: 1, promo: 2, backroom: 0, approved: false },
      { sku: "Pepsi Zero 12pk", location: "Main soda", onHand: 14, sold: 21, base: 4, weather: 0, promo: 1, backroom: 0, approved: false },
      { sku: "Starry 12pk", location: "Main soda", onHand: 8, sold: 15, base: 3, weather: 0, promo: 1, backroom: 0, approved: false }
    ],
    checks: [
      { zone: "Promo", item: "Gatorade 12pk", reason: "Scan display to confirm space before ordering extra cases", severity: "Medium" },
      { zone: "Front cooler", item: "20oz Pepsi/Dew", reason: "Scan high-profit singles where the cooler looks low", severity: "High" },
      { zone: "Bulk water", item: "Aquafina 24pk", reason: "Scan/verify backroom quantity before reducing order", severity: "Medium" }
    ],
    returns: [
      { type: "Breakage", item: "Starry 12pk", cases: 1, note: "Leaker on shelf" }
    ]
  },
  {
    id: "BU-12",
    stop: 4,
    eta: "9:35 AM",
    name: "Busch's Fresh Food Market - Brighton",
    address: "Independent / premium grocery",
    account: "Busch's",
    visitType: "Zebra-assisted manual order",
    dataMode: "Demo order history + rep check",
    confidence: "Low-medium confidence",
    risk: "Medium",
    riskScore: 61,
    nextDelivery: "Manual order",
    forecast: "Warm weekend",
    timeSaved: "21 min",
    routeNote: "Independent account. Use Zebra to create structure where live inventory is weak.",
    aiReason:
      "No direct live inventory is assumed here, so the order is based on last delivery, normal velocity, weather, and physical exception checks.",
    weather: [
      { day: "Fri", temp: 88, condition: "Sunny" },
      { day: "Sat", temp: 91, condition: "Sunny" },
      { day: "Sun", temp: 83, condition: "Clouds" }
    ],
    lifts: [
      { category: "Gatorade", lift: 12 },
      { category: "Aquafina", lift: 10 },
      { category: "Pepsi", lift: 5 },
      { category: "bubly", lift: 4 }
    ],
    order: [
      { sku: "Pepsi 12pk", location: "Main aisle", onHand: 0, sold: 18, base: 4, weather: 0, promo: 0, backroom: 0, approved: false },
      { sku: "Gatorade 28oz Fruit Punch", location: "Cooler", onHand: 0, sold: 13, base: 3, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "Aquafina 24pk", location: "Water stack", onHand: 0, sold: 20, base: 5, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "bubly 8pk Lime", location: "Sparkling water", onHand: 0, sold: 8, base: 2, weather: 0, promo: 0, backroom: 0, approved: false }
    ],
    checks: [
      { zone: "Backroom", item: "All PepsiCo backstock", reason: "No reliable live on-hand; scan/physical count matters", severity: "High" },
      { zone: "Cooler", item: "Gatorade singles", reason: "Scan cooler gaps because weather makes low fill expensive", severity: "High" },
      { zone: "Manager", item: "Display permission", reason: "Ask before adding extra water/Gatorade stack", severity: "Medium" }
    ],
    returns: []
  },
  {
    id: "BC-104",
    stop: 5,
    eta: "10:30 AM",
    name: "Bueche's Food World - Ortonville",
    address: "Independent / two-store chain",
    account: "Bueche's",
    visitType: "Relationship stop",
    dataMode: "Demo rep notes + history",
    confidence: "Low confidence",
    risk: "Medium",
    riskScore: 58,
    nextDelivery: "Manual order",
    forecast: "Warm weekend",
    timeSaved: "17 min",
    routeNote: "Small account. Zebra guides the walk without pretending inventory is perfect.",
    aiReason:
      "This stop relies on rep notes, prior order history, and weather. Confidence is lower, so the check list is more important than the calculated order.",
    weather: [
      { day: "Fri", temp: 87, condition: "Sunny" },
      { day: "Sat", temp: 90, condition: "Sunny" },
      { day: "Sun", temp: 82, condition: "Clouds" }
    ],
    lifts: [
      { category: "Pepsi", lift: 6 },
      { category: "Gatorade", lift: 9 },
      { category: "Aquafina", lift: 8 },
      { category: "Dew", lift: 5 }
    ],
    order: [
      { sku: "Pepsi 2L", location: "Main aisle", onHand: 0, sold: 11, base: 3, weather: 0, promo: 0, backroom: 0, approved: false },
      { sku: "Mountain Dew 12pk", location: "Main aisle", onHand: 0, sold: 14, base: 3, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "Gatorade 28oz Orange", location: "Cooler", onHand: 0, sold: 10, base: 2, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "Aquafina 24pk", location: "Water area", onHand: 0, sold: 16, base: 4, weather: 1, promo: 0, backroom: 0, approved: false }
    ],
    checks: [
      { zone: "Backroom", item: "Water and 12pk stacks", reason: "Scan/verify stacks because backstock can hide the real order need", severity: "High" },
      { zone: "Cooler", item: "Gatorade 28oz", reason: "Scan hydration gaps because they are the biggest weather-sensitive miss", severity: "High" },
      { zone: "Manager", item: "Weekend display", reason: "Ask if extra front stack is acceptable", severity: "Medium" }
    ],
    returns: []
  },
  {
    id: "DG-18431",
    stop: 6,
    eta: "11:20 AM",
    name: "Dollar General - Davison Rd",
    address: "Small format / high turns",
    account: "Dollar General",
    visitType: "Quick Zebra order",
    dataMode: "Demo sales activity, limited on-hand",
    confidence: "Low-medium confidence",
    risk: "High",
    riskScore: 82,
    nextDelivery: "Quick order",
    forecast: "Heat lift",
    timeSaved: "18 min",
    routeNote: "Sales data helps, but do not trust store on-hand. Scan shelf and backstock first.",
    aiReason:
      "Dollar stores can burn through core packages fast. Sales activity and last order support a focused order, but physical verification is required.",
    weather: [
      { day: "Fri", temp: 91, condition: "Sunny" },
      { day: "Sat", temp: 94, condition: "Sunny" },
      { day: "Sun", temp: 89, condition: "Humid" }
    ],
    lifts: [
      { category: "Pepsi", lift: 8 },
      { category: "Dew", lift: 9 },
      { category: "Gatorade", lift: 14 },
      { category: "Water", lift: 12 }
    ],
    order: [
      { sku: "Pepsi 12pk", location: "Core shelf", onHand: 0, sold: 22, base: 5, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "Mountain Dew 12pk", location: "Core shelf", onHand: 0, sold: 24, base: 5, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "Gatorade 28oz Cool Blue", location: "Cooler", onHand: 0, sold: 18, base: 4, weather: 1, promo: 0, backroom: 0, approved: false }
    ],
    checks: [
      { zone: "Core shelf", item: "Pepsi/Dew 12pk", reason: "Scan because shelf risk is high and on-hand is unreliable", severity: "High" },
      { zone: "Backroom", item: "Unworked cases", reason: "Scan/verify to avoid ordering over a buried stack", severity: "High" },
      { zone: "Cooler", item: "Gatorade", reason: "Scan heat-sensitive items that are easy to miss", severity: "Medium" }
    ],
    returns: [
      { type: "OOD", item: "Mountain Dew 20oz", cases: 1, note: "Expired singles" }
    ]
  },
  {
    id: "CVS-3187",
    stop: 7,
    eta: "12:10 PM",
    name: "CVS - Fenton Rd",
    address: "Drug / cooler-heavy",
    account: "CVS",
    visitType: "Zebra cooler order",
    dataMode: "Demo EDI/portal signals",
    confidence: "Medium confidence",
    risk: "Low",
    riskScore: 46,
    nextDelivery: "Light order",
    forecast: "Warm weekend",
    timeSaved: "13 min",
    routeNote: "Small order. Focus on profitable singles and avoid over-ordering slow multipacks.",
    aiReason:
      "Cooler singles need a top-off, but multipack demand is modest. The order should stay light unless the shelf check says otherwise.",
    weather: [
      { day: "Fri", temp: 88, condition: "Sunny" },
      { day: "Sat", temp: 91, condition: "Sunny" },
      { day: "Sun", temp: 83, condition: "Clouds" }
    ],
    lifts: [
      { category: "Singles", lift: 10 },
      { category: "Gatorade", lift: 8 },
      { category: "Energy", lift: 4 },
      { category: "12pk", lift: 2 }
    ],
    order: [
      { sku: "Pepsi 20oz", location: "Front cooler", onHand: 7, sold: 18, base: 2, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "Mountain Dew 20oz", location: "Front cooler", onHand: 6, sold: 20, base: 2, weather: 1, promo: 0, backroom: 0, approved: false },
      { sku: "Gatorade 28oz Lemon Lime", location: "Cooler", onHand: 9, sold: 12, base: 2, weather: 1, promo: 0, backroom: 0, approved: false }
    ],
    checks: [
      { zone: "Front cooler", item: "Pepsi/Dew 20oz", reason: "Scan singles because they sell fast and are easy to under-order", severity: "Medium" },
      { zone: "Backroom", item: "Slow 12pk", reason: "Scan/verify before adding slow cases", severity: "Low" }
    ],
    returns: []
  },
  {
    id: "KR-219",
    stop: 8,
    eta: "1:05 PM",
    name: "Kroger #219 - Burton",
    address: "Grocery / finish stop",
    account: "Kroger",
    visitType: "Light Zebra order",
    dataMode: "Demo supplier activity feed",
    confidence: "Medium confidence",
    risk: "Low",
    riskScore: 39,
    nextDelivery: "Light order",
    forecast: "Rain risk",
    timeSaved: "16 min",
    routeNote: "Finish with a light Zebra order. Scan exceptions, submit order, leave note for next visit.",
    aiReason:
      "Rain lowers immediate demand. Only a few exceptions need Zebra confirmation before the rep builds the order.",
    weather: [
      { day: "Fri", temp: 78, condition: "Rain" },
      { day: "Sat", temp: 74, condition: "Rain" },
      { day: "Sun", temp: 79, condition: "Clouds" }
    ],
    lifts: [
      { category: "Gatorade", lift: 4 },
      { category: "Aquafina", lift: 3 },
      { category: "Dew", lift: 2 },
      { category: "Energy", lift: 2 }
    ],
    order: [
      { sku: "Pepsi 12pk", location: "Main soda", onHand: 22, sold: 19, base: 4, weather: 0, promo: 0, backroom: 0, approved: false },
      { sku: "Mountain Dew 2L", location: "Main soda", onHand: 18, sold: 15, base: 3, weather: 0, promo: 0, backroom: 0, approved: false },
      { sku: "Gatorade 28oz Orange", location: "Cold vault", onHand: 6, sold: 12, base: 3, weather: 0, promo: 0, backroom: 0, approved: false },
      { sku: "bubly 8pk Lime", location: "Sparkling water", onHand: 9, sold: 10, base: 2, weather: 0, promo: 0, backroom: 0, approved: false }
    ],
    checks: [
      { zone: "Cold vault", item: "Gatorade Orange", reason: "Scan because on-hand is low despite low store risk", severity: "Medium" },
      { zone: "Sparkling water", item: "bubly Lime", reason: "Scan possible shelf void", severity: "Low" }
    ],
    returns: [
      { type: "Sellable", item: "bubly 8pk Lime", cases: 1, note: "Rotate to shelf, no credit" }
    ]
  }
];

const displayPlans = {
  "WM-2558": [
    { window: "Fri-Sun", area: "Front lobby", action: "Build hydration promo stack", products: "Gatorade 28oz + Aquafina 24pk", cases: 18, status: "Due today", priority: "High" },
    { window: "Next ad", area: "Feature bunker", action: "Convert from cola to heat promotion", products: "Propel 6pk + Gatorade 12pk", cases: 10, status: "Manager approval", priority: "Medium" }
  ],
  "KR-428": [
    { window: "Weekend", area: "End cap 4", action: "Refresh Gatorade promo display", products: "Gatorade 28oz Glacier Freeze", cases: 12, status: "Due today", priority: "High" },
    { window: "Monday reset", area: "Cold vault", action: "Add water promo facings", products: "Aquafina 24pk", cases: 8, status: "Upcoming", priority: "Medium" }
  ],
  "MJ-64": [
    { window: "Ad week", area: "Promo stack", action: "Set Gatorade variety promotion", products: "Gatorade 12pk Variety", cases: 14, status: "Due today", priority: "High" },
    { window: "Next 3 days", area: "Front cooler", action: "Rotate singles before promo order", products: "Pepsi/Dew 20oz", cases: 4, status: "Upcoming", priority: "Medium" }
  ],
  "BU-12": [
    { window: "Weekend", area: "Manager-approved front stack", action: "Ask for water stack placement", products: "Aquafina 24pk", cases: 6, status: "Ask manager", priority: "Medium" }
  ],
  "BC-104": [
    { window: "Weekend", area: "Main aisle", action: "Small warm-weather stack", products: "Pepsi 2L + Aquafina 24pk", cases: 5, status: "Ask manager", priority: "Medium" }
  ],
  "DG-18431": [
    { window: "Heat lift", area: "Core shelf", action: "Protect 12pk shelf space", products: "Pepsi 12pk + Mountain Dew 12pk", cases: 8, status: "Due today", priority: "High" }
  ],
  "CVS-3187": [
    { window: "This week", area: "Front cooler", action: "Top off profitable singles", products: "Pepsi 20oz + Mountain Dew 20oz", cases: 3, status: "Upcoming", priority: "Low" }
  ],
  "KR-219": [
    { window: "Next visit", area: "Sparkling water shelf", action: "Check space for bubly push", products: "bubly Lime 8pk", cases: 4, status: "Upcoming", priority: "Low" }
  ]
};

const promoRecommendations = {
  "WM-2558": [
    {
      sku: "Pepsi 12pk",
      event: "Weekly Ad",
      normalWeek: 36,
      comparablePromoAvg: 64,
      currentQoh: 18,
      promoForecast: 68,
      recommendedOrder: 50,
      displayBuildCases: 16,
      expectedDisplaySales: 24,
      reason: "Similar large-format heat-week promos sold 60+ cases; current shelf buffer is low."
    },
    {
      sku: "Gatorade 28oz Glacier Freeze",
      event: "Hydration End Cap",
      normalWeek: 44,
      comparablePromoAvg: 72,
      currentQoh: 8,
      promoForecast: 76,
      recommendedOrder: 68,
      displayBuildCases: 18,
      expectedDisplaySales: 31,
      reason: "Heat lift plus repeated runouts make this the highest-risk promo item."
    }
  ],
  "KR-428": [
    {
      sku: "Mountain Dew 12pk",
      event: "Weekend Feature",
      normalWeek: 31,
      comparablePromoAvg: 47,
      currentQoh: 12,
      promoForecast: 50,
      recommendedOrder: 38,
      displayBuildCases: 10,
      expectedDisplaySales: 15,
      reason: "Kroger activity and weather support extra promo stock, but not a full lobby stack."
    }
  ],
  "MJ-64": [
    {
      sku: "Gatorade 12pk Variety",
      event: "Ad Week Stack",
      normalWeek: 26,
      comparablePromoAvg: 44,
      currentQoh: 10,
      promoForecast: 48,
      recommendedOrder: 38,
      displayBuildCases: 14,
      expectedDisplaySales: 20,
      reason: "Ad stack quantity and expected sales are separated so the rep can build the display without over-ordering."
    }
  ]
};

let activeStoreIndex = 0;
let orderBuilt = false;
let activeScannedProductSku = "";
let activeViewTarget = ".order-panel";
let cameraStream = null;
let cameraScanLoop = 0;
let cameraDetector = null;
let zxingControls = null;
let zxingReader = null;
let zxingLoadPromise = null;
let zxingModule = null;
let zbarLoadPromise = null;
let cameraEngine = "";
let cameraDecodedValue = "";
const reorderPointOverrides = JSON.parse(localStorage.getItem("reorderPointOverrides") || "{}");
const storeCatalogOverrides = JSON.parse(localStorage.getItem("storeCatalogOverrides") || "{}");
const orderItemOverrides = JSON.parse(localStorage.getItem("orderItemOverrides") || "{}");
const displayConfirmations = JSON.parse(localStorage.getItem("displayConfirmations") || "{}");
const promoOrderOverrides = JSON.parse(localStorage.getItem("promoOrderOverrides") || "{}");
const dateCheckStatuses = JSON.parse(localStorage.getItem("dateCheckStatuses") || "{}");

const routeSummary = document.querySelector("#routeSummary");
const weatherSummary = document.querySelector("#weatherSummary");
const savedSummary = document.querySelector("#savedSummary");
const routeStoreSelect = document.querySelector("#routeStoreSelect");
const routeStoreRisk = document.querySelector("#routeStoreRisk");
const routeStoreTime = document.querySelector("#routeStoreTime");
const storeList = document.querySelector("#storeList");
const routeCount = document.querySelector("#routeCount");
const storeMeta = document.querySelector("#storeMeta");
const storeName = document.querySelector("#storeName");
const riskPill = document.querySelector("#riskPill");
const nextDelivery = document.querySelector("#nextDelivery");
const forecast = document.querySelector("#forecast");
const caseTotal = document.querySelector("#caseTotal");
const smartOrderSummary = document.querySelector("#smartOrderSummary");
const reviewSuggestedOrderButton = document.querySelector("#reviewSuggestedOrderButton");
const orderList = document.querySelector("#orderList");
const orderSearchInput = document.querySelector("#orderSearchInput");
const stockTable = document.querySelector("#stockTable");
const stockSignal = document.querySelector("#stockSignal");
const checkList = document.querySelector("#checkList");
const checkCount = document.querySelector("#checkCount");
const displaySummary = document.querySelector("#displaySummary");
const displayList = document.querySelector("#displayList");
const weatherLabel = document.querySelector("#weatherLabel");
const weatherDays = document.querySelector("#weatherDays");
const liftBars = document.querySelector("#liftBars");
const reviewMath = document.querySelector("#reviewMath");
const approvalStatus = document.querySelector("#approvalStatus");
const returnsSummary = document.querySelector("#returnsSummary");
const returnsList = document.querySelector("#returnsList");
const productCatalog = window.PRODUCT_CATALOG || [];
const catalogCount = document.querySelector("#catalogCount");
const scanInput = document.querySelector("#scanInput");
const scanResult = document.querySelector("#scanResult");
const cameraScanButton = document.querySelector("#cameraScanButton");
const captureFrameButton = document.querySelector("#captureFrameButton");
const stopCameraButton = document.querySelector("#stopCameraButton");
const cameraScanStatus = document.querySelector("#cameraScanStatus");
const cameraPreview = document.querySelector("#cameraPreview");
const cameraVideo = document.querySelector("#cameraVideo");
const storeCatalogCount = document.querySelector("#storeCatalogCount");
const storeCatalogList = document.querySelector("#storeCatalogList");
const catalogAddSelect = document.querySelector("#catalogAddSelect");
const addCatalogProductButton = document.querySelector("#addCatalogProductButton");
const catalogSearchInput = document.querySelector("#catalogSearchInput");
const demoModeButton = document.querySelector("#demoModeButton");
const viewMap = {
  ".route-panel": "route-view",
  ".order-panel": "order-view",
  ".scanner-panel": "scan-view",
  ".display-panel": "display-view",
  ".catalog-panel": "catalog-view",
  ".returns-panel": "returns-view",
  ".review-panel": "submit-view"
};

function finalCases(item) {
  return Math.max(0, item.base);
}

function normalCases(item) {
  return Math.max(0, item.normalBase ?? item.base);
}

function learnedDemandLift(item) {
  const repeatRunouts = Math.max(0, item.stockoutWeeks || 0);
  if (repeatRunouts < 2 || storeQoh(item) <= 0) return 0;
  const velocityLift = Math.ceil(Math.max(0, item.sold - storeQoh(item)) / 10);
  return Math.min(10, repeatRunouts * 2 + velocityLift);
}

function learnedDemandSignal(item) {
  const lift = learnedDemandLift(item);
  if (!lift) return "";
  return `Repeat runout: ${item.stockoutWeeks} weeks / +${lift} case point lift`;
}

function suggestedReorderPoint(item) {
  const estimatedDailySales = Math.max(1, Math.ceil(item.sold / 3));
  const weatherBuffer = Math.max(0, item.weather);
  const promoBuffer = Math.max(0, item.promo);
  return Math.max(2, Math.ceil(estimatedDailySales * 1.5 + weatherBuffer + promoBuffer + learnedDemandLift(item)));
}

function reorderOverrideKey(store, item) {
  return `${store.id}:${item.sku}`;
}

function orderItemOverrideKey(store, item) {
  return `${store.id}:${item.sku}`;
}

function displayConfirmationKey(store, display) {
  return `${store.id}:${display.window}:${display.area}:${display.action}`;
}

function promoOverrideKey(store, promo) {
  return `${store.id}:${promo.event}:${promo.sku}`;
}

function dateCheckKey(store, item) {
  return `${store.id}:${item.sku}`;
}

function loadOrderItemOverrides() {
  stores.forEach((store) => {
    store.order.forEach((item) => {
      const override = orderItemOverrides[orderItemOverrideKey(store, item)];
      if (override) Object.assign(item, override);
    });
  });
}

function activeReorderPoint(store, item) {
  const savedOverride = reorderPointOverrides[reorderOverrideKey(store, item)];
  return savedOverride ?? item.reorderPoint ?? suggestedReorderPoint(item);
}

function hasRepReorderPoint(store, item) {
  return reorderPointOverrides[reorderOverrideKey(store, item)] !== undefined;
}

function storeQoh(item) {
  return item.qoh ?? item.onHand ?? 0;
}

function autoOrderGap(store, item) {
  return Math.max(0, activeReorderPoint(store, item) - storeQoh(item));
}

function hasWarehouseQoh(item) {
  return typeof item.warehouseQoh === "number" || typeof item.warehouseOnHand === "number";
}

function warehouseQoh(item) {
  if (typeof item.warehouseQoh === "number") return item.warehouseQoh;
  if (typeof item.warehouseOnHand === "number") return item.warehouseOnHand;
  return null;
}

function warehouseText(item) {
  const warehouse = warehouseQoh(item);
  return warehouse === null ? "Unavailable" : warehouse;
}

function warehouseStatus(item) {
  const warehouse = warehouseQoh(item);
  const orderCases = finalCases(item);
  if (warehouse === null) return { level: "unknown", label: "Warehouse unavailable", message: "No authorized warehouse QOH is loaded for this SKU." };
  if (warehouse <= 0) return { level: "out", label: "Warehouse OOS", message: "Do not promise this order without substitution or manager note." };
  if (warehouse < orderCases) return { level: "short", label: "Warehouse short", message: `Only ${warehouse} cases available for ${orderCases} case order.` };
  return { level: "ok", label: "Warehouse OK", message: "" };
}

function itemFamily(item) {
  const sku = item.sku.toLowerCase();
  if (sku.includes("gatorade") || sku.includes("gatorlyte")) return "Gatorade";
  if (sku.includes("aquafina") || sku.includes("water") || sku.includes("lifewtr")) return "Water";
  if (sku.includes("mountain dew") || sku.includes("dew")) return "Mountain Dew";
  if (sku.includes("pepsi")) return "Pepsi";
  if (sku.includes("propel")) return "Propel";
  if (sku.includes("rockstar") || sku.includes("amp") || sku.includes("alani") || sku.includes("celsius")) return "Energy";
  return item.sku.split(/\s+/).slice(0, 2).join(" ");
}

function smartOrder(store) {
  const suggestedTotal = orderTotal(store);
  const normalTotal = store.order.reduce((sum, item) => sum + normalCases(item), 0);
  const familyMap = new Map();

  store.order.forEach((item) => {
    const family = itemFamily(item);
    const current = familyMap.get(family) || { family, suggested: 0, normal: 0, sold: 0, qoh: 0 };
    current.suggested += finalCases(item);
    current.normal += normalCases(item);
    current.sold += item.sold || 0;
    current.qoh += storeQoh(item);
    familyMap.set(family, current);
  });

  const drivers = [...familyMap.values()]
    .map((driver) => ({ ...driver, delta: driver.suggested - driver.normal }))
    .sort((a, b) => b.delta - a.delta || b.sold - a.sold)
    .filter((driver) => driver.delta > 0)
    .slice(0, 4);

  const reasons = [];
  const hotWeather = store.weather?.some((day) => day.temp >= 85);
  const strongVelocity = store.order.some((item) => (item.stockoutWeeks || 0) >= 2 || (item.sold || 0) > storeQoh(item) * 2);
  const lowInventory = store.order.some((item) => storeQoh(item) < activeReorderPoint(store, item));
  const promoSupport = store.order.some((item) => (item.promo || 0) > 0);
  if (hotWeather) reasons.push("hot weekend");
  if (strongVelocity) reasons.push("strong recent velocity");
  if (lowInventory) reasons.push("low current inventory");
  if (promoSupport) reasons.push("promo support");

  return {
    suggestedTotal,
    normalTotal,
    aboveNormal: suggestedTotal - normalTotal,
    drivers,
    explanation: reasons.length ? `${reasons.join(" + ")}.` : "Review current QOH against store order points."
  };
}

function dateCheckItems(store) {
  return store.order.filter((item) => storeQoh(item) > 0 && (item.noSalesDays || 0) >= 60 && !dateCheckStatuses[dateCheckKey(store, item)]);
}

function setZebraDemoMode(enabled, updateUrl = true) {
  document.body.classList.toggle("zebra-demo", enabled);
  if (demoModeButton) {
    demoModeButton.setAttribute("aria-pressed", String(enabled));
  }
  if (!updateUrl || !window.history?.replaceState) return;
  const url = new URL(window.location.href);
  if (enabled) url.searchParams.set("zebra", "1");
  else url.searchParams.delete("zebra");
  window.history.replaceState({}, "", url);
}

function replacementSuggestion(item) {
  return item.replacementCandidate || "Review stronger authorized SKU with manager";
}

const locationSequence = [
  "Cooler pop",
  "Front cooler",
  "Cold vault",
  "Energy cooler",
  "Cooler",
  "Promo",
  "Promo stack",
  "Feature",
  "Water aisle",
  "Bulk water",
  "Water stack",
  "Water area",
  "Hydration set",
  "Main soda",
  "Main aisle",
  "Core shelf",
  "Sparkling water",
  "Backroom"
];

function isCoolerPopItem(item) {
  const text = normalizeSearchText([item.sku, item.location].join(" "));
  const product = productByStoreItem(item);
  const productText = product ? normalizeSearchText([product.brand, product.name, product.category, product.package, product.salesChannel].join(" ")) : "";
  const combined = `${text} ${productText}`;
  const isCooler = combined.includes("front cooler") || combined.includes("cooler single") || combined.includes("20oz");
  const isPop = /(pepsi|mountain dew|starry|mug|crush|cola|soda)/.test(combined);
  return isCooler && isPop;
}

function orderSection(item) {
  if (isCoolerPopItem(item)) return "Cooler pop";
  return locationGroup(item.location);
}

function locationRank(location = "") {
  const normalized = location.toLowerCase();
  const index = locationSequence.findIndex((zone) => normalized.includes(zone.toLowerCase()));
  return index === -1 ? locationSequence.length : index;
}

function orderSectionRank(item) {
  return locationRank(orderSection(item));
}

function locationGroup(location = "") {
  const match = locationSequence.find((zone) => location.toLowerCase().includes(zone.toLowerCase()));
  return match || location || "Other";
}

function orderedItemsByLocation(order) {
  return [...order]
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const rankDiff = orderSectionRank(a.item) - orderSectionRank(b.item);
      if (rankDiff !== 0) return rankDiff;
      return a.item.location.localeCompare(b.item.location) || a.item.sku.localeCompare(b.item.sku);
    });
}

function orderItemMatchesSearch(item, searchTerm) {
  const term = normalizeSearchText(searchTerm);
  if (!term) return true;
  const product = productByStoreItem(item);
  if (product && searchProducts([product], term).length) return true;
  const itemText = normalizeSearchText(
    [item.sku, item.location, orderSection(item), item.category, item.package]
    .filter(Boolean)
    .join(" ")
  );
  const tokens = term.split(/\s+/).filter(Boolean);
  return itemText.includes(term) || tokens.every((token) => itemText.includes(searchSynonyms[token] || token));
}

function orderItemMatchesScannedProduct(item, productSku) {
  if (!productSku) return true;
  return productByStoreItem(item)?.sku === productSku;
}

function saveReorderPointOverride(store, item, value) {
  reorderPointOverrides[reorderOverrideKey(store, item)] = value;
  item.reorderPoint = value;
  localStorage.setItem("reorderPointOverrides", JSON.stringify(reorderPointOverrides));
}

function applyAutoOrderFromPoint(store, item) {
  const autoBase = autoOrderGap(store, item);
  saveOrderItemOverride(store, item, { base: autoBase });
  return autoBase;
}

function syncInitialAutoOrdersFromPoints() {
  stores.forEach((store) => {
    store.order.forEach((item) => {
      if (item.normalBase === undefined) item.normalBase = Math.max(0, item.base || 0);
      const override = orderItemOverrides[orderItemOverrideKey(store, item)];
      if (!override || override.base === undefined) {
        item.base = autoOrderGap(store, item);
      }
    });
  });
}

function saveOrderItemOverride(store, item, values) {
  const key = orderItemOverrideKey(store, item);
  orderItemOverrides[key] = { ...(orderItemOverrides[key] || {}), ...values };
  Object.assign(item, values);
  localStorage.setItem("orderItemOverrides", JSON.stringify(orderItemOverrides));
}

function orderTotal(store) {
  return store.order.reduce((sum, item) => sum + finalCases(item), 0);
}

function riskClass(risk) {
  return risk.toLowerCase().replace(/[^a-z]+/g, "-");
}

function routeMinutesSaved() {
  return stores.reduce((sum, store) => sum + Number(store.timeSaved.split(" ")[0]), 0);
}

function renderRouteSummary() {
  const highRisk = stores.filter((store) => store.risk === "High").length;
  routeSummary.textContent = `${stores.length} stops / ${highRisk} high risk`;
  weatherSummary.textContent = "Heat lift +18%";
  const minutes = routeMinutesSaved();
  savedSummary.textContent = `${Math.floor(minutes / 60)}h ${minutes % 60}m est.`;
}

function setActiveStore(index) {
  stopCameraScan();
  activeStoreIndex = Math.max(0, Math.min(stores.length - 1, index));
  activeScannedProductSku = "";
  if (orderSearchInput) orderSearchInput.value = "";
  if (catalogSearchInput) catalogSearchInput.value = "";
  if (scanInput) scanInput.value = "";
  orderBuilt = false;
  render();
}

function renderRouteSwitcher() {
  const store = stores[activeStoreIndex];
  if (!routeStoreSelect) return;
  routeStoreSelect.innerHTML = stores
    .map((routeStore, index) => `<option value="${index}">${routeStore.stop}. ${routeStore.eta} - ${routeStore.name}</option>`)
    .join("");
  routeStoreSelect.value = String(activeStoreIndex);
  routeStoreRisk.textContent = `${store.risk} risk / ${store.account}`;
  routeStoreTime.textContent = store.visitType;
}

function renderRoute() {
  routeCount.textContent = `${stores.length} stops`;
  storeList.innerHTML = stores
    .map(
      (store, index) => `
        <button class="store-card ${index === activeStoreIndex ? "active" : ""}" data-store="${index}">
          <span class="risk-dot ${riskClass(store.risk)}"></span>
          <span>
            <strong>${store.stop}. ${store.eta} / ${store.name}</strong>
            <small>${store.account} / ${store.visitType} / ${store.riskScore} risk / ${store.timeSaved} saved</small>
            <em>${store.dataMode} / ${store.confidence}</em>
            <em>${store.routeNote}</em>
          </span>
        </button>
      `
    )
    .join("");

  storeList.querySelectorAll("[data-store]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveStore(Number(button.dataset.store));
    });
  });
}

function renderBrief(store) {
  const recommendation = smartOrder(store);
  const comparison = recommendation.aboveNormal > 0
    ? `<strong>${recommendation.aboveNormal} cases above normal</strong>`
    : recommendation.aboveNormal < 0
      ? `<strong>${Math.abs(recommendation.aboveNormal)} cases below normal</strong>`
      : `<strong>Normal order level</strong>`;
  const driverMarkup = recommendation.drivers.length
    ? recommendation.drivers
        .map((driver) => `<div><span>${driver.family}</span><b>+${driver.delta}</b></div>`)
        .join("")
    : `<div><span>Core order</span><b>Normal</b></div>`;
  storeMeta.textContent = `Stop ${store.stop} / ${store.eta} / ${store.account}`;
  storeName.textContent = store.name;
  riskPill.textContent = store.risk;
  riskPill.className = `risk-pill ${riskClass(store.risk)}`;
  nextDelivery.textContent = store.nextDelivery;
  forecast.textContent = store.forecast;
  caseTotal.textContent = `${orderTotal(store)} cases`;
  smartOrderSummary.innerHTML = `
    <div class="smart-order-total">
      <span>Suggested order</span>
      <strong>${recommendation.suggestedTotal} cases</strong>
      ${comparison}
    </div>
    <div class="smart-order-drivers">${driverMarkup}</div>
    <p>${recommendation.explanation}</p>
  `;
}

function renderOrder(store) {
  let currentGroup = "";
  const isScanView = activeViewTarget === ".scanner-panel";
  const searchTerm = isScanView ? "" : (orderSearchInput?.value || "").trim().toLowerCase();
  const showDateChecks = activeViewTarget === ".order-panel" && !searchTerm && !activeScannedProductSku;
  const useScannedProductFilter = isScanView && activeScannedProductSku;
  const scannedProduct = useScannedProductFilter
    ? productCatalog.find((product) => product.sku === activeScannedProductSku)
    : null;
  if (isScanView && !activeScannedProductSku) {
    orderList.innerHTML = `<div class="empty-state">Scan one product to show its order line.</div>`;
    return;
  }
  const orderedItems = orderedItemsByLocation(store.order).filter(({ item }) => {
    return orderItemMatchesSearch(item, searchTerm) && orderItemMatchesScannedProduct(item, useScannedProductFilter ? activeScannedProductSku : "");
  });
  const scanFilterBanner = scannedProduct
    ? `<div class="scan-filter-banner"><span>Scanned item: ${scannedProduct.name}</span><button id="clearScanFilterButton">Clear</button></div>`
    : "";
  const scannedProductEmptyText = scannedProduct
    ? `${scannedProduct.salesChannel === "Single can reference" ? "Single can reference" : "Product reference"} - ${scannedProduct.name} is not mapped to this store order.`
    : "No order items match this search or scan.";
  const dateCheckMarkup = showDateChecks ? renderDateCheckMarkup(store) : "";
  orderList.innerHTML = scanFilterBanner + dateCheckMarkup + (orderedItems.length
    ? orderedItems
    .map(({ item, index }) => {
        const group = orderSection(item);
        const groupHeader =
          group === currentGroup
            ? ""
            : `<div class="location-header ${riskClass(group)}"><span>${group}</span><b>${
                group === "Cooler pop" ? "Single-serve packages only" : "Work this area before moving on"
              }</b></div>`;
        currentGroup = group;
        const suggestedPoint = suggestedReorderPoint(item);
        const repPoint = activeReorderPoint(store, item);
        const isCustomPoint = repPoint !== suggestedPoint;
        const replenishmentGap = autoOrderGap(store, item);
        const demandSignal = learnedDemandSignal(item);
        const needsPointPermission = hasRepReorderPoint(store, item) && demandSignal && repPoint < suggestedPoint;
        const qohLabel = store.confidence.startsWith("Low") ? "QOH est." : "QOH";
        const whStatus = warehouseStatus(item);
        const warehouseValue = warehouseQoh(item);
        return `
        ${groupHeader}
        <article class="order-item ${item.approved ? "approved" : ""} warehouse-${whStatus.level}">
          <div>
            <strong>${item.sku}</strong>
            <span>${item.location}</span>
          </div>
          <div class="quantity-stepper">
            <button data-adjust="-1" data-index="${index}" aria-label="Decrease ${item.sku}">-</button>
            <output>${finalCases(item)}</output>
            <button data-adjust="1" data-index="${index}" aria-label="Increase ${item.sku}">+</button>
          </div>
          <div class="edit-grid">
            <label>Order<input type="number" min="0" inputmode="numeric" data-edit-field="base" data-index="${index}" value="${item.base}"></label>
            <label>QOH<input type="number" min="0" inputmode="numeric" data-edit-field="qoh" data-index="${index}" value="${storeQoh(item)}"></label>
            <label>WH<input type="number" min="0" inputmode="numeric" data-edit-field="warehouseQoh" data-index="${index}" placeholder="Unknown" value="${warehouseValue === null ? "" : warehouseValue}"></label>
          </div>
          <div class="inventory-strip">
            <span><b>${qohLabel}</b>${storeQoh(item)}</span>
            <span><b>Warehouse</b>${warehouseText(item)}</span>
          </div>
          <div class="auto-order-note">
            <strong>Auto order</strong>
            <span>${storeQoh(item)} on hand / ${repPoint} point = ${replenishmentGap} case gap</span>
          </div>
          ${
            demandSignal
              ? `<div class="demand-learning-note"><strong>Software adjusted</strong><span>${demandSignal}</span></div>`
              : ""
          }
          ${
            needsPointPermission
              ? `<div class="point-permission-note">
                  <div>
                    <strong>Raise store order point?</strong>
                    <span>Rep point ${repPoint}; software recommends ${suggestedPoint} because this SKU keeps running out.</span>
                  </div>
                  <button data-accept-learned-point="${index}">Accept</button>
                </div>`
              : ""
          }
          ${
            whStatus.level === "ok"
              ? ""
              : `<div class="warehouse-warning ${whStatus.level}"><strong>${whStatus.label}</strong><span>${whStatus.message}</span></div>`
          }
          <div class="reorder-point">
            <span>Store order point</span>
            <div class="mini-stepper">
              <button data-rp-adjust="-1" data-index="${index}" aria-label="Lower reorder point for ${item.sku}">-</button>
              <input type="number" min="0" inputmode="numeric" data-rp-field data-index="${index}" value="${repPoint}" aria-label="Store-specific reorder point for ${item.sku}">
              <button data-rp-adjust="1" data-index="${index}" aria-label="Raise reorder point for ${item.sku}">+</button>
            </div>
            <em>${isCustomPoint ? "Rep set for this store" : `System set ${suggestedPoint}`}</em>
          </div>
          <button class="approve-chip" data-approve="${index}">${item.approved ? "Approved" : "Approve"}</button>
        </article>
      `;
      }
    )
    .join("")
    : `<div class="empty-state">${store.order.length ? scannedProductEmptyText : "No order items loaded."}</div>`);

  const clearScanFilterButton = document.querySelector("#clearScanFilterButton");
  if (clearScanFilterButton) {
    clearScanFilterButton.addEventListener("click", () => {
      activeScannedProductSku = "";
      renderOrder(store);
    });
  }

  orderList.querySelectorAll("[data-adjust]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = store.order[Number(button.dataset.index)];
      saveOrderItemOverride(store, item, { base: Math.max(0, item.base + Number(button.dataset.adjust)) });
      item.approved = false;
      orderBuilt = false;
      render();
    });
  });

  orderList.querySelectorAll("[data-edit-field]").forEach((input) => {
    input.addEventListener("change", () => {
      const item = store.order[Number(input.dataset.index)];
      const field = input.dataset.editField;
      const value = field === "warehouseQoh" && input.value.trim() === "" ? null : Math.max(0, Number(input.value) || 0);
      saveOrderItemOverride(store, item, { [field]: value });
      if (field === "qoh") {
        applyAutoOrderFromPoint(store, item);
      }
      item.approved = false;
      orderBuilt = false;
      render();
    });
  });

  orderList.querySelectorAll("[data-date-ok]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = store.order[Number(button.dataset.dateOk)];
      dateCheckStatuses[dateCheckKey(store, item)] = "ok";
      localStorage.setItem("dateCheckStatuses", JSON.stringify(dateCheckStatuses));
      render();
    });
  });

  orderList.querySelectorAll("[data-date-ood]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = store.order[Number(button.dataset.dateOod)];
      dateCheckStatuses[dateCheckKey(store, item)] = "ood";
      localStorage.setItem("dateCheckStatuses", JSON.stringify(dateCheckStatuses));
      store.returns = store.returns || [];
      store.returns.push({
        type: "OOD",
        item: item.sku,
        cases: Math.max(1, storeQoh(item)),
        note: `Date check triggered after ${item.noSalesDays} days with no recorded sales`
      });
      setActiveView(".returns-panel");
      render();
    });
  });

  orderList.querySelectorAll("[data-rp-adjust]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = store.order[Number(button.dataset.index)];
      saveReorderPointOverride(
        store,
        item,
        Math.max(0, activeReorderPoint(store, item) + Number(button.dataset.rpAdjust))
      );
      applyAutoOrderFromPoint(store, item);
      item.approved = false;
      orderBuilt = false;
      render();
    });
  });

  orderList.querySelectorAll("[data-rp-field]").forEach((input) => {
    input.addEventListener("change", () => {
      const item = store.order[Number(input.dataset.index)];
      const value = Math.max(0, Number(input.value) || 0);
      saveReorderPointOverride(store, item, value);
      applyAutoOrderFromPoint(store, item);
      item.approved = false;
      orderBuilt = false;
      render();
    });
  });

  orderList.querySelectorAll("[data-accept-learned-point]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = store.order[Number(button.dataset.acceptLearnedPoint)];
      saveReorderPointOverride(store, item, suggestedReorderPoint(item));
      applyAutoOrderFromPoint(store, item);
      item.approved = false;
      orderBuilt = false;
      render();
    });
  });

  orderList.querySelectorAll("[data-approve]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = store.order[Number(button.dataset.approve)];
      item.approved = !item.approved;
      orderBuilt = false;
      render();
    });
  });
}

function renderDateCheckMarkup(store) {
  const checks = dateCheckItems(store);
  if (!checks.length) return "";
  return `
    <div class="date-check-panel">
      <div class="date-check-head">
        <strong>DATE CHECKS - ${checks.length} ITEMS</strong>
        <span>QOH with no recorded sales</span>
      </div>
      ${checks
        .map((item) => {
          const index = store.order.indexOf(item);
          return `
            <article class="date-check-item">
              <div>
                <strong>${item.sku}</strong>
                <span>No recorded sales in ${item.noSalesDays} days / QOH ${storeQoh(item)}</span>
                <small>Possible replacement: ${replacementSuggestion(item)} - manager approval required</small>
              </div>
              <button class="secondary-button compact-button" data-date-ok="${index}">Dates OK</button>
              <button class="secondary-button compact-button warning-button" data-date-ood="${index}">OOD</button>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderStock(store) {
  const hasLiveOnHand = !store.confidence.startsWith("Low");
  const riskItems = store.order.filter((item) => item.onHand <= 10).length;
  stockSignal.textContent = hasLiveOnHand ? `${riskItems} risk SKUs` : "Rep check required";
  stockTable.innerHTML = store.order
    .map((item, index) => {
      const qoh = storeQoh(item);
      const daysLeft = qoh > 0 ? Math.max(0.5, qoh / Math.max(1, item.sold / 3)) : 0;
      const level = !hasLiveOnHand ? "Check" : qoh <= 7 ? "Low" : qoh <= 14 ? "Watch" : "OK";
      const onHandText = hasLiveOnHand ? `QOH ${qoh}` : `QOH est. ${qoh}`;
      const daysText = hasLiveOnHand ? `${level} / ${daysLeft.toFixed(1)}d` : "Verify";
      return `
        <div class="stock-row">
          <div>
            <strong>${item.sku}</strong>
            <span>${item.location}</span>
          </div>
          <span>${onHandText}</span>
          <span>WH ${warehouseText(item)}</span>
          <span>${item.sold} est. sold</span>
          <b class="${level.toLowerCase()}">${daysText}</b>
        </div>
      `;
    })
    .join("");
}

function renderChecks(store) {
  checkCount.textContent = `${store.checks.length} checks`;
  checkList.innerHTML = store.checks
    .map(
      (check) => `
        <label class="check-item">
          <input type="checkbox">
          <span>
            <strong>${check.zone}: ${check.item}</strong>
            <small>${check.reason}</small>
          </span>
          <em class="${riskClass(check.severity)}">${check.severity}</em>
        </label>
      `
    )
    .join("");
}

function renderDisplays(store) {
  if (!displayList || !displaySummary) return;
  const displays = displayPlans[store.id] || [];
  const promos = promoRecommendations[store.id] || [];
  const openDisplays = displays.filter((display) => !displayConfirmations[displayConfirmationKey(store, display)]);
  const urgentCount = openDisplays.filter((display) => display.priority === "High" || display.status === "Due today").length;
  displaySummary.textContent = promos.length || displays.length ? `${promos.length} promos / ${urgentCount}/${displays.length} displays` : "No changes";
  const promoMarkup = promos.length
    ? `
      <div class="promo-section-head">
        <strong>Promo order recommendations</strong>
        <span>Rep reviews before order</span>
      </div>
      ${promos.map((promo, index) => renderPromoRecommendation(store, promo, index)).join("")}
    `
    : "";
  const displayMarkup = displays.length
    ? `
      <div class="promo-section-head">
        <strong>Display build tasks</strong>
        <span>Physical build quantity is separate from promo demand</span>
      </div>
      ${displays
        .map((display, index) => {
          const confirmed = Boolean(displayConfirmations[displayConfirmationKey(store, display)]);
          return `
            <article class="display-item ${riskClass(display.priority)} ${confirmed ? "confirmed" : ""}">
              <div class="display-date">
                <strong>${display.window}</strong>
                <span>${confirmed ? "Confirmed" : display.status}</span>
              </div>
              <div>
                <h3>${display.action}</h3>
                <p>${display.area}</p>
                <small>${display.products}</small>
              </div>
              <b>${display.cases} cs</b>
              <button class="secondary-button compact-button" type="button" data-display-confirm="${index}">
                ${confirmed ? "Undo" : "Confirm"}
              </button>
            </article>
          `;
        })
        .join("")}
    `
    : "";
  displayList.innerHTML = promoMarkup + displayMarkup || `<div class="empty-state">No upcoming display changes or promotions for this stop.</div>`;

  displayList.querySelectorAll("[data-promo-order]").forEach((input) => {
    input.addEventListener("change", () => {
      const promo = promos[Number(input.dataset.promoOrder)];
      promoOrderOverrides[promoOverrideKey(store, promo)] = Math.max(0, Number(input.value) || 0);
      localStorage.setItem("promoOrderOverrides", JSON.stringify(promoOrderOverrides));
      renderDisplays(store);
    });
  });

  displayList.querySelectorAll("[data-display-confirm]").forEach((button) => {
    button.addEventListener("click", () => {
      const display = displays[Number(button.dataset.displayConfirm)];
      const key = displayConfirmationKey(store, display);
      if (displayConfirmations[key]) delete displayConfirmations[key];
      else displayConfirmations[key] = true;
      localStorage.setItem("displayConfirmations", JSON.stringify(displayConfirmations));
      renderDisplays(store);
    });
  });
}

function renderPromoRecommendation(store, promo, index) {
  const override = promoOrderOverrides[promoOverrideKey(store, promo)];
  const orderCases = override ?? promo.recommendedOrder;
  const isCustom = override !== undefined;
  return `
    <article class="promo-recommendation">
      <div>
        <p class="eyebrow">${promo.event}</p>
        <h3>${promo.sku}</h3>
        <small>${promo.reason}</small>
      </div>
      <div class="promo-metrics">
        <span><b>Normal</b>${promo.normalWeek} cs</span>
        <span><b>Similar promo</b>${promo.comparablePromoAvg} cs</span>
        <span><b>Current QOH</b>${promo.currentQoh}</span>
        <span><b>Forecast</b>${promo.promoForecast} cs</span>
      </div>
      <div class="promo-split">
        <label>
          Recommended order
          <input type="number" min="0" inputmode="numeric" data-promo-order="${index}" value="${orderCases}">
          <em>${isCustom ? "Rep adjusted" : "System suggestion"}</em>
        </label>
        <div>
          <strong>Display build</strong>
          <span>${promo.displayBuildCases} cs to build / ${promo.expectedDisplaySales} cs expected lift</span>
        </div>
      </div>
    </article>
  `;
}

function renderReturns(store) {
  const returns = store.returns || [];
  const totalCases = returns.reduce((sum, item) => sum + item.cases, 0);
  returnsSummary.textContent = `${totalCases} cases`;
  returnsList.innerHTML = returns.length
    ? returns
        .map(
          (item) => `
            <article class="return-item ${riskClass(item.type)}">
              <div>
                <strong>${item.item}</strong>
                <span>${item.note}</span>
              </div>
              <b>${item.cases} cs</b>
              <em>${item.type}</em>
            </article>
          `
        )
        .join("")
    : `<div class="empty-state">No returns logged for this stop.</div>`;
}

function productInitials(product) {
  return product.brand
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

const searchSynonyms = {
  "mt dew": "mountain dew",
  "mtn dew": "mountain dew",
  mtndew: "mountain dew",
  "mount dew": "mountain dew",
  dew: "mountain dew",
  g: "gatorade",
  gat: "gatorade",
  gatoraid: "gatorade",
  gatoradezero: "gatorade zero",
  zero: "zero sugar",
  diet: "diet",
  sf: "zero sugar",
  sugarfree: "zero sugar",
  "sugar free": "zero sugar",
  aqua: "aquafina",
  water: "aquafina",
  bubbly: "bubly",
  bubble: "bubly",
  life: "lifewtr",
  lifewater: "lifewtr",
  pureleaf: "pure leaf",
  frap: "frappuccino",
  cooler: "cooler single",
  singles: "single",
  single: "single",
  pop: "soda",
  soda: "soda",
  starbucks: "starbucks rtd",
  ood: "out of date",
  bottle: "bottle",
  bottles: "bottle",
  can: "can",
  cans: "can"
};

function findProduct(query) {
  return searchProducts(productCatalog, query)[0]?.product || null;
}

function searchProducts(products, query) {
  const fullTerm = normalizeSearchText(query);
  const scanTerm = latestScanToken(query);
  if (!fullTerm && !scanTerm) return [];

  const exactMatches = products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => productExactMatch(product, fullTerm, scanTerm))
    .map((result) => ({ ...result, score: 1000 }));
  if (exactMatches.length) return exactMatches;

  if (fullTerm.length < 3 && !packageTokens(fullTerm).length) return [];
  return products
    .map((product, index) => ({ product, index, score: productSearchScore(product, fullTerm) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
}

function productExactMatch(product, fullTerm, scanTerm) {
  const upcs = product.upcs || [];
  const sku = normalizeSearchText(product.sku);
  return (
    sku === fullTerm ||
    sku === scanTerm ||
    upcs.some((upc) => upc.toLowerCase() === fullTerm || upc.toLowerCase() === scanTerm)
  );
}

function latestScanToken(value = "") {
  return normalizeSearchText(
    value
      .trim()
      .split(/[\s,;]+/)
      .filter(Boolean)
      .pop() || ""
  );
}

function normalizeSearchText(value = "") {
  let normalized = value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\bmountain\s*dew\b/g, "mountain dew")
    .replace(/\bmtn\s*dew\b/g, "mountain dew")
    .replace(/\bmt\s*dew\b/g, "mountain dew")
    .replace(/(\d+)\s*[-/]?\s*pack\b/g, "$1pk")
    .replace(/(\d+)\s*[-/]?\s*pk\b/g, "$1pk")
    .replace(/(\d+)\s*[-/]?\s*(liter|liters|litre|litres|ltr|l)\b/g, "$1l")
    .replace(/(\d+)(\.\d+)?\s*[-/]?\s*(fl\s*)?oz\b/g, "$1$2oz")
    .replace(/16\s*9oz/g, "16.9oz")
    .replace(/18\s*5oz/g, "18.5oz")
    .replace(/13\s*7oz/g, "13.7oz")
    .replace(/15\s*2oz/g, "15.2oz")
    .replace(/[^a-z0-9.]+/g, " ")
    .trim();

  Object.entries(searchSynonyms).forEach(([from, to]) => {
    normalized = normalized.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, "g"), to);
  });

  return normalized.replace(/\s+/g, " ").trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function packageTokens(term) {
  return term.split(/\s+/).filter((token) => /^\d+(\.\d+)?(pk|oz|l)$/.test(token));
}

function productSearchScore(product, term) {
  const searchDoc = productSearchDocument(product);
  const haystack = searchDoc.allText;
  const brand = searchDoc.brand;
  const name = searchDoc.name;
  const packageText = searchDoc.packageText;
  const tokens = term.split(/\s+/).filter(Boolean);
  const packageTerms = packageTokens(term);
  const nonPackageTerms = tokens.filter((token) => !packageTerms.includes(token));
  if (packageTerms.length && !packageTerms.every((token) => packageText.includes(token))) return 0;
  if (packageTerms.length && nonPackageTerms.length && !nonPackageTerms.every((token) => tokenMatchesSearchDoc(token, searchDoc))) return 0;
  if (!packageTerms.length && tokens.length > 1 && !tokens.every((token) => tokenMatchesSearchDoc(token, searchDoc))) return 0;

  let score = 0;
  if (name === term) score += 160;
  if (name.includes(term)) score += 110;
  if (haystack.includes(term)) score += 80;
  if (brand === term) score += 60;
  if (brand.includes(term)) score += 35;
  if (tokens[0] && name.startsWith(tokens[0])) score += 30;
  if (tokens[0] && brand === tokens[0]) score += 30;

  tokens.forEach((token, index) => {
    if (name.split(/\s+/).includes(token)) score += 22;
    else if (name.includes(token)) score += 14;
    if (brand.split(/\s+/).includes(token)) score += 18;
    if (packageText.includes(token)) score += 16;
    if (searchDoc.category.includes(token)) score += 8;
    if (searchDoc.sku.includes(token)) score += 8;
    if (index === 0 && (brand.startsWith(token) || name.startsWith(token))) score += 8;
    if (!tokenMatchesSearchDoc(token, searchDoc) && fuzzyTokenMatch(token, searchDoc.tokens)) score += 5;
  });

  if (tokens.length > 1 && tokens.every((token) => tokenMatchesSearchDoc(token, searchDoc))) score += 50;
  return score;
}

function productSearchDocument(product) {
  const aliasText = productSearchAliases(product).join(" ");
  const sku = normalizeSearchText(product.sku);
  const brand = normalizeSearchText(product.brand);
  const name = normalizeSearchText(product.name);
  const category = normalizeSearchText(product.category);
  const packageText = normalizeSearchText(product.package);
  const salesChannel = normalizeSearchText(product.salesChannel);
  const allText = normalizeSearchText([sku, brand, name, category, packageText, salesChannel, aliasText].join(" "));
  return {
    allText,
    brand,
    category,
    name,
    packageText,
    salesChannel,
    sku,
    tokens: [...new Set(allText.split(/\s+/).filter(Boolean))]
  };
}

function productSearchAliases(product) {
  const aliases = [];
  const brand = normalizeSearchText(product.brand);
  const name = normalizeSearchText(product.name);
  const packageText = normalizeSearchText(product.package);
  const salesChannel = normalizeSearchText(product.salesChannel);
  if (brand.includes("mountain dew")) aliases.push("mtn dew", "mt dew", "dew");
  if (brand.includes("gatorade")) aliases.push("gat", "g");
  if (brand.includes("gatorlyte")) aliases.push("gatorade electrolyte");
  if (brand.includes("aquafina")) aliases.push("water bottled water");
  if (brand.includes("lifewtr")) aliases.push("life water premium water");
  if (brand.includes("bubly")) aliases.push("bubbly bubble sparkling");
  if (brand.includes("pure leaf")) aliases.push("pureleaf tea");
  if (brand.includes("starbucks")) aliases.push("frap frappuccino coffee");
  if (name.includes("zero")) aliases.push("zero sugar sugar free");
  if (name.includes("diet")) aliases.push("diet zero calorie");
  if (name.includes("variety")) aliases.push("variety pack assorted");
  if (salesChannel.includes("cooler single")) aliases.push("cooler door cold vault front cooler single serve impulse");
  if (salesChannel.includes("shelf multipack")) aliases.push("shelf aisle warm shelf multipack take home");
  if (salesChannel.includes("shelf bottle")) aliases.push("shelf aisle warm shelf bottle take home");
  packageTokens(packageText).forEach((token) => {
    aliases.push(token);
    if (token.endsWith("pk")) aliases.push(token.replace("pk", " pack"));
    if (token.endsWith("l")) aliases.push(token.replace("l", " liter"));
  });
  return aliases;
}

function tokenMatchesSearchDoc(token, searchDoc) {
  return searchDoc.tokens.includes(token) || searchDoc.allText.includes(token) || fuzzyTokenMatch(token, searchDoc.tokens);
}

function fuzzyTokenMatch(token, tokens) {
  if (token.length < 5) return false;
  return tokens.some(
    (candidate) => candidate.length >= 5 && Math.abs(candidate.length - token.length) <= 2 && editDistance(token, candidate) <= 2
  );
}

function editDistance(a, b) {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let beforePrevious = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const saved = previous[j];
      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        beforePrevious + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      beforePrevious = saved;
    }
  }
  return previous[b.length];
}

function normalizeSkuName(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function productMatchesStoreItem(product, storeItem) {
  const productName = normalizeSkuName(product.name);
  const storeSku = normalizeSkuName(storeItem.sku);
  const brand = normalizeSkuName(product.brand);
  const storePackageTokens = packageTokens(normalizeSearchText(storeItem.sku));
  const productPackageText = normalizeSearchText(product.package);
  const productText = normalizeSearchText([product.name, product.brand, product.package, product.category].filter(Boolean).join(" "));
  const storeText = normalizeSearchText(storeItem.sku);
  if (storePackageTokens.length && !storePackageTokens.every((token) => productPackageText.includes(token))) return false;
  if (storePackageTokens.length && !storePackageTokens.every((token) => productText.includes(token))) return false;
  const storeTokens = storeText.split(/\s+/).filter((token) => !storePackageTokens.includes(token));
  const importantTokens = storeTokens.filter((token) => token !== brand);
  if (importantTokens.length && !importantTokens.every((token) => productText.includes(token))) return false;
  return productName.includes(storeSku) || storeSku.includes(productName) || storeSku.includes(brand);
}

function productByStoreItem(storeItem) {
  return productCatalog.find((product) => productMatchesStoreItem(product, storeItem));
}

function storeAuthorizedCatalog(store) {
  const productMap = new Map();
  store.order.forEach((item) => {
    const product = productByStoreItem(item);
    if (product) productMap.set(product.sku, product);
  });
  (store.authorizedSkus || []).forEach((sku) => {
    const product = productCatalog.find((candidate) => candidate.sku === sku);
    if (product) productMap.set(product.sku, product);
  });
  (storeCatalogOverrides[store.id] || []).forEach((sku) => {
    const product = productCatalog.find((candidate) => candidate.sku === sku);
    if (product) productMap.set(product.sku, product);
  });
  return [...productMap.values()].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
}

function saveStoreCatalogOverride(store, skus) {
  storeCatalogOverrides[store.id] = [...new Set(skus)];
  localStorage.setItem("storeCatalogOverrides", JSON.stringify(storeCatalogOverrides));
}

function addProductToStoreCatalog(store, sku) {
  if (!sku) return;
  const current = storeCatalogOverrides[store.id] || [];
  saveStoreCatalogOverride(store, [...current, sku]);
}

function removeProductFromStoreCatalog(store, sku) {
  const currentOverride = storeCatalogOverrides[store.id] || [];
  if (currentOverride.includes(sku)) {
    saveStoreCatalogOverride(
      store,
      currentOverride.filter((itemSku) => itemSku !== sku)
    );
    return;
  }

  store.authorizedSkus = (store.authorizedSkus || []).filter((itemSku) => itemSku !== sku);
  store.order = store.order.filter((item) => productByStoreItem(item)?.sku !== sku);
}

function renderScanResult(product, query = "") {
  if (!scanResult) return;
  if (!product) {
    activeScannedProductSku = "";
    renderOrder(stores[activeStoreIndex]);
    scanResult.innerHTML = query
      ? `<div class="scan-empty"><strong>No product match</strong><span>Add this UPC to the master catalog before reps rely on it.</span></div>`
      : `<div class="scan-empty"><strong>Ready for Zebra scan</strong><span>Scan a UPC or enter a verified SKU to show the product reference image.</span></div>`;
    return;
  }

  activeScannedProductSku = product.sku;
  renderOrder(stores[activeStoreIndex]);

  const imageMarkup = product.imageUrl
    ? `<img src="${product.imageUrl}" alt="${product.name}" loading="eager" onerror="this.closest('.product-image').classList.add('image-missing'); this.remove();">`
    : `<div class="product-placeholder"><strong>${productInitials(product)}</strong><span>Image pending</span></div>`;

  const upcText = product.upcs && product.upcs.length ? product.upcs.join(", ") : "UPC pending";
  scanResult.innerHTML = `
    <article class="product-card">
      <div class="product-image">${imageMarkup}</div>
      <div class="product-detail">
        <p class="eyebrow">${product.category}</p>
        <h3>${product.name}</h3>
        <span>${product.package}</span>
        <strong class="scan-active-note">Order view switched to this scanned product</strong>
        <dl>
          <div><dt>SKU</dt><dd>${product.sku}</dd></div>
          <div><dt>UPC</dt><dd>${upcText}</dd></div>
          <div><dt>Pack</dt><dd>${product.salesChannel || "Standard"}</dd></div>
          <div><dt>Owner</dt><dd>${product.ownership}</dd></div>
          <div><dt>Data</dt><dd>${product.dataStatus}</dd></div>
          <div><dt>Image</dt><dd>${product.imageStatus}</dd></div>
        </dl>
      </div>
    </article>
  `;
}

function setCameraStatus(message) {
  if (cameraScanStatus) cameraScanStatus.textContent = message;
}

function setCameraActive(isActive) {
  cameraScanButton?.classList.toggle("hidden", isActive);
  captureFrameButton?.classList.add("hidden");
  stopCameraButton?.classList.toggle("hidden", !isActive);
  cameraPreview?.classList.toggle("hidden", !isActive);
  cameraPreview?.classList.toggle("auto-scanning", isActive);
}

function cameraDiagnostics() {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const isLocalSecureOrigin = ["localhost", "127.0.0.1", "::1"].includes(hostname);
  const secureContextState = typeof window.isSecureContext === "boolean" ? String(window.isSecureContext) : "unknown";
  return {
    isSecureContext: window.isSecureContext === true || protocol === "https:" || protocol === "file:" || isLocalSecureOrigin,
    secureContextState,
    hasMediaDevices: Boolean(window.navigator?.mediaDevices),
    hasGetUserMedia: typeof window.navigator?.mediaDevices?.getUserMedia === "function",
    protocol,
    host: window.location.host
  };
}

function cameraDiagnosticsText(diag) {
  return `Secure=${diag.isSecureContext ? "yes" : "no"} / window.isSecureContext=${diag.secureContextState} / mediaDevices=${diag.hasMediaDevices ? "yes" : "no"} / getUserMedia=${diag.hasGetUserMedia ? "yes" : "no"} / ${diag.protocol}//${diag.host}`;
}

function cameraUnavailableReason(diag) {
  if (!diag.isSecureContext) {
    return `Camera blocked: open the HTTPS GitHub Pages link, not the LAN HTTP address. ${cameraDiagnosticsText(diag)}`;
  }
  if (!diag.hasMediaDevices) {
    return `Camera unavailable: navigator.mediaDevices is missing. ${cameraDiagnosticsText(diag)}`;
  }
  if (!diag.hasGetUserMedia) {
    return `Camera unavailable: getUserMedia is missing. ${cameraDiagnosticsText(diag)}`;
  }
  return "";
}

function barcodeCheckDigitIsValid(digits) {
  if (!/^\d+$/.test(digits) || digits.length < 2) return false;
  const checkDigit = Number(digits.at(-1));
  const body = digits.slice(0, -1);
  const sum = body
    .split("")
    .reverse()
    .reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === checkDigit;
}

function normalizeDecodedBarcode(rawValue = "", format = "") {
  const text = String(rawValue || "").trim();
  const digits = text.replace(/\D/g, "");
  const detectedFormat = String(format || "").toLowerCase();
  if (digits.length === 13 && digits.startsWith("0") && barcodeCheckDigitIsValid(digits)) {
    return digits.slice(1);
  }
  if (detectedFormat === "upc_a" && digits.length === 12 && barcodeCheckDigitIsValid(digits)) return digits;
  if (detectedFormat === "ean_13" && digits.length === 13 && barcodeCheckDigitIsValid(digits)) return digits;
  if (detectedFormat === "upc_e" && digits.length === 8) return digits;
  if (detectedFormat === "ean_8" && digits.length === 8 && barcodeCheckDigitIsValid(digits)) return digits;
  if ([8, 12, 13].includes(digits.length) && barcodeCheckDigitIsValid(digits)) return digits;
  return text;
}

function logScannerDebug(details) {
  console.info(`[PepsiCo scanner] ${JSON.stringify(details)}`);
}

function handleBarcode(rawValue, source = "manual") {
  const code = normalizeDecodedBarcode(rawValue);
  if (!scanInput) return false;
  if (!code) {
    renderScanResult(null);
    return false;
  }
  scanInput.value = code;
  renderScanResult(findProduct(code), code);
  if (source !== "manual" && navigator.vibrate) navigator.vibrate(60);
  return true;
}

function applyScannedCode(rawValue) {
  return handleBarcode(rawValue, "camera");
}

function handleDecodedBarcode(rawValue, decoder = "unknown", format = "") {
  if (cameraDecodedValue) return false;
  const normalized = normalizeDecodedBarcode(rawValue, format);
  const normalizedFormat = String(format || "").toLowerCase();
  const rawDigits = String(rawValue || "").replace(/\D/g, "");
  const validationDigits = normalized.length === 12 ? normalized : rawDigits;
  const validLength = /^\d{8}$|^\d{12}$|^\d{13}$/.test(normalized);
  const validChecksum = normalizedFormat === "upc_e" ? normalized.length === 8 : barcodeCheckDigitIsValid(validationDigits);
  if (!validLength || !validChecksum) {
    setCameraStatus("Unsupported barcode format");
    logScannerDebug({
      decoder,
      detectedFormat: format || null,
      rawDecodedValue: rawValue,
      normalizedUpc: normalized,
      handleBarcodeResult: false,
      product: null
    });
    return false;
  }
  const product = findProduct(normalized);
  const handled = handleBarcode(normalized, "camera");
  cameraDecodedValue = normalized;
  logScannerDebug({
    decoder,
    detectedFormat: format || null,
    rawDecodedValue: rawValue,
    normalizedUpc: normalized,
    handleBarcodeResult: handled,
    product: product?.name || null
  });
  setCameraStatus(product ? `Decoded: ${normalized}. Product found: ${product.name}` : `Decoded: ${normalized}. Barcode not found in catalog.`);
  stopCameraScan(product ? `Decoded: ${normalized}. Product found: ${product.name}` : `Decoded: ${normalized}. Barcode not found in catalog.`);
  return handled;
}

function stopCameraScan(message = "") {
  if (cameraScanLoop) {
    cancelAnimationFrame(cameraScanLoop);
    cameraScanLoop = 0;
  }
  if (zxingControls) {
    if (typeof zxingControls.stop === "function") zxingControls.stop();
    if (typeof zxingControls.reset === "function") zxingControls.reset();
    zxingControls = null;
  }

  if (zxingReader && typeof zxingReader.reset === "function") {
    zxingReader.reset();
  }

  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }

  if (cameraVideo) {
    if (typeof cameraVideo.pause === "function") cameraVideo.pause();
    cameraVideo.srcObject = null;
  }

  cameraDetector = null;
  cameraEngine = "";
  setCameraActive(false);
  if (message) setCameraStatus(message);
}

function scannerRequiresSecureContext() {
  return !cameraDiagnostics().isSecureContext;
}

function targetBarcodeFormats() {
  return ["upc_a", "upc_e", "ean_13", "ean_8"];
}

function barcodeFormats(DetectorClass = window.BarcodeDetector) {
  const commonFormats = ["upc_a", "upc_e", "ean_13", "ean_8"];
  if (!DetectorClass?.getSupportedFormats) return Promise.resolve(commonFormats);
  return DetectorClass.getSupportedFormats()
    .then((formats) => commonFormats.filter((format) => formats.includes(format)))
    .catch(() => []);
}

function loadZbarBarcodeDetector() {
  if (zbarLoadPromise) return zbarLoadPromise;
  zbarLoadPromise = import("https://cdn.jsdelivr.net/npm/@undecaf/barcode-detector-polyfill@0.9.23/dist/main.js")
    .then((module) => module.BarcodeDetectorPolyfill);
  return zbarLoadPromise;
}

async function startZbarWasmScan() {
  if (!window.navigator?.mediaDevices?.getUserMedia) throw new Error("Camera access is not available.");

  const DetectorClass = await loadZbarBarcodeDetector();
  if (!DetectorClass) throw new Error("ZBar WASM decoder unavailable.");
  const formats = await barcodeFormats(DetectorClass);
  logScannerDebug({ decoder: "ZBar WASM", supportedBarcodeFormats: formats });
  if (!formats.length) throw new Error("Unsupported barcode format.");

  cameraEngine = "ZBar WASM";
  cameraDetector = new DetectorClass({ formats });
  cameraStream = await window.navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: "environment" },
      width: { ideal: 1280 },
      height: { ideal: 720 },
      focusMode: { ideal: "continuous" }
    },
    audio: false
  });

  cameraVideo.srcObject = cameraStream;
  cameraVideo.setAttribute("autoplay", "true");
  cameraVideo.setAttribute("muted", "true");
  cameraVideo.setAttribute("playsinline", "true");
  await cameraVideo.play();
  setCameraStatus("Decoder: ZBar WASM. Camera ready. Center barcode in box.");

  const scanFrame = async () => {
    if (cameraDecodedValue || !cameraDetector || !cameraVideo?.srcObject) return;
    try {
      const matches = await cameraDetector.detect(cameraVideo);
      const supportedMatch = matches?.find((match) => formats.includes(match.format));
      if (supportedMatch?.rawValue) {
        handleDecodedBarcode(supportedMatch.rawValue, "ZBar WASM", supportedMatch.format);
        return;
      }
      setCameraStatus("Decoder: ZBar WASM. Scanning barcode...");
    } catch (error) {
      setCameraStatus("Barcode not detected");
      logScannerDebug({ decoder: "ZBar WASM", error: error?.message || String(error) });
      return;
    }
    cameraScanLoop = requestAnimationFrame(scanFrame);
  };

  cameraScanLoop = requestAnimationFrame(scanFrame);
}

function loadZxingBrowser() {
  if (zxingLoadPromise) return zxingLoadPromise;
  zxingLoadPromise = import("https://cdn.jsdelivr.net/npm/@zxing/browser@0.2.1/+esm").then((module) => {
    zxingModule = module;
    return module;
  });
  return zxingLoadPromise;
}

function decodedTextFromResult(result) {
  return result?.getText ? result.getText() : result?.text || "";
}

async function startZxingScan() {
  if (!window.navigator?.mediaDevices?.getUserMedia) throw new Error("Camera access is not available.");
  const zxing = await loadZxingBrowser();
  const Reader = zxing?.BrowserMultiFormatOneDReader || zxing?.BrowserMultiFormatReader;
  if (!Reader) throw new Error("ZXing browser scanner did not load.");
  cameraEngine = "ZXing";
  zxingReader = new Reader(undefined, {
    delayBetweenScanAttempts: 75,
    delayBetweenScanSuccess: 250,
    tryPlayVideoTimeout: 8000
  });
  logScannerDebug({
    decoder: "ZXing",
    supportedBarcodeFormats: ["UPC_A", "UPC_E", "EAN_13", "EAN_8"]
  });

  setCameraStatus("Decoder: ZXing. Camera ready. Center barcode in box.");
  zxingControls = await zxingReader.decodeFromVideoDevice(undefined, cameraVideo, (result, error) => {
    if (cameraDecodedValue) return;
    const rawValue = decodedTextFromResult(result);
    if (rawValue) {
      const format = result?.getBarcodeFormat ? String(result.getBarcodeFormat()).toLowerCase() : "";
      handleDecodedBarcode(rawValue, "ZXing", format);
      return;
    }
    if (error) {
      setCameraStatus("Decoder: ZXing. Scanning barcode...");
    }
  });
}

async function startCameraScan() {
  if (!cameraScanButton || !cameraVideo) return;
  const diag = cameraDiagnostics();
  const unavailable = cameraUnavailableReason(diag);
  if (unavailable) {
    setCameraStatus(unavailable);
    return;
  }

  stopCameraScan();
  cameraDecodedValue = "";
  setCameraActive(true);
  setCameraStatus(`Camera starting. ${cameraDiagnosticsText(diag)}`);

  try {
    await startZbarWasmScan();
  } catch (zbarError) {
    try {
      stopCameraScan();
      cameraDecodedValue = "";
      setCameraActive(true);
      setCameraStatus("ZBar WASM unavailable. Loading ZXing fallback...");
      logScannerDebug({ decoder: "ZBar WASM", failure: zbarError?.message || String(zbarError) });
      await startZxingScan();
    } catch (zxingError) {
      logScannerDebug({ decoder: "ZXing", failure: zxingError?.message || String(zxingError) });
      stopCameraScan("Decoder unavailable. Type the UPC or use Zebra/DataWedge input.");
    }
  }
}

function renderCatalog() {
  if (catalogCount) catalogCount.textContent = `${productCatalog.length} SKUs`;
  renderScanResult(null);
}

function renderStoreCatalog(store) {
  if (!storeCatalogList || !storeCatalogCount) return;
  const products = storeAuthorizedCatalog(store);
  const searchTerm = (catalogSearchInput?.value || "").trim();
  const authorizedSkus = new Set(products.map((product) => product.sku));
  const visibleProducts = searchTerm
    ? searchProducts(productCatalog, searchTerm).map((result) => result.product)
    : products;
  storeCatalogCount.textContent = searchTerm
    ? `${visibleProducts.length} matches / ${products.length} authorized`
    : `${products.length} items`;
  if (catalogAddSelect) {
    const availableProducts = productCatalog.filter((product) => !authorizedSkus.has(product.sku));
    catalogAddSelect.innerHTML = availableProducts.length
      ? availableProducts
          .map((product) => `<option value="${product.sku}">${product.brand} - ${product.name}</option>`)
          .join("")
      : `<option value="">All products already authorized</option>`;
    catalogAddSelect.disabled = availableProducts.length === 0;
  }
  storeCatalogList.innerHTML = visibleProducts.length
    ? visibleProducts
        .map(
          (product) => {
            const isAuthorized = authorizedSkus.has(product.sku);
            return `
            <button class="catalog-item" data-catalog-sku="${product.sku}">
              <span>
                <strong>${product.name}</strong>
                <small>${product.category} / ${product.package} / ${product.salesChannel || "Standard"}</small>
              </span>
              <b>${isAuthorized ? "In store" : "Available"}</b>
              <i ${
                isAuthorized
                  ? `data-remove-catalog-sku="${product.sku}" aria-label="Remove ${product.name} from this store">Remove`
                  : `data-add-catalog-sku="${product.sku}" aria-label="Add ${product.name} to this store">Add`
              }</i>
            </button>
          `;
          }
        )
        .join("")
    : `<div class="empty-state">${products.length ? "No products match this search." : "No authorized catalog loaded for this store."}</div>`;

  storeCatalogList.querySelectorAll("[data-catalog-sku]").forEach((button) => {
    button.addEventListener("click", () => {
      handleBarcode(button.dataset.catalogSku, "catalog");
    });
  });

  storeCatalogList.querySelectorAll("[data-remove-catalog-sku]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      removeProductFromStoreCatalog(store, button.dataset.removeCatalogSku);
      orderBuilt = false;
      render();
    });
  });

  storeCatalogList.querySelectorAll("[data-add-catalog-sku]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addProductToStoreCatalog(store, button.dataset.addCatalogSku);
      orderBuilt = false;
      render();
    });
  });
}

function renderWeather(store) {
  weatherLabel.textContent = store.weatherWindow || "Next 3 days";
  weatherDays.innerHTML = store.weather
    .map(
      (day) => `
        <div>
          <strong>${day.day}</strong>
          <span>${day.temp}F</span>
          <small>${day.condition}</small>
        </div>
      `
    )
    .join("");

  liftBars.innerHTML = store.lifts
    .map(
      (lift) => `
        <div class="lift-row">
          <span>${lift.category}</span>
          <div><i style="width:${Math.min(100, lift.lift * 4)}%"></i></div>
          <b>+${lift.lift}%</b>
        </div>
      `
    )
    .join("");
}

function renderReview(store) {
  const totalQoh = store.order.reduce((sum, item) => sum + storeQoh(item), 0);
  const totalOrderPoints = store.order.reduce((sum, item) => sum + activeReorderPoint(store, item), 0);
  const autoOrder = orderTotal(store);
  const learnedItems = store.order.filter((item) => learnedDemandLift(item) > 0).length;
  const approved = store.order.filter((item) => item.approved).length;
  approvalStatus.textContent = orderBuilt ? "Submitted" : `${approved}/${store.order.length} approved`;
  reviewMath.innerHTML = `
    <div><span>Account</span><strong>${store.account}</strong></div>
    <div><span>Workflow</span><strong>QOH to store order point</strong></div>
    <div><span>Data confidence</span><strong>${store.confidence}</strong></div>
    <div><span>Current QOH</span><strong>${totalQoh} cases</strong></div>
    <div><span>Store order points</span><strong>${totalOrderPoints} cases</strong></div>
    <div><span>Learned lifts</span><strong>${learnedItems} SKUs</strong></div>
    <div class="review-total"><span>Auto-built order</span><strong>${autoOrder} cases</strong></div>
  `;
}

function render() {
  const store = stores[activeStoreIndex];
  renderRouteSummary();
  renderRouteSwitcher();
  renderRoute();
  renderBrief(store);
  renderOrder(store);
  renderStock(store);
  renderChecks(store);
  renderDisplays(store);
  renderReturns(store);
  renderStoreCatalog(store);
  renderWeather(store);
  renderReview(store);
}

function setActiveView(target) {
  if (target !== ".scanner-panel") stopCameraScan();
  activeViewTarget = target;
  document.body.dataset.activeView = viewMap[target] || "route-view";
  const activeView = viewMap[target] || "route-view";
  document.querySelectorAll(".app-view").forEach((section) => {
    section.classList.toggle("view-visible", section.classList.contains(activeView));
  });
  renderOrder(stores[activeStoreIndex]);
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

loadOrderItemOverrides();
syncInitialAutoOrdersFromPoints();
setZebraDemoMode(new URLSearchParams(window.location.search).get("zebra") === "1", false);
renderCatalog();

document.querySelector("#approveAllButton").addEventListener("click", () => {
  stores[activeStoreIndex].order.forEach((item) => {
    item.approved = true;
  });
  orderBuilt = false;
  render();
});

if (orderSearchInput) {
  orderSearchInput.addEventListener("input", () => {
    renderOrder(stores[activeStoreIndex]);
  });
}

document.querySelector("#editButton").addEventListener("click", () => {
  document.querySelector(".order-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#sendButton").addEventListener("click", () => {
  stores[activeStoreIndex].order.forEach((item) => {
    item.approved = true;
  });
  orderBuilt = true;
  render();
});

document.querySelectorAll("[data-return-type]").forEach((button) => {
  button.addEventListener("click", () => {
    const store = stores[activeStoreIndex];
    store.returns = store.returns || [];
    store.returns.push({
      type: button.dataset.returnType,
      item: "New scanned item",
      cases: 1,
      note: "Tap item after Zebra scan to edit"
    });
    orderBuilt = false;
    render();
  });
});

if (scanInput) {
  scanInput.addEventListener("input", () => {
    handleBarcode(scanInput.value, "manual");
  });
  scanInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleBarcode(scanInput.value, "manual");
    }
  });
}

if (cameraScanButton) {
  cameraScanButton.addEventListener("click", startCameraScan);
}

if (stopCameraButton) {
  stopCameraButton.addEventListener("click", () => {
    stopCameraScan("Camera stopped. Type or scan another UPC when ready.");
  });
}

document.querySelectorAll("[data-demo-scan]").forEach((button) => {
  button.addEventListener("click", () => {
    handleBarcode(button.dataset.demoScan, "demo");
  });
});

if (addCatalogProductButton && catalogAddSelect) {
  addCatalogProductButton.addEventListener("click", () => {
    addProductToStoreCatalog(stores[activeStoreIndex], catalogAddSelect.value);
    orderBuilt = false;
    render();
  });
}

if (catalogSearchInput) {
  catalogSearchInput.addEventListener("input", () => {
    renderStoreCatalog(stores[activeStoreIndex]);
  });
}

if (demoModeButton) {
  demoModeButton.addEventListener("click", () => {
    setZebraDemoMode(!document.body.classList.contains("zebra-demo"));
  });
}

if (reviewSuggestedOrderButton) {
  reviewSuggestedOrderButton.addEventListener("click", () => {
    if (orderSearchInput) orderSearchInput.value = "";
    activeScannedProductSku = "";
    orderBuilt = false;
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelector('.nav-item[data-target=".order-panel"]')?.classList.add("active");
    setActiveView(".order-panel");
  });
}

document.querySelector("#resetButton").addEventListener("click", () => {
  stores.forEach((store) => {
    store.order.forEach((item) => {
      item.approved = false;
    });
  });
  setActiveStore(0);
});

if (routeStoreSelect) {
  routeStoreSelect.addEventListener("change", () => {
    setActiveStore(Number(routeStoreSelect.value));
  });
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    setActiveView(button.dataset.target);
  });
});

render();
setActiveView(".order-panel");
