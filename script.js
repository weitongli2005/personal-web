/* =========================================================
   Asa · Weitong Li — site behaviour
   Theme · nav · scroll-spy · reveal · BibTeX copy
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme ---------- */
  var THEME_KEY = "asa-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", theme === "dark" ? "#0f1215" : "#fbfaf8");
  }

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* private mode */ }
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
      return;
    }
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  initTheme();

  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- scroll progress + sticky nav ---------- */
  var progress = document.getElementById("scrollProgress");
  var nav = document.getElementById("nav");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("is-stuck", y > 8);
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!burger || !navLinks) return;
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }

  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- scroll spy ---------- */
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav__links a[href^="#"]')
  );
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var visible = new Map();
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visible.set(en.target.id, en.intersectionRatio);
        else visible.delete(en.target.id);
      });
      var best = null, bestRatio = -1;
      visible.forEach(function (ratio, id) {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      });
      if (!best) return;
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + best);
      });
    }, {
      rootMargin: "-" + ("" + (window.innerWidth < 860 ? 70 : 90)) + "px 0px -55% 0px",
      threshold: [0.02, 0.15, 0.35, 0.6]
    });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var siblings = Array.prototype.slice.call(
          el.parentElement ? el.parentElement.children : []
        ).filter(function (n) { return n.classList && n.classList.contains("reveal"); });
        var i = siblings.indexOf(el);
        el.style.transitionDelay = (i > 0 && i < 6 ? i * 70 : 0) + "ms";
        el.classList.add("is-in");
        obs.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealables.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- BibTeX copy ---------- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = btn.parentElement.querySelector("pre");
      if (!pre) return;
      var text = pre.textContent;

      function done() {
        var old = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("is-done");
        setTimeout(function () {
          btn.textContent = old;
          btn.classList.remove("is-done");
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallbackCopy);
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- placeholder social links ---------- */
  document.querySelectorAll("[data-placeholder]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var name = a.getAttribute("data-placeholder");
      var notice = document.createElement("div");
      notice.textContent =
        "Add your " + name + " URL in index.html (search for data-placeholder=\"" + name + "\").";
      notice.setAttribute("role", "status");
      notice.style.cssText =
        "position:fixed;left:50%;bottom:26px;transform:translateX(-50%);" +
        "background:var(--text);color:var(--bg);padding:11px 20px;border-radius:11px;" +
        "font-size:13.5px;font-weight:500;z-index:300;box-shadow:var(--shadow-lg);" +
        "max-width:88vw;text-align:center;";
      document.body.appendChild(notice);
      setTimeout(function () { notice.remove(); }, 3200);
    });
  });
})();
