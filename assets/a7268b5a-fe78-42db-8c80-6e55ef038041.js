/* <lanyard-card> — hanging ID badge: verlet rope + draggable card, no dependencies.
   Attributes: photo, photo-rotate, name, role, handle, accent, band-text
   API: el.setGravity(bool) */
(() => {
  const SEG = 8;
  const GRAV = 820;
  const DAMP = 0.955;
  const ITER = 22;
  let UID = 0;

  class LanyardCard extends HTMLElement {
    connectedCallback() {
      if (this._booted) return;
      this._booted = true;

      const photo = this.getAttribute("photo") || "";
      const name = this.getAttribute("name") || "";
      const role = this.getAttribute("role") || "";
      const handle = this.getAttribute("handle") || "";
      const accent = this.getAttribute("accent") || "#0057FE";
      const bandText = this.getAttribute("band-text") || "FUGAZ";
      const rot = parseFloat(this.getAttribute("photo-rotate") || "0") || 0;
      const mark = this.getAttribute("mark") || "";
      const uid = "lny" + (++UID);

      this.style.cssText += ";display:block;position:relative;width:100%;height:100%;overflow:hidden;touch-action:pan-y;user-select:none";

      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.style.cssText = "position:absolute;left:0;top:0;overflow:visible;pointer-events:none";
      svg.innerHTML =
        '<defs>' +
        '<linearGradient id="' + uid + 'g" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="rgba(0,0,0,0.30)"/><stop offset="0.35" stop-color="rgba(255,255,255,0.12)"/><stop offset="1" stop-color="rgba(0,0,0,0.22)"/>' +
        '</linearGradient>' +
        '</defs>' +
        '<path id="' + uid + 'p" fill="none" stroke="' + accent + '" stroke-width="17" stroke-linejoin="round"/>' +
        '<path fill="none" stroke="url(#' + uid + 'g)" stroke-width="17" stroke-linejoin="round"/>' +
        '<path fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1" stroke-linejoin="round"/>' +
        '<text fill="rgba(255,255,255,0.72)" font-size="7.4" font-weight="500" letter-spacing="1.6" style="font-family:inherit">' +
        '<textPath href="#' + uid + 'p" startOffset="6">' +
        (bandText + " &#183; ").repeat(9) +
        '</textPath></text>';
      this.appendChild(svg);
      const paths = svg.querySelectorAll("path");

      const anchor = document.createElement("div");
      anchor.style.cssText = "position:absolute;left:50%;top:4px;width:44px;height:9px;margin-left:-22px;border-radius:5px;background:linear-gradient(#2A2C31,#14161A);box-shadow:0 3px 10px rgba(0,0,0,0.28)";
      this.appendChild(anchor);

      const clip = document.createElement("div");
      clip.style.cssText = "position:absolute;left:0;top:0;width:22px;height:34px;margin:0 0 0 -11px;transform-origin:50% 6%;pointer-events:none";
      clip.innerHTML =
        '<div style="position:absolute;left:4px;top:0;width:14px;height:16px;border:2.5px solid #B9BCC2;border-radius:7px;background:transparent;box-shadow:0 1px 3px rgba(0,0,0,0.25)"></div>' +
        '<div style="position:absolute;left:0;top:12px;width:22px;height:14px;border-radius:4px;background:linear-gradient(#E7E9ED,#A9ADB5);box-shadow:0 2px 6px rgba(0,0,0,0.28)"></div>';
      this.appendChild(clip);

      const card = document.createElement("div");
      const CW = 190, CH = 268;
      card.style.cssText =
        "position:absolute;left:0;top:0;width:" + CW + "px;height:" + CH + "px;border-radius:18px;cursor:grab;will-change:transform;touch-action:pan-y;transform-origin:50% 0;" +
        "transform-origin:50% 0;overflow:hidden;display:flex;flex-direction:column;background:#FFFFFF;" +
        "box-shadow:0 1px 0 rgba(255,255,255,0.9) inset,0 0 0 1px rgba(0,0,0,0.06),0 30px 60px -18px rgba(0,0,0,0.32)";
      card.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:0 12px;height:30px;flex:none;background:' + accent + ';color:#FFFFFF">' +
        '<span style="font-weight:500;font-size:9.5px;letter-spacing:0.2em">' + bandText + '</span>' +
        '<span style="font-weight:500;font-size:9.5px;letter-spacing:0.08em;opacity:0.72">AMS</span>' +
        '</div>' +
        '<div style="position:relative;width:34px;height:7px;margin:10px auto 0;flex:none;border-radius:4px;background:rgba(0,0,0,0.10);box-shadow:0 1px 0 rgba(255,255,255,0.8)"></div>' +
        '<div style="position:relative;margin:12px 14px 0;height:134px;flex:none;border-radius:12px;overflow:hidden;background:#F2F1EF">' +
        (photo
          ? '<img src="' + photo + '" alt="" draggable="false" style="position:absolute;left:50%;top:50%;width:' + (rot ? "215%" : "100%") + ';height:100%;object-fit:cover;object-position:50% 42%;transform:translate(-50%,-50%)' + (rot ? " rotate(" + rot + "deg)" : "") + ';filter:grayscale(1) contrast(1.04)">'
          : "") +
        '</div>' +
        '<div style="padding:14px 14px 0;font-weight:500;font-size:16.5px;line-height:1;letter-spacing:-0.020em;color:#000000">' + name + '</div>' +
        '<div style="padding:7px 14px 0;font-weight:500;font-size:12px;line-height:1.3;letter-spacing:-0.010em;color:#808080">' + role + '</div>' +
        '<div style="margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;padding:0 14px 13px;font-weight:500;font-size:10.5px;letter-spacing:0.04em;color:#B5B3AF">' +
        '<span>' + handle + '</span>' +
        (mark ? '<img src="' + mark + '" alt="" draggable="false" style="width:15px;height:auto;display:block;opacity:0.9">' : '') +
        '</div>' +
        '<div data-sheen style="position:absolute;left:-40%;top:-10%;width:34%;height:130%;pointer-events:none;transform:rotate(14deg) translateX(0);background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.62),rgba(255,255,255,0));opacity:0"></div>';
      this.appendChild(card);

      let W = 0, H = 0, seg = 22, k = 1;
      const pts = [], prev = [];
      // seeded before any measurement — the stage can be display-hidden at boot, and an
      // empty point array would kill the very first simulation frame
      for (let i = 0; i <= SEG; i++) {
        pts[i] = { x: 100, y: 10 + seg * i };
        prev[i] = { x: 100, y: 10 + seg * i };
      }
      const measure = () => {
        const r = this.getBoundingClientRect();
        if (!r.width) return false;
        W = r.width; H = r.height;
        k = Math.max(0.52, Math.min(1, (W - 28) / CW, (H - 150) / CH));
        seg = Math.max(48, H - CH * k - 70) / SEG;
        return true;
      };
      const layout = () => {
        const first = W === 0;
        if (!measure()) return;
        const ax = W / 2, ay = 10;
        if (first) for (let i = 0; i <= SEG; i++) {
          pts[i].x = ax; pts[i].y = ay + seg * i;
          prev[i].x = ax; prev[i].y = ay + seg * i;
        }
      };
      layout();
      let roQ = false;
      const ro = new ResizeObserver(() => {
        if (roQ) return;
        roQ = true;
        requestAnimationFrame(() => { roQ = false; layout(); });
      });
      ro.observe(this);

      let gravOn = true;
      this.setGravity = (on) => {
        gravOn = !!on;
        /* turning gravity off freezes the badge where it hangs: kill every stored velocity
           so the click reads as "stop", not as a hand-off to a floating sim */
        if (!gravOn) for (let i = 0; i <= SEG; i++) { prev[i].x = pts[i].x; prev[i].y = pts[i].y; }
      };

      let dragging = false, px = 0, py = 0, grabDX = 0, grabDY = 0;
      let pending = false, sx0 = 0, sy0 = 0, pid = null;
      const beginDrag = (cx, cy) => {
        dragging = true;
        pending = false;
        card.style.cursor = "grabbing";
        const r = this.getBoundingClientRect();
        px = cx - r.left; py = cy - r.top;
        /* hold the exact point that was grabbed — in BOTH axes. Keeping only the
           horizontal offset made the badge jump vertically to the cursor on grab. */
        grabDX = pts[SEG].x - px;
        grabDY = pts[SEG].y - py;
        if (pid !== null && card.setPointerCapture) { try { card.setPointerCapture(pid); } catch (err) {} }
      };
      /* touch: scrolling always wins. A press only becomes a grab after a short hold that
         stays put; a quick tap just gives the badge a push. The page is never blocked. */
      let holdT = 0, t0Down = 0;
      const clearHold = () => { if (holdT) { clearTimeout(holdT); holdT = 0; } };
      const onDown = (e) => {
        pid = e.pointerId;
        sx0 = e.clientX; sy0 = e.clientY;
        if (e.pointerType === "touch") {
          pending = true;
          t0Down = performance.now();
          clearHold();
          holdT = setTimeout(() => {
            holdT = 0;
            if (!pending) return;
            this.style.touchAction = "none";
            card.style.touchAction = "none";
            beginDrag(sx0, sy0);
            if (navigator.vibrate) { try { navigator.vibrate(8); } catch (err) {} }
          }, 120);
        } else {
          beginDrag(e.clientX, e.clientY);
          e.preventDefault();
        }
      };
      const onMove = (e) => {
        if (pending) {
          const dx = e.clientX - sx0, dy = e.clientY - sy0;
          /* a sideways swipe IS a drag — no hold needed. Only a vertical move hands the
             gesture back to the page, so the badge feels as grabbable as on desktop. */
          if (Math.abs(dx) > 5 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            clearHold();
            this.style.touchAction = "none";
            card.style.touchAction = "none";
            beginDrag(sx0, sy0);
            px = e.clientX - this.getBoundingClientRect().left;
            py = e.clientY - this.getBoundingClientRect().top;
            return;
          }
          if (Math.abs(dy) > 9) { clearHold(); pending = false; return; } // the page is scrolling
          return;
        }
        if (!dragging) return;
        const r = this.getBoundingClientRect();
        px = e.clientX - r.left; py = e.clientY - r.top;
      };
      const onUp = (e) => {
        clearHold();
        // a quick tap without a hold: nudge the badge instead of grabbing it
        if (pending && e && e.pointerType === "touch" && performance.now() - t0Down < 190) {
          const tip = pts[SEG];
          const push = (sx0 - this.getBoundingClientRect().left < W / 2) ? 13 : -13;
          prev[SEG].x = tip.x + push;
          prev[SEG - 1].x = pts[SEG - 1].x + push * 0.6;
        }
        dragging = false; pending = false; pid = null;
        this.style.touchAction = "pan-y";
        card.style.touchAction = "pan-y";
        card.style.cursor = "grab";
      };
      card.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);

      const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let raf = 0, last = performance.now(), t0 = performance.now();
      // fixed-step integration + a spring on the grabbed point: the card follows the
      // cursor with weight instead of snapping to it, and keeps its momentum on release
      const FIXED = 1 / 120;
      let acc = 0;
      // Frames are not reliable in every embedding context (this script's realm can be
      // suspended), so a 60Hz timer is the primary driver and rAF rides along for vsync.
      let lastStepAt = 0, ivl = 0, hostAt = 0;
      const startLoop = () => {
        last = performance.now(); acc = 0;
        lastStepAt = 0;
        if (performance.now() - hostAt < 500) return; // the page is driving this
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
        if (!ivl) ivl = setInterval(() => step(performance.now()), 16);
      };
      let slackUntil = 0, dropSeq = 0;
      const bounds = () => {
        const ch = CH * k, cw = CW * k, ay = 10;
        const padX = Math.min(cw / 2 + 6, W * 0.42);
        const yMin = ay + seg * 0.5;
        return { padX: padX, yMin: yMin, yMax: Math.max(yMin + 8, H - ch - 54) };
      };
      const relax = (iters, slack, pinTip) => {
        const ax = W / 2, ay = 10;
        const b = bounds();
        /* while the badge is held, BOTH ends are fixed: the clip and the hand. Letting the
           rope drag the tip back while a spring pulled it forward is what made the grab
           feel rubbery — the two forces fought each other every frame. */
        const tx = pts[SEG].x, ty = pts[SEG].y;
        if (!gravOn && !pinTip) {
          /* a touch of bending stiffness so a floating strap reads as a ribbon rather than
             hooking back on itself; segment lengths are restored by the passes below */
          for (let i = 1; i < SEG; i++) {
            const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
            p1.x += ((p0.x + p2.x) * 0.5 - p1.x) * 0.11;
            p1.y += ((p0.y + p2.y) * 0.5 - p1.y) * 0.11;
          }
        }
        for (let it = 0; it < (iters || ITER); it++) {
          pts[0].x = ax; pts[0].y = ay;
          if (pinTip) { pts[SEG].x = tx; pts[SEG].y = ty; }
          for (let i = 0; i < SEG; i++) {
            const p0 = pts[i], p1 = pts[i + 1];
            const dx = p1.x - p0.x, dy = p1.y - p0.y;
            const d = Math.hypot(dx, dy) || 1;
            if (slack && d <= seg) continue; // one-sided: the band may hang slack, never stretch
            const diff = (d - seg) / d;
            const head = i > 0, tail = !(pinTip && i + 1 === SEG);
            const wh = head ? (tail ? 0.5 : 1) : 0;
            const wt = tail ? (head ? 0.5 : 1) : 0;
            if (wh) { p0.x += dx * diff * wh; p0.y += dy * diff * wh; }
            if (wt) { p1.x -= dx * diff * wt; p1.y -= dy * diff * wt; }
          }
          if (pinTip) { pts[SEG].x = tx; pts[SEG].y = ty; continue; }
          /* every point is bounded, not just the tip — an unbounded chain coils above the
             clip in zero-g and drags the card outside the panel */
          for (let i = 1; i < SEG; i++) {
            const p = pts[i];
            if (p.y < ay) p.y = ay;
            if (p.x < 12) p.x = 12; else if (p.x > W - 12) p.x = W - 12;
          }
          const tip = pts[SEG], pv = prev[SEG];
          const bx = Math.max(b.padX, Math.min(W - b.padX, tip.x));
          const by = Math.max(b.yMin, Math.min(b.yMax, tip.y));
          /* a wall bounces in zero-g rather than absorbing: with a strap longer than the
             panel is wide, absorbing the normal velocity wedges the badge in the corner
             where the taut rope pins it — a soft rebound always sends it back into the air */
          if (!gravOn) {
            if (bx !== tip.x) pv.x = bx + (tip.x - pv.x) * 0.55;
            if (by !== tip.y) pv.y = by + (tip.y - pv.y) * 0.55;
          }
          tip.x = bx; tip.y = by;
        }
      };

      const simulate = (h, nowMs) => {
        const idle = dragging ? 0 : Math.sin((nowMs - t0) / 1150) * 11 * Math.exp(-(nowMs - t0) / 2600);
        const g = gravOn ? GRAV : 0;
        const dropping = gravOn && nowMs < slackUntil;
        /* weightless is inert: a moved badge glides for a beat and stays where you leave it */
        const damp = gravOn ? (dropping ? 0.93 : DAMP) : 0.86;
        const ph = (nowMs - t0) / 1000;
        /* weightless drift is TANGENTIAL to the clip, not a linear push: the strap is
           inextensible and pinned at one end, so a straight shove is mostly eaten by the
           constraint while a tangential one becomes a visible, slowly reversing orbit */
        /* no drift in zero-g: the badge stays put until it is grabbed */
        const swirl = 0;
        const rad = 0;
        void ph;
        const ax0 = W / 2, ay0 = 10;

        for (let i = 1; i <= SEG; i++) {
          const p = pts[i], q = prev[i];
          let vx = (p.x - q.x) * damp, vy = (p.y - q.y) * damp;
          const vm = Math.hypot(vx, vy), VMAX = dragging ? 60 : (gravOn ? 14 : 6);
          if (vm > VMAX) { vx = vx / vm * VMAX; vy = vy / vm * VMAX; }
          q.x = p.x; q.y = p.y;
          if (gravOn) {
            p.x += vx + idle * h;
            p.y += vy + g * h * h;
          } else {
            const rx = p.x - ax0, ry = p.y - ay0, rl = Math.hypot(rx, ry) || 1;
            const a = swirl * h * h * (i / SEG), rr = rad * h * h * (i / SEG);
            p.x += vx + (-ry / rl) * a + (rx / rl) * rr;
            p.y += vy + (rx / rl) * a + (ry / rl) * rr;
          }
        }
        if (dragging) {
          /* one spring, not two: the tip tracks the grabbed point directly. The strap cannot
             stretch, so past its length the target rides the arc around the clip — that is
             what gives the pull its weight instead of the card sliding away from the hand. */
          const tip = pts[SEG], b = bounds();
          const ax = W / 2, ay = 10;
          let tX = Math.max(b.padX, Math.min(W - b.padX, px + grabDX));
          let tY = Math.max(b.yMin, Math.min(b.yMax, py + grabDY));
          const dx = tX - ax, dy = tY - ay;
          const dist = Math.hypot(dx, dy) || 1, maxLen = seg * SEG;
          if (dist > maxLen) { tX = ax + dx / dist * maxLen; tY = ay + dy / dist * maxLen; }
          const f = 1 - Math.exp(-34 * h);
          tip.x += (tX - tip.x) * f;
          tip.y += (tY - tip.y) * f;
        }
        /* slack whenever there is no gravity to pull the strap taut, and while the badge is
           falling — the bending pass above is what keeps a slack strap from hooking */
        relax(ITER, !gravOn || nowMs < slackUntil, dragging);
      };

      const paint = () => {
        let d = "M" + pts[0].x.toFixed(1) + " " + pts[0].y.toFixed(1);
        for (let i = 1; i <= SEG; i++) d += " L" + pts[i].x.toFixed(1) + " " + pts[i].y.toFixed(1);
        paths.forEach((p) => p.setAttribute("d", d));

        const tip = pts[SEG], up = pts[SEG - 2] || pts[SEG - 1];
        let angle = -Math.atan2(tip.x - up.x, tip.y - up.y) * 180 / Math.PI;
        angle = Math.max(-22, Math.min(22, angle));
        this._ang = this._ang == null ? angle : this._ang + (angle - this._ang) * 0.12;
        angle = this._ang;
        this._cx = this._cx == null ? tip.x : this._cx + (tip.x - this._cx) * 0.42;
        this._cy = this._cy == null ? tip.y : this._cy + (tip.y - this._cy) * 0.42;
        clip.style.transform = "translate3d(" + this._cx.toFixed(2) + "px," + (this._cy - 20).toFixed(2) + "px,0) rotate(" + angle.toFixed(2) + "deg)";
        card.style.transform = "translate3d(" + (this._cx - CW / 2).toFixed(2) + "px," + this._cy.toFixed(2) +
          "px,0) rotate(" + angle.toFixed(2) + "deg) scale(" + k.toFixed(3) + ")";
      };

      const advance = (now) => {
        if (!W) layout();
        acc += Math.min(0.05, (now - last) / 1000) || FIXED;
        last = now;
        let guard = 0;
        while (acc >= FIXED && guard++ < 8) { simulate(FIXED, now); acc -= FIXED; }
        paint();
      };

      // the host page drives this from its own animation loop; the internal timer is only a
      // fallback, because an imported script's realm can be frame-starved and timer-throttled
      this.tick = (now) => {
        const t = typeof now === "number" ? now : performance.now();
        if (t - lastStepAt < 6) return;
        hostAt = t;
        // one driver only: uneven dt from two loops is what makes a drag feel glitchy
        if (ivl) { clearInterval(ivl); ivl = 0; }
        cancelAnimationFrame(raf); raf = 0;
        lastStepAt = t;
        advance(t);
      };
      this.settleNow = () => {
        measure();
        const ax = W / 2, ay = 10, ch = CH * k;
        const rest = Math.max(ay + seg * 0.5 + 8, H - ch - 54);
        for (let i = 0; i <= SEG; i++) {
          pts[i].x = ax; pts[i].y = ay + (rest - ay) * (i / SEG);
          prev[i].x = pts[i].x; prev[i].y = pts[i].y;
        }
        slackUntil = 0;
        this._ang = 0; this._cx = null; this._cy = null;
        paint();
      };

      const step = (now) => {
        const t = performance.now();
        if (t - lastStepAt < 6) return; // both drivers are live; ignore the duplicate
        lastStepAt = t;
        raf = requestAnimationFrame(step);
        advance(now);
      };
      if (reduced) { step(performance.now()); cancelAnimationFrame(raf); raf = 0; }
      else startLoop();

      const sheen = card.querySelector("[data-sheen]");
      this.dropIn = () => {
        measure();
        const ax = W / 2 || 100, ay = 10;
        if (gravOn) {
          // the band starts gathered at the clip and pays out as the badge falls; the rope
          // constraint is one-sided for the first beat so it can be slack without folding
          for (let i = 0; i <= SEG; i++) {
            pts[i].x = ax + i * 0.45;
            pts[i].y = ay + i * 3;
            prev[i].x = pts[i].x;
            prev[i].y = pts[i].y;
          }
          slackUntil = performance.now() + 1100;
        } else {
          for (let i = 0; i <= SEG; i++) {
            pts[i].x = ax;
            pts[i].y = ay + seg * i * 0.94;
            prev[i].x = ax + 0.35 * i;
            prev[i].y = pts[i].y;
          }
        }
        this._ang = 0;
        slackUntil = gravOn ? slackUntil : 0;        this._cx = null; this._cy = null;
        t0 = performance.now();
        last = t0; acc = 0;
        if (!reduced) startLoop();
        // if this realm is frame-starved, do not leave the badge parked at the clip
        const seq = ++dropSeq;
        setTimeout(() => {
          if (seq === dropSeq && performance.now() - lastStepAt > 260) this.settleNow();
        }, 300);
        if (sheen) {
          sheen.style.transition = "none";
          sheen.style.transform = "rotate(14deg) translateX(0)";
          sheen.style.opacity = "0";
          void sheen.offsetHeight;
          setTimeout(() => {
            sheen.style.transition = "transform 1.5s cubic-bezier(0.16,1,0.3,1), opacity 1.5s cubic-bezier(0.16,1,0.3,1)";
            sheen.style.transform = "rotate(14deg) translateX(420px)";
            sheen.style.opacity = "1";
            setTimeout(() => { sheen.style.opacity = "0"; }, 900);
          }, 300);
        }
      };

      this._teardown = () => {
        cancelAnimationFrame(raf);
        if (ivl) clearInterval(ivl);
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
    }
    disconnectedCallback() { if (this._teardown) this._teardown(); this._booted = false; }
  }
  if (!customElements.get("lanyard-card")) customElements.define("lanyard-card", LanyardCard);
})();
