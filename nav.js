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
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Menu");
    overlay.innerHTML = `
      <div class="mobile-menu-header">
        <a href="index.html" class="mobile-menu-logo" aria-label="Visit Kosovo home">
          <img src="img/VISIT KOSOVO LOGO Version 2-03.svg" alt="" />
        </a>
        <button class="mobile-menu-close" aria-label="Close menu">
          <span class="material-icons">close</span>
        </button>
      </div>
      <div class="mobile-menu-nav">
        <ul>
          <li><a href="index.html" class="${isHome ? "mobile-active" : ""}">Home</a></li>
          <li><a href="page2.html" class="${!isHome ? "mobile-active" : ""}">Destinations</a></li>
        </ul>
      </div>
      <a href="page2.html" class="mobile-menu-cta">Book a tour</a>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector(".mobile-menu-close");

    function openMenu() {
      overlay.classList.add("open");
      document.body.classList.add("mobile-menu-open");
      toggle.setAttribute("aria-expanded", "true");
      closeBtn.focus();
    }
    function closeMenu() {
      if (!overlay.classList.contains("open")) return;
      overlay.classList.remove("open");
      document.body.classList.remove("mobile-menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }

    toggle.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);

    overlay.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") closeMenu();
      if (e.key !== "Tab") return;
      const items = overlay.querySelectorAll("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
