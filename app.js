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
      "Highest-profit singles first. Check all register doors before moving deeper into the store.",
    products: ["Pepsi singles", "Dew singles", "Aquafina", "Gatorade", "Energy"]
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
      "Work sale stacks, lobby displays, seasonal pallets, and any front endcap beverage features.",
    products: ["12 packs", "2 liters", "Gatorade", "Poppi check"]
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
      "Water, tea, coffee, and hydration sets. Confirm newer functional brands while passing.",
    products: ["Aquafina", "Propel", "Pure Leaf", "Starbucks RTD"]
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
      "Energy set. Sales rep verifies Celsius and Alani Nu placement store by store.",
    products: ["Celsius", "Alani Nu", "Rockstar"]
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
      "Primary soda and multipack work. Finish heavy cases before the store gets busy.",
    products: ["Pepsi family", "Mountain Dew", "Starry", "Mug", "Crush", "Gatorade packs"]
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
      "Finish near receiving. Stage overstock, handle cardboard, credits, and final backstock notes.",
    products: ["Overstock", "Credits", "Cardboard", "Pallet wrap"]
  }
];

let activeIndex = 0;
let mode = "pallet";
const completed = new Set();

const routeList = document.querySelector("#routeList");
const storeMap = document.querySelector("#storeMap");
const routePath = document.querySelector("#routePath");
const productChips = document.querySelector("#productChips");
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
        </li>
      `;
    })
    .join("");
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
