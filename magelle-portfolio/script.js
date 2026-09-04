/* =========================================================
   Magelle Bellena — Portfolio interactions
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky nav + back to top ---------- */
  var nav = document.getElementById("nav");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (toTop) toTop.classList.toggle("show", y > 500);
    spyScroll(y);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function closeMenu() {
    if (!links) return;
    links.classList.remove("open");
    if (toggle) {
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("click", function (e) {
      if (!links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(function () {
            el.classList.add("visible");
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- animated counters ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

  function runCounter(el) {
    var target = parseFloat(el.dataset.count) || 0;
    var suffix = el.dataset.suffix || "";
    var duration = 1500;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- skill bars ---------- */
  var bars = Array.prototype.slice.call(document.querySelectorAll(".bar"));

  if ("IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.classList.contains("bar")) {
            el.classList.add("filled");
          } else {
            runCounter(el);
          }
          io2.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.concat(bars).forEach(function (el) {
      io2.observe(el);
    });
  } else {
    counters.forEach(runCounter);
    bars.forEach(function (b) {
      b.classList.add("filled");
    });
  }

  /* ---------- scroll spy ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );

  function spyScroll(y) {
    var current = "";
    sections.forEach(function (sec) {
      if (y >= sec.offsetTop - 140) current = sec.id;
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  /* ---------- contact form ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var FALLBACK_EMAIL = "magelletingcoy@yahoo.com";

  function setNote(msg, kind) {
    if (!note) return;
    note.textContent = msg;
    note.className = "form-note " + (kind || "");
  }

  function mailtoFallback(data) {
    var body =
      "Name: " + (data.name || "") +
      "\nEmail: " + (data.email || "") +
      "\n\n" + (data.message || "");
    window.location.href =
      "mailto:" + FALLBACK_EMAIL +
      "?subject=" + encodeURIComponent(data.subject || "Portfolio enquiry") +
      "&body=" + encodeURIComponent(body);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      /* --- validate --- */
      var fields = form.querySelectorAll("[required]");
      var valid = true;

      fields.forEach(function (f) {
        var ok =
          f.value.trim() !== "" &&
          (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        setNote("Please fill in your name, a valid email, and a message.", "err");
        return;
      }

      var data = {
        name: form.name ? form.name.value.trim() : "",
        email: form.email ? form.email.value.trim() : "",
        subject: form.subject ? form.subject.value.trim() : "",
        message: form.message ? form.message.value.trim() : "",
        _subject: "New enquiry from your portfolio website",
        _template: "table",
        _captcha: "false"
      };

      /* honeypot — silently accept and do nothing for bots */
      if (form._honey && form._honey.value) {
        setNote("Thank you! Your message has been sent.", "ok");
        form.reset();
        return;
      }

      var action = form.getAttribute("action") || "";
      var btn = form.querySelector('button[type="submit"]');

      if (!action || !window.fetch) {
        mailtoFallback(data);
        setNote("Opening your email app… If nothing happens, email " + FALLBACK_EMAIL + " directly.", "ok");
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.dataset.label = btn.innerHTML;
        btn.textContent = "Sending…";
      }
      setNote("Sending your message…", "");

      fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          return res.json().catch(function () {
            return { success: res.ok ? "true" : "false" };
          });
        })
        .then(function (json) {
          var ok = json && (json.success === true || json.success === "true");
          if (ok) {
            form.reset();
            setNote("Thank you! Your message has been sent — I'll get back to you soon. 🌸", "ok");
          } else {
            throw new Error(json && json.message ? json.message : "Send failed");
          }
        })
        .catch(function () {
          setNote("Couldn't send just now — opening your email app instead…", "err");
          mailtoFallback(data);
        })
        .then(function () {
          if (btn) {
            btn.disabled = false;
            if (btn.dataset.label) btn.innerHTML = btn.dataset.label;
          }
        });
    });

    form.querySelectorAll("input, textarea").forEach(function (f) {
      f.addEventListener("input", function () {
        f.classList.remove("invalid");
      });
    });
  }

  /* ---------- init ---------- */
  onScroll();
})();
