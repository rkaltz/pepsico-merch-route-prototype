const route = [
  {
    name: "Checkout coolers / X|32",
    minutes: 20,
    type: "Register cooler",
    aisle: "X|32",
    section: "Checkout queue",
    priority: "High",
    verified: false,
    x: 52,
    y: 13,
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
    name: "B|4 soda section 2",
    minutes: 18,
    type: "Main aisle",
    aisle: "B|4",
    section: "2",
    priority: "High",
    verified: true,
    x: 28,
    y: 48,
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
    x: 45,
    y: 55,
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
    x: 70,
    y: 62,
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
    x: 83,
    y: 42,
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
    x: 53,
    y: 87,
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
