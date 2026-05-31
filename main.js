/**
 * Ritima Shukla Portfolio — interactions
 */

(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const calendlyUrl = config.calendlyUrl || "";

  function getCalendlyUrl() {
    if (!calendlyUrl || calendlyUrl.includes(https://calendly.com/ritimashukla4115/30min)) {
      return null;
    }
    return calendlyUrl;
  }

  function initCalendlyWidget() {
    const widget = document.querySelector(".contact__calendly");
    const url = getCalendlyUrl();
    if (!widget || !url) return;
    widget.setAttribute("data-url", url);
  }

  function openCalendlyPopup() {
    const url = getCalendlyUrl();
    if (!url) {
      alert(
        "Add your Calendly link in js/config.js (calendlyUrl), then reload the page."
      );
      return;
    }
    if (typeof window.Calendly === "undefined") {
      window.location.href = url;
      return;
    }
    window.Calendly.initPopupWidget({ url });
  }

  let calendlyInlineReady = false;

  function ensureCalendlyInline() {
    const url = getCalendlyUrl();
    const parent = document.querySelector(".contact__calendly");
    if (!url || !parent || calendlyInlineReady) return;

    if (typeof window.Calendly !== "undefined") {
      window.Calendly.initInlineWidget({ url, parentElement: parent });
      calendlyInlineReady = true;
      return;
    }

    // Script still loading (async)
    const onLoad = () => {
      if (!calendlyInlineReady && typeof window.Calendly !== "undefined") {
        window.Calendly.initInlineWidget({ url, parentElement: parent });
        calendlyInlineReady = true;
      }
    };
    window.addEventListener("load", onLoad, { once: true });
  }

  function setContactTab(tabName) {
    const tabs = document.querySelectorAll("[data-contact-tab]");
    const panels = {
      message: document.getElementById("contact-panel-message"),
      calendly: document.getElementById("contact-panel-calendly"),
    };

    tabs.forEach((tab) => {
      const isActive = tab.dataset.contactTab === tabName;
      tab.classList.toggle("contact__tab--active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    Object.entries(panels).forEach(([name, panel]) => {
      if (!panel) return;
      const isActive = name === tabName;
      panel.classList.toggle("contact__panel--active", isActive);
      panel.hidden = !isActive;
    });

    if (tabName === "calendly") {
      ensureCalendlyInline();
    }
  }

  // Calendly popup triggers
  document.querySelectorAll("[data-calendly-popup]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.tagName === "A" && el.getAttribute("href") === "#contact") {
        e.preventDefault();
        const contact = document.getElementById("contact");
        if (contact) contact.scrollIntoView({ behavior: "smooth" });
        setContactTab("calendly");
        setTimeout(openCalendlyPopup, 400);
        return;
      }
      e.preventDefault();
      openCalendlyPopup();
    });
  });

  // Contact tabs
  document.querySelectorAll("[data-contact-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      setContactTab(tab.dataset.contactTab);
    });
  });

  // Deep link: #schedule or #contact?book
  function applyContactHash() {
    const hash = window.location.hash;
    if (hash === "#schedule" || hash === "#book") {
      setContactTab("calendly");
    }
  }

  applyContactHash();
  window.addEventListener("hashchange", applyContactHash);

  initCalendlyWidget();

  // Smooth scroll for anchor links (skip calendly popup links handled above)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    if (link.hasAttribute("data-calendly-popup")) return;
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // FAQ — only one open at a time
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  // Project showcase navigation (demo)
  const prevBtn = document.querySelector(
    '.project-showcase__arrow[aria-label="Previous project"]'
  );
  const nextBtn = document.querySelector(
    '.project-showcase__arrow[aria-label="Next project"]'
  );

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      prevBtn.style.transform = "scale(0.95)";
      setTimeout(() => (prevBtn.style.transform = ""), 150);
    });
    nextBtn.addEventListener("click", () => {
      nextBtn.style.transform = "scale(0.95)";
      setTimeout(() => (nextBtn.style.transform = ""), 150);
    });
  }

  // Contact form — prevent default submit (no backend)
  const form = document.querySelector(".contact__form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "Message sent!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2500);
    });
  }

  // Sticky nav shadow on scroll
  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        nav.style.boxShadow =
          window.scrollY > 20 ? "0 4px 24px rgba(3,7,18,0.08)" : "none";
      },
      { passive: true }
    );
  }
})();
