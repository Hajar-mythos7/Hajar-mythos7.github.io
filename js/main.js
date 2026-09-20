// Navigation mobile
var navToggle = document.getElementById("navToggle");
var navLinks = document.getElementById("navLinks");

if (navToggle) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });
}

// Filtres projets
var filters = document.querySelectorAll(".filter");
var cards = document.querySelectorAll(".projects-grid .card");

filters.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var cat = btn.getAttribute("data-filter");
    filters.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    cards.forEach(function (card) {
      if (cat === "all" || card.getAttribute("data-cat") === cat) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});