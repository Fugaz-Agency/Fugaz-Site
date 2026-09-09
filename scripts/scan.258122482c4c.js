// Scan steps, delivery, result animation and overlay lifecycle.
// Runtime inline values are intentional: they represent current motion and UI state.
window.withFugazScan = Base => class extends Base {
  initScan() {
    const brief = document.querySelector("[data-brief]");
    if (brief && !brief.dataset.wired) {
      brief.dataset.wired = "1";
      const E2 = "cubic-bezier(0.16,1,0.3,1)";
      const steps = Array.prototype.slice.call(brief.querySelectorAll("[data-scan-step]"));
      const bars = Array.prototype.slice.call(brief.querySelectorAll("[data-scan-bar]"));
      const numEl = brief.querySelector("[data-scan-num]");
      const pctEl = brief.querySelector("[data-scan-pct]");
      const backB = brief.querySelector("[data-scan-back]");
      const nextB = brief.querySelector("[data-scan-next]");
      const sendB = brief.querySelector("[data-brief-send]");
      const BUD = ["€5–10K", "€10–25K", "€25–50K", "€50–100K", "€100K+"];
      const bud = brief.querySelector("[data-scan-budget]");
      const budOut = brief.querySelector("[data-scan-budout]");
      if (bud) {
        const paint = () => {
          bud.style.setProperty("--f", (+bud.value / 4 * 100).toFixed(2) + "%");
          if (budOut) budOut.textContent = BUD[Math.round(+bud.value)] || "";
        };
        this.on(bud, "input", paint);
        const THUMB = 22;
        const setFromX = clientX => {
          const r = bud.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, (clientX - r.left - THUMB / 2) / Math.max(1, r.width - THUMB)));
          bud.value = String(Math.round(p * 400) / 100);
          paint();
        };
        let dragId = null;
        const onMove = e => {
          if (dragId === null || e.pointerId !== dragId) return;
          setFromX(e.clientX);
          e.preventDefault();
        };
        const endDrag = e => {
          if (dragId === null || e && e.pointerId !== dragId) return;
          dragId = null;
          bud.style.cursor = "grab";
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", endDrag);
          window.removeEventListener("pointercancel", endDrag);
          window.removeEventListener("blur", endDrag);
          bud.dispatchEvent(new Event("change", {
            bubbles: true
          }));
        };
        this.on(bud, "touchmove", e => {
          if (dragId !== null) e.preventDefault();
        }, {
          passive: false
        });
        this.on(bud, "pointerdown", e => {
          if (dragId !== null) endDrag();
          dragId = e.pointerId;
          try {
            bud.setPointerCapture(e.pointerId);
          } catch (err) {}
          bud.style.cursor = "grabbing";
          setFromX(e.clientX);
          window.addEventListener("pointermove", onMove, {
            passive: false
          });
          window.addEventListener("pointerup", endDrag);
          window.addEventListener("pointercancel", endDrag);
          window.addEventListener("blur", endDrag);
          e.preventDefault();
        });
        let snapRaf = 0;
        this.on(bud, "change", () => {
          if (dragId !== null) return;
          cancelAnimationFrame(snapRaf);
          const from = +bud.value,
            to = Math.round(from),
            t0 = performance.now();
          if (Math.abs(to - from) < 0.001) {
            bud.value = String(to);
            paint();
            return;
          }
          const step = n => {
            const p = Math.min(1, (n - t0) / 240);
            bud.value = String(from + (to - from) * (1 - Math.pow(1 - p, 3)));
            paint();
            if (p < 1) snapRaf = requestAnimationFrame(step);else {
              bud.value = String(to);
              paint();
            }
          };
          snapRaf = requestAnimationFrame(step);
        });
        this.on(bud, "pointerdown", () => cancelAnimationFrame(snapRaf));
        paint();
      }
      let cur = 0;
      const show = (i, dir) => {
        cur = Math.max(0, Math.min(steps.length - 1, i));
        steps.forEach((s, k) => {
          s.classList.toggle("is-active", k === cur);
          if (k !== cur) {
            s.style.display = "none";
            return;
          }
          s.style.display = "flex";
          s.style.transition = "none";
          s.style.opacity = "0";
          s.style.transform = "translate3d(" + (dir < 0 ? -16 : 16) + "px,0,0)";
          void s.offsetHeight;
          s.style.transition = "opacity 0.55s " + E2 + ", transform 0.6s " + E2;
          s.style.opacity = "1";
          s.style.transform = "none";
        });
        bars.forEach((b, k) => {
          b.style.background = k <= cur ? "#FFFFFF" : "rgba(255,255,255,0.25)";
        });
        if (numEl) numEl.textContent = String(cur + 1);
        if (pctEl) pctEl.textContent = Math.round((cur + 1) / steps.length * 100) + "%";
        if (backB) backB.style.visibility = cur === 0 ? "hidden" : "visible";
        if (nextB) nextB.style.display = cur === steps.length - 1 ? "none" : "inline-flex";
        if (sendB) sendB.style.display = cur === steps.length - 1 ? "inline-flex" : "none";
      };
      this.on(brief, "click", e => {
        const opt = e.target.closest("[data-scan-opt]");
        if (opt) {
          const on = opt.dataset.on === "1";
          opt.dataset.on = on ? "" : "1";
          opt.style.background = on ? "rgba(255,255,255,0.10)" : "#FFFFFF";
          opt.style.color = on ? "#FFFFFF" : "#000000";
          const chip = opt.querySelector("[data-scan-chip]");
          if (chip) {
            chip.style.background = on ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.08)";
            chip.style.color = on ? "#FFFFFF" : "#000000";
          }
          return;
        }
        if (e.target.closest("[data-scan-next]")) {
          show(cur + 1, 1);
          return;
        }
        if (e.target.closest("[data-scan-back]")) {
          show(cur - 1, -1);
          return;
        }
      });
      show(0, 1);
      this.resetScan = () => {
        const host = brief.parentElement;
        host.removeAttribute("data-sent");
        this.lastDiag = null;
        window.__fugazScanDiag = null;
        const diagEl = document.querySelector("[data-scan-diag]");
        if (diagEl) diagEl.removeAttribute("data-on");
        const an = host.querySelector("[data-scan-analyse]"),
          dg = host.querySelector("[data-scan-diag]");
        if (an) {
          an.removeAttribute("data-on");
          an.getAnimations().forEach(x => x.cancel());
          const n = an.querySelector("[data-scan-pctnum]"),
            f = an.querySelector("[data-scan-fill]");
          if (n) n.textContent = "0%";
          if (f) f.style.width = "0";
        }
        if (dg) {
          dg.removeAttribute("data-on");
          dg.getAnimations().forEach(x => x.cancel());
          Array.prototype.forEach.call(dg.querySelectorAll("[data-seg]"), s => {
            s.getAnimations().forEach(x => x.cancel());
            s.style.opacity = "0.14";
          });
        }
        Array.prototype.forEach.call(brief.querySelectorAll("[data-scan-opt]"), o => {
          o.dataset.on = "";
          o.style.background = "rgba(255,255,255,0.12)";
          o.style.color = "#FFFFFF";
          const chip = o.querySelector("[data-scan-chip]");
          if (chip) {
            chip.style.background = "rgba(0,0,0,0.25)";
            chip.style.color = "#FFFFFF";
          }
        });
        Array.prototype.forEach.call(brief.querySelectorAll("input:not([type=range]),textarea"), f => {
          f.value = "";
        });
        if (bud) {
          bud.value = "1";
          bud.style.setProperty("--f", "25.00%");
          const bo = brief.querySelector("[data-scan-budout]");
          if (bo) bo.textContent = BUD[1];
        }
        const note = brief.querySelector("[data-brief-note]");
        if (note) note.textContent = "";
        show(0, 1);
      };
      if (sendB) this.on(sendB, "click", e => {
        e.preventDefault();
        if (typeof brief.requestSubmit === "function") brief.requestSubmit();else brief.dispatchEvent(new Event("submit", {
          bubbles: true,
          cancelable: true
        }));
      });
      this.on(brief, "submit", e => {
        e.preventDefault();
        const v = sel => {
          const el = brief.querySelector(sel);
          return el ? el.value.trim() : "";
        };
        const picks = k => Array.prototype.slice.call(steps[k].querySelectorAll("[data-scan-opt]")).filter(o => o.dataset.on === "1").map(o => o.getAttribute("data-scan-opt"));
        const brand = v("[data-brief-brand]"),
          mail = v("[data-brief-mail]"),
          msg = v("[data-brief-msg]");
        let site = v("[data-brief-site]");
        if (site && !/^https?:\/\//i.test(site)) site = "https://" + site.replace(/^\/+/, "");
        const note = brief.querySelector("[data-brief-note]");
        if (!brand) {
          if (note) note.textContent = "Tell us the brand name first.";
          const bEl = brief.querySelector("[data-brief-brand]");
          if (bEl) bEl.focus();
          return;
        }
        const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail);
        if (!mailOk) {
          if (note) note.textContent = mail ? "That email does not look right. Check it once." : "Leave an email so we can reach you.";
          const m = brief.querySelector("[data-brief-mail]");
          if (m) m.focus();
          return;
        }
        const sec = (label, arr) => arr.length ? label + ": " + arr.join(", ") : "";
        const payload = {
          brand: brand,
          website: site,
          email: mail,
          notes: msg,
          recognise: picks(0),
          ambition: picks(1),
          build: picks(2),
          budget: bud ? BUD[Math.round(+bud.value)] : "",
          sentAt: new Date().toISOString()
        };
        const mailFields = {
          access_key: "95c6157e-44aa-4dd7-9c81-a71e419856c0",
          subject: "Nieuwe Fugaz scan: " + brand,
          from_name: "Fugaz scan",
          replyto: payload.email,
          Merk: payload.brand,
          Website: payload.website,
          "E-mail": payload.email,
          Herkenning: sec("", payload.recognise).slice(2),
          Ambitie: sec("", payload.ambition).slice(2),
          "Te bouwen": sec("", payload.build).slice(2),
          Budget: payload.budget,
          Toelichting: payload.notes,
          Verstuurd: payload.sentAt
        };
        try {
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(mailFields),
            keepalive: true
          }).then(response => response.json().then(result => {
            if (!response.ok || !result.success) throw new Error("Scan delivery was not accepted");
          })).catch(() => {
            console.error("[fugaz] Scan delivery failed. Please contact the studio.");
          });
        } catch (err) {
          console.error("[fugaz] Scan delivery could not start.");
        }
        this.scanSent(brief, {
          recognise: picks(0),
          ambition: picks(1),
          build: picks(2),
          budgetIndex: bud ? Math.round(+bud.value) : 1,
          budget: bud ? BUD[Math.round(+bud.value)] : ""
        });
      });
    }
  }
  driveSentCar(car, line, delay) {
    const EC = "cubic-bezier(0.5,0,0.5,1)";
    if (car) {
      car.getAnimations().forEach(a => {
        try {
          a.cancel();
        } catch (e) {}
      });
      car.style.transition = "none";
      car.style.opacity = "0";
      car.style.filter = "blur(2.4px)";
      car.style.transform = "translate(-50%,0) translateX(-190px)";
      void car.offsetHeight;
      setTimeout(() => {
        car.style.transition = "transform 1.25s " + EC + ", opacity 0.45s linear, filter 1.1s ease-out";
        car.style.opacity = "1";
        car.style.filter = "blur(0px)";
        car.style.transform = "translate(-50%,0)";
        car.dataset.parked = "1";
      }, delay + 40);
    }
    if (line) {
      line.getAnimations().forEach(a => {
        try {
          a.cancel();
        } catch (e) {}
      });
      line.style.transition = "none";
      line.style.width = "0%";
      void line.offsetHeight;
      setTimeout(() => {
        line.style.transition = "width 1.25s " + EC;
        line.style.width = "100%";
      }, delay + 40);
    }
  }
  applyDiag(dIn) {
    const d = dIn || window.__fugazScanDiag;
    const diag = document.querySelector("[data-scan-diag]");
    if (!d || !diag) return;
    if (diag.getAttribute("data-on") !== "1") {
      diag.setAttribute("data-on", "1");
      const an = document.querySelector("[data-scan-analyse]");
      if (an) an.removeAttribute("data-on");
    }
    const set = (sel, txt) => {
      const el = diag.querySelector(sel);
      if (el && el.textContent !== txt) el.textContent = txt;
    };
    set("[data-diag-head]", d.head);
    set("[data-diag-lede]", d.lede);
    set("[data-diag-foot]", d.foot);
    set("[data-diag-delta]", "+" + d.delta + "%");
    const fill = (sel, pct, lit, col) => {
      const segs = diag.querySelectorAll(sel + " [data-seg]");
      const on = Math.round(segs.length * pct / 100);
      Array.prototype.forEach.call(segs, (s, i) => {
        const o = i < on ? String(lit) : "0.14";
        const bg = i < on && col ? col : "#FFFFFF";
        if (s.style.opacity !== o) s.style.opacity = o;
        if (s.style.background !== bg) s.style.background = bg;
        if (getComputedStyle(s).opacity !== o) s.getAnimations().forEach(a => {
          try {
            a.cancel();
          } catch (e) {}
        });
      });
    };
    fill("[data-diag-now]", d.now, 0.95, "#CD2C2C");
    fill("[data-diag-pot]", d.pot, 1, null);
    const car = document.querySelector("[data-sent-car] img");
    if (car && car.dataset.parked === "1") {
      car.style.opacity = "1";
      car.style.filter = "blur(0px)";
      car.style.transform = "translate(-50%,0)";
      const line = document.querySelector("[data-sent-line]");
      if (line) line.style.width = "100%";
    }
  }
  contactIn(on) {
    const E = this.EASE;
    const wQuick = window.matchMedia("(max-width: 1024px)").matches ? 0.7 : 1;
    const parts = [["[data-r=\"contact-disc\"]", 0.30], ["[data-r=\"contact-cal\"]", 0.40], ["[data-r=\"contact-review\"]", 0.50]];
    const play = (el, frames, dur, delay) => {
      (el.getAnimations() || []).forEach(a => a.cancel());
      if (!on) return;
      el.animate(frames, {
        duration: dur,
        delay: delay,
        easing: E,
        fill: "both"
      });
    };
    parts.forEach(([sel, d]) => {
      Array.prototype.forEach.call(document.querySelectorAll(sel), el => {
        play(el, [{
          opacity: 0,
          transform: "translate3d(0,22px,0)"
        }, {
          opacity: 1,
          transform: "none"
        }], 900, d * 1000);
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-contact] [data-lines]"), host => {
      const base = parseFloat(host.getAttribute("data-lines-delay") || "0.04");
      const step = parseFloat(host.getAttribute("data-lines-step") || "0.055");
      Array.prototype.forEach.call(host.querySelectorAll("[data-hw]"), (w, i) => {
        play(w, [{
          transform: "translate3d(0,112%,0)"
        }, {
          transform: "translate3d(0,0,0)"
        }], 1450 * wQuick, (base + i * step) * 1000 * wQuick);
      });
    });
  }
  openContact() {
    const live = this.rootRef && this.rootRef.current;
    if (live) this.contact = live.querySelector("[data-contact]") || document.querySelector("[data-contact]");
    if (!this.contact) return;
    this.contactOpen = true;
    this.contact.style.visibility = "visible";
    this.contact.style.transition = "transform 1.4s " + this.EASE;
    if (this.waBtn) {
      this.waBtn.style.transition = "opacity 0.5s " + this.EASE + ", transform 0.6s " + this.EASE;
      this.waBtn.style.opacity = "0";
      this.waBtn.style.pointerEvents = "none";
      this.waBtn.style.transform = "translateY(14px) scale(0.9)";
    }
    this.scrim = document.querySelector("[data-contact-scrim]");
    if (this.scrim) {
      this.scrim.style.transition = "opacity 0.9s " + this.EASE;
      this.scrim.style.visibility = "visible";
      this.scrim.style.pointerEvents = "auto";
      if (!this.scrim.dataset.closeWired) {
        this.scrim.dataset.closeWired = "1";
        this.scrim.addEventListener("click", () => {
          if (this.contactOpen) this.closeContact();
        });
      }
      requestAnimationFrame(() => {
        this.scrim.style.opacity = "1";
      });
    }
    this.contact.style.transform = "translateY(0)";
    this.contact.style.pointerEvents = "auto";
    document.documentElement.style.overflow = "hidden";
    if (this.resetScan) this.resetScan();
    clearTimeout(this.contactResetT || 0);
    this.contactIn(true);
    if (this.untrap) this.untrap();
    this.untrap = this.trapFocus(this.contact, "[data-close-contact]");
  }
  scanDiagnosis(a) {
    const rec = a.recognise || [],
      amb = a.ambition || [],
      build = a.build || [];
    const now = Math.max(9, Math.min(46, 44 - rec.length * 6));
    const lift = 38 + amb.length * 4 + build.length * 3 + (a.budgetIndex || 0) * 2;
    const pot = Math.min(97, now + lift);
    const HEADS = {
      "Weak branding": "The brand is the bottleneck.",
      "No clear direction": "You are moving without a direction.",
      "Little attention": "Nobody is looking yet.",
      "Inconsistent everywhere": "It reads as three different brands.",
      "More potential than results": "You are under-selling what you have.",
      "Sales, but no believers": "You sell. They do not believe yet."
    };
    const head = HEADS[rec[0]] || (amb.length ? "There is room on the table." : "Worth a proper look.");
    const list = arr => arr.map(s => s.toLowerCase()).join(" · ");
    const lede = rec.length ? "Holding it back: " + list(rec.slice(0, 3)) + "." + (amb.length ? " Where it should go: " + list(amb.slice(0, 2)) + "." : "") : "Nothing obviously broken. That usually means the work is sharpening, not fixing.";
    const bi = a.budgetIndex || 0;
    const wantsAll = build.indexOf("The whole brand") > -1 || build.length > 2;
    const known = build.length && build[0] !== "Not sure yet";
    const short = wantsAll && bi <= 1;
    const start = !known ? "We would tell you where to start before you spend anything." : short ? "We would start with the piece that moves the most, and build out from there." : "We would start with " + list(build.slice(0, 2)) + ".";
    let money = "";
    if (a.budget) {
      if (short) money = " " + a.budget + " is a strong budget to work with. We will come back to you on the details and get the most out of every euro of it.";else if (wantsAll && bi === 2) money = " " + a.budget + " covers a serious part of the track. The full build is quoted per project.";else if (wantsAll) money = " " + a.budget + " puts the whole track in range.";else if (!known) money = " " + a.budget + " is a real starting point.";else if (bi === 0) money = " " + a.budget + " goes a long way on a focused scope. We will work out the details with you.";else money = " " + a.budget + " covers that comfortably.";
    }
    const foot = start + money;
    return {
      now: now,
      pot: pot,
      delta: Math.round((pot - now) / Math.max(now, 1) * 100),
      head: head,
      lede: lede,
      foot: foot
    };
  }
  scanSent(brief, answers) {
    const E2 = "cubic-bezier(0.16,1,0.3,1)";
    const host = brief.parentElement;
    const done = host.querySelector("[data-scan-done]");
    if (!done) return;
    host.setAttribute("data-sent", "1");
    const analyse = done.querySelector("[data-scan-analyse]");
    const diag = done.querySelector("[data-scan-diag]");
    const after = Array.prototype.filter.call(done.children, c => c !== analyse && c !== diag);
    if (analyse && diag && answers) {
      const d = this.scanDiagnosis(answers);
      after.forEach(c => {
        c.style.opacity = "0";
      });
      diag.removeAttribute("data-on");
      analyse.setAttribute("data-on", "1");
      analyse.animate([{
        opacity: 0,
        transform: "translate3d(0,14px,0)"
      }, {
        opacity: 1,
        transform: "none"
      }], {
        duration: 520,
        easing: E2,
        fill: "backwards"
      });
      const num = analyse.querySelector("[data-scan-pctnum]");
      const fill = analyse.querySelector("[data-scan-fill]");
      const stage = analyse.querySelector("[data-scan-stage]");
      const STAGES = ["Weighing what you recognise", "Placing it against your ambition", "Sizing the build", "Writing the read"];
      const t0 = performance.now(),
        DUR = 1450;
      const tick = t => {
        const p = Math.min(1, (t - t0) / DUR);
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        if (num) num.textContent = Math.round(eased * 100) + "%";
        if (fill) fill.style.width = (eased * 100).toFixed(1) + "%";
        if (stage) {
          const s = STAGES[Math.min(STAGES.length - 1, Math.floor(p * STAGES.length))];
          if (stage.textContent !== s) stage.textContent = s;
        }
        if (p < 1) requestAnimationFrame(tick);else fire();
      };
      let fired = false;
      const fire = () => {
        if (fired) return;
        fired = true;
        clearTimeout(guard);
        if (num) num.textContent = "100%";
        if (fill) fill.style.width = "100%";
        this.scanReveal(done, analyse, diag, after, d);
      };
      const guard = setTimeout(fire, DUR + 400);
      requestAnimationFrame(tick);
      return;
    }
    done.animate([{
      opacity: 0,
      transform: "translate3d(0,16px,0)"
    }, {
      opacity: 1,
      transform: "none"
    }], {
      duration: 620,
      easing: E2,
      fill: "backwards"
    });
    const car = done.querySelector("[data-sent-car] img");
    const line = done.querySelector("[data-sent-line]");
    this.driveSentCar(car, line, 0);
    Array.prototype.forEach.call(done.querySelectorAll("[data-sent-w]"), (w, i) => {
      w.animate([{
        transform: "translate3d(0,112%,0)"
      }, {
        transform: "translate3d(0,0,0)"
      }], {
        duration: 1000,
        delay: 240 + i * 40,
        easing: E2,
        fill: "both"
      });
    });
  }
  scanReveal(done, analyse, diag, after, d) {
    const E2 = "cubic-bezier(0.16,1,0.3,1)";
    window.__fugazScanDiag = d;
    this.lastDiag = d;
    let ran = false;
    const finish = () => {
      if (ran) return;
      ran = true;
      const an = document.querySelector("[data-scan-analyse]");
      const dg = document.querySelector("[data-scan-diag]");
      if (an) an.removeAttribute("data-on");
      if (!dg) return;
      dg.setAttribute("data-on", "1");
      diag = dg;
      done = dg.parentElement || done;
      after = Array.prototype.filter.call(done.children, c => c !== an && c !== dg);
      this.revealBody(done, diag, after, d, E2);
      [60, 500, 1400, 2800, 4200].forEach(t => setTimeout(() => this.applyDiag(d), t));
    };
    const liveAn = document.querySelector("[data-scan-analyse]") || analyse;
    const out = liveAn.animate([{
      opacity: 1
    }, {
      opacity: 0,
      transform: "translate3d(0,-10px,0)"
    }], {
      duration: 240,
      easing: E2,
      fill: "forwards"
    });
    out.onfinish = finish;
    setTimeout(finish, 300);
  }
  revealBody(done, diag, after, d, E2) {
    {
      const set = (sel, txt) => {
        const el = diag.querySelector(sel);
        if (el) el.textContent = txt;
      };
      set("[data-diag-head]", d.head);
      set("[data-diag-lede]", d.lede);
      set("[data-diag-foot]", d.foot);
      set("[data-diag-delta]", "+" + d.delta + "%");
      diag.animate([{
        opacity: 0,
        transform: "translate3d(0,16px,0)"
      }, {
        opacity: 1,
        transform: "none"
      }], {
        duration: 480,
        easing: E2,
        fill: "backwards"
      });
      const paint = (sel, pct, delay, lit, col) => {
        const segs = diag.querySelectorAll(sel + " [data-seg]");
        const on = Math.round(segs.length * pct / 100);
        Array.prototype.forEach.call(segs, (s, i) => {
          s.getAnimations().forEach(a => {
            try {
              a.cancel();
            } catch (e) {}
          });
          s.style.background = i < on && col ? col : "#FFFFFF";
          s.style.opacity = "0.14";
          if (i >= on) return;
          setTimeout(() => {
            s.style.opacity = String(lit);
          }, delay + i * 17);
        });
      };
      paint("[data-diag-now]", d.now, 160, 0.95, "#CD2C2C");
      paint("[data-diag-pot]", d.pot, 420, 1, null);
      setTimeout(() => this.applyDiag(d), 160 + 30 * 17 + 300);
      after.forEach((c, i) => {
        c.style.opacity = "";
        c.animate([{
          opacity: 0,
          transform: "translate3d(0,12px,0)"
        }, {
          opacity: 1,
          transform: "none"
        }], {
          duration: 480,
          delay: 980 + i * 50,
          easing: E2,
          fill: "backwards"
        });
      });
      const car = done.querySelector("[data-sent-car] img");
      const line = done.querySelector("[data-sent-line]");
      this.driveSentCar(car, line, 1050);
      Array.prototype.forEach.call(done.querySelectorAll("[data-sent-w]"), (w, i) => {
        w.animate([{
          transform: "translate3d(0,112%,0)"
        }, {
          transform: "translate3d(0,0,0)"
        }], {
          duration: 760,
          delay: 1140 + i * 30,
          easing: E2,
          fill: "both"
        });
      });
    }
    ;
  }
  closeContact() {
    this.contact = document.querySelector("[data-contact]") || this.contact;
    if (!this.contact || !this.contact.isConnected) return;
    this.lastDiag = null;
    window.__fugazScanDiag = null;
    this.contactOpen = false;
    if (this.kickLoops) this.kickLoops();
    if (this.untrap) {
      this.untrap();
      this.untrap = null;
    }
    this.contact.style.transition = "transform 1.4s " + this.EASE + ", visibility 0s linear 1.4s";
    this.contact.style.visibility = "hidden";
    if (this.scrim) this.scrim.style.pointerEvents = "none";
    if (this.waBtn) {
      this.waBtn.style.opacity = "1";
      this.waBtn.style.pointerEvents = "";
      this.waBtn.style.transform = "none";
    }
    if (this.scrim) {
      this.scrim.style.transition = "opacity 0.9s " + this.EASE + ", visibility 0s linear 0.9s";
      this.scrim.style.opacity = "0";
      this.scrim.style.visibility = "hidden";
    }
    this.contact.style.transform = "translateY(calc(100% + 60px))";
    this.contact.style.pointerEvents = "none";
    clearTimeout(this.contactResetT || 0);
    this.contactResetT = setTimeout(() => {
      if (!this.contactOpen) this.contactIn(false);
    }, 900);
    document.documentElement.style.overflow = "";
  }
};
