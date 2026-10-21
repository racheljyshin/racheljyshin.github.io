// Site behavior: theme toggle, mobile menu, header shadow, rotating words,
// reveal-on-scroll, and the publication filter.
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

    // Reserve the height the sentence needs for its longest phrase, so the
    // page below doesn't jump when a longer phrase wraps onto an extra line.
    var statement = rot.closest(".hero-statement");
    var reserveHeight = function () {
      var shown = rot.textContent, tallest = 0;
      statement.style.minHeight = "";
      words.forEach(function (w) {
        rot.textContent = w;
        tallest = Math.max(tallest, statement.getBoundingClientRect().height);
      });
      rot.textContent = shown;
      statement.style.minHeight = Math.ceil(tallest) + "px";
    };
    reserveHeight();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reserveHeight);
    var resizeQueued = false;
    window.addEventListener("resize", function () {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(function () { resizeQueued = false; reserveHeight(); });
    });

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
