// Availability policy and first-visit preparation, separate from motion choreography.
window.FugazExperience = {
  availability(now = new Date(), configuredSpots = 3, configuredQuarter = "Auto") {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Amsterdam", year: "numeric", month: "numeric"
    }).formatToParts(now);
    const month = Number(parts.find(part => part.type === "month").value) - 1;
    const year = Number(parts.find(part => part.type === "year").value);
    // March, June, September and December promote the next planning quarter.
    const planningMonth = month + (month % 3 === 2 ? 1 : 0);
    const quarterNumber = Math.floor((planningMonth % 12) / 3) + 1;
    const automaticQuarter = "Q" + quarterNumber + (planningMonth > 11 ? " " + (year + 1) : "");
    const parsedSpots = Number(configuredSpots);
    const spots = configuredSpots == null || configuredSpots === "" || !Number.isFinite(parsedSpots)
      ? 3 : Math.max(0, Math.floor(parsedSpots));
    const quarter = !configuredQuarter || configuredQuarter === "Auto" ? automaticQuarter : configuredQuarter;
    return { spots, quarter, label: spots + " spot" + (spots === 1 ? "" : "s") + " left for " + quarter };
  },

  trackInputMode() {
    const html = document.documentElement;
    html.dataset.inputMode = "pointer";
    const pointer = () => { html.dataset.inputMode = "pointer"; };
    const keyboard = event => {
      if (event.key === "Tab") html.dataset.inputMode = "keyboard";
    };
    document.addEventListener("pointerdown", pointer, true);
    document.addEventListener("keydown", keyboard, true);
    return () => {
      document.removeEventListener("pointerdown", pointer, true);
      document.removeEventListener("keydown", keyboard, true);
    };
  },

  prepareIntro(root, start, skip) {
    let cancelled = false;
    let ready = false;
    let firstFrame = 0;
    let secondFrame = 0;
    let timeout;
    const preloader = root.querySelector("[data-preloader]");
    const cleanup = () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      document.removeEventListener("visibilitychange", resume);
      document.removeEventListener("keydown", escape);
      if (preloader) preloader.removeAttribute("data-preparing");
    };
    const resume = () => {
      if (cancelled || !ready || document.hidden || firstFrame) return;
      // Give initial styles and decoded images two paint opportunities before motion.
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          if (document.hidden) { firstFrame = 0; return; }
          cleanup();
          start();
        });
      });
    };
    const escape = event => {
      if (event.key !== "Escape") return;
      cleanup();
      skip();
    };
    document.addEventListener("visibilitychange", resume);
    document.addEventListener("keydown", escape);
    const images = Array.from(root.querySelectorAll("[data-preloader] img, #top img, [data-mnav] img"));
    const pending = images.map(img => img.decode ? img.decode().catch(() => {}) : Promise.resolve());
    if (document.fonts) {
      pending.push(...[400, 500, 700].map(weight => document.fonts.load(weight + ' 16px "Satoshi"').catch(() => {})));
      pending.push(document.fonts.ready.catch(() => {}));
    }
    // A blocked font/image must never strand a visitor on the opening screen.
    const deadline = new Promise(resolve => { timeout = setTimeout(resolve, 3500); });
    Promise.race([Promise.all(pending), deadline]).then(() => {
      clearTimeout(timeout);
      ready = true;
      resume();
    });
    return cleanup;
  }
};
