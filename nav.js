(function () {
  function initMobileNav() {
    const header = document.querySelector("header");
    if (!header || document.querySelector(".mobile-menu-toggle")) return;

    const path = window.location.pathname.split("/").pop() || "index.html";
    const isHome = path === "" || path === "index.html";

    const toggle = document.createElement("button");
    toggle.className = "mobile-menu-toggle";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<span class="material-icons">menu</span>';
    header.appendChild(toggle);

    const overlay = document.createElement("div");
    overlay.className = "mobile-menu";
    overlay.innerHTML = `
      <div class="mobile-menu-header">
        <span class="mobile-menu-title">Menu</span>
        <button class="mobile-menu-close" aria-label="Close menu">
          <span class="material-icons">close</span>
        </button>
      </div>
      <div class="mobile-menu-nav">
        <ul>
          <li><a href="index.html" class="${isHome ? "mobile-active" : ""}">Home</a></li>
          <li class="mobile-has-submenu">
            <div class="mobile-nav-row">
              <a href="page2.html" class="${!isHome ? "mobile-active" : ""}">Destinations</a>
              <button class="mobile-submenu-toggle" aria-label="Toggle categories" aria-expanded="false">
                <span class="material-icons">expand_more</span>
              </button>
            </div>
            <div class="mobile-submenu">
              <div class="mobile-submenu-inner">
                <p class="mobile-submenu-title">Categories</p>
                <ul>
                  <li><a href="#">Popular</a></li>
                  <li><a href="#">Historical</a></li>
                  <li><a href="#">Hiking</a></li>
                  <li><a href="#">Winter</a></li>
                  <li><a href="#">Nature</a></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <div class="mobile-menu-icons">
          <a href="#" aria-label="Search"><span class="material-icons">search</span></a>
          <a href="page6.html" aria-label="Favorites"><span class="material-icons">favorite</span></a>
          <a href="page7.html" aria-label="Account"><span class="material-icons">person</span></a>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector(".mobile-menu-close");

    const submenuToggle = overlay.querySelector(".mobile-submenu-toggle");
    const submenu = overlay.querySelector(".mobile-submenu");
    if (submenuToggle && submenu) {
      submenuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = submenu.classList.toggle("open");
        submenuToggle.classList.toggle("open", isOpen);
        submenuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    function openMenu() {
      overlay.classList.add("open");
      document.body.classList.add("mobile-menu-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    function closeMenu() {
      overlay.classList.remove("open");
      document.body.classList.remove("mobile-menu-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (getComputedStyle(toggle).display === "none") closeMenu();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
  } else {
    initMobileNav();
  }
})();
