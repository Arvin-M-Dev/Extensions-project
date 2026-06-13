let $ = document;

// Elements
const toggleThemeBtn = $.querySelector(".header__toggle-theme");
let extensionsContainer = $.querySelector(".extensions__list");
const filterBtns = $.querySelectorAll(".filter__btn");

//  Icons
const sunIcon = `<svg id="sun-icon"><use xlink:href="#sun"></use></svg>`;
const moonIcon = `<svg id="moon-icon"><use xlink:href="#moon"></use></svg>`;

// Global State
let allExtensions = [];
let filteredExtensions = [];
let currentFilter;

// Theme Toggle Mode
toggleThemeBtn.addEventListener("click", (e) => {
  $.documentElement.classList.toggle("dark");
  if ($.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleThemeBtn.innerHTML = sunIcon;
  } else {
    localStorage.setItem("theme", "light");
    toggleThemeBtn.innerHTML = moonIcon;
  }
});

// ===================== Load Data =====================

async function loadExtensions() {
  try {
    const response = await fetch("/data.json");
     
    if(!response.ok){
      throw new Error("Fetch Error :(")
    }
    
    const data = await response.json();

    allExtensions = JSON.parse(localStorage.getItem("allExtensions")) || data

    filteredExtensions = allExtensions

    const savedFilter = localStorage.getItem("selectedFilter") || "all";

    applyFilter(savedFilter)
  } catch (err){
    console.warn(err);
  }
}

// render data to the page
function renderData(data) {
  extensionsContainer.innerHTML = "";
  if (!data.length) {
    extensionsContainer.insertAdjacentHTML('beforeend', 
      `<div class="empty-state" role="status" aria-live="polite">
          <div class="empty-state__icon-wrap">
            <div class="empty-state__icon-bg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <path
                  d="M20.5 11H19V7a2 2 0 0 0-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4a2 2 0 0 0-2 2v3.8h1.5a2.5 2.5 0 0 1 0 5H2V20a2 2 0 0 0 2 2h3.8v-1.5a2.5 2.5 0 0 1 5 0V22H17a2 2 0 0 0 2-2v-4h1.5a2.5 2.5 0 0 0 0-5Z" />
              </svg>
            </div>
          </div>

          <h2 class="empty-state__title">No extensions here</h2>
          <p class="empty-state__desc">
            There are no extensions matching this filter right now.
            Try switching to a different category.
          </p>

        </div>`
    )
    return;
  }
  let cardsHTML = "";
  data.forEach((item) => {
    cardsHTML += `<div class="extension-card">
          <div class="extension-card__info">
            <img src="${item.logo}" alt="${item.name}">
            <div class="extension-card__texts">
              <h2 class="extension-card__name">${item.name}</h2>
              <p class="extension-card__description">${item.description}</p>
            </div>
          </div>
          <div class="extension-card__actions">
            <button class="btn extension-card__remove" data-name="${item.name}">Remove</button>
            <label class="extension-card__toggle">
              <input type="checkbox" class="extension-card__checkbox" data-name="${item.name}" ${item.isActive ? "checked" : ""} aria-label="Switch-active/inactive">
              <span class="extension-card__slider extension-card__round"></span>
            </label>
          </div>
        </div>`;
  });

  extensionsContainer.innerHTML = cardsHTML;
}

// ===================== Filter ====================

function applyFilter(filterType) {
  currentFilter = filterType;
  localStorage.setItem("selectedFilter", filterType);

  if (filterType === "all") {
    filteredExtensions = allExtensions;
  } else if (filterType === "active") {
    filteredExtensions = allExtensions.filter((item) => item.isActive === true);
    
  } else if (filterType === "inactive") {
    filteredExtensions = allExtensions.filter((item) => item.isActive === false); 
  }
  
  updateActiveButton(filterType);

  renderData(filteredExtensions);
}

function updateActiveButton(filterType) {
  filterBtns.forEach((button) => {
    button.classList.remove("filter-btn--active");
    if (button.getAttribute("data-filter") === filterType) {
      button.classList.add("filter-btn--active");
    }
  });
}
// ===================== Event Listeners =====================
filterBtns.forEach((button) => {
  button.addEventListener("click", (item) => {
    applyFilter(item.target.dataset.filter);
  });
});

// ===================== Event Listeners =====================

// Handle Toggle and Remove Buttons
extensionsContainer.addEventListener("change", (e) => {
  if (e.target.classList.contains("extension-card__checkbox")) {
    toggleExtensionHandler(e);
    localStorage.setItem("allExtensions", JSON.stringify(allExtensions));
    renderData(filteredExtensions);
  }
});

extensionsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("extension-card__remove")) {
    removeExtensionHandler(e);
    localStorage.setItem("allExtensions", JSON.stringify(allExtensions));
    applyFilter(currentFilter)
  }
});

// ===================== Toggle =====================
function removeExtensionHandler(e) {
  const extensionName = e.target.dataset.name;

  allExtensions = allExtensions.filter(
    (item) => item.name !== extensionName
  );
  
}

function toggleExtensionHandler(e) {
  const extensionName = e.target.dataset.name;

  const extension = allExtensions.find(
    (item) => item.name === extensionName,
  );

  if (!extension) return
  extension.isActive = !extension.isActive; 
}

// ===================== Initialize =====================
window.addEventListener("DOMContentLoaded", () => {
  let getThemeMode = localStorage.getItem("theme");
  if (getThemeMode === "dark") {
    $.documentElement.classList.add("dark");
    toggleThemeBtn.innerHTML = sunIcon;
  } else {
    $.documentElement.classList.remove("dark");
    toggleThemeBtn.innerHTML = moonIcon;
  }
  loadExtensions();
});
