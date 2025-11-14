const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const yearSpan = document.getElementById("year");
if (yearSpan) { yearSpan.textContent = new Date().getFullYear().toString(); }
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("is-open");
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mainNav.classList.remove("is-open"));
  });
}
