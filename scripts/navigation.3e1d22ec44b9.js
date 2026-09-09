// Menu, section navigation, legal panels and keyboard focus handling.
window.withFugazNavigation = Base => class extends Base {
  goToStep(i) {
    const root = this.rootRef && this.rootRef.current;
    const w = root && root.querySelector("[data-pin-wrap]");
    if (!w) return;
    const n = root.querySelectorAll("[data-mom]").length || 4;
    const r = w.getBoundingClientRect();
    const top = r.top + window.scrollY;
    const travel = r.height - window.innerHeight;
    this.scrollTo(top + travel * ((Math.max(0, Math.min(n - 1, i)) + 0.5) / n));
  }
  setLegal(which) {
    this.legalOpen = which || null;
    document.querySelectorAll("[data-legal]").forEach(p => {
      const on = p.getAttribute("data-legal") === which;
      p.style.opacity = on ? "1" : "0";
      p.style.visibility = on ? "visible" : "hidden";
      p.style.pointerEvents = on ? "auto" : "none";
      p.style.transition = on ? "opacity 0.62s cubic-bezier(0.16,1,0.3,1),visibility 0s linear 0s" : "opacity 0.62s cubic-bezier(0.16,1,0.3,1),visibility 0s linear 0.62s";
      if (on) {
        p.scrollTop = 0;
        const s = p.firstElementChild;
        if (s) s.scrollTop = 0;
      }
    });
    document.documentElement.style.overflow = which ? "hidden" : "";
    if (which) {
      const b = document.querySelector('[data-legal="' + which + '"] [data-legal-close]');
      if (b) b.focus();
    }
  }
  toggleMenu(force) {
    const sheet = document.querySelector("[data-mmenu]");
    const btn = document.querySelector("[data-menu-toggle]");
    if (!sheet) return;
    const open = force === undefined ? !this.menuOpen : !!force;
    this.menuOpen = open;
    const E = this.EASE;
    sheet.style.transition = open ? "transform 0.75s " + E + ", clip-path 0.8s " + E + ", opacity 0.3s " + E : "transform 0.55s " + E + ", clip-path 0.5s " + E + ", opacity 0.35s " + E + " 0.15s, visibility 0s linear 0.55s";
    if (open) sheet.style.visibility = "visible";
    sheet.style.transform = open ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.98)";
    sheet.style.clipPath = open ? "inset(0 0 0 0 round 26px)" : "inset(0 0 100% 0 round 26px)";
    sheet.style.opacity = open ? "1" : "0";
    sheet.style.pointerEvents = open ? "auto" : "none";
    if (!open) sheet.style.visibility = "hidden";
    const lbl = sheet.querySelector("[data-mfade]");
    const words = Array.prototype.slice.call(sheet.querySelectorAll("[data-mword]"));
    const dots = Array.prototype.slice.call(sheet.querySelectorAll("[data-mdotr]"));
    const foot = sheet.querySelector("[data-mfoot]");
    if (foot) {
      const fl = Array.prototype.slice.call(foot.querySelectorAll("[data-mfw]"));
      fl.forEach((el, i) => {
        const d = open ? 0.30 + i * 0.055 : (fl.length - 1 - i) * 0.02;
        const isCta = el.hasAttribute("data-mcta");
        const dd = isCta ? d + 0.12 : d;
        el.style.transition = "transform " + (isCta ? 0.95 : 0.7) + "s " + E + " " + dd.toFixed(3) + "s" + (isCta ? ", opacity 0.7s " + E + " " + dd.toFixed(3) + "s" : "");
        el.style.transform = open ? isCta ? "translateY(0) scale(1)" : "translateY(0)" : isCta ? "translateY(26px) scale(0.96)" : "translateY(110%)";
        if (isCta) el.style.opacity = open ? "1" : "0";
      });
      const rule = foot.style;
      rule.transition = "border-color 0.55s " + E + (open ? " 0.28s" : "");
      rule.borderTopColor = open ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0)";
    }
    if (lbl) {
      lbl.style.transition = "transform 0.6s " + E + ", opacity 0.45s " + E + (open ? " 0.1s" : "");
      lbl.style.opacity = open ? "1" : "0";
      lbl.style.transform = open ? "translateY(0)" : "translateY(-6px)";
    }
    const closeBtn = sheet.querySelector("[data-menu-toggle]");
    if (closeBtn) {
      closeBtn.style.transition = "transform 0.7s " + E + (open ? " 0.12s" : "") + ", opacity 0.4s " + E + (open ? " 0.12s" : "");
      closeBtn.style.opacity = open ? "1" : "0";
      closeBtn.style.transform = open ? "rotate(0deg) scale(1)" : "rotate(-45deg) scale(0.7)";
    }
    words.forEach((w, i) => {
      const d = open ? 0.12 + i * 0.055 : (words.length - 1 - i) * 0.02;
      w.style.transition = "transform 0.7s " + E + " " + d.toFixed(3) + "s";
      w.style.transform = open ? "translateY(0)" : "translateY(105%)";
    });
    dots.forEach((d0, i) => {
      const d = open ? 0.3 + i * 0.065 : 0;
      d0.style.transition = "transform 0.6s " + E + " " + d.toFixed(3) + "s, opacity 0.45s " + E + " " + d.toFixed(3) + "s";
      d0.style.opacity = open ? "1" : "0";
      d0.style.transform = open ? "scale(1)" : "scale(0.4)";
    });
    if (btn) {
      btn.setAttribute("aria-expanded", String(open));
      const [a, b] = Array.prototype.slice.call(btn.querySelectorAll("[data-burger]"));
      if (a) a.style.transform = open ? "translateY(3.3px) rotate(45deg)" : "none";
      if (b) {
        b.style.transform = open ? "translateY(-3.3px) rotate(-45deg)" : "none";
        b.style.opacity = "1";
      }
    }
    document.documentElement.style.overflow = open ? "hidden" : "";
  }
  trapFocus(box, firstSel) {
    const sel = "a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex=\"-1\"])";
    const prev = document.activeElement;
    const first = firstSel && box.querySelector(firstSel) || box.querySelector(sel);
    if (first) setTimeout(() => {
      try {
        first.focus({
          preventScroll: true
        });
      } catch (e) {}
    }, 80);
    const onKey = e => {
      if (e.key !== "Tab") return;
      const els = Array.prototype.filter.call(box.querySelectorAll(sel), el => el.getClientRects().length);
      if (!els.length) return;
      const i = els.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        els[els.length - 1].focus();
      } else if (!e.shiftKey && (i === els.length - 1 || i < 0)) {
        e.preventDefault();
        els[0].focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      if (prev && prev !== document.body && prev.focus) {
        try {
          prev.focus({
            preventScroll: true
          });
        } catch (e) {}
      } else if (document.activeElement && box.contains(document.activeElement)) {
        try {
          document.activeElement.blur();
        } catch (e) {}
      }
    };
  }
};
