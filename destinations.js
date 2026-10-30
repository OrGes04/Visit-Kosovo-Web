const categoryBox = document.querySelectorAll(".category-box");
const categoryPopup = document.querySelector(".category-pop-up");
const closeBtn = document.querySelector("#closeBtn");
const popupContent = document.querySelector("#popupContent");
const mainDestination = document.querySelector("#mainDestination");
const select = document.querySelector("#select");
const locationDtn = document.querySelector("#locationDtn");
const mustSeeContent = document.querySelector(".mustsee-content");
const pageNr = document.querySelector("#pageNr");
const TopBtn = document.querySelector("#backToTop");

let currentDestIndex = 0;

categoryBox.forEach((box) => {
  box.addEventListener("click", () => {
    categoryPopup.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  categoryPopup.style.display = "none";
});

function loadCategoryCard(c) {
  renderPopupCards(categoryDest[c].content);
}

function renderPopupCards(card) {
  popupContent.innerHTML = "";
  for (let i = 0; i < card.length; i++) {
    popupContent.innerHTML += `
            <div class="card-content">
                    <div class="card-details">
                        <div class="details-right">
                            <span title="Save" class="material-icons save-icon">favorite</span><span title="Show map" class="material-icons map-icon">map</span>
                        </div>
                        <div class="map-container">
                        ${card[i].map}
                            <a target="_blank" href="${card[i].link}"><button>View map</button></a>
                        </div>
                    </div>
                    <div class="card-ft">
                        <img src="img/${card[i].img}" alt="">
                    </div>
                    <div class="card-info">
                        <div>
                            <div class="card-title">
                                <h1>${card[i].title}</h1>
                                <div class="card-rating">
                                    <span class="material-icons">star</span>
                                    <p>${card[i].rate}</p>
                                </div>
                            </div>
                            <div class="card-location">
                                <span class="material-icons">location_on</span>
                                <p>${card[i].location}</p>
                            </div>
                        </div>
                        <div class="card-buttons">
                            <button class="price-btn">${card[i].price}</button class="main-btn">
                            <button class="second-btn">More details <span class="material-icons">chevron_right</span></button>
                        </div>
                    </div>
            </div>
        `;
  }
}

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector(".searchButton");

function searchDestinations() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  const everyPlace = [
    ...categoryDest.flatMap((group) => group.content),
    ...allDestinations.flatMap((group) => group.content),
    ...cityDtn.flatMap((group) => group.content),
  ];
  const results = everyPlace.filter(
    (place, index) =>
      everyPlace.findIndex((p) => p.title === place.title) === index &&
      (place.title.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query)),
  );

  renderPopupCards(results);
  if (!results.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = `No destinations found for "${searchInput.value.trim()}".`;
    popupContent.appendChild(empty);
  }
  categoryPopup.style.display = "block";
}

searchButton.addEventListener("click", searchDestinations);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchDestinations();
});
////////////////////////

showAllDestinations(0);
function showAllDestinations(all) {
  let card = allDestinations[all].content;

  mainDestination.innerHTML = "";
  for (let i = 0; i < card.length; i++) {
    mainDestination.innerHTML += `
                <div class="card-content">
                    <div class="card-details">
                        <div class="details-right">
                            <span title="Save" class="material-icons save-icon">favorite</span><span title="Show map" class="material-icons map-icon">map</span>
                        </div>
                        <div class="map-container">
                        ${card[i].map}
                            <a target="_blank" href="${card[i].link}"><button>View map</button></a>
                        </div>
                    </div>
                    <div class="card-ft">
                        <img src="img/${card[i].img}" alt="">
                    </div>
                    <div class="card-info">
                        <div>
                            <div class="card-title">
                                <h1>${card[i].title}</h1>
                                <div class="card-rating">
                                    <span class="material-icons">star</span>
                                    <p>${card[i].rate}</p>
                                </div>
                            </div>
                            <div class="card-location">
                                <span class="material-icons">location_on</span>
                                <p>${card[i].location}</p>
                            </div>
                        </div>
                        <div class="card-buttons">
                            <button class="price-btn">${card[i].price}</button class="main-btn">
                            <button class="second-btn">More details <span class="material-icons">chevron_right</span></button>
                        </div>
                    </div>
            </div>
        `;
  }
}

function updateDestinationButtons() {
  if (currentDestIndex > 0) {
    testBtnLeft.classList.add("test-btn-active");
  } else {
    testBtnLeft.classList.remove("test-btn-active");
  }

  if (currentDestIndex >= allDestinations.length - 1) {
    testBtnRight.classList.remove("test-btn-active");
  } else {
    testBtnRight.classList.add("test-btn-active");
  }
}

testBtnLeft.addEventListener("click", () => {
  mainDestination.innerHTML = "";
  if (currentDestIndex > 0) {
    currentDestIndex--;
  }
  showAllDestinations(currentDestIndex);
  updateDestinationButtons();
});

testBtnRight.addEventListener("click", () => {
  mainDestination.innerHTML = "";
  if (currentDestIndex < allDestinations.length - 1) {
    currentDestIndex++;
  }
  showAllDestinations(currentDestIndex);
  updateDestinationButtons();
});
///////////////////

for (let i = 0; i < cityDtn.length; i++) {
  select.innerHTML += `
        <option value="${i}">${cityDtn[i].city}</option>
    `;
}

function loadLocationDtn(c) {
  let card = cityDtn[c].content;

  locationDtn.innerHTML = "";
  for (let i = 0; i < card.length; i++) {
    locationDtn.innerHTML += `
                <div class="card-content">
                    <div class="card-details">
                        <div class="details-right">
                            <span title="Save" class="material-icons save-icon">favorite</span><span title="Show map" class="material-icons map-icon">map</span>
                        </div>
                        <div class="map-container">
                        ${card[i].map}
                            <a target="_blank" href="${card[i].link}"><button>View map</button></a>
                        </div>
                    </div>
                    <div class="card-ft">
                        <img src="img/${card[i].img}" alt="">
                    </div>
                    <div class="card-info">
                        <div>
                            <div class="card-title">
                                <h1>${card[i].title}</h1>
                                <div class="card-rating">
                                    <span class="material-icons">star</span>
                                    <p>${card[i].rate}</p>
                                </div>
                            </div>
                            <div class="card-location">
                                <span class="material-icons">location_on</span>
                                <p>${card[i].location}</p>
                            </div>
                        </div>
                        <div class="card-buttons">
                            <button class="price-btn">${card[i].price}</button class="main-btn">
                            <button class="second-btn">More details <span class="material-icons">chevron_right</span></button>
                        </div>
                    </div>
            </div>
        `;
  }
}

loadLocationDtn(0);
select.addEventListener("change", function (event) {
  loadLocationDtn(event.target.value);
});
//////////////////

let currentPlaceIndex = 0;

loadPlaces(currentPlaceIndex);
function loadPlaces(index) {
  mustSeeContent.innerHTML = "";
  mustSeeContent.innerHTML += `
                  <div class="mustsee-image">
                    <img src="img/${placesData[index].img}" alt="">
                </div>
                <div class="page-num"><p><span id="pageNr">${
                  index + 1
                }</span> of ${placesData.length}</p></div>
                <div class="mustsee-info">
                    <div>
                        <h1>${placesData[index].title}</h1>
                        <p class="section-paragraph">${
                          placesData[index].desc
                        }</p>
                        <button class="main-btn">View More</button>
                    </div>
                    <div>
                        <div class="testimonial-buttons">
                            <button class="test-btn" id="previousPlaceBtn">
                                <span class="material-icons">chevron_left</span>
                            </button>
                            <button class="test-btn test-btn-active" id="nextPlaceBtn">
                                <span class="material-icons">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
  `;

  function updateButtons() {
    if (currentPlaceIndex > 0) {
      previousPlaceBtn.classList.add("test-btn-active");
    } else {
      previousPlaceBtn.classList.remove("test-btn-active");
    }

    if (currentPlaceIndex >= placesData.length - 1) {
      nextPlaceBtn.classList.remove("test-btn-active");
    } else {
      nextPlaceBtn.classList.add("test-btn-active");
    }
  }

  previousPlaceBtn.addEventListener("click", () => {
    mustSeeContent.innerHTML = "";
    if (currentPlaceIndex > 0) {
      currentPlaceIndex--;
    }

    loadPlaces(currentPlaceIndex);
    updateButtons();
  });

  nextPlaceBtn.addEventListener("click", () => {
    mustSeeContent.innerHTML = "";
    if (currentPlaceIndex < placesData.length - 1) {
      currentPlaceIndex++;
    }

    loadPlaces(currentPlaceIndex);
    updateButtons();
  });
}

TopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
