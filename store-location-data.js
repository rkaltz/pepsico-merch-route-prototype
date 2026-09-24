(function () {
  const stores = [
    {
      id: "meijer-57",
      name: "Meijer #57",
      banner: "Meijer",
      address: "3175 S Rochester Rd, Rochester Hills, MI",
      shortName: "Rochester Hills - Rochester Rd"
    }
  ];

  const locations = [
    {
      storeId: "meijer-57",
      sku: "PEP-PEPSI-12PK-12OZ",
      brand: "Pepsi",
      product: "Pepsi Original",
      package: "12 fl oz cans, 12 pack",
      upcs: ["012000809941"],
      aliases: ["1200080994", "pepsi original 12 pack", "pepsi 12pk", "pepsi 12 oz 12 pk"],
      zone: "B",
      aisle: "B|4",
      section: "4",
      position: "15",
      routeStop: "B|4 soda section 4",
      mapTarget: "shelf-map.html#section-4",
      evidence: "Known-good Meijer #57 product page: B|4 / Section 4 / ilcPrimary B-4-4-15.",
      source: "Meijer product page / browser-observed location data",
      verificationStatus: "verified",
      lastVerified: "2026-09-24",
      status: "verified"
    },
    {
      storeId: "meijer-57",
      sku: "PEP-PEPSI-20OZ",
      brand: "Pepsi",
      product: "Pepsi 20oz Bottle",
      package: "20 oz bottle",
      upcs: ["012000001291", "012000002946"],
      aliases: ["pepsi 20oz", "pepsi 20 oz", "pepsi single"],
      zone: "X",
      aisle: "X|32",
      section: "Checkout queue",
      position: "",
      routeStop: "Checkout coolers / X|32",
      mapTarget: "index.html#storeMap",
      evidence: "Working-map cooler target. Exact Store #57 cooler door still needs field verification.",
      source: "Working map",
      verificationStatus: "needs-field-verification",
      lastVerified: "",
      status: "needs-field-verification"
    },
    {
      storeId: "meijer-57",
      sku: "PEP-PEPSI-2L",
      brand: "Pepsi",
      product: "Pepsi Soda Cola",
      package: "2 L bottle",
      upcs: [],
      aliases: ["1200000230", "pepsi 2 liter", "pepsi 2l"],
      zone: "B",
      aisle: "B|4",
      section: "2",
      position: "",
      routeStop: "B|4 soda section 2",
      mapTarget: "shelf-map.html#section-2",
      evidence: "Rendered Meijer #57 product-location export placed this row in B|4 / Section 2.",
      source: "Meijer rendered product-location export",
      verificationStatus: "verified",
      lastVerified: "2026-09-24",
      status: "verified"
    },
    {
      storeId: "meijer-57",
      sku: "PEP-WILD-CHERRY-12PK-12OZ",
      brand: "Pepsi Wild Cherry",
      product: "Pepsi Wild Cherry",
      package: "12 fl oz cans, 12 pack",
      upcs: ["012000809996"],
      aliases: ["1200080999", "wild cherry pepsi 12pk", "pepsi wild cherry 12 pack"],
      zone: "B",
      aisle: "B|4",
      section: "4",
      position: "",
      routeStop: "B|4 soda section 4",
      mapTarget: "shelf-map.html#section-4",
      evidence: "Rendered Meijer #57 product-location export placed this row in B|4 / Section 4.",
      source: "Meijer rendered product-location export",
      verificationStatus: "verified",
      lastVerified: "2026-09-24",
      status: "verified"
    },
    {
      storeId: "meijer-57",
      sku: "PEP-DIET-PEPSI-12PK-12OZ",
      brand: "Diet Pepsi",
      product: "Diet Pepsi",
      package: "12 fl oz cans, 12 pack",
      upcs: ["012000809958"],
      aliases: ["1200017186", "diet pepsi 12pk", "diet pepsi 12 pack"],
      zone: "B",
      aisle: "B|4",
      section: "8",
      position: "",
      routeStop: "B|4 soda sections 6-14",
      mapTarget: "shelf-map.html#section-8",
      evidence: "Rendered Meijer #57 product-location export placed this row in B|4 / Section 8.",
      source: "Meijer rendered product-location export",
      verificationStatus: "verified",
      lastVerified: "2026-09-24",
      status: "verified"
    },
    {
      storeId: "meijer-57",
      sku: "PEP-MTDEW-12PK-12OZ",
      brand: "Mountain Dew",
      product: "Mountain Dew",
      package: "12 fl oz cans, 12 pack",
      upcs: [],
      aliases: ["mountain dew 12pk", "mountain dew 12 pack", "dew 12pk"],
      zone: "",
      aisle: "",
      section: "",
      position: "",
      routeStop: "",
      mapTarget: "",
      evidence: "Product identity exists in the PepsiCo beverage catalog; Store #57 shelf location is not mapped yet.",
      source: "Product catalog seed",
      verificationStatus: "unknown",
      lastVerified: "",
      status: "location-not-mapped"
    }
  ];

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function normalizeLookupKey(value) {
    return String(value || "").trim().toLowerCase();
  }

  function scoreTextMatch(record, query) {
    const normalized = normalizeLookupKey(query);
    if (!normalized) return 0;
    const haystack = [
      record.brand,
      record.product,
      record.package,
      record.sku,
      ...(record.aliases || [])
    ]
      .join(" ")
      .toLowerCase();
    if (haystack.includes(normalized)) return normalized.length + 20;
    return normalized
      .split(/\s+/)
      .filter((part) => part.length > 1 && haystack.includes(part)).length;
  }

  function findStoreLocation(storeId, rawQuery) {
    const query = String(rawQuery || "").trim();
    const digits = digitsOnly(query);
    const storeLocations = locations.filter((location) => location.storeId === storeId);

    if (digits.length >= 8) {
      const exact = storeLocations.find((location) => {
        const keys = [...(location.upcs || []), ...(location.aliases || [])]
          .map(digitsOnly)
          .filter((key) => key.length >= 8);
        return keys.includes(digits);
      });
      if (exact) return exact;
    }

    const ranked = storeLocations
      .map((location) => ({ location, score: scoreTextMatch(location, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return ranked[0]?.location || null;
  }

  function locationLabel(location) {
    if (!location || location.status === "location-not-mapped" || !location.aisle) {
      return "LOCATION NOT MAPPED";
    }
    const section = location.section ? ` / Section ${location.section}` : "";
    const position = location.position ? ` / Position ${location.position}` : "";
    return `${location.aisle}${section}${position}`;
  }

  window.STORE_LOCATION_DATA = {
    stores,
    locations,
    defaultStoreId: "meijer-57",
    findStoreLocation,
    locationLabel
  };
})();
