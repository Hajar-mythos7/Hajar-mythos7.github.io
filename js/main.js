(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var doc = document.documentElement;
  var body = document.body;

  /* ---------- Nav ---------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var toggle = nav.querySelector(".nav-toggle");
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      body.style.overflow = nav.classList.contains("is-open") ? "hidden" : "";
      if (toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
      } else {
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        body.style.overflow = "";
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll spy ---------- */
  var spyLinks = document.querySelectorAll(".nav-links a[href^='#']");
  var spySections = [];
  if (spyLinks.length) {
    spyLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) spySections.push({ a: a, el: el });
    });
    var spy = function () {
      var pos = window.scrollY + 120;
      var current = null;
      spySections.forEach(function (s) {
        if (s.el.offsetTop <= pos) current = s;
      });
      spySections.forEach(function (s) {
        s.a.classList.toggle("is-active", s === current);
      });
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ---------- Case-study TOC spy ---------- */
  var tocLinks = document.querySelectorAll(".cs-toc a[href^='#']");
  var tocSections = [];
  if (tocLinks.length) {
    tocLinks.forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) tocSections.push({ a: a, el: el });
    });
    var tocSpy = function () {
      var pos = window.scrollY + 160;
      var current = null;
      tocSections.forEach(function (s) {
        if (s.el.offsetTop <= pos) current = s;
      });
      tocSections.forEach(function (s) {
        s.a.classList.toggle("is-on", s === current);
      });
    };
    window.addEventListener("scroll", tocSpy, { passive: true });
    tocSpy();
  }

  /* ---------- Reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--i", i % 5);
    });
    if (reduced || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Archive toggle ---------- */
  var awToggle = document.getElementById("awToggle");
  var allWork = document.getElementById("allWork");
  if (awToggle && allWork) {
    awToggle.addEventListener("click", function () {
      var willOpen = !allWork.classList.contains("aw-open");
      allWork.classList.toggle("aw-open", willOpen);
      if (willOpen) {
        awToggle.innerHTML = 'Plus de projets <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
        setTimeout(function () {
          allWork.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        }, 80);
      } else {
        awToggle.innerHTML = 'Voir tous les projets <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
      }
    });
  }

  /* ---------- Hero visual canvas ---------- */
  var canvas = document.getElementById("heroCanvas");
  if (canvas && !reduced) {
    var ctx = canvas.getContext("2d");
    var cw = 0, ch = 0, parts = [], raf = null, cursor = { x: -9999, y: -9999 };
    var particleColors = ["rgba(87,184,255,", "rgba(167,139,250,", "rgba(245,245,245,"];

    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var rect = canvas.getBoundingClientRect();
      cw = rect.width; ch = rect.height;
      canvas.width = cw * dpr; canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    }
    function spawn() {
      parts = [];
      var n = Math.min(70, Math.floor(cw / 12));
      for (var i = 0; i < n; i++) {
        parts.push({
          x: Math.random() * cw,
          y: Math.random() * ch,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.4,
          c: particleColors[i % 3]
        });
      }
    }
    function frame() {
      ctx.clearRect(0, 0, cw, ch);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cw) p.vx *= -1;
        if (p.y < 0 || p.y > ch) p.vy *= -1;
        var dx = p.x - cursor.x, dy = p.y - cursor.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120 && d2 > 0.01) {
          var d = Math.sqrt(d2);
          p.x += (dx / d) * 0.4;
          p.y += (dy / d) * 0.4;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + "0.55)";
        ctx.fill();
      }
      for (var a = 0; a < parts.length; a++) {
        for (var b = a + 1; b < parts.length; b++) {
          var pa = parts[a], pb = parts[b];
          var ax = pa.x - pb.x, ay = pa.y - pb.y;
          var dg = Math.sqrt(ax * ax + ay * ay);
          if (dg < 96) {
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = "rgba(245,245,245," + (0.055 * (1 - dg / 96)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }
    size();
    if (finePointer) {
      canvas.addEventListener("mousemove", function (e) {
        var rect = canvas.getBoundingClientRect();
        cursor.x = e.clientX - rect.left;
        cursor.y = e.clientY - rect.top;
      });
      canvas.addEventListener("mouseleave", function () { cursor.x = -9999; cursor.y = -9999; });
    }
    var observing = false;
    if ("IntersectionObserver" in window) {
      observing = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { if (!raf) raf = requestAnimationFrame(frame); }
          else { if (raf) { cancelAnimationFrame(raf); raf = null; } }
        });
      }, { threshold: 0.05 });
      observing.observe(canvas);
    } else {
      raf = requestAnimationFrame(frame);
    }
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(size, 150);
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduced) {
    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = "translate(" + x * 0.18 + "px," + y * 0.22 + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reduced) {
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    body.appendChild(dot);
    body.appendChild(ring);
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px)";
      var t = e.target;
      var hover = t && (t.closest(".btn, .text-link, a, .chip, .stage, .work-card, .profile-card, .skill-tag"));
      body.classList.toggle("cursor-on", !!hover);
    });
    var ringLoop = function () {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(ringLoop);
    };
    requestAnimationFrame(ringLoop);
  }
})();