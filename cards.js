(function () {
  const savedKey = "savedDestinations";

  function getSaved() {
    try {
      return JSON.parse(localStorage.getItem(savedKey)) || [];
    } catch {
      return [];
    }
  }

  function setSaved(list) {
    try {
      localStorage.setItem(savedKey, JSON.stringify(list));
    } catch {}
  }

  function cardTitle(card) {
    return card.querySelector(".card-title h1").textContent.trim();
  }

  function markSaved(root = document) {
    const saved = getSaved();
    root.querySelectorAll(".card-content").forEach((card) => {
      const icon = card.querySelector(".save-icon");
      if (icon) icon.classList.toggle("saved", saved.includes(cardTitle(card)));
    });
  }

  const modal = document.createElement("div");
  modal.className = "details-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "detailsTitle");
  modal.innerHTML = `
    <div class="details-content">
      <button class="details-close" aria-label="Close details">
        <span class="material-icons">close</span>
      </button>
      <div class="details-image"><img src="" alt="" /></div>
      <div class="details-info">
        <div class="details-top">
          <h1 id="detailsTitle"></h1>
          <div class="card-rating">
            <span class="material-icons">star</span>
            <p class="details-rate"></p>
          </div>
        </div>
        <div class="card-location">
          <span class="material-icons">location_on</span>
          <p class="details-location"></p>
        </div>
        <p class="details-desc"></p>
        <div class="details-map"></div>
        <div class="details-buttons">
          <button class="price-btn details-price"></button>
          <a class="details-link" target="_blank" rel="noopener">
            <button class="second-btn">Open in Google Maps <span class="material-icons">open_in_new</span></button>
          </a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  let lastButton = null;

  function openDetails(card, button) {
    const title = cardTitle(card);
    const place = typeof placesData !== "undefined" ? placesData.find((p) => p.title === title) : null;
    const img = card.querySelector(".card-ft img");
    const map = card.querySelector(".map-container iframe");

    modal.querySelector(".details-image img").src = img.src;
    modal.querySelector(".details-image img").alt = title;
    modal.querySelector("#detailsTitle").textContent = title;
    modal.querySelector(".details-rate").textContent = card.querySelector(".card-rating p").textContent;
    modal.querySelector(".details-location").textContent = card.querySelector(".card-location p").textContent;
    modal.querySelector(".details-price").textContent = card.querySelector(".price-btn").textContent;
    modal.querySelector(".details-link").href = card.querySelector(".map-container a").href;

    const desc = modal.querySelector(".details-desc");
    desc.textContent = place ? place.desc : "";
    desc.hidden = !place;

    const mapBox = modal.querySelector(".details-map");
    mapBox.innerHTML = "";
    if (map) mapBox.appendChild(map.cloneNode());

    lastButton = button;
    modal.classList.add("open");
    document.body.classList.add("details-open");
    modal.querySelector(".details-close").focus();
  }

  function closeDetails() {
    if (!modal.classList.contains("open")) return;
    modal.classList.remove("open");
    document.body.classList.remove("details-open");
    modal.querySelector(".details-map").innerHTML = "";
    if (lastButton) lastButton.focus();
  }

  document.addEventListener("click", (e) => {
    const mapIcon = e.target.closest(".map-icon");
    if (mapIcon) {
      mapIcon.closest(".card-content").querySelector(".map-container").classList.toggle("active-map");
      return;
    }

    const saveIcon = e.target.closest(".save-icon");
    if (saveIcon) {
      const title = cardTitle(saveIcon.closest(".card-content"));
      const saved = getSaved();
      const index = saved.indexOf(title);
      if (index === -1) saved.push(title);
      else saved.splice(index, 1);
      setSaved(saved);
      markSaved();
      return;
    }

    const detailsBtn = e.target.closest(".card-info .second-btn");
    if (detailsBtn) {
      openDetails(detailsBtn.closest(".card-content"), detailsBtn);
      return;
    }

    if (e.target === modal || e.target.closest(".details-close")) closeDetails();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDetails();
  });

  new MutationObserver(() => markSaved()).observe(document.body, { childList: true, subtree: true });
  markSaved();
})();
