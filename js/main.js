/* Portfolio Hajar EL YOUSFI — interactions */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") navLinks.classList.remove("open");
    });
  }

  /* Market l'élément actif selon la section visible */
  var sections = document.querySelectorAll("main .section[id]");
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlight() {
    var pos = window.scrollY + 140;
    var currentId = "";
    sections.forEach(function (s) {
      if (s.offsetTop <= pos) currentId = s.id;
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
    });
  }
  highlight();
  window.addEventListener("scroll", highlight, { passive: true });

  /* Filtres projets */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll(".projects-grid .card");

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      cards.forEach(function (card) {
        card.style.display =
          cat === "all" || card.getAttribute("data-cat") === cat ? "" : "none";
      });
    });
  });

  /* Apparition au scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
})();