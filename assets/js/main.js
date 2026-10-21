// Site behavior: theme toggle, mobile menu, header shadow, rotating words,
// reveal-on-scroll, count-up stats, and the publication filter.
(function () {
  var root = document.documentElement;
  root.classList.remove("no-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----- theme toggle (choice remembered per browser) -----
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // ----- mobile menu -----
  var menuBtn = document.querySelector(".menu-toggle");
  var links = document.querySelector(".nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ----- header border once the page scrolls -----
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ----- rotating words in the home-page statement -----
  var rot = document.querySelector(".rotator .word");
  if (rot && !reduceMotion) {
    var words = JSON.parse(rot.parentElement.getAttribute("data-words"));
    var i = 0;
    setInterval(function () {
      rot.classList.add("out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        rot.textContent = words[i];
        rot.classList.remove("out");
        rot.classList.add("in");
        // force reflow so the "in" state renders before animating to rest
        void rot.offsetWidth;
        rot.classList.remove("in");
      }, 450);
    }, 2800);
  }

  // ----- reveal on scroll -----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // ----- count-up stats -----
  var nums = document.querySelectorAll("[data-count]");
  if (nums.length && "IntersectionObserver" in window && !reduceMotion) {
    var countIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseInt(el.getAttribute("data-count"), 10), start = null;
        var step = function (t) {
          if (!start) start = t;
          var p = Math.min((t - start) / 1100, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIo.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { countIo.observe(el); });
  }

  // ----- publication filter (publications page) -----
  var filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      document.querySelectorAll(".pub[data-type]").forEach(function (pub) {
        pub.hidden = f !== "all" && pub.getAttribute("data-type").split(" ").indexOf(f) === -1;
      });
      document.querySelectorAll(".pub-section").forEach(function (sec) {
        sec.hidden = !sec.querySelector(".pub:not([hidden])");
      });
    });
  });

  // ----- footer year -----
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
