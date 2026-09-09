// Page lifecycle and animation choreography. Keep easing, keyframes and delays in sync with the design.
window.createFugazPage = (SiteLogic, React) => class FugazPage extends window.withFugazNavigation(window.withFugazScan(SiteLogic)) {
  rootRef = React.createRef();
  cleanup = [];
  EASE = "cubic-bezier(0.16,1,0.3,1)";
  applyAvailability() {
    const now = new Date();
    const auto = (() => {
      const y = now.getFullYear(),
        m = now.getMonth(),
        d = now.getDate();
      const days = new Date(y, m + 1, 0).getDate();
      const p = days > 1 ? (d - 1) / (days - 1) : 0;
      const cap = Math.max(2, Math.round(5 - 3 * p));
      let h = (y * 12 + m) * 131 + d * 17;
      h = (h ^ h >> 5) * 2654435761 % 100000;
      const drop = Math.abs(h) % 2;
      return {
        q: "Q" + (Math.floor(m / 3) + 1),
        n: Math.max(1, cap - drop)
      };
    })();
    const pSpots = this.props.spots,
      pQ = this.props.quarter;
    const spots = pSpots == null || pSpots === "" || Number(pSpots) === 0 ? auto.n : pSpots;
    const quarter = !pQ || pQ === "Auto" ? auto.q : pQ;
    const n = spots == null ? null : Math.max(0, parseInt(spots, 10) || 0);
    const q = quarter;
    const line = (n == null ? "" : n + " spot" + (n === 1 ? "" : "s") + " left for ") + q;
    Array.prototype.forEach.call(document.querySelectorAll("[data-spot-text]"), t => {
      t.textContent = line;
    });
    if (n != null) Array.prototype.forEach.call(document.querySelectorAll("[data-spot-dot]"), d => {
      d.style.background = n > 0 ? "#2CCD6B" : "#CD2C2C";
    });
    const count = document.querySelector("[data-spot-count]");
    if (count && n != null) {
      count.textContent = String(n);
      count.setAttribute("data-count", String(n));
    }
  }
  componentDidMount() {
    try {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    } catch (e) {}
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    setTimeout(() => window.scrollTo(0, 0), 60);
    this.applyAvailability();
    this.boot();
  }
  componentWillUnmount() {
    this.teardown();
  }
  componentDidUpdate(prev) {
    if (prev.smoothScroll !== this.props.smoothScroll || prev.grainOpacity !== this.props.grainOpacity || prev.showPreloader !== this.props.showPreloader || prev.alwaysShowIntro !== this.props.alwaysShowIntro) {
      this.teardown();
      this.boot();
    }
    if (prev.spots !== this.props.spots || prev.quarter !== this.props.quarter) this.applyAvailability();
    if (this.lastDiag) this.applyDiag(this.lastDiag);
  }
  teardown() {
    this.cleanup.forEach(f => {
      try {
        f();
      } catch (e) {}
    });
    this.cleanup = [];
    document.documentElement.style.overflow = "";
  }
  on(target, ev, fn, opt) {
    if (!target) return;
    if (/^(mouseenter|mouseleave|mouseover|mouseout|mousemove)$/.test(ev) && window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    target.addEventListener(ev, fn, opt);
    this.cleanup.push(() => target.removeEventListener(ev, fn, opt));
  }
  boot() {
    try {
      this.bootInner();
    } catch (e) {
      console.error("[fugaz] boot failed", e);
    }
  }
  bootInner() {
    const root = this.rootRef.current;
    if (!root) return;
    this.bootedRoot = root;
    this.bootId = "b" + Date.now() + Math.round(Math.random() * 1e4);
    this.introDone = false;
    this.enterHero = null;
    const preEl = root.querySelector("[data-preloader]") || document.querySelector("[data-preloader]");
    const reducedNow = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let introSeen = false;
    try {
      introSeen = !!window.sessionStorage.getItem("fugaz.intro.seen");
    } catch (e) {}
    this.playIntro = !!preEl && (this.props.showPreloader ?? true) && !reducedNow && (!introSeen || (this.props.alwaysShowIntro ?? false));
    if (preEl) preEl.style.display = "none";
    const bail = setTimeout(() => {
      if (this.introDone) return;
      const live = this.rootRef.current;
      const pe = live && live.querySelector("[data-preloader]") || document.querySelector("[data-preloader]");
      if (pe) pe.style.display = "none";
      document.documentElement.style.overflow = "";
      this.locked = false;
      if (this.enterHero) this.enterHero();
    }, this.playIntro ? 7000 : 4000);
    this.cleanup.push(() => clearTimeout(bail));
    if (this.playIntro) this.runIntro();
    this.navState = null;
    const E = this.EASE;
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = s => Array.from(root.querySelectorAll(s));
    const num = (el, a, d) => {
      const v = parseFloat(el.getAttribute(a));
      return isNaN(v) ? d : v;
    };
    this.reduced = reduced;
    this.contact = root.querySelector("[data-contact]") || document.querySelector("[data-contact]");
    const grainBase = this.props.grainOpacity ?? 0.34;
    q("[data-grain]").forEach(el => {
      el.style.opacity = String(el.hasAttribute("data-grain-dark") ? Math.min(0.5, grainBase * 1.5) : grainBase);
    });
    const wireFns = [];
    const wire = () => {
      wireFns.forEach(fn => {
        try {
          fn();
        } catch (e) {}
      });
    };
    if (!reduced && window.matchMedia("(max-width:700px)").matches) {
      q('[data-r="svc-row"] [data-lines]').forEach(hst => hst.setAttribute("data-lines-nowire", "1"));
      q('[data-r="svc-row"] [data-svc-num]').forEach(n => {
        n.removeAttribute("data-reveal");
        n.style.opacity = "0";
        n.style.transform = "translate3d(0,14px,0)";
      });
    }
    if (!reduced) {
      const rQuick = window.matchMedia("(max-width: 1024px)").matches ? 0.7 : 1;
      const mq = rQuick;
      const revealNow = el => {
        el.dataset.revealDone = "1";
        if (el.__omHold) {
          try {
            el.__omHold.cancel();
          } catch (e) {}
          el.__omHold = null;
        }
        const from = el.dataset.omFrom || "translateY(28px)";
        const d = parseFloat(el.dataset.omD || "0");
        const dur = parseFloat(el.dataset.omDur || "") || 1450 * rQuick;
        el.animate([{
          opacity: 0,
          transform: from
        }, {
          opacity: 1,
          transform: "none"
        }], {
          duration: dur,
          delay: d * 1000 * rQuick,
          easing: el.dataset.omEase || E,
          fill: "backwards"
        });
        if (el.hasAttribute("data-team-card")) {
          const inner = el.querySelector("[data-tilt-inner]");
          const still = el.querySelector("img");
          const clip = el.querySelector("[data-hover-clip]");
          if (inner) inner.animate([{
            filter: "blur(14px)"
          }, {
            filter: "blur(0px)"
          }], {
            duration: dur * 0.9,
            delay: d * 1000 * rQuick,
            easing: E,
            fill: "backwards"
          });
          // Keep the still and moving image aligned during the entrance zoom.
          [still, clip].forEach(media => {
            if (media) media.animate([{
            transform: "scale(1.08)"
          }, {
            transform: "scale(1)"
          }], {
            duration: dur * 1.6,
            delay: d * 1000 * rQuick,
            easing: E,
            fill: "backwards"
          });
          });
          if (false && clip) {
            clearTimeout(clip.__clipT);
            clip.__clipT = setTimeout(() => {
              const r = el.getBoundingClientRect();
              if (r.bottom < 0 || r.top > window.innerHeight) return;
              if (clip.preload === "none") {
                clip.preload = "auto";
                clip.load();
              }
              const p = clip.play();
              if (p && p.catch) p.catch(() => {});
              clip.style.transition = "opacity 1.4s " + E;
              clip.style.opacity = "1";
            }, dur + d * 1000 * rQuick + 200);
          }
        }
      };
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          revealNow(en.target);
          io.unobserve(en.target);
        });
      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px"
      });
      const wireReveals = () => q("[data-reveal]").forEach(el => {
        if (el.dataset.revealWired === this.bootId) return;
        el.dataset.revealWired = this.bootId;
        delete el.dataset.revealDone;
        const stacked = window.matchMedia("(max-width:1024px)").matches;
        const d = num(el, stacked && el.hasAttribute("data-delay-stacked") ? "data-delay-stacked" : "data-delay", 0);
        const y = num(el, "data-y", 28);
        const dur = num(el, stacked && el.hasAttribute("data-dur-stacked") ? "data-dur-stacked" : "data-dur", 0);
        el.dataset.omDur = dur ? String(dur) : "";
        const pick = n => stacked && el.hasAttribute("data-" + n + "-stacked") ? el.getAttribute("data-" + n + "-stacked") : el.getAttribute("data-" + n);
        el.dataset.omEase = pick("ease") || "";
        const from = pick("from") || "translateY(" + y + "px)";
        el.dataset.omFrom = from;
        el.dataset.omD = String(d);
        if (el.__omHold) {
          try {
            el.__omHold.cancel();
          } catch (e) {}
        }
        el.__omHold = el.animate([{
          opacity: 0,
          transform: from
        }], {
          duration: 60,
          fill: "both"
        });
        io.observe(el);
      });
      const autoSkip = '#top,[data-reveal],[data-hw],[data-fw],[data-s3-w],[data-s3-eb],' + 'button,a[href],input,textarea,select,label,form,[data-nav],[data-mnav],[data-mmenu],' + '[data-preloader],[data-contact],[data-wa],[data-wa-pop],[data-pin],[data-marquee],' + '[data-tipbubble],[data-tilt],[data-progress],[data-hero],[data-atmo],[data-faq-a],[aria-hidden="true"]';
      q("p,h1,h2,h3,h4,h5,h6,li,span,div").forEach(el => {
        if (el.getAttributeNames().some(n => n.indexOf("data-") === 0 && !/^data-(dc-tpl|om-id|comment-anchor|screen-label)$/.test(n))) return;
        const st = el.getAttribute("style") || "";
        if (el.classList.contains("motion-owned") || /transform|transition|animation/.test(st)) return;
        if (el.closest(autoSkip)) return;
        if (!Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim().length > 1)) return;
        const i = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
        el.setAttribute("data-y", "16");
        el.setAttribute("data-delay", Math.min(0.24, i * 0.07).toFixed(2));
        el.setAttribute("data-reveal", "1");
      });
      wireReveals();
      wireFns.push(wireReveals);
      this.cleanup.push(() => io.disconnect());
      const sweep = () => {
        const vh = window.innerHeight;
        q("[data-reveal]").forEach(el => {
          if (el.dataset.revealDone) return;
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > 0) {
            revealNow(el);
            io.unobserve(el);
          }
        });
        if (this.sweepLines) this.sweepLines(vh);
      };
      const force = () => {
        const vh = window.innerHeight;
        q("[data-reveal]").forEach(el => {
          if (el.dataset.revealDone) return;
          const r = el.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0 && getComputedStyle(el).opacity !== "1") {
            el.dataset.revealDone = "1";
            if (el.__omHold) {
              try {
                el.__omHold.cancel();
              } catch (e) {}
              el.__omHold = null;
            }
            io.unobserve(el);
          }
        });
      };
      this.on(window, "scroll", sweep, {
        passive: true
      });
      this.on(document, "scroll", sweep, {
        passive: true,
        capture: true
      });
      this.on(window, "wheel", sweep, {
        passive: true
      });
      this.on(window, "touchmove", sweep, {
        passive: true
      });
      const forceTimer = setInterval(force, 1200);
      this.cleanup.push(() => clearInterval(forceTimer));
      this.on(window, "resize", sweep);
      requestAnimationFrame(sweep);
      setTimeout(sweep, 900);
      setTimeout(sweep, 2600);
      const runLines = host => {
        if (host.dataset.linesRun) return;
        host.dataset.linesRun = "1";
        lineIO.unobserve(host);
        const base = num(host, "data-lines-delay", 0.04);
        const step = num(host, "data-lines-step", 0.055);
        Array.from(host.querySelectorAll("[data-hw]")).forEach((w, i) => {
          if (w.__lineHold) {
            try {
              w.__lineHold.cancel();
            } catch (e) {}
            w.__lineHold = null;
          }
          w.animate([{
            transform: "translate3d(0,112%,0)"
          }, {
            transform: "translate3d(0,0,0)"
          }], {
            duration: 1500 * mq,
            delay: (base + i * step) * 1000 * mq,
            easing: E,
            fill: "both"
          });
        });
      };
      const lineIO = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          runLines(en.target);
          lineIO.unobserve(en.target);
        });
      }, {
        threshold: 0.2
      });
      this.sweepLines = vh => {
        Array.prototype.forEach.call(document.querySelectorAll("[data-lines][data-lines-wired-run]"), () => {});
        Array.prototype.forEach.call(document.querySelectorAll("[data-lines]:not([data-lines-nowire])"), host => {
          if (host.dataset.linesRun || host.hasAttribute("data-hero-lines")) return;
          const r = host.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > 0) runLines(host);
        });
      };
      const wireLines = () => Array.from(document.querySelectorAll("[data-lines]:not([data-lines-nowire])")).forEach(h => {
        if (h.dataset.linesWired === this.bootId) return;
        h.dataset.linesWired = this.bootId;
        const base = num(h, "data-lines-delay", 0.04);
        const step = num(h, "data-lines-step", 0.055);
        if (h.hasAttribute("data-hero-lines")) return;
        Array.from(h.querySelectorAll("[data-hw]")).forEach(w => {
          if (w.__lineHold) {
            try {
              w.__lineHold.cancel();
            } catch (e) {}
          }
          w.__lineHold = w.animate([{
            transform: "translate3d(0,112%,0)"
          }], {
            duration: 60,
            fill: "both"
          });
        });
        {
          const r = h.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.92 && r.bottom > 0) runLines(h);else lineIO.observe(h);
        }
      });
      wireLines();
      wireFns.push(wireLines);
      this.cleanup.push(() => lineIO.disconnect());
      const countIO = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          const el = en.target,
            to = num(el, "data-count", 0),
            t0 = performance.now();
          const step = t => {
            const p = Math.min(1, (t - t0) / 1300);
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          countIO.unobserve(el);
        });
      }, {
        threshold: 0.6
      });
      const wireCounts = () => q("[data-count]").forEach(el => {
        if (el.dataset.countWired === this.bootId) return;
        el.dataset.countWired = this.bootId;
        el.textContent = "0";
        countIO.observe(el);
      });
      wireCounts();
      wireFns.push(wireCounts);
      this.cleanup.push(() => countIO.disconnect());
    }
    const smooth = (this.props.smoothScroll ?? true) && !reduced;
    const maxY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let target = window.scrollY,
      current = window.scrollY,
      running = false,
      lastT = 0;
    const tick = now => {
      const dt = Math.min(0.05, lastT ? (now - lastT) / 1000 : 1 / 60);
      lastT = now;
      if (this.selDragging) {
        target = current = window.scrollY;
        running = false;
        lastT = 0;
        return;
      }
      const d = target - current;
      if (Math.abs(d) < 0.25) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        lastT = 0;
        return;
      }
      const k = this.pinHeld ? 4.6 : 6.2;
      current += d * (1 - Math.exp(-k * dt));
      window.scrollTo(0, current);
      requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!running) {
        running = true;
        lastT = 0;
        requestAnimationFrame(tick);
      }
    };
    const wheelPx = e => {
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 16;else if (e.deltaMode === 2) d *= window.innerHeight;
      return Math.max(-140, Math.min(140, d)) * 1.1;
    };
    this.scrollTo = (y, fast) => {
      const dest = Math.max(0, Math.min(maxY(), y));
      if (fast || !smooth || window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
        const start = window.scrollY,
          dist = dest - start;
        if (Math.abs(dist) < 2) return;
        const dur = Math.max(750, Math.min(1650, 560 + Math.abs(dist) * 0.24));
        const t0 = performance.now();
        cancelAnimationFrame(this.glideRaf || 0);
        const glide = now => {
          const p = Math.min(1, (now - t0) / dur);
          const d = this.glideResolve ? Math.max(0, Math.min(maxY(), this.glideResolve())) - start : dist;
          const ease = p < 0.5 ? Math.pow(2, 20 * p - 10) / 2 : (2 - Math.pow(2, -20 * p + 10)) / 2;
          window.scrollTo(0, start + d * ease);
          if (p < 1) this.glideRaf = requestAnimationFrame(glide);else this.glideResolve = null;
        };
        this.glideRaf = requestAnimationFrame(glide);
        target = dest;
        current = dest;
        return;
      }
      target = dest;
      kick();
    };
    if (smooth) {
      this.on(window, "wheel", e => {
        if (e.ctrlKey || this.contactOpen || this.locked || this.legalOpen || this.workOpen) return;
        e.preventDefault();
        if (this.glideRaf) {
          cancelAnimationFrame(this.glideRaf);
          this.glideRaf = 0;
          this.glideResolve = null;
          current = window.scrollY;
        }
        target = Math.max(0, Math.min(maxY(), target + wheelPx(e)));
        kick();
      }, {
        passive: false
      });
      this.on(window, "keydown", e => {
        const step = {
          PageDown: 760,
          PageUp: -760,
          ArrowDown: 90,
          ArrowUp: -90,
          Home: -1e7,
          End: 1e7
        }[e.key];
        const tag = e.target && e.target.tagName || "";
        if (step === undefined || /input|textarea/i.test(tag) || this.contactOpen || this.legalOpen) return;
        e.preventDefault();
        target = Math.max(0, Math.min(maxY(), target + step));
        kick();
      });
      this.on(window, "scroll", () => {
        if (!running || this.selDragging) {
          target = current = window.scrollY;
        }
      }, {
        passive: true
      });
      this.on(window, "pointerdown", e => {
        if (e.pointerType !== "touch" && e.isPrimary) this.selPtr = 1;
      }, {
        passive: true
      });
      this.on(window, "pointermove", () => {
        if (!this.selPtr || this.selDragging) return;
        const s = window.getSelection && window.getSelection();
        if (s && s.rangeCount && !s.isCollapsed) this.selDragging = 1;
      }, {
        passive: true
      });
      const endSelDrag = () => {
        if (!this.selPtr && !this.selDragging) return;
        this.selPtr = 0;
        this.selDragging = 0;
        target = current = window.scrollY;
      };
      this.on(window, "pointerup", endSelDrag, {
        passive: true
      });
      this.on(window, "pointercancel", endSelDrag, {
        passive: true
      });
      this.on(window, "blur", endSelDrag);
    }
    let bar = root.querySelector("[data-progress]");
    let nav = root.querySelector("[data-nav]");
    let heroShift = root.querySelector("[data-hero-shift]");
    let bottomBlur = root.querySelector("[data-bottomblur]");
    if (bottomBlur) bottomBlur.style.transition = "opacity 0.7s " + E;
    const paras = q("[data-parallax]").filter(el => !el.closest('[data-r="s3-field"]')).map(el => ({
      el: el,
      s: num(el, "data-parallax", 0.04)
    }));
    const heroCar = root.querySelector("img[data-hero]");
    const heroPanel = root.querySelector("#top");
    if (heroCar && heroPanel && !reduced) {
      heroCar.style.cursor = "pointer";
      this.on(heroCar, "pointerenter", () => {
        if (this.heroLap) return;
        if (this.heroRev) this.heroRev.cancel();
        this.heroRev = heroCar.animate([{
          transform: "rotate(0deg)"
        }, {
          transform: "rotate(-7deg) translateY(-2px)"
        }, {
          transform: "rotate(-5deg) translateY(-1px)"
        }], {
          duration: 340,
          easing: E,
          fill: "forwards"
        });
      });
      this.on(heroCar, "pointerleave", () => {
        if (this.heroLap) return;
        if (this.heroRev) {
          this.heroRev.cancel();
          this.heroRev = null;
        }
        const a = heroCar.animate([{
          transform: "rotate(-5deg) translateY(-1px)"
        }, {
          transform: "rotate(0deg)"
        }], {
          duration: 480,
          easing: E
        });
        a.onfinish = () => a.cancel();
      });
      const heroPuff = (vx, vy, scale, driftX) => {
        let layer = heroPanel.querySelector("[data-hero-smoke]");
        if (!layer) {
          layer = document.createElement("div");
          layer.setAttribute("data-hero-smoke", "1");
          layer.style.cssText = "position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;z-index:3";
          heroPanel.appendChild(layer);
        }
        const pr = heroPanel.getBoundingClientRect();
        const d = 22 + Math.random() * 26;
        const p = document.createElement("span");
        p.style.cssText = "position:absolute;left:" + (vx - pr.left - d / 2).toFixed(0) + "px;top:" + (vy - pr.top - d / 2).toFixed(0) + "px;width:" + d.toFixed(0) + "px;height:" + d.toFixed(0) + "px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.55),rgba(255,255,255,0));filter:blur(5px);will-change:transform,opacity";
        layer.appendChild(p);
        const a = p.animate([{
          transform: "translate(0,0) scale(0.4)",
          opacity: 0.6
        }, {
          transform: "translate(" + driftX + "px," + (-8 - Math.random() * 16).toFixed(0) + "px) scale(" + scale + ")",
          opacity: 0
        }], {
          duration: 640 + Math.random() * 300,
          easing: "cubic-bezier(0.16,1,0.3,1)",
          fill: "forwards"
        });
        a.onfinish = () => p.remove();
      };
      this.on(heroCar, "click", () => {
        if (this.heroLap || this.locked) return;
        this.heroLap = true;
        if (this.heroRev) {
          this.heroRev.cancel();
          this.heroRev = null;
        }
        const run = heroPanel.getBoundingClientRect().width / 2 + 220;
        const trail = setInterval(() => {
          const cr = heroCar.getBoundingClientRect();
          heroPuff(cr.left + cr.width * 0.1, cr.top + cr.height * 0.68, 1.7 + Math.random() * 0.9, -(20 + Math.random() * 28));
        }, 40);
        setTimeout(() => clearInterval(trail), 450);
        const launch = heroCar.animate([{
          transform: "rotate(-5deg)",
          filter: "blur(0px)"
        }, {
          transform: "translateX(" + (run * 0.4).toFixed(0) + "px) rotate(-2deg) scaleX(1.5) scaleY(0.9)",
          filter: "blur(2.6px)",
          offset: 0.55
        }, {
          transform: "translateX(" + run.toFixed(0) + "px) scaleX(1.3)",
          filter: "blur(1.6px)"
        }], {
          duration: 460,
          easing: "cubic-bezier(0.6,0,0.9,1)",
          fill: "forwards"
        });
        launch.onfinish = () => {
          const back = heroCar.animate([{
            transform: "translateX(" + (-run).toFixed(0) + "px) scaleX(1.3)",
            filter: "blur(1.6px)"
          }, {
            transform: "translateX(14px) scaleX(1.02)",
            filter: "blur(0.4px)",
            offset: 0.78
          }, {
            transform: "translateX(0) rotate(0deg)",
            filter: "blur(0px)"
          }], {
            duration: 900,
            easing: "cubic-bezier(0.16,1,0.3,1)",
            fill: "forwards"
          });
          back.onfinish = () => {
            back.cancel();
            this.heroLap = false;
            const cr = heroCar.getBoundingClientRect();
            for (let k = 0; k < 3; k++) heroPuff(cr.left + cr.width * (0.18 + 0.3 * k), cr.top + cr.height * 0.8, 1.25, 8 - k * 9);
          };
        };
      });
    }
    const footCar = document.querySelector("[data-foot-car]");
    const footBand = footCar && footCar.closest('[data-r="footer"]');
    if (footCar && footBand && !reduced) {
      const carImg = footCar.querySelector("img");
      const carLines = footCar.querySelectorAll("[data-car-line]");
      const carShadow = footCar.querySelector("[data-car-shadow]");
      let carX = -160,
        carRaf = 0,
        carLive = false,
        carCued = false;
      footCar.style.opacity = "1";
      const footPuff = n => {
        let layer = footBand.querySelector("[data-foot-smoke]");
        if (!layer) {
          layer = document.createElement("div");
          layer.setAttribute("data-foot-smoke", "1");
          layer.setAttribute("aria-hidden", "true");
          layer.style.cssText = "position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;z-index:2";
          footBand.appendChild(layer);
        }
        const br = footBand.getBoundingClientRect();
        const cr2 = footCar.getBoundingClientRect();
        for (let k = 0; k < n; k++) {
          const d = 18 + Math.random() * 22;
          const x = cr2.left - br.left + cr2.width * (0.06 + Math.random() * 0.22);
          const y = cr2.top - br.top + cr2.height * (0.72 + Math.random() * 0.2);
          const p = document.createElement("span");
          p.style.cssText = "position:absolute;left:" + (x - d / 2).toFixed(0) + "px;top:" + (y - d / 2).toFixed(0) + "px;width:" + d.toFixed(0) + "px;height:" + d.toFixed(0) + "px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.5),rgba(255,255,255,0));filter:blur(5px);will-change:transform,opacity";
          layer.appendChild(p);
          const a = p.animate([{
            transform: "translate(0,0) scale(0.4)",
            opacity: 0.55
          }, {
            transform: "translate(" + (-16 - Math.random() * 30).toFixed(0) + "px," + (-6 - Math.random() * 14).toFixed(0) + "px) scale(" + (1.5 + Math.random() * 0.8).toFixed(2) + ")",
            opacity: 0
          }], {
            duration: 700 + Math.random() * 320,
            delay: k * 55,
            easing: "cubic-bezier(0.16,1,0.3,1)",
            fill: "forwards"
          });
          a.onfinish = () => p.remove();
        }
      };
      let carFast = false,
        carBraked = false;
      const carGateEl = footBand.querySelector('[data-r="foot-note"]') || footBand.querySelector('[data-r="foot-btns"]');
      let carGate = true;
      if (false) {
        const gateWatch = setInterval(() => {
          if (!carGateEl.dataset.revealDone) return;
          clearInterval(gateWatch);
          const wait = (parseFloat(carGateEl.getAttribute("data-delay") || "0") + 0.1) * 1000;
          setTimeout(() => {
            carGate = true;
            carKick();
          }, wait);
        }, 120);
        this.cleanup.push(() => clearInterval(gateWatch));
      }
      const carTick = () => {
        carRaf = 0;
        const narrow = window.matchMedia("(max-width:1024px)").matches;
        const fr = footBand.getBoundingClientRect();
        const cr = footCar.getBoundingClientRect();
        const maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const finalTop = fr.top + window.scrollY - maxY;
        const span = Math.max(120, window.innerHeight - finalTop);
        const left = maxY - window.scrollY;
        const byRise = (window.innerHeight - cr.top - 40) / (window.innerHeight * 0.42);
        const byEnd = 1 - left / Math.max(1, Math.min(window.innerHeight * 0.6, fr.height));
        const p = narrow ? Math.max(0, Math.min(1, Math.max(byRise, byEnd))) : Math.max(0, Math.min(1, (window.innerHeight - fr.top) / span));
        const CUE = narrow ? 0.04 : 0.1;
        const runIn = fr.width / 2 + 110;
        const startX = narrow ? -runIn : -140;
        if (!carCued && carGate && p >= CUE) {
          carCued = true;
          footCar.style.transition = "opacity 0.45s " + E;
          footCar.style.opacity = "1";
        } else if (carCued && p < CUE - 0.06) {
          carCued = false;
          carFast = false;
          carBraked = false;
          footCar.style.transition = "opacity 0.55s " + E;
          footCar.style.opacity = "0";
          clearTimeout(this.carReset);
          this.carReset = setTimeout(() => {
            if (carCued) return;
            carX = startX;
            this.carVel = 0;
            footCar.style.transform = "translate3d(" + startX.toFixed(1) + "px,0,0)";
          }, 580);
        }
        if (!carCued && !this.carReset) {
          carX = startX;
          this.carVel = 0;
        }
        const pdL = Math.max(0, Math.min(1, (p - CUE) / (1 - CUE)));
        const pd = 1 - Math.pow(1 - pdL, 1.5);
        const target = narrow ? -runIn + pd * runIn : -140 + pd * ((fr.width - 96) / 2 + 140);
        const nowT = performance.now();
        const dt = Math.min(0.034, Math.max(0.006, (nowT - (this.carT || nowT - 16)) / 1000));
        this.carT = nowT;
        const K = 40,
          D = 2 * Math.sqrt(40);
        let vel = this.carVel || 0;
        const steps = Math.max(1, Math.ceil(dt / 0.012));
        const sdt = dt / steps;
        for (let s = 0; s < steps; s++) {
          vel += (-K * (carX - target) - D * vel) * sdt;
          carX += vel * sdt;
        }
        if (Math.abs(target - carX) < 0.25 && Math.abs(vel) < 6) {
          carX = target;
          vel = 0;
        }
        this.carVel = vel;
        const v = vel,
          av = Math.abs(v);
        footCar.style.transform = "translate3d(" + carX.toFixed(2) + "px,0,0) rotate(" + Math.max(-5, Math.min(5, -v * 0.0055)).toFixed(2) + "deg)";
        if (carImg.style.filter) carImg.style.filter = "";
        const lo = Math.max(0, Math.min(0.7, av * 0.0011 - 0.06)).toFixed(2);
        const ls = (0.5 + Math.min(1.7, av * 0.0007)).toFixed(2);
        for (let i = 0; i < carLines.length; i++) {
          carLines[i].style.opacity = lo;
          carLines[i].style.transform = "scaleX(" + ls + ")";
        }
        if (carCued) {
          if (av > 900) carFast = true;
          if (carFast && !carBraked && av < 190) {
            carBraked = true;
            footPuff(3);
          }
        }
        if (carShadow) {
          carShadow.style.transform = "translateX(" + (v * 0.012).toFixed(1) + "px) scaleX(" + (1 + Math.min(0.5, av * 0.00024)).toFixed(2) + ")";
          carShadow.style.opacity = (0.32 - Math.min(0.15, av * 0.00007)).toFixed(2);
        }
        if (carLive || av > 0.5 || Math.abs(target - carX) > 0.25) carRaf = requestAnimationFrame(carTick);
      };
      const carKick = () => {
        if (!carRaf) carRaf = requestAnimationFrame(carTick);
      };
      this.carKick = carKick;
      const carIo = new IntersectionObserver(es => {
        carLive = es[0].isIntersecting;
        if (carLive) carKick();
      }, {
        rootMargin: "240px"
      });
      this.on(window, "touchend", carKick, {
        passive: true
      });
      this.on(window, "resize", carKick, {
        passive: true
      });
      carIo.observe(footBand);
      this.on(window, "scroll", carKick, {
        passive: true
      });
      this.cleanup.push(() => {
        carIo.disconnect();
        cancelAnimationFrame(carRaf);
      });
    }
    let navRest = root.querySelector("[data-nav-rest]");
    let navRule = root.querySelector("[data-nav-rule]");
    const fillLine = root.querySelector("[data-fill-line]");
    const fillWords = q("[data-fw]");
    const fillPop = !!(fillLine && fillLine.hasAttribute("data-fill-pop"));
    const s3Wrap = root.querySelector('[data-r="s3-wrap"]');
    const s3Stage = root.querySelector('[data-r="s3-stage"]');
    const s3Bloom = root.querySelector("[data-s3-bloom]");
    const s3Beats = q("[data-s3-beat]").map(el => {
      const rng = (a, d) => (el.getAttribute(a) || d).split(",").map(Number);
      return {
        el: el,
        eb: el.querySelector("[data-s3-eb]"),
        words: Array.from(el.querySelectorAll("[data-s3-w]")),
        tin: rng("data-in", "0,1"),
        tout: rng("data-out", "1,2")
      };
    });
    const s3Tiles = q('[data-r="s3-field"] [data-atmo]').map(el => ({
      el: el,
      o: parseFloat(el.style.opacity || getComputedStyle(el).opacity) || 0.4,
      d: num(el, "data-d", 0.5),
      ux: 0,
      uy: 0,
      card: null
    }));
    const s3Measure = (w, h) => {
      if (!w || !h) return;
      s3Tiles.forEach(t => {
        const dx = t.el.offsetLeft / w - 0.5;
        const dy = t.el.offsetTop / h - 0.5;
        const len = Math.max(0.18, Math.sqrt(dx * dx + dy * dy));
        t.ux = dx / len;
        t.uy = dy / len;
      });
    };
    this.s3mx = 0;
    this.s3my = 0;
    {
      let tx = 0,
        ty = 0;
      this.on(document, "pointermove", e => {
        tx = e.clientX / window.innerWidth - 0.5;
        ty = e.clientY / window.innerHeight - 0.5;
      }, {
        passive: true
      });
      let mWrap = null,
        mCheck = 0,
        mVis = false;
      const ease = () => {
        const dx = tx - this.s3mx,
          dy = ty - this.s3my;
        this.s3mx += dx * 0.05;
        this.s3my += dy * 0.05;
        if (this.s3Write && (Math.abs(dx) > 0.0008 || Math.abs(dy) > 0.0008)) {
          if (!(mCheck++ % 10)) {
            if (!mWrap || !mWrap.isConnected) mWrap = document.querySelector('[data-r="s3-wrap"]');
            const r = mWrap && mWrap.getBoundingClientRect();
            mVis = !!r && r.bottom > -200 && r.top < window.innerHeight + 200;
          }
          if (mVis) this.s3Write();
        }
        this.s3mxRaf = requestAnimationFrame(ease);
      };
      this.s3mxRaf = requestAnimationFrame(ease);
      this.cleanup.push(() => cancelAnimationFrame(this.s3mxRaf));
    }
    const s3Settle = () => {
      if (s3Wrap) s3Wrap.style.height = "100vh";
      s3Beats.forEach((b, i) => {
        b.el.style.display = i === 1 || i === 3 ? "" : "none";
        if (i === 3) {
          b.el.style.alignSelf = "end";
          b.el.style.paddingBottom = "9vh";
        }
        b.words.forEach(w => {
          w.style.opacity = "1";
          w.style.transform = "none";
          w.style.filter = "none";
        });
        if (b.eb) {
          b.eb.style.opacity = "1";
          b.eb.style.transform = "none";
        }
      });
    };
    if (reduced) s3Settle();
    let pinWrap = root.querySelector("[data-pin-wrap]");
    let pinInner = root.querySelector("[data-pin]");
    let trackFrame = root.querySelector("[data-track-frame]");
    let pinZoom = root.querySelector("[data-pin-zoom]");
    let stepItems = q("[data-step-item]");
    let stepMark = root.querySelector("[data-step-mark]");
    const WK_SPANS = [[1, 1], [2, 2], [3, 3], [4, 4]];
    let wkTicks = q("[data-wk]");
    let wkBar = root.querySelector("[data-wk-bar]");
    let railFill = root.querySelector("[data-rail-fill]");
    let pinContent = root.querySelector("[data-pin-content]");
    let moms = q("[data-mom]");
    const paneParts = list => list.map(m => ({
      el: m,
      hidden: getComputedStyle(m).visibility === "hidden",
      tw: Array.prototype.slice.call(m.querySelectorAll("[data-tw]")),
      pe: Array.prototype.slice.call(m.querySelectorAll("[data-pe]")),
      mw: Array.prototype.slice.call(m.querySelectorAll("[data-mw]"))
    }));
    let parts = paneParts(moms);
    let momWords = parts.map(x => x.mw);
    let odo = root.querySelector("[data-odo]");
    let numStrip = root.querySelector("[data-numstrip]");
    let stepCount = root.querySelector("[data-step-count]");
    let stepOn = -1;
    const coarsePtr = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
    this.copySpan = coarsePtr ? 0.92 : 0.5;
    this.stickyPin = true;
    let heroCap = root.querySelector("[data-capsule]");
    let navRestW = 0;
    const measureNav = () => {
      if (!navRest) return;
      const prev = navRest.style.maxWidth,
        tr = navRest.style.transition;
      navRest.style.transition = "none";
      navRest.style.maxWidth = "none";
      navRestW = Math.ceil(navRest.scrollWidth) + 20;
      navRest.style.maxWidth = this.navState === "full" ? navRestW + "px" : prev || "0px";
      void navRest.offsetWidth;
      navRest.style.transition = tr;
    };
    if (nav) {
      nav.style.transition = "transform 0.72s " + E + ", opacity 0.34s " + E + ", filter 0.5s " + E;
      if (navRest) navRest.style.transition = "max-width 0.9s " + E + ", opacity 0.55s " + E;
      measureNav();
      requestAnimationFrame(measureNav);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureNav).catch(() => {});
      setTimeout(measureNav, 900);
      this.on(window, "resize", measureNav);
    }
    let navOn = false,
      raf = 0;
    const touchPtr = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    this.sy = window.scrollY;
    const readY = () => {
      const raw = window.scrollY;
      if (!touchPtr || reduced) {
        this.sy = raw;
        return raw;
      }
      const d = raw - this.sy;
      if (Math.abs(d) < 0.3) {
        this.sy = raw;
        return raw;
      }
      this.sy += d * 0.16;
      this.ySettling = true;
      return this.sy;
    };
    const frame = () => {
      const y = readY();
      if (bottomBlur) {
        const left = maxY() - y;
        const inA = Math.max(0, Math.min(1, (y - 160) / 260));
        const outA = Math.max(0, Math.min(1, left / 120));
        bottomBlur.style.opacity = String(Math.min(inA, outA));
      }
      if (bar) bar.style.width = (maxY() ? y / maxY() * 100 : 0).toFixed(2) + "%";
      if (nav) {
        const panelOpen = pinInner && pinInner.dataset.pinState === "on";
        const hold = this.navState === "full" ? y > 84 : y > 156;
        const state = this.contactOpen || panelOpen ? "off" : hold ? "full" : "off";
        if (state !== this.navState) {
          const prev = this.navState;
          this.navState = state;
          navOn = state !== "off";
          clearTimeout(this.navT);
          clearTimeout(this.navT2);
          const morph = () => {
            if (!heroCap) return "translateX(-50%) translateY(-11px) scale(0.982)";
            const nr = nav.getBoundingClientRect(),
              cr2 = heroCap.getBoundingClientRect();
            if (!nr.height || !cr2.height) return "translateX(-50%) translateY(-6px) scale(0.94)";
            const dx = cr2.left + cr2.width / 2 - (nr.left + nr.width / 2);
            const dy = cr2.top + cr2.height / 2 - (nr.top + nr.height / 2);
            const sc = Math.max(0.72, Math.min(1, cr2.height / nr.height));
            return "translateX(-50%) translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
          };
          if (state === "off") {
            if (navRule) navRule.style.opacity = "0";
            nav.style.pointerEvents = "none";
            nav.style.transition = "transform 0.66s " + E + ", opacity 0.26s " + E + " 0.34s, filter 0.3s " + E;
            nav.style.filter = "blur(0px)";
            nav.style.transform = morph();
            nav.style.opacity = "0";
            if (navRest) {
              navRest.style.transition = "max-width 0.62s " + E + ", opacity 0.34s " + E + " 0.1s";
              navRest.style.maxWidth = "0px";
              navRest.style.opacity = "0";
            }
            this.navT = setTimeout(() => {
              if (this.navState !== "off") return;
              nav.style.visibility = "hidden";
              nav.style.transition = "none";
              nav.style.transform = "translateX(-50%) translateY(0) scale(1)";
              void nav.offsetWidth;
              nav.style.transition = "transform 0.72s " + E + ", opacity 0.34s " + E + ", filter 0.5s " + E;
              if (navRest) {
                navRest.style.transition = "none";
                navRest.style.maxWidth = "0px";
                navRest.style.opacity = "0";
                void navRest.offsetWidth;
                navRest.style.transition = "max-width 0.9s " + E + ", opacity 0.55s " + E;
              }
            }, 700);
          } else {
            nav.style.visibility = "visible";
            nav.style.transition = "none";
            nav.style.filter = "blur(0px)";
            nav.style.transform = morph();
            nav.style.opacity = "0";
            if (navRest) {
              navRest.style.transition = "none";
              navRest.style.maxWidth = "0px";
              navRest.style.opacity = "0";
            }
            void nav.offsetWidth;
            nav.style.transition = "transform 0.72s " + E + ", opacity 0.3s " + E + ", filter 0.3s " + E;
            nav.style.opacity = "1";
            nav.style.pointerEvents = "auto";
            nav.style.transform = "translateX(-50%) translateY(0) scale(1)";
            if (navRest) {
              navRest.style.transition = "max-width 0.72s " + E + " 0.06s, opacity 0.44s " + E + " 0.12s";
              navRest.style.maxWidth = navRestW + "px";
              navRest.style.opacity = "1";
            }
            if (navRule) navRule.style.opacity = "1";
          }
          void prev;
          if (heroCap) {
            const capTo = () => {
              const nr = nav.getBoundingClientRect(),
                cr2 = heroCap.getBoundingClientRect();
              if (!nr.height || !cr2.height) return "translateY(-14px) scale(0.96)";
              const dx = nr.left + nr.width / 2 - (cr2.left + cr2.width / 2);
              const dy = nr.top + nr.height / 2 - (cr2.top + cr2.height / 2);
              return "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px) scale(" + Math.min(1.25, nr.height / cr2.height).toFixed(3) + ")";
            };
            heroCap.style.willChange = "transform,opacity,filter";
            if (state === "off") {
              heroCap.style.transition = "transform 0.72s " + E + ", opacity 0.32s " + E + " 0.24s, filter 0.32s " + E + " 0.24s";
              heroCap.style.transform = "translate(0,0) scale(1)";
              heroCap.style.opacity = "1";
              heroCap.style.filter = "blur(0px)";
            } else {
              heroCap.style.transition = "transform 0.72s " + E + ", opacity 0.26s " + E + " 0.08s, filter 0.3s " + E;
              heroCap.style.transform = capTo();
              heroCap.style.opacity = "0";
              heroCap.style.filter = "blur(3px)";
            }
          }
          if (navRest) {
            const items = Array.prototype.slice.call(navRest.children);
            items.forEach((it, i) => {
              const k = state === "off" ? items.length - 1 - i : i;
              it.style.transition = state === "off" ? "transform 0.34s " + E + " " + (k * 0.03).toFixed(2) + "s, opacity 0.26s " + E + " " + (k * 0.03).toFixed(2) + "s" : "transform 0.62s " + E + " " + (0.14 + k * 0.05).toFixed(2) + "s, opacity 0.42s " + E + " " + (0.14 + k * 0.05).toFixed(2) + "s";
              it.style.transform = state === "off" ? "translateX(-10px)" : "translateX(0)";
              it.style.opacity = state === "off" ? "0" : "1";
            });
          }
        }
      }
      const teamPhone = window.matchMedia("(max-width:700px)").matches;
      const teamTouch = teamPhone || window.matchMedia && window.matchMedia("(hover: none)").matches;
      if (!reduced && teamTouch) {
        if (!this.teamTiles || !this.teamTiles.length || !this.teamTiles[0].isConnected) {
          this.teamTiles = Array.prototype.slice.call(document.querySelectorAll("[data-team-tile]"));
          this.teamVel = 0;
          this.teamPrevY = window.scrollY;
          this.teamLastT = performance.now();
        }
        const tt = this.teamTiles;
        const nowT = performance.now();
        const dtT = Math.min(100, Math.max(1, nowT - (this.teamLastT || nowT)));
        const dyT = window.scrollY - (this.teamPrevY == null ? window.scrollY : this.teamPrevY);
        this.teamPrevY = window.scrollY;
        this.teamLastT = nowT;
        const keep = Math.pow(0.86, dtT / 16);
        this.teamVel = this.teamVel * keep + Math.min(40, Math.abs(dyT) / dtT * 16) * (1 - keep);
        const speed = Math.min(1, this.teamVel / 22);
        if (Math.abs(dyT) > 0.5) this.teamMoveT = nowT;
        const movingNow = nowT - (this.teamMoveT || 0) < 240;
        for (let i = 0; i < tt.length; i++) {
          const el = tt[i],
            r = el.getBoundingClientRect();
          const nx = tt[i + 1];
          let p = 0;
          if (nx) {
            const nr = nx.getBoundingClientRect();
            p = Math.max(0, Math.min(1, 1 - (nr.top - r.top) / Math.max(1, r.height + 60)));
          }
          if (!teamPhone) p = 0;
          const tf = p > 0.002 ? "scale(" + (1 - 0.05 * p).toFixed(4) + ") translate3d(0," + (-14 * p).toFixed(1) + "px,0)" : "";
          if (el.dataset.ttf !== tf) {
            el.dataset.ttf = tf;
            el.style.transform = tf;
          }
          const face = el.querySelector("[data-hanger-face]");
          if (face && teamPhone) {
            const o = (1 - 0.55 * p).toFixed(3);
            if (face.dataset.tdim !== o) {
              face.dataset.tdim = o;
              face.style.opacity = o;
            }
          }
          const v = el.querySelector("[data-hover-clip]");
          if (v) {
            const onScreen = r.top < window.innerHeight * 0.9 && r.bottom > window.innerHeight * 0.1 && p < 0.75;
            if (onScreen) {
              if (v.preload === "none") {
                v.preload = "auto";
                v.load();
              }
              v.__wanted = true;
              if (v.readyState === 0 && !v.__loadKick) {
                v.__loadKick = 1;
                try {
                  v.load();
                } catch (e) {}
              }
              if (!v.__done && !v.__playing) {
                const nowT2 = performance.now();
                if (!v.__try || nowT2 - v.__try > 700) {
                  v.__try = nowT2;
                  v.loop = false;
                  if (!v.__armed) {
                    v.__armed = 1;
                    try {
                      v.currentTime = 0;
                      v.playbackRate = 1;
                    } catch (err) {}
                    const settle = () => {
                      v.__done = 1;
                      v.style.transition = "opacity 1.1s " + E;
                      v.style.opacity = "0";
                      setTimeout(() => {
                        try {
                          v.pause();
                          v.currentTime = 0;
                        } catch (err) {}
                      }, 1100);
                    };
                    v.addEventListener("ended", settle, {
                      once: true
                    });
                    v.addEventListener("playing", () => {
                      v.__playing = 1;
                      v.style.transition = "opacity 0.75s " + E;
                      v.style.opacity = "1";
                      const ms = (isFinite(v.duration) && v.duration > 0 ? v.duration * 1000 : 6000) + 900;
                      setTimeout(() => {
                        if (!v.__done) settle();
                      }, ms);
                    }, {
                      once: true
                    });
                  }
                  const pr = v.play();
                  if (pr && pr.catch) pr.catch(() => {});
                }
              }
            } else if (v.style.opacity === "1") {
              v.__wanted = false;
              v.__done = 1;
              v.style.opacity = "0";
              setTimeout(() => {
                if (v.style.opacity === "0") {
                  try {
                    v.pause();
                  } catch (e) {}
                }
              }, 600);
            }
          }
        }
      }
      const svcPhone = !reduced && window.matchMedia("(max-width:700px)").matches;
      if (!svcPhone && this.svcScrubbed && this.svcReset) this.svcReset();
      if (svcPhone) {
        this.svcScrubbed = true;
        if (!this.svcCards || !this.svcCards.length || !this.svcCards[0].isConnected) {
          this.svcCards = Array.prototype.slice.call(document.querySelectorAll('[data-r="svc-row"]'));
        }
        const sc = this.svcCards;
        for (let i = 0; i < sc.length; i++) {
          const el = sc[i],
            r = el.getBoundingClientRect();
          if (r.bottom < -120 || r.top > window.innerHeight + 120) continue;
          const nx = sc[i + 1];
          let p = 0;
          if (nx) {
            const nr = nx.getBoundingClientRect();
            p = Math.max(0, Math.min(1, 1 - (nr.top - r.top) / Math.max(1, r.height + 96)));
          }
          const tf = p > 0.002 ? "scale(" + (1 - 0.055 * p).toFixed(4) + ")" : "";
          if (el.dataset.stf !== tf) {
            el.dataset.stf = tf;
            el.style.transform = tf;
          }
          const dim = el.querySelector("[data-svc-dim]");
          if (dim) {
            const o = (0.62 * p).toFixed(3);
            if (dim.dataset.op !== o) {
              dim.dataset.op = o;
              dim.style.opacity = o;
            }
          }
          const isPhone = window.matchMedia("(max-width:700px)").matches;
          const landed = r.top < window.innerHeight * 0.8;
          if (landed !== (el.dataset.svcIn === "1")) {
            el.dataset.svcIn = landed ? "1" : "";
            const hosts = el.querySelectorAll("[data-lines]");
            let k = 0;
            for (let hI = 0; hI < hosts.length; hI++) {
              const ws = hosts[hI].querySelectorAll("[data-hw]");
              for (let wI = 0; wI < ws.length; wI++, k++) {
                ws[wI].style.transition = "transform 1.6s " + E + " " + (0.06 + k * 0.065).toFixed(3) + "s";
                ws[wI].style.transform = landed ? "translate3d(0,0,0)" : "translate3d(0,112%,0)";
              }
            }
            const num = el.querySelector("[data-svc-num]");
            if (num) {
              num.style.transition = "opacity 1.0s " + E + ", transform 1.15s " + E;
              num.style.opacity = landed ? "1" : "0";
              num.style.transform = landed ? "none" : "translate3d(0,14px,0)";
            }
          }
        }
      }
      if (pinWrap && pinInner && moms.length) {
        if (this.stickyPin) {
          if (pinInner.dataset.pinState !== "sticky") {
            pinInner.dataset.pinState = "sticky";
            pinInner.style.position = "sticky";
            pinInner.style.top = "0px";
            pinInner.style.left = "0px";
            pinInner.style.width = "100%";
          }
          const wrS = pinWrap.getBoundingClientRect();
          const vhS = window.innerHeight;
          const travelS = Math.max(1, wrS.height - vhS);
          this.pinHeld = wrS.top <= 0 && -wrS.top <= travelS;
        }
        const wr = pinWrap.getBoundingClientRect();
        const vh = window.innerHeight,
          vw = window.innerWidth;
        const travel = Math.max(1, wr.height - vh);
        const p = Math.max(0, Math.min(1, -wr.top / travel));
        if (this.stickyPin) {} else if (wr.top > 0) {
          this.pinHeld = false;
          if (pinInner.dataset.pinState !== "before") {
            pinInner.dataset.pinState = "before";
            pinInner.style.position = "absolute";
            pinInner.style.top = "0px";
            pinInner.style.left = "0px";
            pinInner.style.width = "100%";
          }
        } else if (-wr.top <= travel) {
          this.pinHeld = true;
          pinInner.style.left = Math.round(wr.left) + "px";
          pinInner.style.width = Math.round(wr.width) + "px";
          if (pinInner.dataset.pinState !== "on") {
            pinInner.dataset.pinState = "on";
            pinInner.style.position = "fixed";
            pinInner.style.top = "0px";
          }
        } else if (pinInner.dataset.pinState !== "after") {
          this.pinHeld = false;
          pinInner.dataset.pinState = "after";
          pinInner.style.position = "absolute";
          pinInner.style.top = travel + "px";
          pinInner.style.left = "0px";
          pinInner.style.width = "100%";
        }
        const lead = vh * 0.8,
          tail = vh * 0.65;
        const ki = wr.top > 0 ? Math.max(0, Math.min(1, (lead - wr.top) / lead)) : 1;
        const ko = Math.max(0, Math.min(1, (wr.bottom - vh) / tail));
        const kz = Math.min(ki, ko);
        const kze = kz < 0.5 ? 4 * kz * kz * kz : 1 - Math.pow(-2 * kz + 2, 3) / 2;
        const ins = (15 * (1 - kze)).toFixed(1);
        const cp = "inset(" + ins + "px " + ins + "px " + ins + "px " + ins + "px round " + (29 * (1 - kze)).toFixed(1) + "px)";
        if (pinInner.dataset.cp !== cp) {
          pinInner.dataset.cp = cp;
          pinInner.style.clipPath = cp;
        }
        if (pinZoom) {
          const zt = "scale(" + (0.965 + 0.035 * kze).toFixed(3) + ")";
          if (pinZoom.dataset.zt !== zt) {
            pinZoom.dataset.zt = zt;
            pinZoom.style.transform = zt;
          }
        }
        const n = moms.length;
        if (railFill) {
          const rw = (p * 100).toFixed(1) + "%";
          if (railFill.dataset.w !== rw) {
            railFill.dataset.w = rw;
            railFill.style.width = rw;
          }
        }
        const LEAD = 0.3;
        const slot = p * (n + LEAD) - LEAD;
        const best = Math.max(0, Math.min(n - 1, Math.floor(slot + 0.2)));
        const ez = t => t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3);
        const cl = t => t < 0 ? 0 : t > 1 ? 1 : t;
        const EDGE = 0.2;
        for (let i = 0; i < parts.length; i++) {
          const pt = parts[i],
            d = slot - i;
          const onNow = d > -0.45 && d < 1.15;
          if (pt.hidden === onNow) {
            pt.hidden = !onNow;
            pt.el.style.visibility = onNow ? "visible" : "hidden";
          }
          if (!onNow) continue;
          const kin = i === 0 ? cl((d + EDGE) / EDGE) : cl(d / EDGE);
          const kout = i === parts.length - 1 ? 0 : cl((d - (1 - EDGE)) / EDGE);
          for (let k = 0; k < pt.tw.length; k++) {
            const s = k * 0.16;
            const a = ez(cl((kin - s) / (1 - s)));
            const b = ez(cl((kout - s) / (1 - s)));
            const tt = "translate3d(0," + ((1 - a) * 112 - b * 112).toFixed(1) + "%,0)";
            if (pt.tw[k].dataset.tf !== tt) {
              pt.tw[k].dataset.tf = tt;
              pt.tw[k].style.transform = tt;
            }
          }
          for (let k = 0; k < pt.pe.length; k++) {
            const s = 0.08 + (parseFloat(pt.pe[k].getAttribute("data-po")) || 0) * 0.1;
            const a = ez(cl((kin - s) / (1 - s)));
            const b = ez(cl(kout));
            const po = (a * (1 - b)).toFixed(2);
            if (pt.pe[k].dataset.op !== po) {
              pt.pe[k].dataset.op = po;
              pt.pe[k].style.opacity = po;
            }
            const ptf = "translate3d(0," + ((1 - a) * 26 - b * 26).toFixed(1) + "px,0)";
            if (pt.pe[k].dataset.tf !== ptf) {
              pt.pe[k].dataset.tf = ptf;
              pt.pe[k].style.transform = ptf;
            }
          }
          if (i === best) {
            const words = pt.mw;
            const fill = cl((d - 0.04) / (this.copySpan || 0.5));
            for (let j = 0; j < words.length; j++) {
              const wp = cl(fill * (words.length + 2) - j);
              const e2 = ez(wp);
              const w = words[j];
              if (!w.dataset.srReady) {
                w.dataset.srReady = "1";
                w.style.display = "inline-block";
                w.style.whiteSpace = "pre";
                w.style.transformOrigin = "0% 90%";
                w.style.color = "#FFFFFF";
                w.style.willChange = "transform, opacity";
              }
              const op = (0.22 + 0.78 * e2).toFixed(2);
              if (w.dataset.op !== op) {
                w.dataset.op = op;
                w.style.opacity = op;
              }
              const tf = "translate3d(0," + ((1 - e2) * 1.5).toFixed(1) + "px,0)";
              if (w.dataset.tf !== tf) {
                w.dataset.tf = tf;
                w.style.transform = tf;
              }
            }
          }
        }
        if (odo) {
          const ot = "translate3d(0,-" + (best * 1.2).toFixed(2) + "em,0)";
          if (odo.dataset.tf !== ot) {
            odo.dataset.tf = ot;
            odo.style.transform = ot;
          }
        }
        if (numStrip) {
          const xr = Math.min(n - 0.0001, Math.max(0, slot + 0.2));
          const fi = Math.floor(xr);
          const pos = Math.max(0, Math.min(n - 1, fi - 1 + ez(cl((xr - fi) / 0.2))));
          numStrip.style.transform = "translate3d(0,-" + (pos / n * 100).toFixed(3) + "%,0)";
        }
        if (best !== stepOn) {
          const fwd = best > stepOn;
          stepOn = best;
          this.stepNow = best;
          if (stepCount) stepCount.textContent = String(best + 1).padStart(2, "0");
          root.querySelectorAll("[data-mdot]").forEach((d, di) => {
            const bar = d.querySelector("[data-mdot-bar]");
            if (!bar) return;
            const on = di === best;
            bar.style.background = on ? "#FFFFFF" : "rgba(255,255,255,0.34)";
            bar.style.width = on ? "34px" : "26px";
          });
          void fwd;
          stepItems.forEach((s, i) => {
            s.style.color = i === best ? "#FFFFFF" : "rgba(255,255,255,0.36)";
            s.style.transform = "translate3d(" + (i === best ? 10 : 0) + "px,0,0)";
          });
          const sp = WK_SPANS[best] || WK_SPANS[0];
          if (wkBar) {
            wkBar.style.transform = "translate3d(" + (sp[0] - 1) * 100 + "%,0,0) scaleX(" + (sp[1] - sp[0] + 1) + ")";
          }
          wkTicks.forEach((t, i) => {
            const on = i + 1 >= sp[0] && i + 1 <= sp[1];
            t.style.transitionDelay = (Math.min(9, Math.abs(i + 1 - sp[0])) * 0.022).toFixed(3) + "s";
            t.style.height = on ? "26px" : "12px";
            t.style.background = on ? "#FFFFFF" : "rgba(255,255,255,0.28)";
          });
          const act = stepItems[best];
          if (stepMark && act) {
            const inset = Math.round(act.offsetHeight * 0.18);
            const len = Math.max(1, act.offsetHeight - inset * 2);
            stepMark.style.transform = "translate3d(0," + (Math.round(act.offsetTop) + inset) + "px,0) scaleY(" + len + ")";
          }
        }
      }
      if (s3Stage && !reduced) {
        const wr = s3Wrap.getBoundingClientRect();
        const vhR = window.innerHeight;
        const p = Math.max(0, Math.min(1, -wr.top / Math.max(1, wr.height - vhR)));
        if (wr.top < vhR * 1.4 && wr.bottom > -vhR * 0.4) {
          if (this.s3W !== wr.width || this.s3H !== vhR) {
            this.s3W = wr.width;
            this.s3H = vhR;
            s3Measure(wr.width, vhR);
          }
          const ez = t => 1 - Math.pow(1 - t, 3);
          const sm = t => t * t * (3 - 2 * t);
          const seg = (a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));
          const e = sm(seg(0, 0.085)) * (1 - sm(seg(0.9, 0.995)));
          s3Stage.style.clipPath = "inset(0px " + (15 - 15 * e).toFixed(2) + "px 0px " + (15 - 15 * e).toFixed(2) + "px round " + (29 - 29 * e).toFixed(2) + "px)";
          const dolly = 0.45 * p + 0.55 * ez(p);
          const lift = sm(seg(0, 0.1));
          const mx = this.s3mx || 0,
            my = this.s3my || 0;
          const focus = Math.sin(Math.PI * Math.max(0, Math.min(1, p)));
          s3Tiles.forEach(t => {
            const near = t.d;
            t.rise = -(40 + 240 * near) * (p - 0.5);
            t.push = (8 + 60 * near) * (dolly - 0.3);
            t.sc = 0.95 + (0.03 + 0.14 * near) * dolly;
            t.el.style.opacity = (t.o * (0.4 + 0.6 * lift)).toFixed(3);
          });
          this.s3Write = () => {
            const cmx = this.s3mx || 0,
              cmy = this.s3my || 0;
            s3Tiles.forEach(t => {
              const near = t.d;
              const cx = -cmx * (6 + 30 * near),
                cy = -cmy * (4 + 20 * near);
              t.el.style.transform = "translate3d(calc(-50% + " + (t.ux * (t.push || 0) + cx).toFixed(1) + "px),calc(-50% + " + ((t.rise || 0) + t.uy * (t.push || 0) + cy).toFixed(1) + "px),0) scale(" + (t.sc || 1).toFixed(3) + ")";
            });
          };
          this.s3Write();
          if (s3Bloom) {
            const bell = Math.sin(Math.PI * p);
            s3Bloom.style.opacity = (0.14 + 0.44 * bell).toFixed(3);
            s3Bloom.style.transform = "translate3d(0," + (26 - 62 * p).toFixed(1) + "px,0) scale(" + (1 + 0.28 * dolly).toFixed(3) + ")";
          }
          s3Beats.forEach(b => {
            const ti = seg(b.tin[0], b.tin[1]),
              to = seg(b.tout[0], b.tout[1]);
            const st = 0.5,
              span = b.words.length * st + 1;
            b.words.forEach((w, i) => {
              const a = ez(Math.max(0, Math.min(1, ti * span - i * st)));
              const c = ez(Math.max(0, Math.min(1, to * span - i * st)));
              const v = a - c;
              w.style.opacity = v.toFixed(3);
              w.style.transform = "translate3d(0," + ((1 - a) * 30 - c * 26).toFixed(1) + "px,0)";
              const nb = Math.round((1 - v) * 26) / 2;
              if (nb !== w.__fb) {
                w.__fb = nb;
                // Clearing an inline filter would restore the CSS entry blur.
                w.style.filter = nb > 0.1 ? "blur(" + nb + "px)" : "none";
              }
            });
            if (b.eb) {
              const g = sm(Math.max(0, Math.min(1, ti * 2.4))) * (1 - sm(Math.max(0, Math.min(1, to * 2.4))));
              b.eb.style.opacity = g.toFixed(3);
              b.eb.style.transform = "translate3d(0," + (12 - 12 * g).toFixed(1) + "px,0)";
              const eb = Math.round((1 - g) * 14) / 2;
              if (eb !== b.eb.__fb) {
                b.eb.__fb = eb;
                b.eb.style.filter = eb > 0.1 ? "blur(" + eb + "px)" : "none";
              }
            }
          });
        }
      }
      if (fillLine && fillWords.length && !reduced && !fillPop) {
        const r = fillLine.getBoundingClientRect();
        const from = window.innerHeight * 0.88,
          to = window.innerHeight * 0.3;
        const p = Math.max(0, Math.min(1, (from - r.top) / (from - to)));
        const n = fillWords.length;
        const darkFill = fillLine.hasAttribute("data-fill-dark");
        fillWords.forEach((w, i) => {
          const wp = Math.max(0, Math.min(1, p * (n + 2) - i));
          if (darkFill) {
            w.style.color = "rgba(255,255,255," + (0.24 + 0.76 * wp).toFixed(3) + ")";
            return;
          }
          const v = Math.round(219 - 219 * wp);
          w.style.color = "rgb(" + v + "," + Math.round(218 - 218 * wp) + "," + Math.round(215 - 215 * wp) + ")";
        });
      }
      if (heroShift && heroShift.style.transform) heroShift.style.transform = "";
      if (!reduced) paras.forEach(p => {
        const r = p.el.getBoundingClientRect();
        const mid = r.top + r.height / 2 - window.innerHeight / 2;
        p.el.style.setProperty("--px", "0");
        p.el.style.willChange = "transform";
        if (!p.el.hasAttribute("data-reveal")) p.el.style.transform = "translate3d(0," + (-mid * p.s).toFixed(1) + "px,0)";
      });
    };
    this.observeVis = (el, key, margin) => {
      if (!el || typeof IntersectionObserver !== "function") return;
      this["vis" + key] = true;
      const io = new IntersectionObserver(es => {
        this["vis" + key] = es[0].isIntersecting;
        if (es[0].isIntersecting && this.kickLoops) this.kickLoops();
      }, {
        rootMargin: (margin || 140) + "px"
      });
      io.observe(el);
      this.cleanup.push(() => io.disconnect());
    };
    {
      const conn = navigator.connection || {};
      const thrifty = !!conn.saveData || /(^|-)([23]g|slow-2g)$/.test(conn.effectiveType || "");
      const warm = () => {
        if (thrifty) return;
        const reach = window.innerHeight * 2;
        Array.prototype.forEach.call(document.querySelectorAll('img[loading="lazy"]'), im => {
          if (im.complete && im.naturalWidth) {
            im.removeAttribute("loading");
            return;
          }
          const r = im.getBoundingClientRect();
          if (r.top > reach || r.bottom < -reach) return;
          const pre = new Image();
          pre.onload = pre.onerror = () => im.removeAttribute("loading");
          pre.src = im.currentSrc || im.src;
        });
      };
      if (!thrifty) {
        let warmT = 0;
        this.on(window, "scroll", () => {
          clearTimeout(warmT);
          warmT = setTimeout(warm, 260);
        }, {
          passive: true
        });
      }
      const arm = () => {
        if (window.requestIdleCallback) requestIdleCallback(warm, {
          timeout: 5000
        });else setTimeout(warm, 3000);
      };
      if (document.readyState === "complete") setTimeout(arm, 2200);else this.on(window, "load", () => setTimeout(arm, 2200));
    }
    this.noiseDraw = null;
    if (!reduced) {
      const N = 1024,
        ALPHA = 15,
        EVERY = 3;
      let nBuf = null,
        nCtx = null,
        nEl = null,
        nFrame = 0,
        nRaf = 0;
      const bind = () => {
        const el = document.querySelector("[data-noise]");
        if (!el || !el.getContext) return false;
        if (el === nEl && nCtx) return true;
        nEl = el;
        if (el.width !== N || el.height !== N) {
          el.width = N;
          el.height = N;
        }
        nCtx = el.getContext("2d", {
          alpha: true
        });
        if (!nCtx) return false;
        nBuf = nCtx.createImageData(N, N);
        const p = nBuf.data;
        for (let i = 3; i < p.length; i += 4) p[i] = ALPHA;
        return true;
      };
      const seed = () => {
        if (!bind()) return false;
        const p = nBuf.data;
        for (let i = 0; i < p.length; i += 4) {
          const v = Math.random() * 255 | 0;
          p[i] = v;
          p[i + 1] = v;
          p[i + 2] = v;
        }
        nCtx.putImageData(nBuf, 0, 0);
        this.noiseAt = performance.now();
        return true;
      };
      this.noiseDraw = seed;
      const nStep = () => {
        nRaf = 0;
        try {
          if (!this.perfLow) {
            if (!nEl || !nEl.isConnected) bind();
            const r = nEl && nEl.getBoundingClientRect();
            if (r && r.width > 0 && r.bottom > -60 && r.top < window.innerHeight + 60 && nFrame % EVERY === 0) seed();
          }
        } catch (e) {}
        nFrame++;
        this.noiseAlive = nFrame;
        this.noiseAt = performance.now();
        nRaf = requestAnimationFrame(nStep);
        if (window.__fugazNoise && window.__fugazNoise.token === token) window.__fugazNoise.raf = nRaf;
      };
      const token = "n" + Date.now();
      if (window.__fugazNoise) {
        cancelAnimationFrame(window.__fugazNoise.raf || 0);
        clearInterval(window.__fugazNoise.keep || 0);
      }
      seed();
      nRaf = requestAnimationFrame(nStep);
      const nKeep = setInterval(() => {
        if (!window.__fugazNoise || window.__fugazNoise.token !== token) return;
        const stale = performance.now() - (this.noiseAt || 0) > 90;
        if (stale) {
          try {
            if (!this.perfLow) {
              if (!nEl || !nEl.isConnected) bind();
              const r = nEl && nEl.getBoundingClientRect();
              if (r && r.width > 0 && r.bottom > -60 && r.top < window.innerHeight + 60) seed();
            }
          } catch (e) {}
        }
        if (!nRaf) {
          nRaf = requestAnimationFrame(nStep);
          window.__fugazNoise.raf = nRaf;
        }
      }, 45);
      window.__fugazNoise = {
        token: token,
        raf: nRaf,
        keep: nKeep
      };
    }
    if (typeof IntersectionObserver === "function") {
      const grains = q(".fugaz-grain-live");
      if (grains.length) {
        const gio = new IntersectionObserver(es => {
          es.forEach(e => {
            if (e.isIntersecting) e.target.removeAttribute("data-grain-idle");else e.target.setAttribute("data-grain-idle", "1");
          });
        }, {
          rootMargin: "80px"
        });
        grains.forEach(g => {
          g.setAttribute("data-grain-idle", "1");
          gio.observe(g);
        });
        this.cleanup.push(() => gio.disconnect());
      }
    }
    if (!reduced && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      Array.prototype.forEach.call(document.querySelectorAll("[data-hover-clip]"), v => {
        const card = v.closest("[data-tilt]") || v.parentElement;
        if (!card || card.dataset.clipWired) return;
        card.dataset.clipWired = "1";
        let hovering = false;
        let resetTimer;
        const revealClip = () => {
          if (hovering) v.style.opacity = "1";
        };
        this.on(v, "playing", revealClip);
        this.on(card, "pointerenter", () => {
          hovering = true;
          clearTimeout(resetTimer);
          if (v.preload === "none") {
            v.preload = "auto";
            v.load();
          }
          // Reveal only once playback is ready; the matching still stays underneath.
          const playback = v.play();
          if (playback && playback.then) {
            playback.then(revealClip).catch(() => {});
          }
        });
        this.on(card, "pointerleave", () => {
          hovering = false;
          v.style.opacity = "0";
          clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            if (!hovering) {
              try {
                v.pause();
                v.currentTime = 0;
              } catch (e) {}
            }
          }, 560);
        });
        this.cleanup.push(() => {
          hovering = false;
          clearTimeout(resetTimer);
        });
      });
    }
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      const vids = Array.prototype.slice.call(document.querySelectorAll("[data-hover-clip]"));
      vids.forEach(v => {
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        v.setAttribute("muted", "");
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
      });
      const primeClips = () => {
        vids.forEach(v => {
          if (v.__primed) return;
          v.__primed = true;
          if (v.preload === "none") {
            v.preload = "auto";
            v.load();
          }
          const p = v.play();
          if (p && p.then) p.then(() => {
            if (!v.__wanted) v.pause();
          }).catch(() => {});else if (!v.__wanted) v.pause();
        });
        window.removeEventListener("touchstart", primeClips, true);
        window.removeEventListener("touchend", primeClips, true);
        window.removeEventListener("pointerup", primeClips, true);
      };
      window.addEventListener("touchstart", primeClips, {
        capture: true,
        passive: true
      });
      window.addEventListener("touchend", primeClips, {
        capture: true,
        passive: true
      });
      window.addEventListener("pointerup", primeClips, {
        capture: true,
        passive: true
      });
      const retryBlocked = () => {
        vids.forEach(v => {
          if (v.__blocked && v.__wanted) {
            v.__blocked = false;
            const p = v.play();
            if (p && p.catch) p.catch(() => {
              v.__blocked = true;
            });
          }
        });
      };
      window.addEventListener("touchend", retryBlocked, {
        capture: true,
        passive: true
      });
      this.cleanup.push(() => window.removeEventListener("touchend", retryBlocked, true));
      this.cleanup.push(() => {
        window.removeEventListener("touchend", primeClips, true);
        window.removeEventListener("pointerup", primeClips, true);
      });
    }
    if (!reduced && !window.matchMedia("(hover:hover) and (pointer:fine)").matches && "IntersectionObserver" in window) {
      const clips = Array.prototype.slice.call(document.querySelectorAll("[data-hover-clip]"));
      if (clips.length) {
        const cio = new IntersectionObserver(ents => {
          ents.forEach(en => {
            const v = en.target;
            if (en.isIntersecting && en.intersectionRatio >= 0.55) {
              const card = v.closest("[data-team-card]");
              return;
              clearTimeout(v.__clipT);
              v.__clipT = setTimeout(() => {
                if (v.preload === "none") {
                  v.preload = "auto";
                  v.load();
                }
                const p = v.play();
                if (p && p.catch) p.catch(() => {});
                v.style.transition = "opacity 1.1s " + E;
                v.style.opacity = "1";
              }, 900);
            } else if (!en.isIntersecting) {
              if (window.matchMedia("(max-width:700px)").matches) return;
              clearTimeout(v.__clipT);
              v.style.opacity = "0";
              setTimeout(() => {
                if (v.style.opacity === "0") {
                  try {
                    v.pause();
                  } catch (e) {}
                }
              }, 600);
            }
          });
        }, {
          threshold: [0, 0.55]
        });
        clips.forEach(v => cio.observe(v));
        this.cleanup.push(() => cio.disconnect());
      }
    }
    const teamHost = root.querySelector('[data-r="team-grid"]') || root.querySelector("#team");
    if (teamHost) this.observeVis(teamHost, "Team", 200);
    const heldTitle = document.title;
    this.on(document, "visibilitychange", () => {
      this.justResumed = true;
      this.perfPrev = 0;
      this.perfRun = 0;
      document.title = heldTitle;
    });
    this.cleanup.push(() => {
      document.title = heldTitle;
    });
    this.perfArmed = false;
    const armPerf = setTimeout(() => {
      this.perfArmed = true;
      this.perfPrev = 0;
      this.perfRun = 0;
    }, 4000);
    this.cleanup.push(() => clearTimeout(armPerf));
    const svcMq = window.matchMedia("(max-width:700px)");
    const svcReset = () => {
      this.svcScrubbed = false;
      Array.prototype.forEach.call(document.querySelectorAll('[data-r="svc-row"]'), el => {
        el.style.transform = "";
        delete el.dataset.stf;
        delete el.dataset.svcIn;
        const dim = el.querySelector("[data-svc-dim]");
        if (dim) {
          dim.style.opacity = "0";
          delete dim.dataset.op;
        }
        Array.prototype.forEach.call(el.querySelectorAll("[data-hw]"), w => {
          w.style.transition = "";
          w.style.transform = "translate3d(0,0,0)";
        });
        const num = el.querySelector("[data-svc-num]");
        if (num) {
          num.style.transition = "none";
          num.style.opacity = "";
          num.style.transform = "";
        }
      });
    };
    this.svcReset = svcReset;
    const svcOnMq = e => {
      this.svcCards = null;
      if (!(e && e.matches)) svcReset();
      safeFrame();
    };
    if (svcMq.addEventListener) {
      svcMq.addEventListener("change", svcOnMq);
      this.cleanup.push(() => svcMq.removeEventListener("change", svcOnMq));
    }
    const safeFrame = () => {
      try {
        frame();
      } catch (err) {
        if (!this.frameErr) {
          this.frameErr = 1;
          console.error("[fugaz] frame error", err);
        }
      }
    };
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) {
      let scrollRaf = 0;
      const kickFrame = () => {
        if (scrollRaf) return;
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0;
          safeFrame();
        });
      };
      this.on(window, "scroll", kickFrame, {
        passive: true
      });
      const clipsOnScreen = () => Array.prototype.slice.call(document.querySelectorAll("[data-hover-clip]")).filter(v => {
        const r = v.getBoundingClientRect();
        return r.height > 0 && r.top < window.innerHeight * 0.9 && r.bottom > window.innerHeight * 0.1;
      });
      const startVisible = () => {
        clipsOnScreen().forEach(v => {
          v.__wanted = true;
          if (v.preload === "none") {
            v.preload = "auto";
            v.load();
          }
          if (v.__done) return;
          if (v.paused) {
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
          }
        });
      };
      this.on(window, "touchmove", () => {
        this.teamMoveT = performance.now();
        startVisible();
        safeFrame();
      }, {
        passive: true
      });
    }
    let tickRaf = 0,
      lastTickY = -1;
    const tickBody = () => {
      const y = window.scrollY;
      if (y !== lastTickY) {
        lastTickY = y;
        safeFrame();
        if (this.carKick) this.carKick();
      } else if (this.pinHeld || this.ySettling) {
        this.ySettling = false;
        safeFrame();
      }
      if (!this.perfLow && this.perfArmed) {
        const nw = performance.now();
        const visible = document.visibilityState !== "hidden" && !this.justResumed;
        this.justResumed = false;
        if (this.perfPrev && visible) {
          const gap = nw - this.perfPrev;
          if (gap > 500) {
            this.perfSum = 0;
            this.perfN = 0;
            this.perfRun = 0;
          } else {
            this.perfSum = (this.perfSum || 0) + gap;
            this.perfN = (this.perfN || 0) + 1;
            this.perfRun = gap > 200 ? (this.perfRun || 0) + 1 : 0;
            const sustained = this.perfRun >= 24;
            if (sustained || this.perfN >= 120) {
              const avg = this.perfSum / this.perfN;
              this.perfSum = 0;
              this.perfN = 0;
              this.perfRun = 0;
              if (sustained || avg > 72) {
                this.perfLow = true;
                this.perfGoodRun = 0;
                document.documentElement.setAttribute("data-perf", "low");
                if (this.liqStep) {
                  this.liqStepSaved = this.liqStep;
                  this.liqStep = null;
                }
                this.lanyards = [];
              }
            }
          }
        }
        this.perfPrev = nw;
      } else if (this.perfLow) {
        const nw2 = performance.now();
        if (this.perfPrev && document.visibilityState !== "hidden" && !this.justResumed) {
          const gap2 = nw2 - this.perfPrev;
          this.perfGoodRun = gap2 < 40 && gap2 > 0 ? (this.perfGoodRun || 0) + 1 : 0;
          if (this.perfGoodRun > 100) {
            this.perfLow = false;
            this.perfGoodRun = 0;
            this.perfSum = 0;
            this.perfN = 0;
            this.perfRun = 0;
            document.documentElement.removeAttribute("data-perf");
            if (this.liqStepSaved) {
              this.liqStep = this.liqStepSaved;
              this.liqStepSaved = null;
            }
          }
        }
        this.justResumed = false;
        this.perfPrev = nw2;
      }
      if (this.waWatch) {
        try {
          this.waWatch();
        } catch (e) {}
      }
      if (this.liqStep && !this.contactOpen && this.visLiquid !== false) {
        try {
          this.liqStep();
        } catch (e) {}
      }
      if (this.lanyards && this.lanyards.length && !this.contactOpen && this.visTeam !== false) {
        const now = performance.now();
        this.lanyards.forEach(l => {
          if (l.tick) {
            try {
              l.tick(now);
            } catch (e) {}
          }
        });
      }
    };
    const myGen = this.tickGen = (this.tickGen || 0) + 1;
    const ticker = () => {
      if (this.tickGen !== myGen) return;
      this.tickAt = performance.now();
      try {
        tickBody();
      } catch (err) {
        if (!this.tickErr) {
          this.tickErr = String(err && err.message || err);
          console.error("[fugaz] tick error", err);
        }
      }
      tickRaf = requestAnimationFrame(ticker);
    };
    tickRaf = requestAnimationFrame(ticker);
    clearInterval(this.tickHeal);
    this.tickHeal = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      if (this.tickAt && performance.now() - this.tickAt < 900) return;
      cancelAnimationFrame(tickRaf);
      tickRaf = requestAnimationFrame(ticker);
    }, 1000);
    this.cleanup.push(() => {
      if (this.tickGen === myGen) {
        cancelAnimationFrame(tickRaf);
        clearInterval(this.tickHeal);
      }
    });
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        safeFrame();
      });
    };
    this.on(window, "scroll", onScroll, {
      passive: true
    });
    this.on(window, "resize", onScroll);
    const rebind = () => {
      const live = this.rootRef.current;
      if (!live) return;
      bar = live.querySelector("[data-progress]");
      nav = live.querySelector("[data-nav]");
      navRest = live.querySelector("[data-nav-rest]");
      navRule = live.querySelector("[data-nav-rule]");
      heroCap = live.querySelector("[data-capsule]");
      heroShift = live.querySelector("[data-hero-shift]");
      bottomBlur = live.querySelector("[data-bottomblur]");
      pinWrap = live.querySelector("[data-pin-wrap]");
      pinInner = live.querySelector("[data-pin]");
      trackFrame = live.querySelector("[data-track-frame]");
      pinZoom = live.querySelector("[data-pin-zoom]");
      parts = paneParts(moms);
      momWords = parts.map(x => x.mw);
      odo = live.querySelector("[data-odo]");
      numStrip = live.querySelector("[data-numstrip]");
      stepItems = Array.prototype.slice.call(live.querySelectorAll("[data-step-item]"));
      stepMark = live.querySelector("[data-step-mark]");
      wkTicks = Array.prototype.slice.call(live.querySelectorAll("[data-wk]"));
      wkBar = live.querySelector("[data-wk-bar]");
      railFill = live.querySelector("[data-rail-fill]");
      stepCount = live.querySelector("[data-step-count]");
      moms = Array.prototype.slice.call(live.querySelectorAll("[data-mom]"));
      this.contact = live.querySelector("[data-contact]") || document.querySelector("[data-contact]");
      if (nav) {
        nav.style.transition = "transform 0.72s " + E + ", opacity 0.34s " + E + ", filter 0.5s " + E;
        if (navRest) navRest.style.transition = "max-width 0.9s " + E + ", opacity 0.55s " + E;
        measureNav();
      }
      this.navState = null;
      stepOn = -1;
      wire();
      safeFrame();
    };
    [0, 200, 600, 1400, 2600].forEach(ms => {
      const t = setTimeout(rebind, ms);
      this.cleanup.push(() => clearTimeout(t));
    });
    this.on(window, "resize", rebind);
    this.cleanup.push(() => cancelAnimationFrame(raf));
    if (!reduced) {
      let track = null,
        mqGroup = null,
        setW = 1,
        ro = null;
      const bindMarquee = () => {
        const found = document.querySelector("[data-marquee]");
        if (!found) return false;
        if (found !== track) {
          track = found;
          mqGroup = track.querySelector("[data-mq-group]");
          if (ro) {
            ro.disconnect();
            ro = null;
          }
          if (window.ResizeObserver && mqGroup) {
            let queued = false;
            ro = new ResizeObserver(() => {
              if (queued) return;
              queued = true;
              requestAnimationFrame(() => {
                queued = false;
                measure();
              });
            });
            ro.observe(mqGroup);
          }
          track.querySelectorAll("img").forEach(im => {
            if (!im.complete) im.addEventListener("load", measure, {
              once: true
            });
          });
        }
        return true;
      };
      const measure = () => {
        if (!mqGroup) return;
        const w = mqGroup.getBoundingClientRect().width;
        if (w > 1) setW = w;
      };
      this.on(window, "resize", () => {
        bindMarquee();
        measure();
      });
      this.on(window, "load", () => {
        bindMarquee();
        measure();
      });
      let mx2 = 0,
        prevY = window.scrollY;
      const mqPush = () => {
        if (window.matchMedia("(max-width:700px)").matches) {
          prevY = window.scrollY;
          return;
        }
        if (!track || !track.isConnected) {
          bindMarquee();
          measure();
        }
        if (!track || !track.isConnected) return;
        if (setW <= 1) measure();
        const yy = window.scrollY,
          dy = yy - prevY;
        prevY = yy;
        mx2 -= dy * 0.34;
        mx2 = (mx2 % setW + setW) % setW - setW;
        track.style.transform = "translate3d(" + mx2.toFixed(2) + "px,0,0)";
      };
      this.on(window, "scroll", mqPush, {
        passive: true
      });
      const mqMask = (document.querySelector("[data-marquee-anim]") || {}).parentElement;
      if (mqMask) {
        let dragging = false,
          lastX = 0,
          lastT = 0,
          vel = 0,
          raf = 0;
        const wrap = () => {
          if (setW > 1) mx2 = (mx2 % setW + setW) % setW - setW;
        };
        const paint = () => {
          if (track) track.style.transform = "translate3d(" + mx2.toFixed(2) + "px,0,0)";
        };
        const glide = () => {
          if (dragging) return;
          vel *= 0.94;
          mx2 += vel;
          wrap();
          paint();
          if (Math.abs(vel) > 0.08) raf = requestAnimationFrame(glide);else raf = 0;
        };
        mqMask.style.cursor = "grab";
        mqMask.style.touchAction = "pan-y";
        this.on(mqMask, "pointerdown", ev => {
          if (!track || !track.isConnected) {
            bindMarquee();
            measure();
          }
          dragging = true;
          lastX = ev.clientX;
          lastT = performance.now();
          vel = 0;
          cancelAnimationFrame(raf);
          raf = 0;
          mqMask.style.cursor = "grabbing";
          try {
            mqMask.setPointerCapture(ev.pointerId);
          } catch (err) {}
        });
        this.on(mqMask, "pointermove", ev => {
          if (!dragging) return;
          const now = performance.now(),
            dt = Math.max(1, now - lastT),
            dx = ev.clientX - lastX;
          vel = dx / dt * 16;
          lastX = ev.clientX;
          lastT = now;
          mx2 += dx;
          wrap();
          paint();
        });
        const release = () => {
          if (!dragging) return;
          dragging = false;
          mqMask.style.cursor = "grab";
          raf = requestAnimationFrame(glide);
        };
        this.on(mqMask, "pointerup", release);
        this.on(mqMask, "pointercancel", release);
        this.on(window, "pointerup", release);
        this.cleanup.push(() => cancelAnimationFrame(raf));
      }
      bindMarquee();
      measure();
      this.cleanup.push(() => {
        if (ro) ro.disconnect();
      });
    }
    const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const rows = q("[data-trail]");
    if (rows.length && !reduced && !coarse) {
      const layer = document.createElement("div");
      layer.style.cssText = "position:fixed;inset:0;z-index:46;pointer-events:none;overflow:hidden";
      root.appendChild(layer);
      this.cleanup.push(() => layer.remove());
      let i = 0,
        lx = 0,
        ly = 0,
        armed = false,
        zi = 1;
      const paint = (el, token) => {
        if (/[./]/.test(token)) el.style.backgroundImage = "url(" + token + ")";else el.className = token;
      };
      rows.forEach(row => {
        const shots = (row.getAttribute("data-trail") || "").split(",").filter(Boolean);
        const gap = num(row, "data-trail-gap", 108);
        const pop = row.hasAttribute("data-trail-pop");
        const rule = row.querySelector("[data-svc-rule]");
        const nm = row.querySelector("[data-svc-num]");
        if (pop) {
          let cx = 0,
            cy = 0,
            fx = 0,
            fy = 0,
            plx = 0,
            ply = 0,
            on = false,
            rafId = 0;
          const spawn = (x, y, dx) => {
            const rot = Math.max(-19, Math.min(19, dx * 0.09)) + (Math.random() * 9 - 4.5);
            const turn = rot - (dx >= 0 ? 30 : -30);
            const W = 148,
              H = 196;
            const sh = document.createElement("div");
            const shTok = shots[i++ % shots.length];
            sh.style.cssText = "position:absolute;left:" + x.toFixed(1) + "px;top:" + y.toFixed(1) + "px;width:" + W + "px;height:" + H + "px;margin:" + -H / 2 + "px 0 0 " + -W / 2 + "px;z-index:" + zi++ + ";pointer-events:none;background-color:transparent;background-size:cover;" + "background-repeat:no-repeat;background-position:50% 50%;opacity:0;" + "transform:rotate(" + turn.toFixed(2) + "deg) scale(0.82);will-change:transform,opacity";
            paint(sh, shTok);
            layer.appendChild(sh);
            requestAnimationFrame(() => {
              sh.style.transition = "transform 0.95s " + E + ", opacity 0.24s " + E;
              sh.style.opacity = "1";
              sh.style.transform = "rotate(" + rot.toFixed(2) + "deg) scale(1)";
            });
            setTimeout(() => {
              sh.style.transition = "transform 0.9s " + E + ", opacity 0.62s " + E;
              sh.style.opacity = "0";
              sh.style.transform = "rotate(" + (rot + (dx >= 0 ? 9 : -9)).toFixed(2) + "deg) scale(0.97)";
            }, 760);
            setTimeout(() => sh.remove(), 1500);
            while (layer.children.length > 22) layer.children[0].remove();
          };
          const follow = () => {
            rafId = requestAnimationFrame(follow);
            fx += (cx - fx) * 0.12;
            fy += (cy - fy) * 0.12;
            if (!on || this.locked) {
              plx = fx;
              ply = fy;
              return;
            }
            const dx = fx - plx,
              dy = fy - ply;
            if (Math.hypot(dx, dy) < gap) return;
            plx = fx;
            ply = fy;
            spawn(fx, fy, dx);
          };
          this.on(row, "mouseenter", e => {
            cx = fx = plx = e.clientX;
            cy = fy = ply = e.clientY;
            on = true;
          });
          this.on(row, "mousemove", e => {
            cx = e.clientX;
            cy = e.clientY;
            on = !(e.target.closest && e.target.closest("a,button,input,textarea,[role=button]"));
          });
          this.on(row, "mouseleave", () => {
            on = false;
          });
          rafId = requestAnimationFrame(follow);
          this.cleanup.push(() => cancelAnimationFrame(rafId));
          return;
        }
        const ruleSlot = clientX => {
          const r = row.getBoundingClientRect();
          const f = Math.max(0, Math.min(1, (clientX - r.left) / (r.width || 1))) * 100;
          return "inset(0 " + (100 - f).toFixed(2) + "% 0 " + f.toFixed(2) + "%)";
        };
        this.on(row, "mouseenter", e => {
          lx = e.clientX;
          ly = e.clientY;
          armed = true;
          if (rule) {
            rule.style.transition = "none";
            rule.style.clipPath = ruleSlot(e.clientX);
            void rule.offsetWidth;
            rule.style.transition = "clip-path 0.9s " + E;
            rule.style.clipPath = "inset(0 0 0 0)";
          }
          if (nm) nm.style.color = "#0057FE";
        });
        this.on(row, "mouseleave", e => {
          armed = false;
          if (rule) {
            rule.style.transition = "clip-path 0.7s " + E;
            rule.style.clipPath = ruleSlot(e && e.clientX != null ? e.clientX : row.getBoundingClientRect().left);
          }
          if (nm) nm.style.color = "#808080";
        });
        this.on(row, "mousemove", e => {
          if (this.locked) return;
          if (!armed) {
            lx = e.clientX;
            ly = e.clientY;
            armed = true;
            return;
          }
          const dx = e.clientX - lx,
            dy = e.clientY - ly;
          if (Math.hypot(dx, dy) < gap) return;
          lx = e.clientX;
          ly = e.clientY;
          const rot = dx * 0.05 + (Math.random() * 5 - 2.5);
          const right = dx >= 0;
          const W = 292,
            H = 204;
          const wrap = document.createElement("div");
          wrap.style.cssText = "position:absolute;left:" + e.clientX + "px;top:" + e.clientY + "px;width:" + W + "px;height:" + H + "px;margin:" + -H / 2 + "px 0 0 " + -W / 2 + "px;overflow:hidden;z-index:" + zi++ + ";clip-path:inset(0 " + (right ? "100% 0 0" : "0 0 100%") + ");transform:rotate(" + rot.toFixed(2) + "deg) scale(0.98);will-change:clip-path,transform,opacity";
          const im = document.createElement("div");
          const imTok = shots[i++ % shots.length];
          im.style.cssText = "position:absolute;inset:0;background-color:transparent;background-size:cover;" + "background-repeat:no-repeat;background-position:50% 50%;transform:translateX(" + (right ? "-14%" : "14%") + ") scale(1.06);will-change:transform";
          paint(im, imTok);
          wrap.appendChild(im);
          layer.appendChild(wrap);
          requestAnimationFrame(() => {
            wrap.style.transition = "clip-path 0.68s " + E + ", transform 1s " + E;
            wrap.style.clipPath = "inset(0 0 0 0)";
            wrap.style.transform = "rotate(" + rot.toFixed(2) + "deg) scale(1)";
            im.style.transition = "transform 1.15s " + E;
            im.style.transform = "translateX(0) scale(1)";
          });
          setTimeout(() => {
            wrap.style.transition = "clip-path 0.62s " + E + ", opacity 0.62s " + E + ", transform 0.9s " + E;
            wrap.style.clipPath = "inset(0 " + (right ? "0 0 100%" : "100% 0 0") + ")";
            wrap.style.opacity = "0.9";
            wrap.style.transform = "rotate(" + (rot * 1.35).toFixed(2) + "deg) scale(1.02)";
          }, 700);
          setTimeout(() => wrap.remove(), 1500);
          while (layer.children.length > 6) layer.children[0].remove();
        });
      });
    }
    const lane = root.querySelector("[data-mark-lane]");
    const car = root.querySelector("[data-mark-track]");
    const streak = null;
    if (lane && car && !reduced) {
      let extra = 0,
        vel = 0,
        x = 0,
        prevX = 0,
        craf = 0;
      const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      this.on(window, "wheel", e => {
        if (e.deltaY > 0 && atBottom()) {
          extra += e.deltaY * 1.9;
          vel += e.deltaY * 0.12;
        }
      }, {
        passive: true
      });
      this.on(window, "keydown", e => {
        if ((e.key === "ArrowDown" || e.key === " ") && atBottom()) {
          extra += 240;
          vel += 22;
        }
      });
      const drive = () => {
        craf = 0;
        if (this.contactOpen || this.visLane === false) return;
        const r = lane.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.95)));
        vel *= 0.94;
        extra += vel;
        const travel = Math.max(1, car.offsetWidth - r.width);
        let want = travel * 0.38 + p * travel * 0.5 + extra;
        const base = travel * 0.38 + p * travel * 0.5;
        if (want < 0) {
          want = 0;
          extra = -base;
          vel = 0;
        }
        if (want > travel) {
          want = travel;
          extra = travel - base;
          vel *= 0.5;
        }
        x += (want - x) * 0.14;
        prevX = x;
        car.style.transform = "translate3d(" + (-x).toFixed(1) + "px,0,0)";
        craf = requestAnimationFrame(drive);
      };
      const kickDrive = () => {
        if (!craf) craf = requestAnimationFrame(drive);
      };
      this.observeVis(lane, "Lane", 160);
      const prevKick = this.kickLoops;
      this.kickLoops = () => {
        if (prevKick) prevKick();
        kickDrive();
      };
      kickDrive();
      this.cleanup.push(() => cancelAnimationFrame(craf));
    }
    const fcap = root.querySelector("[data-footcap]");
    if (fcap && !reduced) {
      const fmark = fcap.querySelector('img[src*="logo-mark"]');
      const favs = Array.from(fcap.querySelectorAll("[data-av]"));
      const rest = () => {
        fcap.style.transition = "none";
        fcap.style.opacity = "0";
        fcap.style.transform = "translateY(-10px)";
        fcap.style.clipPath = "inset(0 100% 0 0 round 9.678px)";
        if (fmark) {
          fmark.style.transition = "none";
          fmark.style.transform = "rotate(-200deg) scale(0.75)";
        }
        favs.forEach(a => {
          a.style.transition = "none";
          a.style.opacity = "0";
          a.style.transform = "translateY(6px) scale(0.6)";
        });
      };
      const play = () => {
        void fcap.offsetHeight;
        fcap.style.transition = "opacity 0.35s " + E + " 0.12s, transform 1.1s " + E + " 0.12s, clip-path 1.05s " + E + " 0.12s";
        fcap.style.opacity = "1";
        fcap.style.transform = "none";
        fcap.style.clipPath = "inset(0 0% 0 0 round 9.678px)";
        if (fmark) {
          fmark.style.transition = "transform 1.05s " + E + " 0.18s";
          fmark.style.transform = "none";
        }
        if (this.footSheen) setTimeout(this.footSheen, 1320);
        favs.forEach((a, i) => {
          const dd = 0.52 + i * 0.11;
          a.style.transition = "opacity 0.6s " + E + " " + dd + "s, transform 1s " + E + " " + dd + "s";
          a.style.opacity = "1";
          a.style.transform = "none";
        });
        setTimeout(() => {
          fcap.style.clipPath = "";
        }, 2200);
      };
      rest();
      const fio = new IntersectionObserver(ents => {
        ents.forEach(en => {
          if (en.isIntersecting) {
            play();
            fio.unobserve(en.target);
          }
        });
      }, {
        threshold: 0.6
      });
      fio.observe(fcap);
      this.cleanup.push(() => fio.disconnect());
      let fplayed = false;
      const fcheck = () => {
        if (fplayed) return;
        const r = fcap.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
          fplayed = true;
          play();
        }
      };
      this.on(window, "scroll", fcheck, {
        passive: true
      });
      setTimeout(fcheck, 2400);
    }
    const tilts = q("[data-tilt]");
    if (tilts.length && !reduced && !(window.matchMedia && window.matchMedia("(pointer: coarse)").matches)) {
      const AMP = 3.4,
        SCALE = 1.012;
      tilts.forEach(fig => {
        const inner = fig.querySelector("[data-tilt-inner]");
        const cap = fig.querySelector("[data-tilt-cap]");
        const st = {
          rx: 0,
          ry: 0,
          sc: 1,
          cx: 0,
          cy: 0,
          rot: 0
        };
        const tg = {
          rx: 0,
          ry: 0,
          sc: 1,
          cx: 0,
          cy: 0,
          rot: 0
        };
        let over = false,
          lastY = 0,
          raf = 0;
        const loop = () => {
          st.rx += (tg.rx - st.rx) * 0.055;
          st.ry += (tg.ry - st.ry) * 0.055;
          st.sc += (tg.sc - st.sc) * 0.06;
          st.cx += (tg.cx - st.cx) * 0.28;
          st.cy += (tg.cy - st.cy) * 0.28;
          st.rot += (tg.rot - st.rot) * 0.16;
          if (inner) inner.style.transform = "rotateX(" + st.rx.toFixed(2) + "deg) rotateY(" + st.ry.toFixed(2) + "deg) scale(" + st.sc.toFixed(3) + ")";
          if (cap) {
            cap.style.transform = "translate3d(" + st.cx.toFixed(1) + "px," + st.cy.toFixed(1) + "px,0) rotate(" + st.rot.toFixed(2) + "deg)";
            cap.style.opacity = over ? "1" : "0";
          }
          raf = requestAnimationFrame(loop);
        };
        this.on(fig, "mouseenter", () => {
          over = true;
          tg.sc = SCALE;
        });
        this.on(fig, "mouseleave", () => {
          over = false;
          tg.sc = 1;
          tg.rx = 0;
          tg.ry = 0;
          tg.rot = 0;
        });
        this.on(fig, "mousemove", e => {
          const r = fig.getBoundingClientRect();
          const ox = e.clientX - r.left - r.width / 2;
          const oy = e.clientY - r.top - r.height / 2;
          tg.rx = oy / (r.height / 2) * -AMP;
          tg.ry = ox / (r.width / 2) * AMP;
          tg.cx = e.clientX - r.left + 16;
          tg.cy = e.clientY - r.top + 16;
          tg.rot = Math.max(-5, Math.min(5, -(oy - lastY) * 0.22));
          lastY = oy;
        });
        raf = requestAnimationFrame(loop);
        this.cleanup.push(() => cancelAnimationFrame(raf));
      });
    }
    const pinEl = root.querySelector("[data-pin]");
    if (pinEl) {
      let sx = 0,
        sy = 0,
        swiping = false;
      this.on(pinEl, "touchstart", e => {
        const t = e.touches[0];
        sx = t.clientX;
        sy = t.clientY;
        swiping = true;
      }, {
        passive: true
      });
      this.on(pinEl, "touchend", e => {
        if (!swiping) return;
        swiping = false;
        const t = e.changedTouches[0];
        const dx = t.clientX - sx,
          dy = t.clientY - sy;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
        const n = root.querySelectorAll("[data-mom]").length || 4;
        const cur = Math.max(0, Math.min(n - 1, this.stepNow || 0));
        this.goToStep(dx < 0 ? cur + 1 : cur - 1);
      }, {
        passive: true
      });
    }
    const waPop = document.querySelector("[data-wa-pop]");
    const waScrim = document.querySelector("[data-wa-scrim]");
    this.toggleWaPop = open => {
      if (!waPop) return;
      this.waPopOpen = open;
      waPop.style.transition = open ? "transform 0.75s " + E + ", opacity 0.45s " + E : "transform 0.55s " + E + ", opacity 0.35s " + E + ", visibility 0s linear 0.55s";
      if (open) waPop.style.visibility = "visible";
      waPop.style.transform = open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.94)";
      waPop.style.opacity = open ? "1" : "0";
      waPop.style.pointerEvents = open ? "auto" : "none";
      if (!open) waPop.style.visibility = "hidden";
      if (waScrim) {
        waScrim.style.transition = open ? "opacity 0.7s " + E : "opacity 0.5s " + E + ", visibility 0s linear 0.5s";
        if (open) waScrim.style.visibility = "visible";
        waScrim.style.opacity = open ? "1" : "0";
        waScrim.style.pointerEvents = open ? "auto" : "none";
        if (!open) waScrim.style.visibility = "hidden";
      }
      waPop.querySelectorAll("[data-wa-pick]").forEach((r, i) => {
        r.style.transition = "opacity 0.6s " + E + " " + (open ? 0.1 + i * 0.08 : 0) + "s, transform 0.7s " + E + " " + (open ? 0.1 + i * 0.08 : 0) + "s, background 0.5s " + E;
        r.style.opacity = open ? "1" : "0";
        r.style.transform = open ? "translateY(0)" : "translateY(10px)";
      });
    };
    if (waPop) {
      waPop.querySelectorAll("[data-wa-pick]").forEach(r => {
        r.style.opacity = "0";
        r.style.transform = "translateY(10px)";
        this.on(r, "mouseenter", () => {
          r.style.background = "#EFEEEC";
        });
        this.on(r, "mouseleave", () => {
          r.style.background = "#FAFAFA";
        });
        this.on(r, "click", () => setTimeout(() => this.toggleWaPop(false), 120));
      });
      if (waScrim) this.on(waScrim, "click", () => this.toggleWaPop(false));
      this.on(waPop.querySelector("[data-wa-close]"), "click", () => this.toggleWaPop(false));
    }
    const wa = document.querySelector("[data-wa]");
    if (wa) {
      const wIn = wa.querySelector("[data-wa-in]");
      const wOut = wa.querySelector("[data-wa-out]");
      this.on(wa, "mouseenter", () => {
        wa.style.boxShadow = "0 18px 42px -8px rgba(0,0,0,0.4)";
        wa.style.transform = "translateY(-2px)";
        if (wIn) wIn.style.transform = "translateY(0)";
        if (wOut) wOut.style.transform = "translateY(-100%)";
      });
      this.on(wa, "mouseleave", () => {
        wa.style.boxShadow = "0 14px 34px -8px rgba(0,0,0,0.34)";
        wa.style.transform = "none";
        if (wIn) wIn.style.transform = "translateY(100%)";
        if (wOut) wOut.style.transform = "translateY(0)";
      });
      this.waBtn = wa;
      if (!reduced && !wa.dataset.waIn) {
        wa.dataset.waIn = "1";
        wa.style.opacity = "0";
        wa.style.transform = "translateY(22px) scale(0.6)";
        this.waEnter = () => {
          this.waReady = true;
          wa.style.transition = "opacity 0.7s " + E + " 0.1s, transform 1.1s " + E + " 0.1s";
          wa.style.opacity = "1";
          wa.style.transform = "none";
        };
        setTimeout(() => {
          if (this.waEnter) this.waEnter();
        }, this.playIntro ? 2600 : 900);
      }
      let waHidden = null;
      const waWatch = () => {
        if (this.contactOpen) return;
        if (this.waEnter && !this.waReady) return;
        const foot = root.querySelector('[data-r="footer"]') || root.querySelector("[data-footcap]");
        const pin = root.querySelector("[data-pin]");
        const vh = window.innerHeight;
        const pinState = pin && pin.dataset.pinState;
        let pinHeld = pinState === "on";
        if (pinState === "sticky") {
          const pr = pin.getBoundingClientRect();
          pinHeld = pr.top <= 1 && pr.bottom > vh * 0.5;
        }
        let footNear = false;
        if (foot && foot.offsetParent !== null) {
          const fr = foot.getBoundingClientRect();
          if (fr.height > 0) footNear = fr.top < vh - 120;
        }
        const hide = pinHeld || footNear;
        if (hide === waHidden) return;
        waHidden = hide;
        wa.style.transition = "opacity 0.6s " + E + ", transform 0.7s " + E;
        wa.style.opacity = hide ? "0" : "1";
        wa.style.pointerEvents = hide ? "none" : "";
        wa.style.transform = hide ? "translateY(18px) scale(0.9)" : "none";
      };
      this.waWatch = waWatch;
      waWatch();
      if (!window.__fugazWaTimer) {
        window.__fugazWaTimer = setInterval(() => {
          const inst = window.__fugazLive;
          if (!inst || !inst.waWatch) {
            clearInterval(window.__fugazWaTimer);
            window.__fugazWaTimer = 0;
            return;
          }
          try {
            inst.waWatch();
          } catch (e) {}
        }, 300);
      }
    }
    q("[data-fl]").forEach(a => {
      a.classList.add("fg-animated-link");
      const cs = getComputedStyle(a);
      const lh = parseFloat(cs.lineHeight);
      const fs = parseFloat(cs.fontSize) || 17;
      a.style.height = Math.max(isFinite(lh) && lh > 0 ? lh : 0, Math.ceil(fs * 1.42)) + "px";
      const i1 = a.querySelector("[data-fl-in]"),
        i2 = a.querySelector("[data-fl-out]");
      if (!i1 || !i2) return;
      const boxH = parseFloat(a.style.height) || 23;
      const base = "display:block;line-height:" + boxH + "px;will-change:transform";
      i1.style.cssText = base;
      i2.style.cssText = base + ";position:absolute;left:0;top:0;transform:translateY(100%)";
      void a.offsetHeight;
      const tr = "transform 0.95s " + E;
      i1.style.transition = "transform 0.95s " + E + " 0.04s";
      i2.style.transition = tr;
      const host = a.closest("[data-fl-host]") || a;
      this.on(host, "mouseenter", () => {
        i1.style.transform = "translateY(-100%)";
        i2.style.transform = "translateY(0)";
      });
      this.on(host, "mouseleave", () => {
        i1.style.transform = "translateY(0)";
        i2.style.transform = "translateY(100%)";
      });
    });
    this.handleClick = e => {
      if (e.target.closest("[data-menu-toggle]")) {
        e.preventDefault();
        this.toggleMenu();
        return;
      }
      const legalOpen = e.target.closest("[data-open-legal]");
      if (legalOpen) {
        e.preventDefault();
        if (this.menuOpen) this.toggleMenu(false);
        this.setLegal(legalOpen.getAttribute("data-open-legal"));
        return;
      }
      if (e.target.closest("[data-legal-close]")) {
        e.preventDefault();
        this.setLegal(null);
        return;
      }
      if (this.menuOpen && e.target.closest("[data-menu-link]")) this.toggleMenu(false);
      const s = e.target.closest("[data-scroll-to]");
      if (s) {
        e.preventDefault();
        const name = s.getAttribute("data-scroll-to");
        const inNav = !!(s.closest("[data-nav]") || s.closest("[data-mmenu]") || s.closest("[data-mnav]"));
        if (name === "work" && inNav && this.setAllWork) {
          this.setAllWork(true);
          return;
        }
        const t = root.querySelector("#" + name);
        if (t) {
          this.glideResolve = () => t.getBoundingClientRect().top + window.scrollY - 18;
          this.scrollTo(t.getBoundingClientRect().top + window.scrollY - 18, true);
        }
        return;
      }
      const st = e.target.closest("[data-scroll-top]");
      if (st) {
        e.preventDefault();
        this.glideResolve = null;
        this.scrollTo(0, true);
        if (st.getAttribute("data-scroll-top") === "replay" && this.replayIntro) {
          setTimeout(() => this.replayIntro(), 420);
        }
        return;
      }
      const si = e.target.closest("[data-step-item]");
      if (si) {
        e.preventDefault();
        const list = Array.prototype.slice.call(si.parentElement.querySelectorAll("[data-step-item]"));
        const w = root.querySelector("[data-pin-wrap]");
        if (w) {
          const top = w.getBoundingClientRect().top + window.scrollY;
          const travel = w.getBoundingClientRect().height - window.innerHeight;
          this.scrollTo(top + travel * ((list.indexOf(si) + 0.5) / list.length));
        }
        return;
      }
      if (e.target.closest("[data-wa]")) {
        e.preventDefault();
        if (this.toggleWaPop) this.toggleWaPop(!this.waPopOpen);
        return;
      }
      const md = e.target.closest("[data-mdot]");
      if (md) {
        e.preventDefault();
        this.goToStep(parseInt(md.getAttribute("data-mdot"), 10) || 0);
        return;
      }
      const ht = e.target.closest("[data-hanger-toggle]");
      if (ht) {
        e.preventDefault();
        const open = ht.getAttribute("aria-pressed") !== "true";
        ht.setAttribute("aria-pressed", String(open));
        const cardEl = ht.parentElement;
        const face = cardEl.querySelector("[data-hanger-face]");
        const stage = cardEl.querySelector("[data-hanger-stage]");
        const label = ht.querySelector("[data-hanger-label]");
        const dot = ht.querySelector("[data-hanger-dot]");
        if (label) label.textContent = open ? "Close" : "Hanger";
        if (dot) dot.style.background = open ? "#CD2C2C" : "#0057FE";
        if (face) face.style.opacity = open ? "0" : "1";
        if (stage) {
          stage.style.transition = open ? "opacity 0.75s " + E : "opacity 0.75s " + E + ", visibility 0s linear 0.75s";
          if (open) stage.style.visibility = "visible";
          requestAnimationFrame(() => {
            stage.style.opacity = open ? "1" : "0";
          });
          const lan = stage.querySelector("lanyard-card");
          if (!this.lanyards) this.lanyards = [];
          if (open) {
            if (lan && this.lanyards.indexOf(lan) < 0) this.lanyards.push(lan);
            if (lan && lan.dropIn) setTimeout(() => lan.dropIn(), 60);
          } else if (lan) {
            this.lanyards = this.lanyards.filter(l => l !== lan);
          }
          if (!open) stage.style.visibility = "hidden";
        }
        return;
      }
      const gt = e.target.closest("[data-gravity-toggle]");
      if (gt) {
        e.preventDefault();
        const off = gt.getAttribute("aria-pressed") === "true";
        const next = !off;
        gt.setAttribute("aria-pressed", String(next));
        const label = gt.querySelector("[data-gravity-label]");
        const track = gt.querySelector("[data-gravity-track]");
        const knob = gt.querySelector("[data-gravity-knob]");
        if (label) label.textContent = next ? "Enable gravity" : "Disable gravity";
        if (track) track.style.background = next ? "#0057FE" : "rgba(0,0,0,0.12)";
        if (knob) knob.style.transform = next ? "translateX(14px)" : "none";
        gt.style.borderColor = next ? "rgba(0,87,254,0.35)" : "rgba(0,0,0,0.12)";
        const scope = gt.closest("[data-hanger-stage]") || document;
        scope.querySelectorAll("lanyard-card").forEach(l => {
          if (l.setGravity) l.setGravity(!next);
        });
        return;
      }
      if (e.target.closest("[data-open-wa]")) {
        e.preventDefault();
        this.toggleWaPop(true);
        return;
      }
      if (e.target.closest("[data-open-contact]")) {
        e.preventDefault();
        this.openContact();
        return;
      }
      if (e.target.closest("[data-close-contact]")) {
        e.preventDefault();
        this.closeContact();
      }
    };
    const liqPin = root.querySelector("[data-pin]");
    const liqCanvases = q("[data-liqgl]");
    liqCanvases.forEach(cv => {
      cv.setAttribute("data-html2canvas-ignore", "true");
      cv.setAttribute("data-snapshot-skip", "1");
    });
    if (liqPin && liqCanvases.length && !reduced) {
      let liqArmed = false;
      const startLiquid = () => {
        const VS = "attribute vec2 p;varying vec2 v_uv;void main(){v_uv=p*0.5+0.5;gl_Position=vec4(p,0.,1.);}";
        const SIM = ["precision highp float;varying vec2 v_uv;", "uniform sampler2D u_v;uniform vec2 u_texel;uniform float u_dt;uniform vec2 u_m;", "uniform vec2 u_f;uniform float u_r;uniform float u_diss;uniform float u_ar;", "const float RANGE=1.6;", "vec2 dec(vec4 t){return (t.xy-0.5)*2.0*RANGE;}", "void main(){", " vec2 uv=v_uv;", " vec2 vel=dec(texture2D(u_v,uv));", " vec2 back=uv-vel*u_dt*u_texel*vec2(160.0);", " vec2 adv=dec(texture2D(u_v,clamp(back,vec2(0.001),vec2(0.999))));", " vec2 lap=(dec(texture2D(u_v,uv+vec2(u_texel.x,0.)))+dec(texture2D(u_v,uv-vec2(u_texel.x,0.)))", "  +dec(texture2D(u_v,uv+vec2(0.,u_texel.y)))+dec(texture2D(u_v,uv-vec2(0.,u_texel.y))))*0.25;", " vec2 nv=mix(adv,lap,0.07)*u_diss;", " vec2 d=(uv-u_m);d.x*=u_ar;", " float sp=exp(-dot(d,d)/max(1e-5,u_r*u_r));", " nv+=u_f*sp;", " nv=clamp(nv,vec2(-RANGE),vec2(RANGE));", " gl_FragColor=vec4(nv/(2.0*RANGE)+0.5,0.0,1.0);", "}"].join("\n");
        const FS = ["precision highp float;varying vec2 v_uv;", "uniform vec2 u_res;uniform float u_t;uniform sampler2D u_v;", "const float RANGE=1.6;", "vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));", "return -1.+2.*fract(sin(p)*43758.5453123);}", "float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);", "return mix(mix(dot(h2(i),f),dot(h2(i+vec2(1,0)),f-vec2(1,0)),u.x),", "mix(dot(h2(i+vec2(0,1)),f-vec2(0,1)),dot(h2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}", "float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p*=2.03;a*=.5;}return s;}", "void main(){", " vec2 uv=v_uv;", " float ar=u_res.x/u_res.y;", " vec2 p=vec2(uv.x*ar,uv.y);", " vec2 fl=(texture2D(u_v,uv).xy-0.5)*2.0*RANGE;", " p+=fl*0.185;", " float t=u_t*0.052;", " p+=vec2(sin(u_t*0.019)*0.13,cos(u_t*0.014)*0.11);", " vec2 ax=vec2(0.6096,0.7927);", " p+=ax*t*0.62;", " vec2 q=vec2(fbm(p*1.15+vec2(0.,t)),fbm(p*1.15+vec2(5.2,1.3-t)));", " vec2 r=vec2(fbm(p*1.15+4.6*q+vec2(1.7,9.2)+t*0.55),fbm(p*1.15+4.6*q+vec2(8.3,2.8)-t*0.48));", " float f=fbm(p*1.15+3.4*r);", " float v=clamp(f*0.5+0.5,0.,1.);", " float far=fbm(p*0.40-ax*t*0.34);", " float depth=clamp(far*0.5+0.5,0.,1.);", " v*=0.74+0.46*depth;", " float crest=clamp(1.0-abs(f*1.7),0.,1.);", " float wake=clamp(length(fl)*0.55,0.,1.);", " float sw=clamp(length(r)*0.9,0.,1.);", " vec3 c0=vec3(0.014,0.014,0.017);", " vec3 c1=vec3(0.046,0.046,0.052);", " vec3 c2=vec3(0.072,0.072,0.081);", " vec3 c3=vec3(0.151,0.153,0.166);", " vec3 col=mix(c0,c1,smoothstep(0.14,0.50,v));", " col=mix(col,c2,smoothstep(0.48,0.72,v));", " col=mix(col,c3,smoothstep(0.70,0.94,v)*0.85);", " float sx=abs(uv.x-0.5)*2.0;", " float nar=clamp((760.0-u_res.x)/420.0,0.0,1.0);", " float flank=smoothstep(0.56-0.34*nar,0.98-0.10*nar,sx);", " float pool=exp(-pow(sx/(0.11+0.22*nar),2.0))*(0.30+0.34*nar);", " float zone=clamp(flank+pool,0.0,1.0);", " float lift=1.0+0.45*nar;", " float wet=crest*crest*zone;", " col+=c3*wet*(0.0085+0.0131*wake)*lift;", " col+=vec3(0.94,0.955,1.0)*pow(crest,7.0)*zone*(0.0092+0.0116*wake)*lift;", " col+=vec3(0.10,0.13,0.20)*smoothstep(0.30,0.85,v)*(0.0131+0.0254*zone)*(1.0+0.25*nar);", " col+=c3*smoothstep(0.55,1.0,dot(normalize(r+1e-4),ax)*0.5+0.5)*wet*0.0116*lift;", " col+=c3*sw*0.0046*(0.30+0.70*zone)*lift;", " col*=1.0-0.20*smoothstep(0.05,0.62,-dot(uv-0.5,ax));", " col*=1.0-0.08*smoothstep(0.40,1.20,length(uv-0.5));", " float dth=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);", " col+=(dth-0.5)/255.0*1.6;", " gl_FragColor=vec4(col,1.);", "}"].join("\n");
        const SW = 192,
          SH = 108;
        const rigs = [];
        liqCanvases.forEach(cv => {
          const gl = cv.getContext("webgl", {
            antialias: false,
            alpha: false,
            depth: false,
            stencil: false,
            preserveDrawingBuffer: true
          }) || cv.getContext("experimental-webgl", {
            antialias: false,
            alpha: false,
            preserveDrawingBuffer: true
          });
          cv.setAttribute("data-html2canvas-ignore", "true");
          if (!gl) return;
          const mk = (type, src) => {
            const sh = gl.createShader(type);
            gl.shaderSource(sh, src);
            gl.compileShader(sh);
            if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
              console.error(gl.getShaderInfoLog(sh));
              return null;
            }
            return sh;
          };
          const prog = fsrc => {
            const vs = mk(gl.VERTEX_SHADER, VS),
              fs = mk(gl.FRAGMENT_SHADER, fsrc);
            if (!vs || !fs) return null;
            const pr = gl.createProgram();
            gl.attachShader(pr, vs);
            gl.attachShader(pr, fs);
            gl.linkProgram(pr);
            if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
              console.error(gl.getProgramInfoLog(pr));
              return null;
            }
            return pr;
          };
          const pSim = prog(SIM),
            pDraw = prog(FS);
          if (!pSim || !pDraw) return;
          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
          [pSim, pDraw].forEach(pr => {
            gl.useProgram(pr);
            const loc = gl.getAttribLocation(pr, "p");
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
          });
          const seed = new Uint8Array(SW * SH * 4);
          for (let i = 0; i < SW * SH; i++) {
            seed[i * 4] = 128;
            seed[i * 4 + 1] = 128;
            seed[i * 4 + 3] = 255;
          }
          const mkTex = () => {
            const t = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, t);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SW, SH, 0, gl.RGBA, gl.UNSIGNED_BYTE, seed);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            const fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
            return {
              t: t,
              fb: fb
            };
          };
          const A = mkTex(),
            B2 = mkTex();
          const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          if (!ok) return;
          rigs.push({
            cv: cv,
            gl: gl,
            pSim: pSim,
            pDraw: pDraw,
            a: A,
            b: B2,
            w: 0,
            h: 0,
            us: {
              v: gl.getUniformLocation(pSim, "u_v"),
              texel: gl.getUniformLocation(pSim, "u_texel"),
              dt: gl.getUniformLocation(pSim, "u_dt"),
              m: gl.getUniformLocation(pSim, "u_m"),
              f: gl.getUniformLocation(pSim, "u_f"),
              r: gl.getUniformLocation(pSim, "u_r"),
              diss: gl.getUniformLocation(pSim, "u_diss"),
              ar: gl.getUniformLocation(pSim, "u_ar")
            },
            ud: {
              res: gl.getUniformLocation(pDraw, "u_res"),
              t: gl.getUniformLocation(pDraw, "u_t"),
              v: gl.getUniformLocation(pDraw, "u_v")
            }
          });
        });
        if (rigs.length) {
          let lpx = 0.5,
            lpy = 0.5,
            has = false,
            fx = 0,
            fy = 0,
            mx = 0.5,
            my = 0.5;
          const panel = () => liqPin.isConnected ? liqPin : document.querySelector("[data-pin]");
          const onMove = e => {
            const el = panel();
            if (!el) return;
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) return;
            const nx = (e.clientX - r.left) / r.width,
              ny = 1 - (e.clientY - r.top) / r.height;
            if (nx < 0 || nx > 1 || ny < 0 || ny > 1) {
              has = false;
              return;
            }
            if (has) {
              fx += (nx - lpx) * 2.6;
              fy += (ny - lpy) * 2.6;
            }
            lpx = nx;
            lpy = ny;
            has = true;
          };
          this.on(document, "pointermove", onMove);
          this.on(window, "blur", () => {
            has = false;
          });
          const t0 = performance.now();
          let lastMs = t0;
          this.observeVis(liqPin, "Liquid", 80);
          let liqScale = 0.72,
            liqCost = 0,
            liqFrames = 0,
            liqOff = false;
          this.liqStep = () => {
            if (liqOff) return;
            const el = panel();
            if (!el) return;
            const nowMs = performance.now();
            if (nowMs - lastMs < 24) return;
            const dt = Math.min(0.05, Math.max(0.008, (nowMs - lastMs) / 1000));
            lastMs = nowMs;
            const now = (nowMs - t0) / 1000;
            mx += (lpx - mx) * 0.07;
            my += (lpy - my) * 0.07;
            const dpr = Math.min(1, window.devicePixelRatio || 1) * liqScale;
            rigs.forEach(g => {
              const gl = g.gl;
              const w = Math.max(1, Math.round(g.cv.clientWidth * dpr));
              const hh = Math.max(1, Math.round(g.cv.clientHeight * dpr));
              if (w !== g.w || hh !== g.h) {
                g.w = w;
                g.h = hh;
                g.cv.width = w;
                g.cv.height = hh;
              }
              gl.useProgram(g.pSim);
              gl.bindFramebuffer(gl.FRAMEBUFFER, g.b.fb);
              gl.viewport(0, 0, SW, SH);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, g.a.t);
              gl.uniform1i(g.us.v, 0);
              gl.uniform2f(g.us.texel, 1 / SW, 1 / SH);
              gl.uniform1f(g.us.dt, dt);
              gl.uniform2f(g.us.m, mx, my);
              gl.uniform2f(g.us.f, fx, fy);
              gl.uniform1f(g.us.r, 0.036);
              gl.uniform1f(g.us.diss, Math.pow(0.9955, dt * 60));
              gl.uniform1f(g.us.ar, w / hh);
              gl.drawArrays(gl.TRIANGLES, 0, 3);
              const tmp = g.a;
              g.a = g.b;
              g.b = tmp;
              gl.bindFramebuffer(gl.FRAMEBUFFER, null);
              gl.viewport(0, 0, w, hh);
              gl.useProgram(g.pDraw);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, g.a.t);
              gl.uniform1i(g.ud.v, 0);
              gl.uniform2f(g.ud.res, w, hh);
              gl.uniform1f(g.ud.t, now);
              gl.drawArrays(gl.TRIANGLES, 0, 3);
            });
            liqCost += performance.now() - nowMs;
            if (++liqFrames >= 24) {
              const avg = liqCost / liqFrames;
              liqCost = 0;
              liqFrames = 0;
              if (avg > 9 && liqScale > 0.4) liqScale = 0.4;else if (avg > 16) {
                liqOff = true;
                rigs.forEach(g => {
                  g.cv.style.display = "none";
                });
              }
            }
            fx *= 0.86;
            fy *= 0.86;
            if (Math.abs(fx) < 1e-4) fx = 0;
            if (Math.abs(fy) < 1e-4) fy = 0;
          };
        }
      };
      const armLiquid = () => {
        if (liqArmed) return;
        liqArmed = true;
        const go = () => {
          try {
            startLiquid();
          } catch (e) {
            console.error("[fugaz] liquid init failed", e);
          }
        };
        if (window.requestIdleCallback) requestIdleCallback(go, {
          timeout: 2600
        });else setTimeout(go, 1200);
      };
      if (typeof IntersectionObserver === "function") {
        const lio = new IntersectionObserver(es => {
          if (!es[0].isIntersecting) return;
          lio.disconnect();
          armLiquid();
        }, {
          rootMargin: "400px"
        });
        lio.observe(liqPin);
        this.cleanup.push(() => lio.disconnect());
      } else armLiquid();
    }
    const faqRows = q("[data-faq-row]");
    if (faqRows.length) {
      const setRow = (row, open) => {
        const btn = row.querySelector("[data-faq-q]");
        const body = row.querySelector("[data-faq-a]");
        const label = row.querySelector("[data-faq-label]");
        const bar = row.querySelector("[data-faq-bar]");
        const plus = row.querySelector("[data-faq-plus]");
        const inner = body && body.firstElementChild;
        if (!btn || !body) return;
        const was = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        body.style.transition = "height " + (open ? "0.95s" : "0.6s") + " " + E;
        body.style.height = open ? body.scrollHeight + "px" : "0px";
        const aw = body.querySelectorAll("[data-hw]");
        if (aw.length) {
          for (let wi = 0; wi < aw.length; wi++) {
            const w = aw[wi];
            w.style.transition = "transform " + (open ? "1.05s" : "0.42s") + " " + E + " " + (open ? (0.14 + wi * 0.026).toFixed(3) : 0) + "s";
            w.style.transform = open ? "translate3d(0,0,0)" : "translate3d(0,112%,0)";
          }
        } else if (inner) {
          inner.style.transition = open ? "opacity 0.72s " + E + " 0.16s" : "opacity 0.28s " + E;
          inner.style.opacity = open ? "1" : "0";
        }
        if (label) {
          label.style.color = open ? "#000000" : "#808080";
          label.style.transform = open ? "translate3d(5px,0,0)" : "translate3d(0,0,0)";
        }
        if (plus) plus.style.transform = open ? "rotate(90deg)" : "rotate(0deg)";
        if (bar) bar.style.transform = open ? "scaleY(0)" : "scaleY(1)";
        if (bar && was && !open) bar.style.transitionDelay = "0.08s";else if (bar) bar.style.transitionDelay = "0s";
      };
      faqRows.forEach(row => {
        if (row.dataset.faqReady === this.bootId) return;
        row.dataset.faqReady = this.bootId;
        const btn = row.querySelector("[data-faq-q]");
        const label = row.querySelector("[data-faq-label]");
        if (!btn) return;
        const body0 = row.querySelector("[data-faq-a]");
        const inner0 = body0 && body0.firstElementChild;
        const plus0 = row.querySelector("[data-faq-plus]");
        if (plus0) plus0.style.transition = "transform 0.85s " + E;
        if (label) label.style.transition = "color 0.5s " + E + ", transform 0.8s " + E;
        this.on(btn, "click", () => {
          const open = btn.getAttribute("aria-expanded") === "true";
          faqRows.forEach(r => setRow(r, false));
          if (!open) setRow(row, true);
        });
        this.on(btn, "mouseenter", () => {
          if (label && btn.getAttribute("aria-expanded") !== "true") label.style.color = "#000000";
        });
        this.on(btn, "mouseleave", () => {
          if (label && btn.getAttribute("aria-expanded") !== "true") label.style.color = "#808080";
        });
      });
      this.on(window, "resize", () => {
        faqRows.forEach(r => {
          const btn = r.querySelector("[data-faq-q]");
          const body = r.querySelector("[data-faq-a]");
          if (btn && body && btn.getAttribute("aria-expanded") === "true") {
            body.style.height = "auto";
            const hh = body.scrollHeight;
            body.style.height = hh + "px";
          }
        });
      });
    }
    const mobQ = window.matchMedia("(max-width:1024px)");
    const applyMobOrder = () => {
      const on = mobQ.matches;
      Array.from(document.querySelectorAll("[data-mob-move]")).forEach(el => {
        const key = el.getAttribute("data-mob-move");
        const slot = document.querySelector('[data-mob-slot="' + key + '"]');
        if (!slot) return;
        if (on) {
          if (el.dataset.mobDone === "1") return;
          el._home = {
            parent: el.parentNode,
            next: el.nextSibling
          };
          el.dataset.mobDone = "1";
          slot.appendChild(el);
        } else if (el.dataset.mobDone === "1") {
          delete el.dataset.mobDone;
          const hm = el._home;
          if (hm && hm.parent) hm.parent.insertBefore(el, hm.next || null);
        }
      });
    };
    applyMobOrder();
    if (mobQ.addEventListener) mobQ.addEventListener("change", applyMobOrder);else if (mobQ.addListener) mobQ.addListener(applyMobOrder);
    this.initScan();
    const allWork = root.querySelector("[data-allwork]") || document.querySelector("[data-allwork]");
    if (allWork) {
      const scroller = allWork.querySelector("[data-allwork-scroll]");
      const wTiles = Array.prototype.slice.call(allWork.querySelectorAll("[data-wtile]"));
      const fitBoards = () => {};
      this.setAllWork = open => {
        if (!!this.workOpen === !!open) return;
        this.workOpen = !!open;
        if (this.untrapWork) {
          this.untrapWork();
          this.untrapWork = null;
        }
        if (open) this.untrapWork = this.trapFocus(allWork, "[data-allwork-close]");
        this.locked = !!open;
        allWork.style.visibility = open ? "visible" : "hidden";
        allWork.style.pointerEvents = open ? "auto" : "none";
        allWork.style.transition = "opacity 0.62s " + E + (open ? ",visibility 0s" : ",visibility 0s linear 0.62s");
        document.documentElement.style.overflow = open ? "hidden" : "";
        if (open) {
          resetWorkPages();
          if (scroller) scroller.scrollTop = 0;
          fillWorkPages();
          if (scroller) {
            scroller.scrollTop = 0;
            requestAnimationFrame(() => {
              if (this.workOpen && scroller.scrollTop) scroller.scrollTop = 0;
            });
            setTimeout(() => {
              if (this.workOpen && scroller.scrollTop) scroller.scrollTop = 0;
            }, 120);
            setTimeout(() => {
              if (this.workOpen && scroller.scrollTop) scroller.scrollTop = 0;
            }, 420);
          }
          fitBoards();
          setTimeout(fitBoards, 260);
          wTiles.forEach((t, i) => {
            t.style.transition = "none";
            t.style.opacity = "0";
            t.style.transform = "translate3d(0,34px,0)";
            void t.offsetHeight;
            t.style.transition = "opacity 0.8s " + E + " " + (0.06 + i * 0.045).toFixed(3) + "s,transform 0.9s " + E + " " + (0.06 + i * 0.045).toFixed(3) + "s";
            t.style.opacity = "1";
            t.style.transform = "none";
          });
        }
        void allWork.offsetHeight;
        allWork.style.opacity = open ? "1" : "0";
      };
      const noHover = coarsePtr || !!(window.matchMedia && window.matchMedia("(hover: none)").matches);
      if (!this.tileIO && noHover && "IntersectionObserver" in window) {
        this.tileIO = new IntersectionObserver(ents => {
          ents.forEach(en => {
            const t = en.target;
            const on = en.isIntersecting && en.intersectionRatio > 0.55;
            if (t._pillsOn === on) return;
            t._pillsOn = on;
            if (t._setPills) t._setPills(on);
            if (t._setShot) t._setShot(on);
          });
        }, {
          root: scroller || null,
          threshold: [0, 0.55, 0.9],
          rootMargin: "-18% 0px -18% 0px"
        });
      }
      const wireTile = t => {
        if (t.dataset.tileReady === this.bootId) return;
        t.dataset.tileReady = this.bootId;
        const shot = t.querySelector("[data-wshot]");
        const tags = t.querySelector("[data-wtags]");
        const carMark = t.querySelector("[data-carfx]");
        const pills = (tags ? Array.prototype.slice.call(tags.children) : []).concat(carMark ? [carMark] : []);
        this.on(t, "click", () => {
          if (this.fireCars) this.fireCars(t);
        });
        const setPills = on => {
          const n = pills.length;
          pills.forEach((p, i) => {
            const touchT = window.matchMedia && window.matchMedia("(hover: none)").matches;
            const d = (on ? (touchT ? 0.12 : 0) + i * (touchT ? 0.11 : 0.065) : (n - 1 - i) * 0.035).toFixed(3);
            const k = touchT ? 1.6 : 1;
            p.style.transition = "opacity " + (0.44 * k).toFixed(2) + "s " + E + " " + d + "s,transform " + (0.68 * k).toFixed(2) + "s " + E + " " + d + "s,filter " + (0.6 * k).toFixed(2) + "s " + E + " " + d + "s";
            p.style.opacity = on ? "1" : "0";
            p.style.transform = on ? "none" : "translate3d(0,-10px,0) scale(0.94)";
            p.style.filter = on ? "blur(0px)" : "blur(10px)";
          });
        };
        this.on(t, "mouseenter", () => {
          setPills(true);
          if (shot) shot.style.transform = "translate3d(-50%,-50%,0)";
        });
        this.on(t, "mouseleave", () => {
          setPills(false);
          if (shot) shot.style.transform = "translate3d(-50%,-50%,0)";
        });
        t._setPills = setPills;
        t._setShot = on => {
          if (shot) shot.style.transform = "translate3d(-50%,-50%,0) scale(" + (on ? 1.045 : 1) + ")";
        };
        if (this.tileIO) this.tileIO.observe(t);
      };
      wTiles.forEach(wireTile);
      const wGrid = allWork.querySelector("[data-allwork-grid]");
      const wSeed = wTiles.slice();
      const W_KEEP_PAGES = 4;
      let wPages = 1,
        wPageSeq = 0;
      const addWorkPage = quiet => {
        if (!wGrid) return;
        wPages++;
        wPageSeq++;
        wSeed.forEach((src, i) => {
          const c = src.cloneNode(true);
          delete c.dataset.tileReady;
          c.dataset.wclone = "1";
          c.dataset.wpage = String(wPageSeq);
          c.style.opacity = quiet ? "1" : "0";
          c.style.transform = quiet ? "none" : "translate3d(0,26px,0)";
          c.style.transition = quiet ? "none" : "opacity 0.7s " + E + " " + (i * 0.03).toFixed(3) + "s,transform 0.8s " + E + " " + (i * 0.03).toFixed(3) + "s";
          Array.prototype.forEach.call(c.querySelectorAll("[data-wtags] > *,[data-carfx]"), p => {
            p.style.transition = "none";
            p.style.opacity = "0";
            p.style.transform = "translate3d(0,-10px,0) scale(0.94)";
            p.style.filter = "blur(10px)";
          });
          wGrid.appendChild(c);
          wireTile(c);
          if (!quiet) {
            void c.offsetHeight;
            c.style.opacity = "1";
            c.style.transform = "none";
          }
        });
      };
      const resetWorkPages = () => {
        if (!wGrid) return;
        Array.prototype.forEach.call(wGrid.querySelectorAll("[data-wclone]"), c => c.remove());
        wPages = 1;
        wPageSeq = 0;
      };
      const fillWorkPages = () => {
        let n = 0;
        while (n < 4 && (wPages < 2 || scroller && scroller.scrollHeight < scroller.clientHeight * 2.6)) {
          addWorkPage(true);
          n++;
        }
      };
      const pruneWorkPages = () => {
        if (!wGrid || !scroller || wPages <= W_KEEP_PAGES) return;
        const tiles = Array.prototype.slice.call(wGrid.querySelectorAll("[data-wtile]"));
        const anchor = tiles.find(t => t.getBoundingClientRect().bottom > 0);
        if (!anchor) return;
        const topBefore = anchor.getBoundingClientRect().top;
        let removed = 0;
        while (wPages - removed > W_KEEP_PAGES) {
          const first = wGrid.querySelector("[data-wpage]");
          if (!first) break;
          const group = Array.prototype.slice.call(wGrid.querySelectorAll('[data-wpage="' + first.dataset.wpage + '"]'));
          if (!group.length || group.indexOf(anchor) > -1) break;
          if (group[group.length - 1].getBoundingClientRect().bottom > 0) break;
          group.forEach(el => el.remove());
          removed++;
        }
        if (!removed) return;
        wPages -= removed;
        scroller.scrollTop += anchor.getBoundingClientRect().top - topBefore;
      };
      let wFillRaf = 0;
      const wOnScroll = () => {
        if (wFillRaf) return;
        wFillRaf = requestAnimationFrame(() => {
          wFillRaf = 0;
          if (!scroller) return;
          let added = 0;
          while (added < 4 && scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < scroller.clientHeight * 2) {
            addWorkPage(true);
            added++;
          }
          pruneWorkPages();
        });
      };
      if (scroller) this.on(scroller, "scroll", wOnScroll, {
        passive: true
      });
      this.on(window, "resize", fitBoards);
      const carLayer = allWork.querySelector("[data-carfx-layer]");
      this.fireCars = tile => {
        if (!carLayer || !tile) return;
        const vh = window.innerHeight,
          vw = window.innerWidth;
        const tr = tile.getBoundingClientRect();
        const ox = tr.left + tr.width / 2,
          oy = Math.min(vh - 40, tr.top + tr.height * 0.72);
        const mark = tile.querySelector("[data-carfx]");
        if (mark) mark.animate([{
          transform: "scale(1)"
        }, {
          transform: "scale(0.84)"
        }, {
          transform: "scale(1)"
        }], {
          duration: 380,
          easing: E
        });
        allWork.animate([{
          transform: "translateY(0)"
        }, {
          transform: "translateY(5px)"
        }, {
          transform: "translateY(-2px)"
        }, {
          transform: "translateY(0)"
        }], {
          duration: 420,
          easing: "cubic-bezier(0.16,1,0.3,1)"
        });
        const mk = (parent, css) => {
          const n = document.createElement("span");
          n.style.cssText = css;
          parent.appendChild(n);
          return n;
        };
        for (let k = 0; k < 3; k++) {
          const size = 74 + k * 34;
          const x = vw * (0.22 + 0.28 * k) + (Math.random() * 48 - 24);
          const dur = 1600 + k * 240;
          const delay = k * 180;
          const wrap = mk(carLayer, "position:fixed;left:" + x.toFixed(0) + "px;top:0;display:block;will-change:transform;z-index:3;");
          const img = document.createElement("img");
          img.src = "assets/hero-f1-car.svg";
          img.alt = "";
          img.style.cssText = "display:block;width:" + size + "px;height:auto;";
          wrap.appendChild(img);
          const from = -(size * 1.2),
            to = vh + size * 1.2;
          const tilt = (Math.random() * 10 - 5).toFixed(1);
          wrap.animate([{
            transform: "translateY(" + from.toFixed(0) + "px) rotate(0deg)"
          }, {
            transform: "translateY(" + to.toFixed(0) + "px) rotate(" + tilt + "deg)"
          }], {
            duration: dur,
            delay: delay,
            easing: "cubic-bezier(0.45,0,0.55,1)",
            fill: "both"
          });
          setTimeout(() => wrap.remove(), dur + delay + 120);
        }
        const N = 20;
        for (let i = 0; i < N; i++) {
          const depth = Math.random();
          const dur = 1600 + depth * 900 + Math.random() * 400;
          const size = 14 + depth * 30;
          const delay = 40 + Math.random() * 900;
          const rot = (Math.random() * 16 - 8).toFixed(0);
          const x = Math.random() * (vw + size * 2) - size;
          const wrap = mk(carLayer, "position:fixed;left:" + x.toFixed(0) + "px;top:0;display:block;will-change:transform;");
          const img = document.createElement("img");
          img.src = "assets/hero-f1-car.svg";
          img.alt = "";
          img.style.cssText = "display:block;width:" + size.toFixed(0) + "px;height:auto;opacity:" + (0.55 + depth * 0.45).toFixed(2) + ";";
          wrap.appendChild(img);
          const from = -(size * 1.6 + Math.random() * 220),
            to = vh + size * 1.6;
          wrap.animate([{
            transform: "translateY(" + from.toFixed(0) + "px) rotate(0deg)"
          }, {
            transform: "translateY(" + to.toFixed(0) + "px) rotate(" + rot + "deg)"
          }], {
            duration: dur,
            delay: delay,
            easing: "cubic-bezier(0.45,0,0.55,1)",
            fill: "both"
          });
          setTimeout(() => wrap.remove(), dur + delay + 140);
        }
      };
      this.on(allWork.querySelector("[data-allwork-close]"), "click", () => this.setAllWork(false));
      const abBtn = allWork.querySelector("[data-allwork-book]");
      const abIn = abBtn && abBtn.querySelector("[data-ab-in]"),
        abOut = abBtn && abBtn.querySelector("[data-ab-out]");
      if (abIn && abOut) {
        this.on(abBtn, "mouseenter", () => {
          abIn.style.transform = "translateY(0)";
          abOut.style.transform = "translateY(-100%)";
        });
        this.on(abBtn, "mouseleave", () => {
          abIn.style.transform = "translateY(100%)";
          abOut.style.transform = "translateY(0)";
        });
      }
      this.on(abBtn, "click", () => {
        this.setAllWork(false);
        setTimeout(() => this.openContact(), 660);
      });
      this.on(document, "keydown", e => {
        if (e.key === "Escape" && this.legalOpen) {
          e.preventDefault();
          this.setLegal(null);
          return;
        }
        if (e.key === "Escape" && this.workOpen) {
          e.preventDefault();
          this.setAllWork(false);
        }
      });
      const openers = q("[data-project]").concat(q("[data-open-work]")).concat(Array.prototype.slice.call(document.querySelectorAll("[data-project]"))).filter((el, i, a) => a.indexOf(el) === i);
      openers.forEach(c => {
        this.on(c, "click", e => {
          e.preventDefault();
          this.setAllWork(true);
        });
      });
    }
    window.__fugazLive = this;
    if (!window.__fugazClickBound) {
      window.__fugazClickBound = true;
      document.addEventListener("click", e => {
        const inst = window.__fugazLive;
        if (inst && inst.handleClick) {
          try {
            inst.handleClick(e);
          } catch (err) {
            console.error(err);
          }
        }
      });
      document.addEventListener("keydown", e => {
        const inst = window.__fugazLive;
        if (e.key !== "Escape" || !inst) return;
        if (inst.contactOpen) inst.closeContact();else if (inst.menuOpen) inst.toggleMenu(false);
      });
    }
    const form = root.querySelector("[data-form]");
    const done = root.querySelector("[data-form-done]");
    if (form && done) this.on(form, "submit", e => {
      e.preventDefault();
      form.style.opacity = "0";
      form.style.transition = "opacity 0.6s " + E;
      setTimeout(() => {
        form.style.display = "none";
        done.style.display = "block";
        done.style.opacity = "0";
        done.style.transition = "opacity 0.9s " + E;
        requestAnimationFrame(() => {
          done.style.opacity = "1";
        });
      }, 380);
    });
    const projCards = q("[data-project]");
    if (projCards.length && !reduced && !(window.matchMedia && window.matchMedia("(pointer: coarse)").matches)) {
      const pill = document.createElement("div");
      pill.style.cssText = "position:fixed;left:0;top:0;z-index:58;pointer-events:none;display:flex;align-items:center;justify-content:center;height:46px;padding:0 22px;border-radius:999px;background:rgba(10,10,12,0.46);backdrop-filter:blur(18px) saturate(1.4);-webkit-backdrop-filter:blur(18px) saturate(1.4);border:1px solid rgba(255,255,255,0.26);box-shadow:0 14px 40px rgba(0,0,0,0.24),inset 0 1px 0 rgba(255,255,255,0.22);color:#FFFFFF;font-family:inherit;font-weight:500;font-size:14px;line-height:0.909;letter-spacing:-0.020em;white-space:nowrap;opacity:0;visibility:hidden;will-change:transform;transform:translate3d(0,0,0) translate(-50%,-50%) scale(0.72);transition:opacity 0.42s " + E;
      pill.textContent = "View all projects";
      root.appendChild(pill);
      let px = 0,
        py = 0,
        tx = 0,
        ty = 0,
        praf = 0,
        pOn = false;
      const ploop = () => {
        px += (tx - px) * 0.18;
        py += (ty - py) * 0.18;
        pill.style.transform = "translate3d(" + px.toFixed(1) + "px," + py.toFixed(1) + "px,0) translate(-50%,-50%) scale(" + (pOn ? 1 : 0.72) + ")";
        if (pOn || Math.hypot(tx - px, ty - py) > 0.5) praf = requestAnimationFrame(ploop);else praf = 0;
      };
      const pKick = () => {
        if (!praf) praf = requestAnimationFrame(ploop);
      };
      this.cleanup.push(() => {
        cancelAnimationFrame(praf);
        pill.remove();
      });
      const zones = [];
      projCards.forEach(card => {
        const z = card.closest('[data-r="work-grid"]') || card.parentElement;
        if (z && zones.indexOf(z) === -1) zones.push(z);
      });
      let hideT = 0;
      const showPill = (e, label) => {
        clearTimeout(hideT);
        if (!pOn) {
          tx = px = e.clientX;
          ty = py = e.clientY;
        }
        if (label) pill.textContent = label;
        pOn = true;
        pill.style.visibility = "visible";
        pill.style.opacity = "1";
        pKick();
      };
      zones.forEach(zone => {
        this.on(zone, "mousemove", e => {
          const card = e.target.closest ? e.target.closest("[data-project]") : null;
          tx = e.clientX;
          ty = e.clientY;
          showPill(e, card ? card.getAttribute("data-project") || "View all projects" : null);
        });
        this.on(zone, "mouseleave", e => {
          if (e.relatedTarget && zone.contains(e.relatedTarget)) return;
          pOn = false;
          pill.style.opacity = "0";
          pKick();
          hideT = setTimeout(() => {
            if (!pOn) pill.style.visibility = "hidden";
          }, 460);
        });
      });
    }
    if (!reduced) {
      const wcards = q('[data-r="work-grid"] [data-project]');
      const shot = c => c.querySelector("span");
      const coarseW = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
      if (wcards.length && !coarseW) {
        wcards.forEach(card => {
          const im = shot(card);
          card.style.transition = "none";
          if (im) im.style.transition = "transform 1.05s " + E;
          this.on(card, "mouseenter", () => {
            if (im) im.style.willChange = "transform";
          });
          this.on(card, "mousemove", e => {
            if (!im) return;
            const r = card.getBoundingClientRect();
            const dx = ((e.clientX - r.left) / r.width - 0.5) * 20;
            const dy = ((e.clientY - r.top) / r.height - 0.5) * 13;
            im.style.transform = "translate3d(calc(-50% + " + dx.toFixed(1) + "px),calc(-50% + " + dy.toFixed(1) + "px),0) scale(1.07)";
          });
          this.on(card, "mouseleave", () => {
            if (im) im.style.transform = "translate3d(-50%,-50%,0) scale(1.07)";
            clearTimeout(card.__wcT);
            card.__wcT = setTimeout(() => {
              card.style.willChange = "auto";
              if (im) im.style.willChange = "auto";
            }, 1100);
          });
        });
      } else if (wcards.length) {
        let wraf = 0;
        const drift = () => {
          wraf = 0;
          const vh = window.innerHeight;
          for (let i = 0; i < wcards.length; i++) {
            const card = wcards[i],
              r = card.getBoundingClientRect();
            if (r.bottom < -100 || r.top > vh + 100) continue;
            const im = shot(card);
            if (!im) continue;
            const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
            im.style.transform = "translate3d(-50%,calc(-50% + " + (15 - p * 30).toFixed(1) + "px),0) scale(1.07)";
          }
        };
        wcards.forEach(c => {
          const im = shot(c);
          if (im) im.style.willChange = "transform";
        });
        const onW = () => {
          if (!wraf) wraf = requestAnimationFrame(drift);
        };
        this.on(window, "scroll", onW, {
          passive: true
        });
        this.on(window, "resize", onW);
        drift();
        this.cleanup.push(() => cancelAnimationFrame(wraf));
      }
    }
    const wireButtons = () => Array.prototype.slice.call(document.querySelectorAll("button:not([data-step-item]):not([data-gravity-toggle]):not([data-hanger-toggle]):not([data-menu-toggle]):not([data-mdot]):not([data-faq-q]):not([data-open-wa]):not([data-fl]):not([data-scan-back]):not([data-scan-next]):not([data-brief-send])")).forEach(b => {
      if (b.dataset.btnReady) return;
      if (b.querySelector("svg") || b.querySelector("[data-scan-chip]") || b.hasAttribute("data-scan-opt")) return;
      const bg = getComputedStyle(b).backgroundColor.replace(/\s/g, "");
      const light = bg === "rgb(255,255,255)";
      if (bg === "rgb(0,0,0)") b.dataset.keepEdge = "1";
      const txt = b.textContent.trim();
      b.textContent = "";
      b.style.paddingTop = "0px";
      b.style.paddingBottom = "0px";
      const clip = document.createElement("span");
      clip.style.cssText = "position:relative;z-index:1;display:block;height:1.5em;overflow:hidden";
      const stack = document.createElement("span");
      stack.style.cssText = "display:block;transition:transform 0.62s " + E;
      [0, 1].forEach(k => {
        const l = document.createElement("span");
        l.style.cssText = "display:block;height:1.5em;line-height:1.5em;white-space:nowrap" + (k ? ";color:" + (light ? "#FFFFFF" : "#000000") : "");
        l.textContent = txt;
        if (k) l.setAttribute("aria-hidden", "true");
        stack.appendChild(l);
      });
      clip.appendChild(stack);
      const fill = document.createElement("span");
      fill.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;border-radius:inherit;background:" + (light ? "#000000" : "#FFFFFF") + (b.dataset.keepEdge ? ";box-shadow:inset 0 0 0 1px #000000" : "") + ";clip-path:circle(0% at 50% 50%);transition:clip-path 0.72s " + E;
      b.style.position = "relative";
      b.appendChild(fill);
      b.appendChild(clip);
      b.dataset.btnReady = "1";
    });
    wireButtons();
    wireFns.push(wireButtons);
    const wireIconPills = () => Array.prototype.forEach.call(document.querySelectorAll("button[data-open-wa]"), b => {
      if (b.dataset.btnReady) return;
      const icon = b.querySelector("svg");
      const txt = b.textContent.trim();
      const gap = getComputedStyle(b).gap;
      b.textContent = "";
      b.style.paddingTop = "0px";
      b.style.paddingBottom = "0px";
      b.style.gap = "0px";
      b.dataset.keepEdge = "1";
      const clip = document.createElement("span");
      clip.style.cssText = "position:relative;z-index:1;display:block;height:1.5em;overflow:hidden";
      const stack = document.createElement("span");
      stack.style.cssText = "display:block;transition:transform 0.62s " + E;
      [0, 1].forEach(k => {
        const l = document.createElement("span");
        l.style.cssText = "display:flex;align-items:center;gap:" + (gap && gap !== "normal" ? gap : "10px") + ";height:1.5em;line-height:1.5em;white-space:nowrap" + (k ? ";color:#000000" : "");
        if (icon) l.appendChild(icon.cloneNode(true));
        l.appendChild(document.createTextNode(txt));
        if (k) l.setAttribute("aria-hidden", "true");
        stack.appendChild(l);
      });
      clip.appendChild(stack);
      const fill = document.createElement("span");
      fill.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;border-radius:inherit;background:#FFFFFF;box-shadow:inset 0 0 0 1px #000000;clip-path:circle(0% at 50% 50%);transition:clip-path 0.72s " + E;
      b.style.position = "relative";
      b.appendChild(fill);
      b.appendChild(clip);
      b.dataset.btnReady = "1";
    });
    wireIconPills();
    wireFns.push(wireIconPills);
    const footWaPill = root.querySelector('[data-r="foot-wa"]');
    if (footWaPill && !footWaPill.dataset.btnReady) {
      footWaPill.dataset.btnReady = "1";
      const fWfill = document.createElement("span");
      fWfill.setAttribute("aria-hidden", "true");
      fWfill.className = "fg-footer-wa-fill";
      fWfill.style.transition = "clip-path 0.72s " + E;
      footWaPill.insertBefore(fWfill, footWaPill.firstChild);
      Array.prototype.forEach.call(footWaPill.children, c => {
        if (c === fWfill) return;
        c.style.position = "relative";
        c.style.zIndex = "1";
      });
      const fWlabel = footWaPill.querySelector("[data-fl]");
      if (fWlabel) fWlabel.style.transition = "color 0.42s " + E;
      const fWdisc = footWaPill.querySelector('.whatsapp-icon-disc') || Array.prototype.filter.call(footWaPill.children, c => c.querySelector && c.querySelector("img"))[0];
      const fWglyph = fWdisc && fWdisc.querySelector("img");
      let fWrollIn = null,
        fWrollOut = null;
      if (fWglyph && !fWdisc.dataset.rollReady) {
        fWdisc.dataset.rollReady = "1";
        const gw = fWglyph.style.width || getComputedStyle(fWglyph).width || "17.8px",
          gh = fWglyph.style.height || getComputedStyle(fWglyph).height || "17.9px";
        const mask = document.createElement("span");
        mask.setAttribute("aria-hidden", "true");
        mask.style.cssText = "position:relative;display:block;width:" + gw + ";height:" + gh + ";overflow:hidden";
        fWrollOut = document.createElement("span");
        fWrollOut.style.cssText = "position:absolute;left:0;top:0;display:block;transform:translateY(0);transition:transform 0.62s " + E + ";will-change:transform";
        fWrollIn = document.createElement("span");
        fWrollIn.style.cssText = "position:absolute;left:0;top:0;display:block;transform:translateY(100%);transition:transform 0.62s " + E + ";will-change:transform";
        const copy = fWglyph.cloneNode(true);
        fWglyph.replaceWith(mask);
        fWrollOut.appendChild(fWglyph);
        fWrollIn.appendChild(copy);
        mask.appendChild(fWrollOut);
        mask.appendChild(fWrollIn);
      }
      if (fWdisc) fWdisc.style.transition = "transform 0.6s " + E;
      const fWskin = (on, ev) => {
        if (fWdisc) fWdisc.style.transform = "none";
        if (fWrollIn) fWrollIn.style.transform = on ? "translateY(0)" : "translateY(100%)";
        if (fWrollOut) fWrollOut.style.transform = on ? "translateY(-100%)" : "translateY(0)";
        const r = footWaPill.getBoundingClientRect();
        const x = on && ev && r.width ? ((ev.clientX - r.left) / r.width * 100).toFixed(1) : fWfill.dataset.ox || "50";
        const y = on && ev && r.height ? ((ev.clientY - r.top) / r.height * 100).toFixed(1) : fWfill.dataset.oy || "50";
        fWfill.dataset.ox = x;
        fWfill.dataset.oy = y;
        fWfill.style.transition = "clip-path " + (on ? "0.72s" : "0.5s") + " " + E;
        fWfill.style.clipPath = "circle(" + (on ? 150 : 0) + "% at " + x + "% " + y + "%)";
        if (fWlabel) fWlabel.style.color = on ? "#FFFFFF" : "#000000";
      };
      this.on(footWaPill, "mouseenter", ev => fWskin(true, ev));
      this.on(footWaPill, "mouseleave", ev => fWskin(false, ev));
    }
    const skin = (b, on, ev) => {
      const fill = b.firstElementChild;
      const stack = b.lastElementChild && b.lastElementChild.firstElementChild;
      if (fill) {
        const r = b.getBoundingClientRect();
        if (on && ev && r.width) {
          const x = ((ev.clientX - r.left) / r.width * 100).toFixed(1);
          const y = ((ev.clientY - r.top) / r.height * 100).toFixed(1);
          fill.dataset.ox = x;
          fill.dataset.oy = y;
        }
        const ox = fill.dataset.ox || "50",
          oy = fill.dataset.oy || "50";
        fill.style.transition = "clip-path " + (on ? "0.72s" : "0.5s") + " " + E;
        fill.style.clipPath = "circle(" + (on ? 150 : 0) + "% at " + ox + "% " + oy + "%)";
      }
      if (stack) stack.style.transform = on ? "translateY(-50%)" : "translateY(0)";
    };
    q("[data-avgroup]").forEach(group => {
      const tips = Array.from(group.querySelectorAll("[data-tip]"));
      if (tips.length < 2) return;
      const show = (tip, on) => {
        const bub = tip.querySelector("[data-tipbubble]");
        if (!bub) return;
        if (bub._hideT) {
          clearTimeout(bub._hideT);
          bub._hideT = 0;
        }
        bub.style.opacity = on ? "1" : "0";
        bub.style.transform = on ? "translate3d(-50%,0,0) scale(1)" : "translate3d(-50%,-8px,0) scale(0.8)";
      };
      const pad = 16;
      const inZone = e => {
        const r = group.getBoundingClientRect();
        return e.clientX >= r.left - pad && e.clientX <= r.right + pad && e.clientY >= r.top - pad && e.clientY <= r.bottom + pad;
      };
      this.on(document, "mousemove", e => {
        if (!inZone(e)) {
          if (group._on) {
            group._on = false;
            tips.forEach(t => show(t, false));
          }
          return;
        }
        group._on = true;
        let near = null,
          best = Infinity;
        tips.forEach(t => {
          const r = t.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          if (d < best) {
            best = d;
            near = t;
          }
        });
        tips.forEach(t => show(t, t === near));
      });
      this.on(group, "mouseleave", () => {
        tips.forEach(t => show(t, false));
      });
      if (window.matchMedia && window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0 || "ontouchstart" in window) {
        const holdT = {
          id: 0
        };
        this.on(group, "click", e => {
          let near = tips[0],
            best = Infinity;
          const px = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
          const py = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
          tips.forEach(t => {
            const r = t.getBoundingClientRect();
            const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
            if (d < best) {
              best = d;
              near = t;
            }
          });
          tips.forEach(t => show(t, t === near));
          clearTimeout(holdT.id);
          holdT.id = setTimeout(() => {
            tips.forEach(t => show(t, false));
          }, 800);
        });
        this.cleanup.push(() => clearTimeout(holdT.id));
      }
    });
    this.on(document, "mouseover", e => {
      const b = e.target.closest && e.target.closest("button[data-btn-ready]");
      if (b && !b.dataset.btnOn) {
        b.dataset.btnOn = "1";
        skin(b, true, e);
      }
      const tip = e.target.closest && e.target.closest("[data-tip]");
      if (tip && !tip.closest("[data-avgroup]")) {
        const bub = tip.querySelector("[data-tipbubble]");
        if (bub) {
          if (bub._hideT) {
            clearTimeout(bub._hideT);
            bub._hideT = 0;
          }
          bub.style.opacity = "1";
          bub.style.transform = "translate3d(-50%,0,0) scale(1)";
        }
      }
    });
    this.on(document, "mouseout", e => {
      const tipOut = e.target.closest && e.target.closest("[data-tip]");
      if (tipOut && !tipOut.closest("[data-avgroup]") && !(e.relatedTarget && tipOut.contains(e.relatedTarget))) {
        const bub = tipOut.querySelector("[data-tipbubble]");
        if (bub) {
          if (bub._hideT) clearTimeout(bub._hideT);
          bub._hideT = setTimeout(() => {
            bub._hideT = 0;
            if (tipOut.matches(":hover")) return;
            bub.style.opacity = "0";
            bub.style.transform = "translate3d(-50%,-8px,0) scale(0.8)";
          }, 150);
        }
      }
      const b = e.target.closest && e.target.closest("button[data-btn-ready]");
      if (!b || e.relatedTarget && b.contains(e.relatedTarget)) return;
      delete b.dataset.btnOn;
      skin(b, false, e);
    });
    const heroEls = () => Array.from((this.rootRef.current || root).querySelectorAll("[data-hero]"));
    const heroLines = () => Array.from((this.rootRef.current || root).querySelectorAll("[data-hero-lines] [data-hw]"));
    const heroWordDelay = (w, i) => {
      const host = w.closest("[data-hero-lines]");
      if (!host) return (i * 0.055).toFixed(3);
      const idx = Array.prototype.indexOf.call(host.querySelectorAll("[data-hw]"), w);
      return (num(host, "data-lines-delay", 0) + idx * num(host, "data-lines-step", 0.055)).toFixed(3);
    };
    if (!reduced) heroEls().forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(34px)";
      el.style.willChange = "opacity, transform";
    });
    const cap = root.querySelector("[data-capsule]");
    const avs = cap ? Array.from(cap.querySelectorAll('[data-av]')) : [];
    if (cap && !reduced) {
      cap.style.opacity = "0";
      cap.style.transform = "translateY(-10px)";
      cap.style.clipPath = "inset(0 100% 0 0 round 9.678px)";
      cap.style.willChange = "opacity, transform, clip-path";
      avs.forEach(a => {
        a.style.opacity = "0";
        a.style.transform = "translateY(6px) scale(0.6)";
      });
    }
    const capMark = cap ? cap.querySelector('img[src*="logo-mark"]') : null;
    if (capMark && !reduced) {
      capMark.style.transform = "rotate(-200deg) scale(0.75)";
      capMark.style.willChange = "transform";
    }
    const popCapsule = () => {
      if (!cap) return;
      if (capSheenSweep) setTimeout(capSheenSweep, 1320);
      if (capMark && !reduced) {
        delete capMark.dataset.spinning;
        capMark.style.transition = "none";
        capMark.style.transform = "rotate(-200deg) scale(0.75)";
        void capMark.offsetHeight;
        capMark.style.transition = "transform 1.05s " + E + " 0.18s";
        capMark.style.transform = "none";
      }
      cap.style.transition = "opacity 0.35s " + E + " 0.12s, transform 1.1s " + E + " 0.12s, clip-path 1.05s " + E + " 0.12s";
      cap.style.opacity = "1";
      cap.style.transform = "none";
      cap.style.clipPath = "inset(0 0% 0 0 round 9.678px)";
      avs.forEach((a, i) => {
        const d = 0.52 + i * 0.11;
        a.style.transition = "opacity 0.6s " + E + " " + d + "s, transform 1s " + E + " " + d + "s";
        a.style.opacity = "1";
        a.style.transform = "none";
      });
      setTimeout(() => {
        cap.style.willChange = "";
        cap.style.clipPath = "";
        cap.style.transition = "opacity 0.42s " + E;
      }, 2200);
    };
    const bento = root.querySelector("#top");
    const bentoScale = () => {
      if (!bento) return 1.075;
      const r = bento.getBoundingClientRect();
      if (!r.width || !r.height) return 1.075;
      const fill = Math.max(window.innerWidth / r.width, window.innerHeight / r.height);
      return Math.min(1.3, Math.max(1.03, fill * 1.05));
    };
    if (bento && !reduced) {
      bento.style.transformOrigin = "50% 42%";
      bento.style.transform = "scale(" + bentoScale().toFixed(4) + ")";
      bento.style.borderRadius = "0px";
      bento.style.willChange = "transform, border-radius";
      bento.style.zIndex = "3";
    }
    const settleBento = () => {
      if (!bento || reduced) return;
      bento.style.transition = "none";
      bento.style.transform = "none";
      void bento.offsetHeight;
      bento.style.transform = "scale(" + bentoScale().toFixed(4) + ")";
      bento.style.borderRadius = "0px";
      void bento.offsetHeight;
      bento.style.transition = "transform 2.6s cubic-bezier(0.20,1,0.26,1), border-radius 2.1s cubic-bezier(0.20,1,0.26,1) 0.22s";
      bento.style.transform = "none";
      bento.style.borderRadius = "29px";
      setTimeout(() => {
        bento.style.willChange = "";
        bento.style.transition = "";
        bento.style.zIndex = "";
      }, 2900);
    };
    const hSlow = window.matchMedia("(max-width:700px)").matches ? 1.5 : 1;
    const enterHero = () => {
      settleBento();
      heroEls().forEach(el => {
        const d = num(el, "data-delay", 0) * hSlow;
        const from = el.getAttribute("data-hero-from") || "translateY(34px)";
        if (el.__heroIn) {
          try {
            el.__heroIn.cancel();
          } catch (e) {}
        }
        el.__heroIn = el.animate([{
          opacity: 0,
          transform: from
        }, {
          opacity: 1,
          transform: "none"
        }], {
          duration: 1200 * hSlow,
          delay: d * 1000,
          easing: E,
          fill: "both"
        });
      });
      heroLines().forEach((w, i) => {
        if (w.__heroRise) {
          try {
            w.__heroRise.cancel();
          } catch (e) {}
        }
        w.__heroRise = w.animate([{
          transform: "translate3d(0,112%,0)"
        }, {
          transform: "translate3d(0,0,0)"
        }], {
          duration: 1150 * hSlow,
          delay: parseFloat(heroWordDelay(w, i)) * 1000 * hSlow,
          easing: E,
          fill: "both"
        });
      });
      popCapsule();
    };
    const footCap = root.querySelector("[data-footcap]");
    const marks = [root.querySelector("[data-nav-lead]")].concat(cap ? Array.from(cap.querySelectorAll('img[src*="logo-mark"]')) : [], footCap ? Array.from(footCap.querySelectorAll('img[src*="logo-mark"]')) : []).filter(Boolean);
    marks.forEach(m => {
      m.style.willChange = "transform";
      this.on(m, "mouseenter", () => {
        if (m.dataset.spinning) return;
        m.dataset.spinning = "1";
        m.style.transition = "transform 0.62s " + E;
        m.style.transform = "rotate(360deg)";
        setTimeout(() => {
          m.style.transition = "none";
          m.style.transform = "none";
          void m.offsetHeight;
          delete m.dataset.spinning;
        }, 660);
      });
    });
    this.replayIntro = () => {
      if (reduced) return;
      heroEls().forEach(el => {
        el.style.transition = "none";
        el.style.opacity = "0";
        el.style.transform = "translateY(34px)";
      });
      heroLines().forEach(w => {
        if (w.__heroRise) {
          try {
            w.__heroRise.cancel();
          } catch (e) {}
          w.__heroRise = null;
        }
        w.style.transition = "none";
        w.style.transform = "translate3d(0,112%,0)";
      });
      if (cap) {
        cap.style.transition = "none";
        cap.style.opacity = "0";
        cap.style.transform = "translateY(-10px)";
        cap.style.clipPath = "inset(0 100% 0 0 round 9.678px)";
        avs.forEach(a => {
          a.style.transition = "none";
          a.style.opacity = "0";
          a.style.transform = "translateY(6px) scale(0.6)";
        });
      }
      void root.offsetHeight;
      heroLines().forEach((w, i) => {
        w.style.transition = "transform 1.05s " + E + " " + heroWordDelay(w, i) + "s";
      });
      enterHero();
    };
    const R = (id, f) => window.__resources && window.__resources[id] || f;
    const sheenHost = mark => {
      if (!mark) return null;
      const parent = mark.parentNode;
      if (parent && parent.dataset && parent.dataset.sheenHost) return parent;
      const wrap = document.createElement("span");
      wrap.dataset.sheenHost = "1";
      wrap.setAttribute("aria-hidden", "false");
      wrap.style.cssText = "position:relative;display:inline-flex;flex:none;overflow:visible;line-height:0";
      if (parent) parent.insertBefore(wrap, mark);
      wrap.appendChild(mark);
      return wrap;
    };
    let capSheenSweep = null;
    if (capMark && !reduced) {
      const host = sheenHost(capMark) || capMark;
      host.style.position = "relative";
      host.style.overflow = "visible";
      const shWrap = document.createElement("span");
      shWrap.setAttribute("aria-hidden", "true");
      const mask = "url(" + R("markMask", "assets/logo-mark-black.svg") + ")";
      shWrap.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:2;overflow:hidden;" + "-webkit-mask-image:" + mask + ";mask-image:" + mask + ";" + "-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;" + "-webkit-mask-position:center;mask-position:center";
      const sh = document.createElement("span");
      sh.style.cssText = "position:absolute;left:0;top:-40%;width:26%;height:180%;" + "background:linear-gradient(100deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.18) 26%," + "rgba(255,255,255,0.95) 48%,rgba(255,255,255,1) 52%,rgba(255,255,255,0.22) 74%,rgba(255,255,255,0) 100%);" + "filter:blur(0.6px);transform:translateX(-190%) rotate(18deg) scaleX(1);opacity:0;will-change:transform,opacity";
      shWrap.appendChild(sh);
      host.appendChild(shWrap);
      capSheenSweep = () => {
        sh.style.transition = "none";
        sh.style.transform = "translateX(-190%) rotate(18deg) scaleX(0.7)";
        sh.style.opacity = "0";
        void sh.offsetHeight;
        requestAnimationFrame(() => {
          sh.style.transition = "transform 0.92s cubic-bezier(0.32,0.06,0.2,1), opacity 0.28s " + E;
          sh.style.transform = "translateX(420%) rotate(18deg) scaleX(1.55)";
          sh.style.opacity = "1";
          setTimeout(() => {
            sh.style.transition = "opacity 0.44s " + E;
            sh.style.opacity = "0";
          }, 480);
        });
      };
    }
    if (capMark && !reduced) {
      const spin = () => {
        if (capMark.dataset.spinning) return;
        const r = capMark.getBoundingClientRect();
        if (r.bottom < 40 || r.top > window.innerHeight) return;
        if (this.contactOpen) return;
        capMark.dataset.spinning = "1";
        capMark.style.transition = "transform 0.7s " + E;
        capMark.style.transform = "rotate(360deg)";
        setTimeout(() => {
          capMark.style.transition = "none";
          capMark.style.transform = "none";
          void capMark.offsetHeight;
          delete capMark.dataset.spinning;
          if (capSheenSweep) capSheenSweep();
        }, 740);
      };
      const idle = setInterval(spin, 5000);
      this.cleanup.push(() => clearInterval(idle));
    }
    const fCap = root.querySelector("[data-footcap]");
    const fMark = fCap ? fCap.querySelector('img[src*="logo-mark"]') : null;
    if (fMark && !reduced) {
      const fHost = sheenHost(fMark) || fMark;
      const fw = document.createElement("span");
      fw.setAttribute("aria-hidden", "true");
      const fm = "url(" + R("markMask", "assets/logo-mark-black.svg") + ")";
      fw.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:2;overflow:hidden;" + "-webkit-mask-image:" + fm + ";mask-image:" + fm + ";-webkit-mask-size:contain;mask-size:contain;" + "-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center";
      const fs = document.createElement("span");
      fs.style.cssText = "position:absolute;left:0;top:-40%;width:26%;height:180%;" + "background:linear-gradient(100deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.18) 26%," + "rgba(255,255,255,0.95) 48%,rgba(255,255,255,1) 52%,rgba(255,255,255,0.22) 74%,rgba(255,255,255,0) 100%);" + "filter:blur(0.6px);transform:translateX(-190%) rotate(18deg) scaleX(0.7);opacity:0;will-change:transform,opacity";
      fw.appendChild(fs);
      fHost.appendChild(fw);
      const fSheen = () => {
        fs.style.transition = "none";
        fs.style.transform = "translateX(-190%) rotate(18deg) scaleX(0.7)";
        fs.style.opacity = "0";
        void fs.offsetHeight;
        requestAnimationFrame(() => {
          fs.style.transition = "transform 0.92s cubic-bezier(0.32,0.06,0.2,1), opacity 0.28s " + E;
          fs.style.transform = "translateX(420%) rotate(18deg) scaleX(1.55)";
          fs.style.opacity = "1";
          setTimeout(() => {
            fs.style.transition = "opacity 0.44s " + E;
            fs.style.opacity = "0";
          }, 480);
        });
      };
      this.footSheen = fSheen;
      const fSpin = () => {
        if (fMark.dataset.spinning || this.contactOpen) return;
        const r = fMark.getBoundingClientRect();
        if (r.bottom < 40 || r.top > window.innerHeight) return;
        fMark.dataset.spinning = "1";
        fMark.style.transition = "transform 0.7s " + E;
        fMark.style.transform = "rotate(360deg)";
        setTimeout(() => {
          fMark.style.transition = "none";
          fMark.style.transform = "none";
          void fMark.offsetHeight;
          delete fMark.dataset.spinning;
          fSheen();
        }, 740);
      };
      const fIdle = setInterval(fSpin, 5000);
      this.cleanup.push(() => clearInterval(fIdle));
    }
    const navMark = root.querySelector("[data-nav-lead]");
    const navPill = navMark ? navMark.closest("[data-nav]") : null;
    if (navMark && !reduced) {
      const nHost = sheenHost(navMark) || navMark;
      const nw = document.createElement("span");
      nw.setAttribute("aria-hidden", "true");
      const nm = "url(" + R("markMask", "assets/logo-mark-black.svg") + ")";
      nw.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:2;overflow:hidden;" + "-webkit-mask-image:" + nm + ";mask-image:" + nm + ";-webkit-mask-size:contain;mask-size:contain;" + "-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center";
      const ns = document.createElement("span");
      ns.style.cssText = "position:absolute;left:0;top:-40%;width:26%;height:180%;" + "background:linear-gradient(100deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.18) 26%," + "rgba(255,255,255,0.95) 48%,rgba(255,255,255,1) 52%,rgba(255,255,255,0.22) 74%,rgba(255,255,255,0) 100%);" + "filter:blur(0.6px);transform:translateX(-190%) rotate(18deg) scaleX(0.7);opacity:0;will-change:transform,opacity";
      nw.appendChild(ns);
      nHost.appendChild(nw);
      const nSheen = () => {
        ns.style.transition = "none";
        ns.style.transform = "translateX(-190%) rotate(18deg) scaleX(0.7)";
        ns.style.opacity = "0";
        void ns.offsetHeight;
        requestAnimationFrame(() => {
          ns.style.transition = "transform 0.92s cubic-bezier(0.32,0.06,0.2,1), opacity 0.28s " + E;
          ns.style.transform = "translateX(420%) rotate(18deg) scaleX(1.55)";
          ns.style.opacity = "1";
          setTimeout(() => {
            ns.style.transition = "opacity 0.44s " + E;
            ns.style.opacity = "0";
          }, 480);
        });
      };
      const nSpin = () => {
        if (navMark.dataset.spinning || this.contactOpen || this.workOpen) return;
        if (navPill && (parseFloat(getComputedStyle(navPill).opacity) < 0.9 || getComputedStyle(navPill).display === "none")) return;
        navMark.dataset.spinning = "1";
        navMark.style.transition = "transform 0.7s " + E;
        navMark.style.transform = "rotate(360deg)";
        setTimeout(() => {
          navMark.style.transition = "none";
          navMark.style.transform = "none";
          void navMark.offsetHeight;
          delete navMark.dataset.spinning;
          nSheen();
        }, 740);
      };
      const nIdle = setInterval(nSpin, 5000);
      this.cleanup.push(() => clearInterval(nIdle));
    }
    const mNav = root.querySelector("[data-mnav]");
    const mMark = mNav ? mNav.querySelector('img[src*="logo-mark"]') : null;
    if (mMark && !reduced) {
      const mHost = sheenHost(mMark) || mMark;
      const mw = document.createElement("span");
      mw.setAttribute("aria-hidden", "true");
      const mm = "url(" + R("markMask", "assets/logo-mark-black.svg") + ")";
      mw.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:2;overflow:hidden;" + "-webkit-mask-image:" + mm + ";mask-image:" + mm + ";-webkit-mask-size:contain;mask-size:contain;" + "-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center";
      const ms = document.createElement("span");
      ms.style.cssText = "position:absolute;left:0;top:-40%;width:26%;height:180%;" + "background:linear-gradient(100deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.18) 26%," + "rgba(255,255,255,0.95) 48%,rgba(255,255,255,1) 52%,rgba(255,255,255,0.22) 74%,rgba(255,255,255,0) 100%);" + "filter:blur(0.6px);transform:translateX(-190%) rotate(18deg) scaleX(0.7);opacity:0;will-change:transform,opacity";
      mw.appendChild(ms);
      mHost.appendChild(mw);
      const mSheen = () => {
        ms.style.transition = "none";
        ms.style.transform = "translateX(-190%) rotate(18deg) scaleX(0.7)";
        ms.style.opacity = "0";
        void ms.offsetHeight;
        requestAnimationFrame(() => {
          ms.style.transition = "transform 0.92s cubic-bezier(0.32,0.06,0.2,1), opacity 0.28s " + E;
          ms.style.transform = "translateX(420%) rotate(18deg) scaleX(1.55)";
          ms.style.opacity = "1";
          setTimeout(() => {
            ms.style.transition = "opacity 0.44s " + E;
            ms.style.opacity = "0";
          }, 480);
        });
      };
      const mSpin = () => {
        if (mMark.dataset.spinning || this.contactOpen || this.menuOpen) return;
        const r = mNav.getBoundingClientRect();
        if (!r.width || getComputedStyle(mNav).display === "none") return;
        mMark.dataset.spinning = "1";
        mMark.style.transition = "transform 0.7s " + E;
        mMark.style.transform = "rotate(360deg)";
        setTimeout(() => {
          mMark.style.transition = "none";
          mMark.style.transform = "none";
          void mMark.offsetHeight;
          delete mMark.dataset.spinning;
          mSheen();
        }, 740);
      };
      const mIdle = setInterval(mSpin, 5000);
      this.cleanup.push(() => clearInterval(mIdle));
    }
    this.enterHero = enterHero;
    if (!this.playIntro || this.introDone) {
      void root.offsetHeight;
      enterHero();
    }
  }
  runIntro() {
    const root = this.rootRef.current;
    const E = this.EASE;
    const pre = root && root.querySelector("[data-preloader]") || document.querySelector("[data-preloader]");
    if (!pre) return;
    const sheet = pre.querySelector("[data-presheet]");
    const mark = pre.querySelector("[data-premark]");
    const glyphs = Array.from(pre.querySelectorAll("[data-pg]"));
    if (!sheet || !mark) return;
    try {
      window.sessionStorage.setItem("fugaz.intro.seen", "1");
    } catch (e) {}
    pre.style.display = "block";
    document.documentElement.style.overflow = "hidden";
    this.locked = true;
    pre.style.pointerEvents = "auto";
    pre.style.cursor = "default";
    const skipIntro = () => {
      if (this.introDone) return;
      this.introDone = true;
      pre.style.transition = "opacity 0.4s " + E;
      pre.style.opacity = "0";
      setTimeout(() => {
        pre.style.display = "none";
        pre.style.opacity = "";
        pre.style.transition = "";
        pre.style.pointerEvents = "none";
      }, 420);
      document.documentElement.style.overflow = "";
      this.locked = false;
      if (this.enterHero) this.enterHero();
    };
    const skipKey = e => {
      if (e.key === "Escape") skipIntro();
    };
    document.addEventListener("keydown", skipKey);
    setTimeout(() => document.removeEventListener("keydown", skipKey), 4200);
    [sheet, mark].concat(glyphs).forEach(el => el.getAnimations().forEach(a => a.cancel()));
    sheet.style.clipPath = "inset(0% 0% 0% 0%)";
    mark.style.visibility = "";
    const sr = pre.getBoundingClientRect();
    const mr = mark.getBoundingClientRect();
    const k = mr.height / (mark.offsetHeight || mr.height || 1);
    const mcx = mr.left + mr.width / 2,
      mcy = mr.top + mr.height / 2;
    const dx0 = (sr.left + sr.width / 2 - mcx) / k;
    const dy0 = (sr.top + sr.height / 2 - mcy) / k;
    const popScale = Math.min(2.4, (sr.width < 760 ? 84 : 122) / mr.height);
    const stag = 34,
      out = 9,
      n = glyphs.length;
    const kPop = 100,
      kLock = 780,
      kType = 840,
      kExit = 1950;
    const kSheet = 2340,
      kEnd = 3000;
    const kMarkOut = kExit;
    const o = ms => Math.max(0, Math.min(1, ms / kEnd));
    const SLOW = 1;
    const run = (el, frames) => el && el.animate(frames, {
      duration: kEnd * SLOW,
      easing: "linear",
      fill: "both"
    });
    const M = (x, y, r, s) => "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + s + ")";
    run(mark, [{
      opacity: 0,
      transform: M(dx0, dy0, -150, popScale * 0.46),
      clipPath: "inset(0% 0% 0% 0%)",
      offset: 0
    }, {
      opacity: 0,
      transform: M(dx0, dy0, -150, popScale * 0.46),
      offset: o(kPop),
      easing: E
    }, {
      opacity: 1,
      transform: M(dx0, dy0, 0, popScale),
      offset: o(kPop + 620)
    }, {
      opacity: 1,
      transform: M(dx0, dy0, 0, popScale),
      offset: o(kLock),
      easing: E
    }, {
      opacity: 1,
      transform: M(0, 0, 0, 1),
      offset: o(kLock + 700)
    }, {
      opacity: 1,
      transform: M(0, 0, 0, 1),
      clipPath: "inset(0% 0% 0% 0%)",
      offset: o(kMarkOut),
      easing: E
    }, {
      opacity: 1,
      transform: "translate(0px,-130%) rotate(0deg) scale(1)",
      clipPath: "inset(130% 0% -30% 0%)",
      offset: o(kMarkOut + 420)
    }, {
      opacity: 1,
      transform: "translate(0px,-130%) rotate(0deg) scale(1)",
      clipPath: "inset(130% 0% -30% 0%)",
      offset: 1
    }]);
    glyphs.forEach((g, i) => {
      const inD = 760;
      run(g, [{
        transform: "translateY(130%)",
        offset: 0
      }, {
        transform: "translateY(130%)",
        offset: o(kType + i * stag * 3.2),
        easing: E
      }, {
        transform: "translateY(0%)",
        offset: o(kType + i * stag * 3.2 + inD)
      }, {
        transform: "translateY(0%)",
        offset: o(kExit),
        easing: E
      }, {
        transform: "translateY(-130%)",
        offset: o(kExit + 420)
      }, {
        transform: "translateY(-130%)",
        offset: 1
      }]);
    });
    const lockup = pre.querySelector("[data-prelockup]");
    run(lockup, [{
      opacity: 1,
      offset: 0
    }, {
      opacity: 1,
      offset: o(kSheet - 80)
    }, {
      opacity: 0,
      offset: o(kSheet)
    }, {
      opacity: 0,
      offset: 1
    }]);
    run(sheet, [{
      clipPath: "inset(0% 0% 0% 0%)",
      offset: 0
    }, {
      clipPath: "inset(0% 0% 0% 0%)",
      offset: o(kSheet),
      easing: E
    }, {
      clipPath: "inset(0% 0% 100% 0%)",
      offset: o(kSheet + 660)
    }, {
      clipPath: "inset(0% 0% 100% 0%)",
      offset: 1
    }]);
    setTimeout(() => {
      document.documentElement.style.overflow = "";
      this.locked = false;
      if (this.introDone) return;
      this.introDone = true;
      pre.style.pointerEvents = "none";
      if (this.enterHero) this.enterHero();
    }, (kSheet - 120) * SLOW);
    setTimeout(() => {
      pre.style.display = "none";
    }, (kEnd + 200) * SLOW);
  }
  renderVals() {
    const res = (id, f) => window.__resources && window.__resources[id] || f;
    const photoLuka = res("photoLuka", "assets/team-luka-poster.983507f75e59.webp");
    const photoDiego = res("photoDiego", "assets/team-diego-poster.43e640d32697.webp");
    const badgeDiego = res("badgeDiego", "assets/badge-diego.jpg");
    const badgeLuka = res("badgeLuka", "assets/badge-luka.webp");
    return {
      photoLuka: photoLuka,
      photoDiego: photoDiego,
      badgeDiego: badgeDiego,
      badgeLuka: badgeLuka,
      rootRef: this.rootRef
    };
  }
};
