// Grupo San Guillermo — interacciones mínimas. Todo el contenido funciona sin JS.
(function () {
  const root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  // Menú móvil
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const label = toggle && toggle.querySelector(".sr-only");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    if (label) label.textContent = open ? "Cerrar menú" : "Abrir menú";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  // Borde del header al hacer scroll
  const header = document.querySelector("[data-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Cada entidad de la lista ilumina su columna en el techo
  const canopy = document.querySelector(".canopy");
  document.querySelectorAll("[data-pillar]").forEach((item) => {
    const n = item.getAttribute("data-pillar");
    const on = () => { canopy.classList.add("highlight-" + n); item.classList.add("is-active"); };
    const off = () => { canopy.classList.remove("highlight-" + n); item.classList.remove("is-active"); };
    item.addEventListener("mouseenter", on);
    item.addEventListener("mouseleave", off);
  });
})();
