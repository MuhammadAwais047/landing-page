(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header shadow on scroll ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const navToggle = $("#nav-toggle");
  const navMenu = $("#nav-menu");

  const setMenu = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navMenu.classList.toggle("is-open", open);
  };

  navToggle.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navMenu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("is-open") && !e.target.closest(".nav")) setMenu(false);
  });

  /* ---------- Pricing billing toggle ---------- */
  const billBtns = $$(".bill-btn");

  const setBilling = (mode) => {
    billBtns.forEach((btn) => {
      const active = btn.id === `bill-${mode}`;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    $$(".amount").forEach((el) => {
      el.textContent = `$${el.dataset[mode]}`;
    });
  };

  billBtns.forEach((btn) => {
    btn.addEventListener("click", () => setBilling(btn.id.replace("bill-", "")));
  });

  /* ---------- FAQ accordion ---------- */
  const faqs = $$(".faq");

  faqs.forEach((item) => {
    const btn = $(".faq-q", item);
    const panel = $(".faq-a", item);

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      faqs.forEach((other) => {
        const ob = $(".faq-q", other);
        const oa = $(".faq-a", other);
        ob.setAttribute("aria-expanded", "false");
        oa.style.maxHeight = "0px";
      });

      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });

  window.addEventListener("resize", () => {
    $$('.faq-q[aria-expanded="true"]').forEach((btn) => {
      const panel = btn.nextElementSibling;
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = [...entry.target.parentElement.children].filter((c) =>
            c.classList.contains("reveal")
          );
          entry.target.style.transitionDelay = `${Math.min(siblings.indexOf(entry.target), 5) * 70}ms`;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up numbers ---------- */
  const counters = $$("[data-count-to]");
  const fmt = (el, val) => {
    const dec = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || "";
    el.textContent = val.toLocaleString("en-US", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    }) + suffix;
  };

  if (reducedMotion || !("IntersectionObserver" in window)) {
    counters.forEach((el) => fmt(el, parseFloat(el.dataset.countTo)));
  } else {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          cio.unobserve(entry.target);
          const el = entry.target;
          const target = parseFloat(el.dataset.countTo);
          const dur = 1400;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            fmt(el, target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
