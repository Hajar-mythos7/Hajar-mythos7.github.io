/* =========================================================
   Portfolio Hajar EL YOUSFI — interactions
   Nav, animation réseau du hero, filtres, reveal, back-to-top
   ========================================================= */
(function () {
  "use strict";

  var body = document.body;

  /* ---------- Nav : état scrolled + menu mobile ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
    if (toTop) toTop.classList.toggle("show", window.scrollY > 600);
    var target = null;
    if (window.scrollY < 80) target = "top";
    document.querySelectorAll("section[id]").forEach(function (sec) {
      var r = sec.getBoundingClientRect();
      if (r.top <= 140 && r.bottom > 140) target = sec.id;
    });
    if (links) links.querySelectorAll("a[href^='#']").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + target);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && links) toggle.addEventListener("click", function () {
    links.classList.toggle("open");
  });
  links && links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
    });
  });

  /* ---------- Toile réseau dans le hero ---------- */
  var canvas = document.getElementById("net");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, dots = [], raf = null;

    function accentRGBA(alpha) {
      var hex = getComputedStyle(body).getPropertyValue("--accent").trim();
      hex = hex.replace("#", "");
      if (hex.length < 6) hex = "0e5484";
      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    }
    function size() {
      var dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth * dpr;
      H = canvas.offsetHeight * dpr;
      canvas.width = W;
      canvas.height = H;
    }
    function make() {
      var w = canvas.offsetWidth, h = canvas.offsetHeight;
      var n = Math.max(24, Math.min(60, Math.floor((w * h) / 26000)));
      dots = [];
      for (var i = 0; i < n; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.6 + 0.7
        });
      }
    }
    function frame() {
      var w = canvas.offsetWidth, h = canvas.offsetHeight, i, j;
      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.fill();
      }
      for (i = 0; i < dots.length; i++) {
        for (j = i + 1; j < dots.length; j++) {
          var a = dots[i], b = dots[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = accentRGBA(0.32 * (1 - dist / 150));
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }
    size(); make(); frame();
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { size(); make(); }, 200);
    });
    window.addEventListener("scroll", function () {
      var r = canvas.getBoundingClientRect();
      if (r.bottom < 0) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) frame();
    }, { passive: true });
  }

  /* ---------- Reveal au scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el, i) {
      if (el.closest(".projects-grid") || el.closest(".skills-grid") || el.closest("[data-group]")) {
        el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      }
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Filtres projets ---------- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll(".projects-grid .card");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      cards.forEach(function (c) {
        var show = f === "all" || c.getAttribute("data-cat") === f;
        c.style.display = show ? "" : "none";
        if (show) c.classList.add("in");
      });
    });
  });

  /* ---------- Back-to-top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();