const route = [
  {
    name: "Front register coolers",
    minutes: 20,
    type: "Register cooler",
    aisle: "Front",
    section: "Front",
    priority: "High",
    verified: true,
    x: 48,
    y: 13,
    description:
      "Start here. Work the full checkout cooler line from one end to the other before leaving the front.",
    products: ["Pepsi singles", "Dew singles", "Aquafina", "Gatorade", "Energy"],
    sequence: [
      "Face and rotate each cooler door before opening new cases.",
      "Stock 20 oz Pepsi family and Mountain Dew first.",
      "Fill water and sports drink singles next.",
      "Fill energy, tea, coffee, and functional singles last.",
      "Core hit: leave this stop full before doing anything else."
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
    x: 21,
    y: 24,
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
    x: 18,
    y: 38,
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
    name: "Aisle 2 beverages",
    minutes: 15,
    type: "Main aisle",
    aisle: "2",
    section: "Middle",
    priority: "Medium",
    verified: true,
    x: 26,
    y: 48,
    description:
      "First aisle stop after the front. Work water, hydration, tea, and coffee before moving to energy.",
    products: ["Aquafina", "Propel", "Pure Leaf", "Starbucks RTD"],
    sequence: [
      "Stock bulk water first because it is the heaviest and clears cart space.",
      "Fill Propel and hydration multipacks next.",
      "Fill tea and coffee multipacks or shelf sets.",
      "Top off singles or small packs last.",
      "Core hit: only fill obvious holes unless this is a delivery visit."
    ]
  },
  {
    name: "Aisle 3 energy",
    minutes: 10,
    type: "Main aisle",
    aisle: "3",
    section: "Middle",
    priority: "Medium",
    verified: false,
    x: 48,
    y: 52,
    description:
      "Second aisle stop. Work the energy set, then continue toward the main soda aisle.",
    products: ["Celsius", "Alani Nu", "Rockstar"],
    sequence: [
      "Verify Celsius and Alani Nu location before opening cases.",
      "Stock fastest movers and sale flavors first.",
      "Fill Rockstar and other confirmed Pepsi-route energy slots.",
      "Face cans by brand block after stocking.",
      "Core hit: fill visible energy holes and record changed placements."
    ]
  },
  {
    name: "Aisle 5 main soda",
    minutes: 55,
    type: "Main aisle",
    aisle: "5",
    section: "Back",
    priority: "High",
    verified: true,
    x: 72,
    y: 62,
    description:
      "Main heavy-work stop. Clear bulky packs first, then finish 2 liters and smaller formats.",
    products: ["Pepsi family", "Mountain Dew", "Starry", "Mug", "Crush", "Gatorade packs"],
    sequence: [
      "Start with cubes, 24 packs, and floor-stack items to clear pallet bulk.",
      "Stock 12 packs and mini cans by brand block: Pepsi, Dew, then flavors.",
      "Stock 2 liters next, working bottom shelves before upper shelves.",
      "Fill 6 packs, 8 packs, and small-format items after the heavy cases.",
      "Core hit: focus Pepsi, Dew, ad items, Gatorade, and major visible holes."
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
    x: 53,
    y: 87,
    description:
      "End here near the back wall. Handle overstock, credits, cardboard, and notes without crossing the store again.",
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
      button.dataset.view === "map"
        ? ".map-panel"
        : button.dataset.view === "verify"
          ? ".current-stop"
          : ".status-strip";
    document.querySelector(target).scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

render();
