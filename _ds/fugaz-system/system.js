
(() => {

const __ds_ns = (window.FugazSystem = window.FugazSystem || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/LogoMark.jsx
try { (() => {
// The Fugaz mark: four skewed quarter-round segments forming a slanted F.
// Geometry transcribed verbatim from the Figma symbol LOGO_WHITE (93:46).
const PATHS = [["matrix(1,0,-0.316,0.949,422.463,0)", ["M 0.022 0 L 223.398 0 C 223.398 86.935 155.244 157.409 71.171 157.409 L 0.022 157.409 L 0.022 0 Z", "M 0.022 157.423 L 0 157.409 L 0.022 157.409 L 0.022 157.423 Z"]], ["matrix(1,0,-0.316,0.949,149.332,149.331)", ["M 223.354 0 L 223.376 0.014 L 223.376 157.401 L 223.356 157.409 L 0 157.409 C 0 70.474 68.154 0 152.227 0 L 223.354 0 Z"]], ["matrix(1,0,-0.316,0.949,322.913,298.655)", ["M 0.02 0.008 L 223.396 0.008 C 223.396 86.942 155.242 157.417 71.169 157.417 L 0.02 157.417 L 0.02 0.008 Z"]], ["matrix(1,0,-0.316,0.949,49.778,447.993)", ["M 223.376 157.409 L 0 157.409 C 0 70.474 68.154 0 152.227 0 L 223.367 0 L 223.376 0.01 L 223.376 157.409 Z"]]];
const RATIO = 597.325 / 645.861; // the mark is wider than it is tall

function LogoMark({
  size = 64,
  height,
  color = "currentColor",
  title = "Fugaz",
  style,
  className
}) {
  // `height` wins when given — inside fixed-height slots (the header capsule) the
  // mark is constrained by height, not width.
  const w = height != null ? height / RATIO : size;
  const h = height != null ? height : size * RATIO;
  return /*#__PURE__*/React.createElement("svg", {
    role: "img",
    "aria-label": title,
    className: className,
    viewBox: "0 0 645.861 597.325",
    width: w,
    height: h,
    fill: color,
    style: {
      display: "block",
      flexShrink: 0,
      ...style
    }
  }, PATHS.map(([t, ds], i) => /*#__PURE__*/React.createElement("g", {
    key: i,
    transform: t
  }, ds.map((d, j) => /*#__PURE__*/React.createElement("path", {
    key: j,
    d: d,
    fillRule: "nonzero"
  })))));
}
Object.assign(__ds_scope, { LogoMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LogoMark.jsx", error: String((e && e.message) || e) }); }

// components/brand/LogoLockup.jsx
try { (() => {
/**
 * Header lockup: mark + FUGAZ set in the core grotesk.
 * The wordmark is live type (Geist Medium), exactly as in the web concept.
 */
function LogoLockup({
  size = 32.12,
  color = "#FFFFFF",
  tagline,
  style,
  className
}) {
  const gap = size * 0.295; // 44.378 - 34.73 at size 32.12
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: "inline-flex",
      flexDirection: "column",
      gap: size * 0.28,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LogoMark, {
    size: size * 1.0812,
    color: color
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: size * 1.0751,
      lineHeight: 0.909,
      letterSpacing: "-0.010em",
      color,
      whiteSpace: "nowrap"
    }
  }, "FUGAZ")), tagline ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: size * 0.24,
      lineHeight: 1,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      opacity: 0.9
    }
  }, tagline) : null);
}
Object.assign(__ds_scope, { LogoLockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LogoLockup.jsx", error: String((e && e.message) || e) }); }

// components/brand/LogoTile.jsx
try { (() => {
/** The app-icon tile: blue squircle, white mark. Radius is 18.932% of the side (58.497 on 309). */
function LogoTile({
  size = 96,
  background = "var(--fugaz-blue)",
  mark = "#FFFFFF",
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: size,
      height: size,
      borderRadius: size * 0.18932,
      background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LogoMark, {
    size: size * 0.5,
    color: mark
  }));
}
Object.assign(__ds_scope, { LogoTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LogoTile.jsx", error: String((e && e.message) || e) }); }

// components/site/HeroPanel.jsx
try { (() => {
/**
 * The hero panel — 1411×987, radius 29, sitting 15px in from the page edge on the
 * warm off-white sheet. Fill is the corner gradient (black bottom-left → blue →
 * white past the top-right) under heavy film grain. The blue is never flat.
 */
function HeroPanel({
  children,
  width = 1411,
  height = 987,
  radius = 29,
  grain = true,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: "relative",
      width,
      height,
      borderRadius: radius,
      overflow: "hidden",
      background: "var(--fugaz-hero-gradient)",
      boxShadow: "var(--shadow-panel)",
      ...style
    }
  }, grain ? /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "fugaz-grain"
  }) : null, children);
}
Object.assign(__ds_scope, { HeroPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/HeroPanel.jsx", error: String((e && e.message) || e) }); }

// components/site/LogoCapsule.jsx
try { (() => {
/**
 * The header capsule: a white rounded rectangle holding the Fugaz mark in black, a
 * hairline divider and the two founders' avatars in black and white, overlapping.
 * This is the site's only "nav".
 */
function LogoCapsule({
  avatars = [],
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 11.1125,
      padding: 7.339240550994873,
      borderRadius: "var(--radius-logo-pill)",
      background: "var(--white)",
      boxSizing: "border-box",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LogoMark, {
    height: 32.645,
    color: "var(--black)"
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 1,
      height: 16.322,
      background: "rgba(0,0,0,0.2)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 59.067,
      height: 32.645,
      flexShrink: 0
    }
  }, [0, 1].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: avatars[i] || "",
    style: {
      position: "absolute",
      left: i === 0 ? 0 : 26.422,
      top: 0,
      width: 32.645,
      height: 32.645,
      borderRadius: "50%",
      background: avatars[i] ? undefined : "var(--placeholder)",
      backgroundClip: "border-box",
      overflow: "hidden",
      display: "block",
      filter: "grayscale(1)"
    }
  }))));
}
Object.assign(__ds_scope, { LogoCapsule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/LogoCapsule.jsx", error: String((e && e.message) || e) }); }

// components/site/Panel.jsx
try { (() => {
/** A white content panel: 1411 wide, radius 29, the faintest possible shadow. */
function Panel({
  children,
  width = 1411,
  height,
  radius = 29,
  background = "var(--white)",
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: "relative",
      width,
      height,
      borderRadius: radius,
      background,
      boxShadow: "var(--shadow-panel)",
      overflow: "hidden",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Panel.jsx", error: String((e && e.message) || e) }); }

// components/site/PartnerMarquee.jsx
try { (() => {
/** Slow infinite row of partner marks, dimmed and masked out at both ends. */
function PartnerMarquee({
  logos = [],
  height = 105,
  style,
  className
}) {
  const run = [...logos, ...logos];
  return /*#__PURE__*/React.createElement("div", {
    className: `fugaz-marquee-mask ${className || ""}`,
    style: {
      position: "relative",
      height,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 96,
      flexShrink: 0,
      animation: "fugaz-marquee var(--marquee-duration) linear infinite"
    }
  }, run.map((l, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: l.src,
    alt: l.alt || "",
    style: {
      width: l.width,
      height: l.height,
      opacity: l.opacity ?? 0.4,
      flexShrink: 0,
      filter: "grayscale(1)"
    }
  }))));
}
Object.assign(__ds_scope, { PartnerMarquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/PartnerMarquee.jsx", error: String((e && e.message) || e) }); }

// components/site/PillButton.jsx
try { (() => {
/**
 * The pill. Two flavours, always paired: solid white with a black label, and a
 * translucent black scrim with a white label. 34px tall, radius 28.124.
 */
function PillButton({
  children,
  variant = "light",
  href,
  onClick,
  disabled = false,
  style,
  className
}) {
  const skins = {
    light: {
      background: "var(--white)",
      color: "var(--black)"
    },
    scrim: {
      background: "var(--scrim)",
      color: "var(--white)",
      backdropFilter: "blur(5.1px)"
    },
    dark: {
      background: "var(--black)",
      color: "var(--white)"
    },
    blue: {
      background: "var(--fugaz-blue)",
      color: "var(--white)"
    }
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    className: className,
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === "button" ? disabled : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8.788734436035156,
      height: 34,
      padding: "7px 8.789px 8.789px 8.789px",
      border: "none",
      borderRadius: "var(--radius-button)",
      backdropFilter: "blur(5.1px)",
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: "var(--size-button)",
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      whiteSpace: "nowrap",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.35 : 1,
      textDecoration: "none",
      boxSizing: "border-box",
      transition: "transform var(--dur-fast) var(--ease-fugaz), opacity var(--dur-fast) var(--ease-fugaz)",
      ...skins[variant],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { PillButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/PillButton.jsx", error: String((e && e.message) || e) }); }

// components/site/Preloader.jsx
try { (() => {
/**
 * Full-screen preloader on the hero gradient: centred white mark, a percentage
 * counter running 01% → 99% bottom-left, then the whole panel lifts away.
 */
function Preloader({
  duration = 2200,
  onDone,
  autoStart = true,
  style,
  className
}) {
  const [pct, setPct] = React.useState(1);
  const [gone, setGone] = React.useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  React.useEffect(() => {
    if (!autoStart) return;
    if (reduced) {
      setPct(99);
      setGone(true);
      onDone && onDone();
      return;
    }
    const start = Date.now();
    const id = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration);
      setPct(Math.max(1, Math.round(t * 99)));
      if (t >= 1) {
        clearInterval(id);
        setTimeout(() => {
          setGone(true);
          onDone && onDone();
        }, 260);
      }
    }, 40);
    return () => clearInterval(id);
  }, [autoStart, duration, onDone, reduced]);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    "aria-hidden": gone,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 50,
      background: "var(--fugaz-hero-gradient)",
      transform: gone ? "translateY(-101%)" : "none",
      transition: "transform var(--dur-slow) var(--ease-fugaz)",
      pointerEvents: gone ? "none" : "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "fugaz-grain"
  }), /*#__PURE__*/React.createElement(__ds_scope.LogoMark, {
    size: 140,
    color: "#FFFFFF",
    style: {
      position: "relative"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 40,
      bottom: 18,
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: 140,
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      color: "var(--white)",
      fontVariantNumeric: "tabular-nums"
    }
  }, String(pct).padStart(2, "0"), "%"));
}
Object.assign(__ds_scope, { Preloader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Preloader.jsx", error: String((e && e.message) || e) }); }

// components/site/ScarcityBadge.jsx
try { (() => {
/** Small red dot plus a constraint. The dot is the only red in the system. */
function ScarcityBadge({
  children = "0 spots left for Q3",
  color = "var(--white)",
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5.6857147216796875,
      fontFamily: "var(--font-core)",
      fontWeight: 400,
      fontSize: "var(--size-badge)",
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      color,
      whiteSpace: "nowrap",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6.823,
      height: 6.823,
      borderRadius: "50%",
      background: "var(--dot-red)",
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { ScarcityBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/ScarcityBadge.jsx", error: String((e && e.message) || e) }); }

// components/site/HeroStatement.jsx
try { (() => {
/**
 * The centred hero block, 554px wide: graphic, scarcity badge, two-line statement,
 * one lede line, and the light/scrim button pair.
 */
function HeroStatement({
  graphic,
  badge = "0 spots left for Q3",
  line1 = "The most exclusive",
  line2 = "design studio.",
  lede = "Our projects & clients speak for us.",
  primary = "Book a call",
  secondary = "View work",
  onPrimary,
  onSecondary,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: 554,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ...style
    }
  }, graphic ? /*#__PURE__*/React.createElement("img", {
    src: graphic,
    alt: "",
    style: {
      width: 74.701,
      height: 43.88,
      display: "block"
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16.12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ScarcityBadge, null, badge)), /*#__PURE__*/React.createElement("h1", {
    className: "fugaz-hero",
    style: {
      marginTop: 11.291
    }
  }, line1, /*#__PURE__*/React.createElement("br", null), line2), /*#__PURE__*/React.createElement("p", {
    className: "fugaz-lede",
    style: {
      margin: "28.378px 0 0",
      color: "var(--white)",
      textAlign: "center"
    }
  }, lede), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 34.331
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PillButton, {
    variant: "light",
    onClick: onPrimary
  }, primary), /*#__PURE__*/React.createElement(__ds_scope.PillButton, {
    variant: "scrim",
    onClick: onSecondary
  }, secondary)));
}
Object.assign(__ds_scope, { HeroStatement });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/HeroStatement.jsx", error: String((e && e.message) || e) }); }

// components/site/SectionHeadline.jsx
try { (() => {
/**
 * The two-tone section headline. The first line is the setup in grey, the second
 * is the point in black. Every section headline uses this.
 */
function SectionHeadline({
  setup,
  point,
  size = 50,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("h2", {
    className: className,
    style: {
      margin: 0,
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: size,
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      textWrap: "pretty",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fugaz-setup"
  }, setup), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "fugaz-point"
  }, point));
}
Object.assign(__ds_scope, { SectionHeadline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SectionHeadline.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteHeader.jsx
try { (() => {
/** Header row: email left, logo capsule centred, socials right. No nav menu. */
function SiteHeader({
  email = "info@fugaz-agency.com",
  socials = "linkedin / X / instagram",
  avatars,
  color = "var(--white)",
  style,
  className
}) {
  const meta = {
    fontFamily: "var(--font-core)",
    fontWeight: 500,
    fontSize: "var(--size-meta)",
    lineHeight: 0.909,
    letterSpacing: "-0.010em",
    color,
    whiteSpace: "nowrap",
    textDecoration: "none"
  };
  return /*#__PURE__*/React.createElement("header", {
    className: className,
    style: {
      position: "absolute",
      left: 102,
      top: 73,
      width: 1235.268,
      height: 47.323,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: meta
  }, email), /*#__PURE__*/React.createElement(__ds_scope.LogoCapsule, {
    avatars: avatars
  }), /*#__PURE__*/React.createElement("span", {
    style: meta
  }, socials));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/site/TeamCard.jsx
try { (() => {
/** Founder card: 359×613 soft field, a 333×264 photo inset at the top, name + flag below. */
function TeamCard({
  name,
  photo,
  photoClass,
  flag,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: "relative",
      width: 359,
      height: 613,
      borderRadius: "var(--radius-team)",
      background: "var(--surface-soft)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: photoClass,
    style: {
      position: "absolute",
      left: 13,
      top: 14,
      width: 333,
      height: 264,
      borderRadius: "var(--radius-team)",
      overflow: "hidden",
      backgroundImage: photo ? `url(${photo})` : undefined,
      backgroundSize: photo ? "cover" : undefined,
      backgroundPosition: photo ? "center" : undefined,
      backgroundColor: photo || photoClass ? undefined : "rgb(238,238,238)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 30,
      top: 309,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: "var(--size-name)",
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      color: "var(--black)",
      whiteSpace: "nowrap"
    }
  }, name), flag ? /*#__PURE__*/React.createElement("img", {
    src: flag,
    alt: "",
    style: {
      width: 25,
      height: 25,
      borderRadius: "50%",
      display: "block"
    }
  }) : null));
}
Object.assign(__ds_scope, { TeamCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/TeamCard.jsx", error: String((e && e.message) || e) }); }

// components/site/WorkCard.jsx
try { (() => {
/**
 * A work card — 644.154 × 446.113, radius 31.270, holding a floating device or UI
 * mockup on a soft near-white field. Lifts and scales to 1.02 on hover; the mockup
 * parallaxes a few px behind it.
 */
function WorkCard({
  media,
  mediaClass,
  label,
  width = 644.154,
  height = 446.113,
  style,
  className
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      width,
      height,
      borderRadius: "var(--radius-card)",
      background: "var(--surface-soft)",
      overflow: "hidden",
      flexShrink: 0,
      transform: hover ? "translateY(-6px) scale(1.02)" : "none",
      transition: "transform var(--dur-base) var(--ease-fugaz)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: mediaClass,
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: media ? `url(${media})` : undefined,
      backgroundSize: media ? "cover" : undefined,
      backgroundPosition: media ? "center" : undefined,
      transform: hover ? "scale(1.03) translateY(-4px)" : "none",
      transition: "transform var(--dur-slow) var(--ease-fugaz)"
    }
  }), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 28,
      bottom: 24,
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: 25,
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      color: "var(--black)"
    }
  }, label) : null);
}
Object.assign(__ds_scope, { WorkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/WorkCard.jsx", error: String((e && e.message) || e) }); }

// figma/Frame12.jsx
try { (() => {
// figma node: 93:66 Frame 12
function Frame12(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 1159.138,
      display: "flex",
      flexDirection: "row",
      gap: 50,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 224.323,
    height: 316.152,
    viewBox: "0 0 224.323 316.152",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,99.976,4.536)",
      transformOrigin: "0 0",
      width: 224.323,
      height: 316.152
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 112.161 0 L 224.323 0 C 224.323 43.651 190.101 79.038 147.887 79.038 L 112.161 79.038 L 112.161 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 158.076 C 0 114.424 34.222 79.038 76.436 79.038 L 112.161 79.038 L 112.161 158.076 L 0 158.076 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 112.161 158.076 L 224.323 158.076 C 224.323 201.727 190.101 237.114 147.887 237.114 L 112.161 237.114 L 112.161 158.076 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 316.152 C 0 272.5 34.222 237.114 76.436 237.114 L 112.161 237.114 L 112.161 316.152 L 0 316.152 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 784.839,
      display: "flex",
      flexDirection: "column",
      gap: 45.907352447509766,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 195.923,
      overflow: "hidden",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 130.198,
    height: 189.427,
    viewBox: "0 0 130.198 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 654.643,
      top: 2.228,
      width: 130.198,
      height: 189.427
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 0 165.949 L 101.383 22.411 L 3.468 22.411 L 3.468 0 L 127.53 0 L 127.53 23.478 L 26.146 167.016 L 130.198 167.016 L 130.198 189.427 L 0 189.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 167.549,
    height: 189.427,
    viewBox: "0 0 167.549 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 484.905,
      top: 2.228,
      width: 167.549,
      height: 189.427
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 68.3 0 L 99.249 0 L 167.549 189.427 L 142.47 189.427 L 123.528 135.534 L 44.022 135.534 L 25.079 189.427 L 0 189.427 Z M 51.759 113.122 L 115.79 113.122 L 83.775 20.01 L 51.759 113.122 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 161.186,
    height: 195.871,
    viewBox: "0 0 161.186 195.871",
    fill: "none",
    style: {
      position: "absolute",
      left: 313.191,
      top: 0,
      width: 161.186,
      height: 195.871
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 84.456 195.871 C 66.695 195.871 51.508 191.648 38.898 183.2 C 26.287 174.753 16.607 163.226 9.858 148.619 C 3.286 133.837 0 117.03 0 98.2 C 0 79.369 3.375 62.563 10.124 47.78 C 16.873 32.997 26.553 21.382 39.164 12.935 C 51.952 4.312 67.227 0 84.989 0 C 100.086 0 112.786 2.728 123.087 8.183 C 133.567 13.639 141.826 21.03 147.865 30.357 C 154.081 39.685 158.344 50.156 160.653 61.771 L 136.675 63.355 C 134.366 51.212 129.215 41.356 121.222 33.789 C 113.23 26.046 101.152 22.174 84.989 22.174 C 70.602 22.174 58.879 25.694 49.821 32.733 C 40.94 39.773 34.369 49.1 30.106 60.715 C 26.021 72.154 23.978 84.649 23.978 98.2 C 23.978 112.454 26.109 125.301 30.372 136.74 C 34.635 148.003 41.296 156.979 50.354 163.666 C 59.412 170.354 70.957 173.697 84.989 173.697 C 96.179 173.697 105.859 171.233 114.029 166.306 C 122.199 161.202 128.505 154.427 132.945 145.98 C 137.385 137.532 139.694 128.381 139.872 118.526 L 85.522 118.526 L 85.522 96.88 L 161.186 96.88 L 161.186 191.648 L 144.135 191.648 L 142.536 148.355 L 145.733 152.051 C 143.602 160.498 139.517 168.066 133.478 174.753 C 127.439 181.265 120.157 186.456 111.631 190.328 C 103.283 194.024 94.225 195.871 84.456 195.871 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 142.737,
    height: 193.962,
    viewBox: "0 0 142.737 193.962",
    fill: "none",
    style: {
      position: "absolute",
      left: 145.364,
      top: 1.961,
      width: 142.737,
      height: 193.962
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 71.502 193.962 C 56.917 193.962 44.2 191.116 33.35 185.425 C 22.678 179.733 14.407 171.64 8.538 161.146 C 2.846 150.474 0 137.935 0 123.528 L 0 0 L 22.945 0 L 22.945 123.528 C 22.945 138.824 27.124 150.652 35.484 159.012 C 44.022 167.371 56.028 171.551 71.502 171.551 C 86.798 171.551 98.626 167.371 106.986 159.012 C 115.524 150.652 119.792 138.824 119.792 123.528 L 119.792 0 L 142.737 0 L 142.737 123.528 C 142.737 137.935 139.802 150.474 133.933 161.146 C 128.241 171.64 120.059 179.733 109.387 185.425 C 98.715 191.116 86.087 193.962 71.502 193.962 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 118.992,
    height: 189.427,
    viewBox: "0 0 118.992 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.001,
      top: 2.228,
      width: 118.992,
      height: 189.427
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 0 0 L 118.992 0 L 118.992 22.411 L 11.472 22.411 L 22.945 10.672 L 22.945 97.648 L 11.472 85.909 L 114.19 85.909 L 114.19 107.786 L 11.472 107.786 L 22.945 96.047 L 22.945 189.427 L 0 189.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 750.176,
      height: 67.17,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 53.229,
    height: 64.273,
    viewBox: "0 0 53.229 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 696.948,
      top: 1.449,
      width: 53.229,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.722 64.273 L 22.722 38.021 L 0 0 L 9.234 0 L 26.614 30.054 L 43.995 0 L 53.229 0 L 30.507 38.021 L 30.507 64.273 L 22.722 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.945,
    height: 67.170,
    viewBox: "0 0 55.945 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 642.397,
      top: 0,
      width: 55.945,
      height: 67.17
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.878 67.17 C 23.144 67.17 18.105 65.842 13.76 63.187 C 9.415 60.471 6.035 56.608 3.621 51.599 C 1.207 46.59 0 40.616 0 33.675 C 0 26.735 1.207 20.76 3.621 15.751 C 6.035 10.682 9.415 6.789 13.76 4.074 C 18.105 1.358 23.144 0 28.878 0 C 36.663 0 42.698 1.961 46.983 5.884 C 51.267 9.807 54.074 15.148 55.401 21.907 L 47.164 22.45 C 46.258 17.864 44.327 14.243 41.37 11.587 C 38.413 8.932 34.249 7.604 28.878 7.604 C 24.774 7.604 21.153 8.66 18.015 10.772 C 14.937 12.824 12.523 15.812 10.772 19.734 C 9.022 23.597 8.147 28.244 8.147 33.675 C 8.147 39.107 9.022 43.754 10.772 47.616 C 12.523 51.479 14.937 54.436 18.015 56.488 C 21.153 58.54 24.774 59.566 28.878 59.566 C 34.49 59.566 38.835 58.117 41.913 55.22 C 44.991 52.263 46.922 48.28 47.707 43.271 L 55.945 43.814 C 55.16 48.461 53.621 52.535 51.328 56.035 C 49.034 59.535 45.987 62.281 42.185 64.273 C 38.443 66.204 34.007 67.17 28.878 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 50.604,
    height: 64.273,
    viewBox: "0 0 50.604 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 583.331,
      top: 1.449,
      width: 50.604,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 11.044 0 L 42.818 56.488 L 42.818 0 L 50.604 0 L 50.604 64.273 L 39.016 64.273 L 7.785 8.871 L 7.785 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 532.385,
      top: 1.449,
      width: 41.098,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 54.768,
    height: 67.170,
    viewBox: "0 0 54.768 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 467.461,
      top: 0,
      width: 54.768,
      height: 67.17
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.696 67.17 C 22.661 67.17 17.502 65.721 13.217 62.824 C 8.932 59.928 5.643 55.975 3.349 50.966 C 1.116 45.896 0 40.133 0 33.675 C 0 27.218 1.147 21.454 3.44 16.385 C 5.733 11.316 9.022 7.333 13.307 4.436 C 17.652 1.479 22.843 0 28.878 0 C 34.007 0 38.322 0.935 41.823 2.806 C 45.383 4.677 48.19 7.212 50.241 10.41 C 52.354 13.609 53.802 17.2 54.587 21.183 L 46.439 21.726 C 45.655 17.562 43.905 14.182 41.189 11.587 C 38.473 8.932 34.369 7.604 28.878 7.604 C 23.989 7.604 20.006 8.811 16.928 11.225 C 13.911 13.639 11.678 16.838 10.229 20.821 C 8.841 24.744 8.147 29.028 8.147 33.675 C 8.147 38.564 8.871 42.969 10.32 46.892 C 11.768 50.754 14.031 53.832 17.109 56.126 C 20.187 58.419 24.11 59.566 28.878 59.566 C 32.68 59.566 35.969 58.721 38.745 57.031 C 41.521 55.281 43.663 52.957 45.172 50.06 C 46.681 47.164 47.465 44.025 47.526 40.646 L 29.059 40.646 L 29.059 33.223 L 54.768 33.223 L 54.768 65.721 L 48.974 65.721 L 48.431 50.875 L 49.517 52.143 C 48.793 55.039 47.405 57.634 45.353 59.928 C 43.301 62.161 40.827 63.941 37.93 65.269 C 35.094 66.536 32.016 67.17 28.696 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.850,
    height: 64.273,
    viewBox: "0 0 56.850 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 410.186,
      top: 1.449,
      width: 56.85,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 23.174 0 L 33.675 0 L 56.85 64.273 L 48.34 64.273 L 41.913 45.987 L 14.937 45.987 L 8.509 64.273 L 0 64.273 Z M 17.562 38.383 L 39.288 38.383 L 28.425 6.789 L 17.562 38.383 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 344.96,
      top: 1.449,
      width: 41.098,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.759,
    height: 64.273,
    viewBox: "0 0 56.759 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 282.811,
      top: 1.449,
      width: 56.759,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 23.265 64.273 L 0 0 L 8.509 0 L 28.425 55.764 L 48.25 0 L 56.759 0 L 33.494 64.273 L 23.265 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.785,
    height: 64.273,
    viewBox: "0 0 7.785 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 269.414,
      top: 1.449,
      width: 7.785,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 7.785 0 L 7.785 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 47.797,
    height: 64.273,
    viewBox: "0 0 47.797 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 217.68,
      top: 1.449,
      width: 47.797,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20.006 64.273 L 20.006 7.604 L 0 7.604 L 0 0 L 47.797 0 L 47.797 7.604 L 27.791 7.604 L 27.791 64.273 L 20.006 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.850,
    height: 64.273,
    viewBox: "0 0 56.850 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 168.784,
      top: 1.449,
      width: 56.85,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 23.174 0 L 33.675 0 L 56.85 64.273 L 48.34 64.273 L 41.913 45.987 L 14.937 45.987 L 8.509 64.273 L 0 64.273 Z M 17.562 38.383 L 39.288 38.383 L 28.425 6.789 L 17.562 38.383 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 123.473,
      top: 1.449,
      width: 41.098,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 46.892,
    height: 64.273,
    viewBox: "0 0 46.892 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 65.367,
      top: 1.449,
      width: 46.892,
      height: 64.273
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 24.351 0 C 28.878 0 32.77 0.785 36.029 2.354 C 39.288 3.923 41.792 6.186 43.543 9.143 C 45.353 12.04 46.258 15.48 46.258 19.463 C 46.258 22.36 45.564 24.955 44.176 27.248 C 42.849 29.481 41.129 31.261 39.016 32.589 C 36.904 33.917 34.701 34.641 32.408 34.762 L 31.865 33.947 C 35.788 33.947 38.865 34.852 41.098 36.663 C 43.392 38.473 44.719 41.37 45.082 45.353 L 46.892 64.273 L 39.016 64.273 L 37.387 46.168 C 37.146 43.512 36.18 41.551 34.49 40.284 C 32.861 39.016 30.175 38.383 26.433 38.383 L 7.785 38.383 L 7.785 64.273 L 0 64.273 Z M 7.785 30.779 L 25.347 30.779 C 29.27 30.779 32.378 29.783 34.671 27.791 C 36.964 25.8 38.111 22.963 38.111 19.282 C 38.111 15.54 36.934 12.674 34.581 10.682 C 32.227 8.63 28.817 7.604 24.351 7.604 L 7.785 7.604 L 7.785 30.779 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.945,
    height: 67.170,
    viewBox: "0 0 55.945 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.001,
      top: 0,
      width: 55.945,
      height: 67.17
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.878 67.17 C 23.144 67.17 18.105 65.842 13.76 63.187 C 9.415 60.471 6.035 56.608 3.621 51.599 C 1.207 46.59 0 40.616 0 33.675 C 0 26.735 1.207 20.76 3.621 15.751 C 6.035 10.682 9.415 6.789 13.76 4.074 C 18.105 1.358 23.144 0 28.878 0 C 36.663 0 42.698 1.961 46.983 5.884 C 51.267 9.807 54.074 15.148 55.401 21.907 L 47.164 22.45 C 46.258 17.864 44.327 14.243 41.37 11.587 C 38.413 8.932 34.249 7.604 28.878 7.604 C 24.774 7.604 21.153 8.66 18.015 10.772 C 14.937 12.824 12.523 15.812 10.772 19.734 C 9.022 23.597 8.147 28.244 8.147 33.675 C 8.147 39.107 9.022 43.754 10.772 47.616 C 12.523 51.479 14.937 54.436 18.015 56.488 C 21.153 58.54 24.774 59.566 28.878 59.566 C 34.49 59.566 38.835 58.117 41.913 55.22 C 44.991 52.263 46.922 48.28 47.707 43.271 L 55.945 43.814 C 55.16 48.461 53.621 52.535 51.328 56.035 C 49.034 59.535 45.987 62.281 42.185 64.273 C 38.443 66.204 34.007 67.17 28.878 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
}
Object.assign(__ds_scope, { Frame12, __ds_default_figma_Frame12_9h2vie: Frame12 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame12.jsx", error: String((e && e.message) || e) }); }

// figma/Frame44.jsx
try { (() => {
// figma node: 93:63 Frame 44
function Frame44(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 50,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 309,
      overflow: "hidden",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      borderRadius: 58.49666213989258,
      backgroundColor: "rgb(0,0,0)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.030,47.935)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.953 55.62 L 76.953 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.953 55.62 L 76.953 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.953 166.861 L 76.953 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.953 166.861 L 76.953 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 766.418,
      display: "flex",
      flexDirection: "column",
      gap: 30,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 116.640,
    height: 185.683,
    viewBox: "0 0 116.640 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 116.64,
      height: 185.683,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 0 0 L 116.64 0 L 116.64 21.968 L 11.246 21.968 L 22.491 10.461 L 22.491 95.718 L 11.246 84.211 L 111.933 84.211 L 111.933 105.656 L 11.246 105.656 L 22.491 94.149 L 22.491 185.683 L 0 185.683 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 139.916,
    height: 190.129,
    viewBox: "0 0 139.916 190.129",
    fill: "none",
    style: {
      position: "relative",
      width: 139.916,
      height: 190.129,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.089 190.129 C 55.792 190.129 43.326 187.339 32.691 181.76 C 22.23 176.181 14.122 168.248 8.369 157.961 C 2.79 147.5 0 135.208 0 121.086 L 0 0 L 22.491 0 L 22.491 121.086 C 22.491 136.08 26.588 147.674 34.783 155.869 C 43.152 164.063 54.92 168.161 70.089 168.161 C 85.083 168.161 96.677 164.063 104.872 155.869 C 113.24 147.674 117.425 136.08 117.425 121.086 L 117.425 0 L 139.916 0 L 139.916 121.086 C 139.916 135.208 137.039 147.5 131.286 157.961 C 125.706 168.248 117.686 176.181 107.225 181.76 C 96.764 187.339 84.385 190.129 70.089 190.129 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 158,
    height: 192,
    viewBox: "0 0 158 192",
    fill: "none",
    style: {
      position: "relative",
      width: 158,
      height: 192,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 82.787 192 C 65.376 192 50.49 187.86 38.129 179.58 C 25.767 171.299 16.279 160 9.663 145.682 C 3.221 131.191 0 114.717 0 96.259 C 0 77.801 3.308 61.326 9.924 46.836 C 16.54 32.345 26.029 20.96 38.39 12.679 C 50.926 4.226 65.899 0 83.309 0 C 98.108 0 110.556 2.674 120.655 8.022 C 130.927 13.369 139.023 20.615 144.942 29.757 C 151.036 38.9 155.214 49.164 157.478 60.55 L 133.974 62.102 C 131.71 50.199 126.661 40.539 118.826 33.121 C 110.992 25.531 99.153 21.736 83.309 21.736 C 69.207 21.736 57.716 25.186 48.836 32.086 C 40.131 38.987 33.689 48.129 29.511 59.515 C 25.506 70.728 23.504 82.976 23.504 96.259 C 23.504 110.232 25.593 122.825 29.772 134.038 C 33.95 145.078 40.479 153.876 49.359 160.431 C 58.238 166.987 69.555 170.264 83.309 170.264 C 94.278 170.264 103.766 167.849 111.775 163.019 C 119.784 158.016 125.965 151.375 130.317 143.094 C 134.67 134.814 136.933 125.844 137.107 116.183 L 83.831 116.183 L 83.831 94.965 L 158 94.965 L 158 187.86 L 141.286 187.86 L 139.719 145.423 L 142.853 149.046 C 140.764 157.326 136.759 164.744 130.84 171.299 C 124.92 177.682 117.782 182.771 109.425 186.566 C 101.242 190.189 92.363 192 82.787 192 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 164.238,
    height: 185.683,
    viewBox: "0 0 164.238 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 164.238,
      height: 185.683,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 66.95 0 L 97.287 0 L 164.238 185.683 L 139.654 185.683 L 121.086 132.855 L 43.152 132.855 L 24.583 185.683 L 0 185.683 Z M 50.736 110.887 L 113.502 110.887 L 82.119 19.614 L 50.736 110.887 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 127.624,
    height: 185.683,
    viewBox: "0 0 127.624 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 127.624,
      height: 185.683,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 0 162.669 L 99.38 21.968 L 3.4 21.968 L 3.4 0 L 125.009 0 L 125.009 23.014 L 25.629 163.715 L 127.624 163.715 L 127.624 185.683 L 0 185.683 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 554.001,
      height: 49.604,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 39.309,
    height: 47.465,
    viewBox: "0 0 39.309 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 514.691,
      top: 1.07,
      width: 39.309,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16.78 47.465 L 16.78 28.078 L 0 0 L 6.819 0 L 19.655 22.195 L 32.49 0 L 39.309 0 L 22.529 28.078 L 22.529 47.465 L 16.78 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.315,
    height: 49.604,
    viewBox: "0 0 41.315 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 474.406,
      top: 0,
      width: 41.315,
      height: 49.604
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.326 49.604 C 17.092 49.604 13.371 48.624 10.162 46.663 C 6.953 44.657 4.457 41.805 2.674 38.106 C 0.891 34.407 0 29.994 0 24.869 C 0 19.744 0.891 15.331 2.674 11.632 C 4.457 7.889 6.953 5.014 10.162 3.008 C 13.371 1.003 17.092 0 21.326 0 C 27.075 0 31.532 1.448 34.696 4.345 C 37.861 7.242 39.933 11.187 40.914 16.178 L 34.83 16.579 C 34.162 13.192 32.735 10.518 30.552 8.557 C 28.368 6.596 25.293 5.616 21.326 5.616 C 18.295 5.616 15.621 6.396 13.304 7.955 C 11.031 9.471 9.248 11.677 7.955 14.574 C 6.663 17.426 6.017 20.858 6.017 24.869 C 6.017 28.88 6.663 32.312 7.955 35.164 C 9.248 38.017 11.031 40.201 13.304 41.716 C 15.621 43.231 18.295 43.989 21.326 43.989 C 25.471 43.989 28.68 42.919 30.953 40.78 C 33.226 38.596 34.652 35.655 35.231 31.955 L 41.315 32.357 C 40.735 35.788 39.599 38.797 37.905 41.382 C 36.212 43.967 33.961 45.994 31.153 47.465 C 28.39 48.891 25.114 49.604 21.326 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 37.370,
    height: 47.465,
    viewBox: "0 0 37.370 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 430.785,
      top: 1.07,
      width: 37.37,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 8.156 0 L 31.621 41.716 L 31.621 0 L 37.37 0 L 37.37 47.465 L 28.813 47.465 L 5.749 6.552 L 5.749 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 393.163,
      top: 1.07,
      width: 30.351,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40.446,
    height: 49.604,
    viewBox: "0 0 40.446 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 345.216,
      top: 0,
      width: 40.446,
      height: 49.604
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.192 49.604 C 16.735 49.604 12.925 48.535 9.76 46.396 C 6.596 44.256 4.167 41.337 2.474 37.638 C 0.824 33.894 0 29.638 0 24.869 C 0 20.1 0.847 15.844 2.54 12.1 C 4.234 8.357 6.663 5.415 9.827 3.276 C 13.036 1.092 16.869 0 21.326 0 C 25.114 0 28.301 0.691 30.886 2.072 C 33.515 3.454 35.588 5.326 37.103 7.688 C 38.663 10.05 39.733 12.702 40.312 15.643 L 34.295 16.045 C 33.716 12.969 32.423 10.474 30.418 8.557 C 28.412 6.596 25.382 5.616 21.326 5.616 C 17.716 5.616 14.774 6.507 12.501 8.29 C 10.273 10.072 8.624 12.435 7.554 15.376 C 6.529 18.273 6.017 21.437 6.017 24.869 C 6.017 28.479 6.552 31.733 7.621 34.63 C 8.691 37.482 10.362 39.755 12.635 41.448 C 14.908 43.142 17.805 43.989 21.326 43.989 C 24.134 43.989 26.563 43.365 28.613 42.117 C 30.663 40.824 32.245 39.109 33.359 36.969 C 34.474 34.83 35.053 32.513 35.097 30.017 L 21.46 30.017 L 21.46 24.535 L 40.446 24.535 L 40.446 48.535 L 36.167 48.535 L 35.766 37.571 L 36.568 38.507 C 36.033 40.646 35.008 42.563 33.493 44.256 C 31.978 45.905 30.15 47.22 28.011 48.201 C 25.916 49.136 23.643 49.604 21.192 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.983,
    height: 47.465,
    viewBox: "0 0 41.983 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 302.919,
      top: 1.07,
      width: 41.983,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 17.114 0 L 24.869 0 L 41.983 47.465 L 35.699 47.465 L 30.953 33.961 L 11.031 33.961 L 6.284 47.465 L 0 47.465 Z M 12.969 28.345 L 29.014 28.345 L 20.992 5.014 L 12.969 28.345 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 254.749,
      top: 1.07,
      width: 30.351,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.916,
    height: 47.465,
    viewBox: "0 0 41.916 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 208.853,
      top: 1.07,
      width: 41.916,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.181 47.465 L 0 0 L 6.284 0 L 20.992 41.181 L 35.632 0 L 41.916 0 L 24.735 47.465 L 17.181 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.749,
    height: 47.465,
    viewBox: "0 0 5.749 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 198.959,
      top: 1.07,
      width: 5.749,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 5.749 0 L 5.749 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 35.298,
    height: 47.465,
    viewBox: "0 0 35.298 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 160.754,
      top: 1.07,
      width: 35.298,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.774 47.465 L 14.774 5.616 L 0 5.616 L 0 0 L 35.298 0 L 35.298 5.616 L 20.524 5.616 L 20.524 47.465 L 14.774 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.983,
    height: 47.465,
    viewBox: "0 0 41.983 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 124.646,
      top: 1.07,
      width: 41.983,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 17.114 0 L 24.869 0 L 41.983 47.465 L 35.699 47.465 L 30.953 33.961 L 11.031 33.961 L 6.284 47.465 L 0 47.465 Z M 12.969 28.345 L 29.014 28.345 L 20.992 5.014 L 12.969 28.345 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 91.183,
      top: 1.07,
      width: 30.351,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34.630,
    height: 47.465,
    viewBox: "0 0 34.630 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 48.272,
      top: 1.07,
      width: 34.63,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 17.983 0 C 21.326 0 24.201 0.579 26.607 1.738 C 29.014 2.897 30.863 4.568 32.156 6.752 C 33.493 8.891 34.162 11.432 34.162 14.373 C 34.162 16.513 33.649 18.429 32.624 20.123 C 31.643 21.772 30.373 23.086 28.813 24.067 C 27.253 25.047 25.627 25.582 23.933 25.671 L 23.532 25.07 C 26.429 25.07 28.702 25.738 30.351 27.075 C 32.045 28.412 33.025 30.552 33.292 33.493 L 34.63 47.465 L 28.813 47.465 L 27.61 34.095 C 27.432 32.134 26.719 30.685 25.471 29.749 C 24.267 28.813 22.284 28.345 19.521 28.345 L 5.749 28.345 L 5.749 47.465 L 0 47.465 Z M 5.749 22.73 L 18.719 22.73 C 21.616 22.73 23.911 21.994 25.604 20.524 C 27.298 19.053 28.145 16.958 28.145 14.24 C 28.145 11.476 27.276 9.359 25.538 7.889 C 23.799 6.373 21.281 5.616 17.983 5.616 L 5.749 5.616 L 5.749 22.73 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.315,
    height: 49.604,
    viewBox: "0 0 41.315 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 41.315,
      height: 49.604
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.326 49.604 C 17.092 49.604 13.37 48.624 10.162 46.663 C 6.953 44.657 4.457 41.805 2.674 38.106 C 0.891 34.407 0 29.994 0 24.869 C 0 19.744 0.891 15.331 2.674 11.632 C 4.457 7.889 6.953 5.014 10.162 3.008 C 13.37 1.003 17.092 0 21.326 0 C 27.075 0 31.532 1.448 34.696 4.345 C 37.861 7.242 39.933 11.187 40.914 16.178 L 34.83 16.579 C 34.162 13.192 32.735 10.518 30.552 8.557 C 28.368 6.596 25.292 5.616 21.326 5.616 C 18.295 5.616 15.621 6.396 13.304 7.955 C 11.031 9.471 9.248 11.677 7.955 14.574 C 6.663 17.426 6.017 20.858 6.017 24.869 C 6.017 28.88 6.663 32.312 7.955 35.164 C 9.248 38.017 11.031 40.201 13.304 41.716 C 15.621 43.231 18.295 43.989 21.326 43.989 C 25.471 43.989 28.68 42.919 30.953 40.78 C 33.226 38.596 34.652 35.655 35.231 31.955 L 41.315 32.357 C 40.735 35.788 39.599 38.797 37.905 41.382 C 36.212 43.967 33.961 45.994 31.153 47.465 C 28.39 48.891 25.114 49.604 21.326 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
}
Object.assign(__ds_scope, { Frame44, __ds_default_figma_Frame44_9h2vl7: Frame44 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame44.jsx", error: String((e && e.message) || e) }); }

// figma/Frame45.jsx
try { (() => {
// figma node: 93:64 Frame 45
function Frame45(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 50,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 309,
      overflow: "hidden",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      borderRadius: 58.49666213989258,
      backgroundColor: "rgb(255,255,255)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.030,47.935)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.953 55.62 L 76.953 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.953 55.62 L 76.953 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.953 166.861 L 76.953 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.953 166.861 L 76.953 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 766.418,
      display: "flex",
      flexDirection: "column",
      gap: 30,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 116.640,
    height: 185.683,
    viewBox: "0 0 116.640 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 116.64,
      height: 185.683,
      flexShrink: 0,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 0 0 L 116.64 0 L 116.64 21.968 L 11.246 21.968 L 22.491 10.461 L 22.491 95.718 L 11.246 84.211 L 111.933 84.211 L 111.933 105.656 L 11.246 105.656 L 22.491 94.149 L 22.491 185.683 L 0 185.683 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 139.916,
    height: 190.129,
    viewBox: "0 0 139.916 190.129",
    fill: "none",
    style: {
      position: "relative",
      width: 139.916,
      height: 190.129,
      flexShrink: 0,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.089 190.129 C 55.792 190.129 43.326 187.339 32.691 181.76 C 22.23 176.181 14.122 168.248 8.369 157.961 C 2.79 147.5 0 135.208 0 121.086 L 0 0 L 22.491 0 L 22.491 121.086 C 22.491 136.08 26.588 147.674 34.783 155.869 C 43.152 164.063 54.92 168.161 70.089 168.161 C 85.083 168.161 96.677 164.063 104.872 155.869 C 113.24 147.674 117.425 136.08 117.425 121.086 L 117.425 0 L 139.916 0 L 139.916 121.086 C 139.916 135.208 137.039 147.5 131.286 157.961 C 125.706 168.248 117.686 176.181 107.225 181.76 C 96.764 187.339 84.385 190.129 70.089 190.129 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 158,
    height: 192,
    viewBox: "0 0 158 192",
    fill: "none",
    style: {
      position: "relative",
      width: 158,
      height: 192,
      flexShrink: 0,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 82.787 192 C 65.376 192 50.49 187.86 38.129 179.58 C 25.767 171.299 16.279 160 9.663 145.682 C 3.221 131.191 0 114.717 0 96.259 C 0 77.801 3.308 61.326 9.924 46.836 C 16.54 32.345 26.029 20.96 38.39 12.679 C 50.926 4.226 65.899 0 83.309 0 C 98.108 0 110.556 2.674 120.655 8.022 C 130.927 13.369 139.023 20.615 144.942 29.757 C 151.036 38.9 155.214 49.164 157.478 60.55 L 133.974 62.102 C 131.71 50.199 126.661 40.539 118.826 33.121 C 110.992 25.531 99.153 21.736 83.309 21.736 C 69.207 21.736 57.716 25.186 48.836 32.086 C 40.131 38.987 33.689 48.129 29.511 59.515 C 25.506 70.728 23.504 82.976 23.504 96.259 C 23.504 110.232 25.593 122.825 29.772 134.038 C 33.95 145.078 40.479 153.876 49.359 160.431 C 58.238 166.987 69.555 170.264 83.309 170.264 C 94.278 170.264 103.766 167.849 111.775 163.019 C 119.784 158.016 125.965 151.375 130.317 143.094 C 134.67 134.814 136.933 125.844 137.107 116.183 L 83.831 116.183 L 83.831 94.965 L 158 94.965 L 158 187.86 L 141.286 187.86 L 139.719 145.423 L 142.853 149.046 C 140.764 157.326 136.759 164.744 130.84 171.299 C 124.92 177.682 117.782 182.771 109.425 186.566 C 101.242 190.189 92.363 192 82.787 192 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 164.238,
    height: 185.683,
    viewBox: "0 0 164.238 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 164.238,
      height: 185.683,
      flexShrink: 0,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 66.95 0 L 97.287 0 L 164.238 185.683 L 139.654 185.683 L 121.086 132.855 L 43.152 132.855 L 24.583 185.683 L 0 185.683 Z M 50.736 110.887 L 113.502 110.887 L 82.119 19.614 L 50.736 110.887 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 127.624,
    height: 185.683,
    viewBox: "0 0 127.624 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 127.624,
      height: 185.683,
      flexShrink: 0,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 0 162.669 L 99.38 21.968 L 3.4 21.968 L 3.4 0 L 125.009 0 L 125.009 23.014 L 25.629 163.715 L 127.624 163.715 L 127.624 185.683 L 0 185.683 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 554.001,
      height: 49.604,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 39.309,
    height: 47.465,
    viewBox: "0 0 39.309 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 514.691,
      top: 1.07,
      width: 39.309,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16.78 47.465 L 16.78 28.078 L 0 0 L 6.819 0 L 19.655 22.195 L 32.49 0 L 39.309 0 L 22.529 28.078 L 22.529 47.465 L 16.78 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.315,
    height: 49.604,
    viewBox: "0 0 41.315 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 474.406,
      top: 0,
      width: 41.315,
      height: 49.604,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.326 49.604 C 17.092 49.604 13.371 48.624 10.162 46.663 C 6.953 44.657 4.457 41.805 2.674 38.106 C 0.891 34.407 0 29.994 0 24.869 C 0 19.744 0.891 15.331 2.674 11.632 C 4.457 7.889 6.953 5.014 10.162 3.008 C 13.371 1.003 17.092 0 21.326 0 C 27.075 0 31.532 1.448 34.696 4.345 C 37.861 7.242 39.933 11.187 40.914 16.178 L 34.83 16.579 C 34.162 13.192 32.735 10.518 30.552 8.557 C 28.368 6.596 25.293 5.616 21.326 5.616 C 18.295 5.616 15.621 6.396 13.304 7.955 C 11.031 9.471 9.248 11.677 7.955 14.574 C 6.663 17.426 6.017 20.858 6.017 24.869 C 6.017 28.88 6.663 32.312 7.955 35.164 C 9.248 38.017 11.031 40.201 13.304 41.716 C 15.621 43.231 18.295 43.989 21.326 43.989 C 25.471 43.989 28.68 42.919 30.953 40.78 C 33.226 38.596 34.652 35.655 35.231 31.955 L 41.315 32.357 C 40.735 35.788 39.599 38.797 37.905 41.382 C 36.212 43.967 33.961 45.994 31.153 47.465 C 28.39 48.891 25.114 49.604 21.326 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 37.370,
    height: 47.465,
    viewBox: "0 0 37.370 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 430.785,
      top: 1.07,
      width: 37.37,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 8.156 0 L 31.621 41.716 L 31.621 0 L 37.37 0 L 37.37 47.465 L 28.813 47.465 L 5.749 6.552 L 5.749 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 393.163,
      top: 1.07,
      width: 30.351,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40.446,
    height: 49.604,
    viewBox: "0 0 40.446 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 345.216,
      top: 0,
      width: 40.446,
      height: 49.604,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.192 49.604 C 16.735 49.604 12.925 48.535 9.76 46.396 C 6.596 44.256 4.167 41.337 2.474 37.638 C 0.824 33.894 0 29.638 0 24.869 C 0 20.1 0.847 15.844 2.54 12.1 C 4.234 8.357 6.663 5.415 9.827 3.276 C 13.036 1.092 16.869 0 21.326 0 C 25.114 0 28.301 0.691 30.886 2.072 C 33.515 3.454 35.588 5.326 37.103 7.688 C 38.663 10.05 39.733 12.702 40.312 15.643 L 34.295 16.045 C 33.716 12.969 32.423 10.474 30.418 8.557 C 28.412 6.596 25.382 5.616 21.326 5.616 C 17.716 5.616 14.774 6.507 12.501 8.29 C 10.273 10.072 8.624 12.435 7.554 15.376 C 6.529 18.273 6.017 21.437 6.017 24.869 C 6.017 28.479 6.552 31.733 7.621 34.63 C 8.691 37.482 10.362 39.755 12.635 41.448 C 14.908 43.142 17.805 43.989 21.326 43.989 C 24.134 43.989 26.563 43.365 28.613 42.117 C 30.663 40.824 32.245 39.109 33.359 36.969 C 34.474 34.83 35.053 32.513 35.097 30.017 L 21.46 30.017 L 21.46 24.535 L 40.446 24.535 L 40.446 48.535 L 36.167 48.535 L 35.766 37.571 L 36.568 38.507 C 36.033 40.646 35.008 42.563 33.493 44.256 C 31.978 45.905 30.15 47.22 28.011 48.201 C 25.916 49.136 23.643 49.604 21.192 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.983,
    height: 47.465,
    viewBox: "0 0 41.983 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 302.919,
      top: 1.07,
      width: 41.983,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 17.114 0 L 24.869 0 L 41.983 47.465 L 35.699 47.465 L 30.953 33.961 L 11.031 33.961 L 6.284 47.465 L 0 47.465 Z M 12.969 28.345 L 29.014 28.345 L 20.992 5.014 L 12.969 28.345 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 254.749,
      top: 1.07,
      width: 30.351,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.916,
    height: 47.465,
    viewBox: "0 0 41.916 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 208.853,
      top: 1.07,
      width: 41.916,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.181 47.465 L 0 0 L 6.284 0 L 20.992 41.181 L 35.632 0 L 41.916 0 L 24.735 47.465 L 17.181 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.749,
    height: 47.465,
    viewBox: "0 0 5.749 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 198.959,
      top: 1.07,
      width: 5.749,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 5.749 0 L 5.749 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 35.298,
    height: 47.465,
    viewBox: "0 0 35.298 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 160.754,
      top: 1.07,
      width: 35.298,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.774 47.465 L 14.774 5.616 L 0 5.616 L 0 0 L 35.298 0 L 35.298 5.616 L 20.524 5.616 L 20.524 47.465 L 14.774 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.983,
    height: 47.465,
    viewBox: "0 0 41.983 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 124.646,
      top: 1.07,
      width: 41.983,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 17.114 0 L 24.869 0 L 41.983 47.465 L 35.699 47.465 L 30.953 33.961 L 11.031 33.961 L 6.284 47.465 L 0 47.465 Z M 12.969 28.345 L 29.014 28.345 L 20.992 5.014 L 12.969 28.345 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 91.183,
      top: 1.07,
      width: 30.351,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34.630,
    height: 47.465,
    viewBox: "0 0 34.630 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 48.272,
      top: 1.07,
      width: 34.63,
      height: 47.465,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 17.983 0 C 21.326 0 24.201 0.579 26.607 1.738 C 29.014 2.897 30.863 4.568 32.156 6.752 C 33.493 8.891 34.162 11.432 34.162 14.373 C 34.162 16.513 33.649 18.429 32.624 20.123 C 31.643 21.772 30.373 23.086 28.813 24.067 C 27.253 25.047 25.627 25.582 23.933 25.671 L 23.532 25.07 C 26.429 25.07 28.702 25.738 30.351 27.075 C 32.045 28.412 33.025 30.552 33.292 33.493 L 34.63 47.465 L 28.813 47.465 L 27.61 34.095 C 27.432 32.134 26.719 30.685 25.471 29.749 C 24.267 28.813 22.284 28.345 19.521 28.345 L 5.749 28.345 L 5.749 47.465 L 0 47.465 Z M 5.749 22.73 L 18.719 22.73 C 21.616 22.73 23.911 21.994 25.604 20.524 C 27.298 19.053 28.145 16.958 28.145 14.24 C 28.145 11.476 27.276 9.359 25.538 7.889 C 23.799 6.373 21.281 5.616 17.983 5.616 L 5.749 5.616 L 5.749 22.73 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.315,
    height: 49.604,
    viewBox: "0 0 41.315 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 41.315,
      height: 49.604,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.326 49.604 C 17.092 49.604 13.37 48.624 10.162 46.663 C 6.953 44.657 4.457 41.805 2.674 38.106 C 0.891 34.407 0 29.994 0 24.869 C 0 19.744 0.891 15.331 2.674 11.632 C 4.457 7.889 6.953 5.014 10.162 3.008 C 13.37 1.003 17.092 0 21.326 0 C 27.075 0 31.532 1.448 34.696 4.345 C 37.861 7.242 39.933 11.187 40.914 16.178 L 34.83 16.579 C 34.162 13.192 32.735 10.518 30.552 8.557 C 28.368 6.596 25.292 5.616 21.326 5.616 C 18.295 5.616 15.621 6.396 13.304 7.955 C 11.031 9.471 9.248 11.677 7.955 14.574 C 6.663 17.426 6.017 20.858 6.017 24.869 C 6.017 28.88 6.663 32.312 7.955 35.164 C 9.248 38.017 11.031 40.201 13.304 41.716 C 15.621 43.231 18.295 43.989 21.326 43.989 C 25.471 43.989 28.68 42.919 30.953 40.78 C 33.226 38.596 34.652 35.655 35.231 31.955 L 41.315 32.357 C 40.735 35.788 39.599 38.797 37.905 41.382 C 36.212 43.967 33.961 45.994 31.153 47.465 C 28.39 48.891 25.114 49.604 21.326 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
}
Object.assign(__ds_scope, { Frame45, __ds_default_figma_Frame45_9h2vl8: Frame45 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame45.jsx", error: String((e && e.message) || e) }); }

// figma/Frame46.jsx
try { (() => {
// figma node: 93:65 Frame 46
function Frame46(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 1159.138,
      display: "flex",
      flexDirection: "row",
      gap: 50,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 224.323,
    height: 316.152,
    viewBox: "0 0 224.323 316.152",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,99.976,4.536)",
      transformOrigin: "0 0",
      width: 224.323,
      height: 316.152,
      color: "rgb(0,87,254)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 112.161 0 L 224.323 0 C 224.323 43.651 190.101 79.038 147.887 79.038 L 112.161 79.038 L 112.161 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 158.076 C 0 114.424 34.222 79.038 76.436 79.038 L 112.161 79.038 L 112.161 158.076 L 0 158.076 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 112.161 158.076 L 224.323 158.076 C 224.323 201.727 190.101 237.114 147.887 237.114 L 112.161 237.114 L 112.161 158.076 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 316.152 C 0 272.5 34.222 237.114 76.436 237.114 L 112.161 237.114 L 112.161 316.152 L 0 316.152 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 784.839,
      display: "flex",
      flexDirection: "column",
      gap: 45.907352447509766,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 195.923,
      overflow: "hidden",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 130.198,
    height: 189.427,
    viewBox: "0 0 130.198 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 654.643,
      top: 2.228,
      width: 130.198,
      height: 189.427,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 0 165.949 L 101.383 22.411 L 3.468 22.411 L 3.468 0 L 127.53 0 L 127.53 23.478 L 26.146 167.016 L 130.198 167.016 L 130.198 189.427 L 0 189.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 167.549,
    height: 189.427,
    viewBox: "0 0 167.549 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 484.905,
      top: 2.228,
      width: 167.549,
      height: 189.427,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 68.3 0 L 99.249 0 L 167.549 189.427 L 142.47 189.427 L 123.528 135.534 L 44.022 135.534 L 25.079 189.427 L 0 189.427 Z M 51.759 113.122 L 115.79 113.122 L 83.775 20.01 L 51.759 113.122 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 161.186,
    height: 195.871,
    viewBox: "0 0 161.186 195.871",
    fill: "none",
    style: {
      position: "absolute",
      left: 313.191,
      top: 0,
      width: 161.186,
      height: 195.871,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 84.456 195.871 C 66.695 195.871 51.508 191.648 38.898 183.2 C 26.287 174.753 16.607 163.226 9.858 148.619 C 3.286 133.837 0 117.03 0 98.2 C 0 79.369 3.375 62.563 10.124 47.78 C 16.873 32.997 26.553 21.382 39.164 12.935 C 51.952 4.312 67.227 0 84.989 0 C 100.086 0 112.786 2.728 123.087 8.183 C 133.567 13.639 141.826 21.03 147.865 30.357 C 154.081 39.685 158.344 50.156 160.653 61.771 L 136.675 63.355 C 134.366 51.212 129.215 41.356 121.222 33.789 C 113.23 26.046 101.152 22.174 84.989 22.174 C 70.602 22.174 58.879 25.694 49.821 32.733 C 40.94 39.773 34.369 49.1 30.106 60.715 C 26.021 72.154 23.978 84.649 23.978 98.2 C 23.978 112.454 26.109 125.301 30.372 136.74 C 34.635 148.003 41.296 156.979 50.354 163.666 C 59.412 170.354 70.957 173.697 84.989 173.697 C 96.179 173.697 105.859 171.233 114.029 166.306 C 122.199 161.202 128.505 154.427 132.945 145.98 C 137.385 137.532 139.694 128.381 139.872 118.526 L 85.522 118.526 L 85.522 96.88 L 161.186 96.88 L 161.186 191.648 L 144.135 191.648 L 142.536 148.355 L 145.733 152.051 C 143.602 160.498 139.517 168.066 133.478 174.753 C 127.439 181.265 120.157 186.456 111.631 190.328 C 103.283 194.024 94.225 195.871 84.456 195.871 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 142.737,
    height: 193.962,
    viewBox: "0 0 142.737 193.962",
    fill: "none",
    style: {
      position: "absolute",
      left: 145.364,
      top: 1.961,
      width: 142.737,
      height: 193.962,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 71.502 193.962 C 56.917 193.962 44.2 191.116 33.35 185.425 C 22.678 179.733 14.407 171.64 8.538 161.146 C 2.846 150.474 0 137.935 0 123.528 L 0 0 L 22.945 0 L 22.945 123.528 C 22.945 138.824 27.124 150.652 35.484 159.012 C 44.022 167.371 56.028 171.551 71.502 171.551 C 86.798 171.551 98.626 167.371 106.986 159.012 C 115.524 150.652 119.792 138.824 119.792 123.528 L 119.792 0 L 142.737 0 L 142.737 123.528 C 142.737 137.935 139.802 150.474 133.933 161.146 C 128.241 171.64 120.059 179.733 109.387 185.425 C 98.715 191.116 86.087 193.962 71.502 193.962 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 118.992,
    height: 189.427,
    viewBox: "0 0 118.992 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.001,
      top: 2.228,
      width: 118.992,
      height: 189.427,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 0 0 L 118.992 0 L 118.992 22.411 L 11.472 22.411 L 22.945 10.672 L 22.945 97.648 L 11.472 85.909 L 114.19 85.909 L 114.19 107.786 L 11.472 107.786 L 22.945 96.047 L 22.945 189.427 L 0 189.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 750.176,
      height: 67.17,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 53.229,
    height: 64.273,
    viewBox: "0 0 53.229 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 696.948,
      top: 1.449,
      width: 53.229,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.722 64.273 L 22.722 38.021 L 0 0 L 9.234 0 L 26.614 30.054 L 43.995 0 L 53.229 0 L 30.507 38.021 L 30.507 64.273 L 22.722 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.945,
    height: 67.170,
    viewBox: "0 0 55.945 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 642.397,
      top: 0,
      width: 55.945,
      height: 67.17,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.878 67.17 C 23.144 67.17 18.105 65.842 13.76 63.187 C 9.415 60.471 6.035 56.608 3.621 51.599 C 1.207 46.59 0 40.616 0 33.675 C 0 26.735 1.207 20.76 3.621 15.751 C 6.035 10.682 9.415 6.789 13.76 4.074 C 18.105 1.358 23.144 0 28.878 0 C 36.663 0 42.698 1.961 46.983 5.884 C 51.267 9.807 54.074 15.148 55.401 21.907 L 47.164 22.45 C 46.258 17.864 44.327 14.243 41.37 11.587 C 38.413 8.932 34.249 7.604 28.878 7.604 C 24.774 7.604 21.153 8.66 18.015 10.772 C 14.937 12.824 12.523 15.812 10.772 19.734 C 9.022 23.597 8.147 28.244 8.147 33.675 C 8.147 39.107 9.022 43.754 10.772 47.616 C 12.523 51.479 14.937 54.436 18.015 56.488 C 21.153 58.54 24.774 59.566 28.878 59.566 C 34.49 59.566 38.835 58.117 41.913 55.22 C 44.991 52.263 46.922 48.28 47.707 43.271 L 55.945 43.814 C 55.16 48.461 53.621 52.535 51.328 56.035 C 49.034 59.535 45.987 62.281 42.185 64.273 C 38.443 66.204 34.007 67.17 28.878 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 50.604,
    height: 64.273,
    viewBox: "0 0 50.604 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 583.331,
      top: 1.449,
      width: 50.604,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 11.044 0 L 42.818 56.488 L 42.818 0 L 50.604 0 L 50.604 64.273 L 39.016 64.273 L 7.785 8.871 L 7.785 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 532.385,
      top: 1.449,
      width: 41.098,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 54.768,
    height: 67.170,
    viewBox: "0 0 54.768 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 467.461,
      top: 0,
      width: 54.768,
      height: 67.17,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.696 67.17 C 22.661 67.17 17.502 65.721 13.217 62.824 C 8.932 59.928 5.643 55.975 3.349 50.966 C 1.116 45.896 0 40.133 0 33.675 C 0 27.218 1.147 21.454 3.44 16.385 C 5.733 11.316 9.022 7.333 13.307 4.436 C 17.652 1.479 22.843 0 28.878 0 C 34.007 0 38.322 0.935 41.823 2.806 C 45.383 4.677 48.19 7.212 50.241 10.41 C 52.354 13.609 53.802 17.2 54.587 21.183 L 46.439 21.726 C 45.655 17.562 43.905 14.182 41.189 11.587 C 38.473 8.932 34.369 7.604 28.878 7.604 C 23.989 7.604 20.006 8.811 16.928 11.225 C 13.911 13.639 11.678 16.838 10.229 20.821 C 8.841 24.744 8.147 29.028 8.147 33.675 C 8.147 38.564 8.871 42.969 10.32 46.892 C 11.768 50.754 14.031 53.832 17.109 56.126 C 20.187 58.419 24.11 59.566 28.878 59.566 C 32.68 59.566 35.969 58.721 38.745 57.031 C 41.521 55.281 43.663 52.957 45.172 50.06 C 46.681 47.164 47.465 44.025 47.526 40.646 L 29.059 40.646 L 29.059 33.223 L 54.768 33.223 L 54.768 65.721 L 48.974 65.721 L 48.431 50.875 L 49.517 52.143 C 48.793 55.039 47.405 57.634 45.353 59.928 C 43.301 62.161 40.827 63.941 37.93 65.269 C 35.094 66.536 32.016 67.17 28.696 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.850,
    height: 64.273,
    viewBox: "0 0 56.850 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 410.186,
      top: 1.449,
      width: 56.85,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 23.174 0 L 33.675 0 L 56.85 64.273 L 48.34 64.273 L 41.913 45.987 L 14.937 45.987 L 8.509 64.273 L 0 64.273 Z M 17.562 38.383 L 39.288 38.383 L 28.425 6.789 L 17.562 38.383 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 344.96,
      top: 1.449,
      width: 41.098,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.759,
    height: 64.273,
    viewBox: "0 0 56.759 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 282.811,
      top: 1.449,
      width: 56.759,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 23.265 64.273 L 0 0 L 8.509 0 L 28.425 55.764 L 48.25 0 L 56.759 0 L 33.494 64.273 L 23.265 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.785,
    height: 64.273,
    viewBox: "0 0 7.785 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 269.414,
      top: 1.449,
      width: 7.785,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 7.785 0 L 7.785 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 47.797,
    height: 64.273,
    viewBox: "0 0 47.797 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 217.68,
      top: 1.449,
      width: 47.797,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20.006 64.273 L 20.006 7.604 L 0 7.604 L 0 0 L 47.797 0 L 47.797 7.604 L 27.791 7.604 L 27.791 64.273 L 20.006 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.850,
    height: 64.273,
    viewBox: "0 0 56.850 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 168.784,
      top: 1.449,
      width: 56.85,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 23.174 0 L 33.675 0 L 56.85 64.273 L 48.34 64.273 L 41.913 45.987 L 14.937 45.987 L 8.509 64.273 L 0 64.273 Z M 17.562 38.383 L 39.288 38.383 L 28.425 6.789 L 17.562 38.383 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 123.473,
      top: 1.449,
      width: 41.098,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 46.892,
    height: 64.273,
    viewBox: "0 0 46.892 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 65.367,
      top: 1.449,
      width: 46.892,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 24.351 0 C 28.878 0 32.77 0.785 36.029 2.354 C 39.288 3.923 41.792 6.186 43.543 9.143 C 45.353 12.04 46.258 15.48 46.258 19.463 C 46.258 22.36 45.564 24.955 44.176 27.248 C 42.849 29.481 41.129 31.261 39.016 32.589 C 36.904 33.917 34.701 34.641 32.408 34.762 L 31.865 33.947 C 35.788 33.947 38.865 34.852 41.098 36.663 C 43.392 38.473 44.719 41.37 45.082 45.353 L 46.892 64.273 L 39.016 64.273 L 37.387 46.168 C 37.146 43.512 36.18 41.551 34.49 40.284 C 32.861 39.016 30.175 38.383 26.433 38.383 L 7.785 38.383 L 7.785 64.273 L 0 64.273 Z M 7.785 30.779 L 25.347 30.779 C 29.27 30.779 32.378 29.783 34.671 27.791 C 36.964 25.8 38.111 22.963 38.111 19.282 C 38.111 15.54 36.934 12.674 34.581 10.682 C 32.227 8.63 28.817 7.604 24.351 7.604 L 7.785 7.604 L 7.785 30.779 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.945,
    height: 67.170,
    viewBox: "0 0 55.945 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.001,
      top: 0,
      width: 55.945,
      height: 67.17,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.878 67.17 C 23.144 67.17 18.105 65.842 13.76 63.187 C 9.415 60.471 6.035 56.608 3.621 51.599 C 1.207 46.59 0 40.616 0 33.675 C 0 26.735 1.207 20.76 3.621 15.751 C 6.035 10.682 9.415 6.789 13.76 4.074 C 18.105 1.358 23.144 0 28.878 0 C 36.663 0 42.698 1.961 46.983 5.884 C 51.267 9.807 54.074 15.148 55.401 21.907 L 47.164 22.45 C 46.258 17.864 44.327 14.243 41.37 11.587 C 38.413 8.932 34.249 7.604 28.878 7.604 C 24.774 7.604 21.153 8.66 18.015 10.772 C 14.937 12.824 12.523 15.812 10.772 19.734 C 9.022 23.597 8.147 28.244 8.147 33.675 C 8.147 39.107 9.022 43.754 10.772 47.616 C 12.523 51.479 14.937 54.436 18.015 56.488 C 21.153 58.54 24.774 59.566 28.878 59.566 C 34.49 59.566 38.835 58.117 41.913 55.22 C 44.991 52.263 46.922 48.28 47.707 43.271 L 55.945 43.814 C 55.16 48.461 53.621 52.535 51.328 56.035 C 49.034 59.535 45.987 62.281 42.185 64.273 C 38.443 66.204 34.007 67.17 28.878 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
}
Object.assign(__ds_scope, { Frame46, __ds_default_figma_Frame46_9h2vl9: Frame46 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame46.jsx", error: String((e && e.message) || e) }); }

// figma/Frame47.jsx
try { (() => {
// figma node: 93:67 Frame 47
function Frame47(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 1159.138,
      display: "flex",
      flexDirection: "row",
      gap: 50,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 224.323,
    height: 316.152,
    viewBox: "0 0 224.323 316.152",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,99.976,4.536)",
      transformOrigin: "0 0",
      width: 224.323,
      height: 316.152,
      color: "rgb(0,0,0)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 112.161 0 L 224.323 0 C 224.323 43.651 190.101 79.038 147.887 79.038 L 112.161 79.038 L 112.161 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 158.076 C 0 114.424 34.222 79.038 76.436 79.038 L 112.161 79.038 L 112.161 158.076 L 0 158.076 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 112.161 158.076 L 224.323 158.076 C 224.323 201.727 190.101 237.114 147.887 237.114 L 112.161 237.114 L 112.161 158.076 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 316.152 C 0 272.5 34.222 237.114 76.436 237.114 L 112.161 237.114 L 112.161 316.152 L 0 316.152 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 784.839,
      display: "flex",
      flexDirection: "column",
      gap: 45.907352447509766,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 195.923,
      overflow: "hidden",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 130.198,
    height: 189.427,
    viewBox: "0 0 130.198 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 654.643,
      top: 2.228,
      width: 130.198,
      height: 189.427,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 0 165.949 L 101.383 22.411 L 3.468 22.411 L 3.468 0 L 127.53 0 L 127.53 23.478 L 26.146 167.016 L 130.198 167.016 L 130.198 189.427 L 0 189.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 167.549,
    height: 189.427,
    viewBox: "0 0 167.549 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 484.905,
      top: 2.228,
      width: 167.549,
      height: 189.427,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 68.3 0 L 99.249 0 L 167.549 189.427 L 142.47 189.427 L 123.528 135.534 L 44.022 135.534 L 25.079 189.427 L 0 189.427 Z M 51.759 113.122 L 115.79 113.122 L 83.775 20.01 L 51.759 113.122 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 161.186,
    height: 195.871,
    viewBox: "0 0 161.186 195.871",
    fill: "none",
    style: {
      position: "absolute",
      left: 313.191,
      top: 0,
      width: 161.186,
      height: 195.871,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 84.456 195.871 C 66.695 195.871 51.508 191.648 38.898 183.2 C 26.287 174.753 16.607 163.226 9.858 148.619 C 3.286 133.837 0 117.03 0 98.2 C 0 79.369 3.375 62.563 10.124 47.78 C 16.873 32.997 26.553 21.382 39.164 12.935 C 51.952 4.312 67.227 0 84.989 0 C 100.086 0 112.786 2.728 123.087 8.183 C 133.567 13.639 141.826 21.03 147.865 30.357 C 154.081 39.685 158.344 50.156 160.653 61.771 L 136.675 63.355 C 134.366 51.212 129.215 41.356 121.222 33.789 C 113.23 26.046 101.152 22.174 84.989 22.174 C 70.602 22.174 58.879 25.694 49.821 32.733 C 40.94 39.773 34.369 49.1 30.106 60.715 C 26.021 72.154 23.978 84.649 23.978 98.2 C 23.978 112.454 26.109 125.301 30.372 136.74 C 34.635 148.003 41.296 156.979 50.354 163.666 C 59.412 170.354 70.957 173.697 84.989 173.697 C 96.179 173.697 105.859 171.233 114.029 166.306 C 122.199 161.202 128.505 154.427 132.945 145.98 C 137.385 137.532 139.694 128.381 139.872 118.526 L 85.522 118.526 L 85.522 96.88 L 161.186 96.88 L 161.186 191.648 L 144.135 191.648 L 142.536 148.355 L 145.733 152.051 C 143.602 160.498 139.517 168.066 133.478 174.753 C 127.439 181.265 120.157 186.456 111.631 190.328 C 103.283 194.024 94.225 195.871 84.456 195.871 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 142.737,
    height: 193.962,
    viewBox: "0 0 142.737 193.962",
    fill: "none",
    style: {
      position: "absolute",
      left: 145.364,
      top: 1.961,
      width: 142.737,
      height: 193.962,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 71.502 193.962 C 56.917 193.962 44.2 191.116 33.35 185.425 C 22.678 179.733 14.407 171.64 8.538 161.146 C 2.846 150.474 0 137.935 0 123.528 L 0 0 L 22.945 0 L 22.945 123.528 C 22.945 138.824 27.124 150.652 35.484 159.012 C 44.022 167.371 56.028 171.551 71.502 171.551 C 86.798 171.551 98.626 167.371 106.986 159.012 C 115.524 150.652 119.792 138.824 119.792 123.528 L 119.792 0 L 142.737 0 L 142.737 123.528 C 142.737 137.935 139.802 150.474 133.933 161.146 C 128.241 171.64 120.059 179.733 109.387 185.425 C 98.715 191.116 86.087 193.962 71.502 193.962 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 118.992,
    height: 189.427,
    viewBox: "0 0 118.992 189.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.001,
      top: 2.228,
      width: 118.992,
      height: 189.427,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 189.427 L 0 0 L 118.992 0 L 118.992 22.411 L 11.472 22.411 L 22.945 10.672 L 22.945 97.648 L 11.472 85.909 L 114.19 85.909 L 114.19 107.786 L 11.472 107.786 L 22.945 96.047 L 22.945 189.427 L 0 189.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 750.176,
      height: 67.17,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 53.229,
    height: 64.273,
    viewBox: "0 0 53.229 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 696.948,
      top: 1.449,
      width: 53.229,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.722 64.273 L 22.722 38.021 L 0 0 L 9.234 0 L 26.614 30.054 L 43.995 0 L 53.229 0 L 30.507 38.021 L 30.507 64.273 L 22.722 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.945,
    height: 67.170,
    viewBox: "0 0 55.945 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 642.397,
      top: 0,
      width: 55.945,
      height: 67.17,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.878 67.17 C 23.144 67.17 18.105 65.842 13.76 63.187 C 9.415 60.471 6.035 56.608 3.621 51.599 C 1.207 46.59 0 40.616 0 33.675 C 0 26.735 1.207 20.76 3.621 15.751 C 6.035 10.682 9.415 6.789 13.76 4.074 C 18.105 1.358 23.144 0 28.878 0 C 36.663 0 42.698 1.961 46.983 5.884 C 51.267 9.807 54.074 15.148 55.401 21.907 L 47.164 22.45 C 46.258 17.864 44.327 14.243 41.37 11.587 C 38.413 8.932 34.249 7.604 28.878 7.604 C 24.774 7.604 21.153 8.66 18.015 10.772 C 14.937 12.824 12.523 15.812 10.772 19.734 C 9.022 23.597 8.147 28.244 8.147 33.675 C 8.147 39.107 9.022 43.754 10.772 47.616 C 12.523 51.479 14.937 54.436 18.015 56.488 C 21.153 58.54 24.774 59.566 28.878 59.566 C 34.49 59.566 38.835 58.117 41.913 55.22 C 44.991 52.263 46.922 48.28 47.707 43.271 L 55.945 43.814 C 55.16 48.461 53.621 52.535 51.328 56.035 C 49.034 59.535 45.987 62.281 42.185 64.273 C 38.443 66.204 34.007 67.17 28.878 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 50.604,
    height: 64.273,
    viewBox: "0 0 50.604 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 583.331,
      top: 1.449,
      width: 50.604,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 11.044 0 L 42.818 56.488 L 42.818 0 L 50.604 0 L 50.604 64.273 L 39.016 64.273 L 7.785 8.871 L 7.785 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 532.385,
      top: 1.449,
      width: 41.098,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 54.768,
    height: 67.170,
    viewBox: "0 0 54.768 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 467.461,
      top: 0,
      width: 54.768,
      height: 67.17,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.696 67.17 C 22.661 67.17 17.502 65.721 13.217 62.824 C 8.932 59.928 5.643 55.975 3.349 50.966 C 1.116 45.896 0 40.133 0 33.675 C 0 27.218 1.147 21.454 3.44 16.385 C 5.733 11.316 9.022 7.333 13.307 4.436 C 17.652 1.479 22.843 0 28.878 0 C 34.007 0 38.322 0.935 41.823 2.806 C 45.383 4.677 48.19 7.212 50.241 10.41 C 52.354 13.609 53.802 17.2 54.587 21.183 L 46.439 21.726 C 45.655 17.562 43.905 14.182 41.189 11.587 C 38.473 8.932 34.369 7.604 28.878 7.604 C 23.989 7.604 20.006 8.811 16.928 11.225 C 13.911 13.639 11.678 16.838 10.229 20.821 C 8.841 24.744 8.147 29.028 8.147 33.675 C 8.147 38.564 8.871 42.969 10.32 46.892 C 11.768 50.754 14.031 53.832 17.109 56.126 C 20.187 58.419 24.11 59.566 28.878 59.566 C 32.68 59.566 35.969 58.721 38.745 57.031 C 41.521 55.281 43.663 52.957 45.172 50.06 C 46.681 47.164 47.465 44.025 47.526 40.646 L 29.059 40.646 L 29.059 33.223 L 54.768 33.223 L 54.768 65.721 L 48.974 65.721 L 48.431 50.875 L 49.517 52.143 C 48.793 55.039 47.405 57.634 45.353 59.928 C 43.301 62.161 40.827 63.941 37.93 65.269 C 35.094 66.536 32.016 67.17 28.696 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.850,
    height: 64.273,
    viewBox: "0 0 56.850 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 410.186,
      top: 1.449,
      width: 56.85,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 23.174 0 L 33.675 0 L 56.85 64.273 L 48.34 64.273 L 41.913 45.987 L 14.937 45.987 L 8.509 64.273 L 0 64.273 Z M 17.562 38.383 L 39.288 38.383 L 28.425 6.789 L 17.562 38.383 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 344.96,
      top: 1.449,
      width: 41.098,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.759,
    height: 64.273,
    viewBox: "0 0 56.759 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 282.811,
      top: 1.449,
      width: 56.759,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 23.265 64.273 L 0 0 L 8.509 0 L 28.425 55.764 L 48.25 0 L 56.759 0 L 33.494 64.273 L 23.265 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 7.785,
    height: 64.273,
    viewBox: "0 0 7.785 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 269.414,
      top: 1.449,
      width: 7.785,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 7.785 0 L 7.785 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 47.797,
    height: 64.273,
    viewBox: "0 0 47.797 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 217.68,
      top: 1.449,
      width: 47.797,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20.006 64.273 L 20.006 7.604 L 0 7.604 L 0 0 L 47.797 0 L 47.797 7.604 L 27.791 7.604 L 27.791 64.273 L 20.006 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.850,
    height: 64.273,
    viewBox: "0 0 56.850 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 168.784,
      top: 1.449,
      width: 56.85,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 23.174 0 L 33.675 0 L 56.85 64.273 L 48.34 64.273 L 41.913 45.987 L 14.937 45.987 L 8.509 64.273 L 0 64.273 Z M 17.562 38.383 L 39.288 38.383 L 28.425 6.789 L 17.562 38.383 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.098,
    height: 64.273,
    viewBox: "0 0 41.098 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 123.473,
      top: 1.449,
      width: 41.098,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 40.374 0 L 40.374 7.604 L 7.785 7.604 L 7.785 28.334 L 39.288 28.334 L 39.288 35.757 L 7.785 35.757 L 7.785 56.669 L 41.098 56.669 L 41.098 64.273 L 0 64.273 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 46.892,
    height: 64.273,
    viewBox: "0 0 46.892 64.273",
    fill: "none",
    style: {
      position: "absolute",
      left: 65.367,
      top: 1.449,
      width: 46.892,
      height: 64.273,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 64.273 L 0 0 L 24.351 0 C 28.878 0 32.77 0.785 36.029 2.354 C 39.288 3.923 41.792 6.186 43.543 9.143 C 45.353 12.04 46.258 15.48 46.258 19.463 C 46.258 22.36 45.564 24.955 44.176 27.248 C 42.849 29.481 41.129 31.261 39.016 32.589 C 36.904 33.917 34.701 34.641 32.408 34.762 L 31.865 33.947 C 35.788 33.947 38.865 34.852 41.098 36.663 C 43.392 38.473 44.719 41.37 45.082 45.353 L 46.892 64.273 L 39.016 64.273 L 37.387 46.168 C 37.146 43.512 36.18 41.551 34.49 40.284 C 32.861 39.016 30.175 38.383 26.433 38.383 L 7.785 38.383 L 7.785 64.273 L 0 64.273 Z M 7.785 30.779 L 25.347 30.779 C 29.27 30.779 32.378 29.783 34.671 27.791 C 36.964 25.8 38.111 22.963 38.111 19.282 C 38.111 15.54 36.934 12.674 34.581 10.682 C 32.227 8.63 28.817 7.604 24.351 7.604 L 7.785 7.604 L 7.785 30.779 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 55.945,
    height: 67.170,
    viewBox: "0 0 55.945 67.170",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.001,
      top: 0,
      width: 55.945,
      height: 67.17,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 28.878 67.17 C 23.144 67.17 18.105 65.842 13.76 63.187 C 9.415 60.471 6.035 56.608 3.621 51.599 C 1.207 46.59 0 40.616 0 33.675 C 0 26.735 1.207 20.76 3.621 15.751 C 6.035 10.682 9.415 6.789 13.76 4.074 C 18.105 1.358 23.144 0 28.878 0 C 36.663 0 42.698 1.961 46.983 5.884 C 51.267 9.807 54.074 15.148 55.401 21.907 L 47.164 22.45 C 46.258 17.864 44.327 14.243 41.37 11.587 C 38.413 8.932 34.249 7.604 28.878 7.604 C 24.774 7.604 21.153 8.66 18.015 10.772 C 14.937 12.824 12.523 15.812 10.772 19.734 C 9.022 23.597 8.147 28.244 8.147 33.675 C 8.147 39.107 9.022 43.754 10.772 47.616 C 12.523 51.479 14.937 54.436 18.015 56.488 C 21.153 58.54 24.774 59.566 28.878 59.566 C 34.49 59.566 38.835 58.117 41.913 55.22 C 44.991 52.263 46.922 48.28 47.707 43.271 L 55.945 43.814 C 55.16 48.461 53.621 52.535 51.328 56.035 C 49.034 59.535 45.987 62.281 42.185 64.273 C 38.443 66.204 34.007 67.17 28.878 67.17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
}
Object.assign(__ds_scope, { Frame47, __ds_default_figma_Frame47_9h2vla: Frame47 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame47.jsx", error: String((e && e.message) || e) }); }

// figma/Frame49.jsx
try { (() => {
// figma node: 147:102 Frame 49
function Frame49(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 488.659,
      height: 84.528,
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 13.702,
    height: 13.485,
    viewBox: "0 0 13.702 13.485",
    fill: "none",
    style: {
      position: "absolute",
      left: 474.956,
      top: 70.459,
      width: 13.702,
      height: 13.485
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6.851 13.485 C 5.039 13.485 3.444 12.832 2.066 11.527 C 0.689 10.222 0 8.664 0 6.851 C 0 4.966 0.689 3.371 2.066 2.066 C 3.444 0.689 5.039 0 6.851 0 C 8.736 0 10.331 0.689 11.636 2.066 C 13.014 3.371 13.702 4.966 13.702 6.851 C 13.702 8.664 13.014 10.222 11.636 11.527 C 10.331 12.832 8.736 13.485 6.851 13.485 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 59.287,
    height: 85.703,
    viewBox: "0 0 59.287 85.703",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,27.102,1.214)",
      transformOrigin: "0 0",
      width: 59.287,
      height: 85.703
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 29.644 0 L 59.287 0 C 59.287 11.833 50.243 21.426 39.086 21.426 L 29.644 21.426 L 29.644 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 42.852 C 0 31.019 9.045 21.426 20.202 21.426 L 29.644 21.426 L 29.644 42.852 L 0 42.852 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 29.644 42.852 L 59.287 42.852 C 59.287 54.685 50.243 64.277 39.086 64.277 L 29.644 64.277 L 29.644 42.852 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 85.703 C 0 73.87 9.045 64.277 20.202 64.277 L 29.644 64.277 L 29.644 85.703 L 0 85.703 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 56.171,
    height: 81.725,
    viewBox: "0 0 56.171 81.725",
    fill: "none",
    style: {
      position: "absolute",
      left: 411.267,
      top: 0.771,
      width: 56.171,
      height: 81.725
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 81.725 L 0 71.595 L 43.74 9.669 L 1.496 9.669 L 1.496 0 L 55.02 0 L 55.02 10.129 L 11.28 72.056 L 56.171 72.056 L 56.171 81.725 L 0 81.725 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 72.286,
    height: 81.725,
    viewBox: "0 0 72.286 81.725",
    fill: "none",
    style: {
      position: "absolute",
      left: 333.203,
      top: 0.962,
      width: 72.286,
      height: 81.725
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 81.725 L 29.467 0 L 42.819 0 L 72.286 81.725 L 61.466 81.725 L 53.294 58.473 L 18.992 58.473 L 10.82 81.725 L 0 81.725 Z M 22.33 48.805 L 49.956 48.805 L 36.143 8.633 L 22.33 48.805 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 69.541,
    height: 84.505,
    viewBox: "0 0 69.541 84.505",
    fill: "none",
    style: {
      position: "absolute",
      left: 257.884,
      top: 0,
      width: 69.541,
      height: 84.505
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 36.437 84.505 C 28.774 84.505 22.222 82.683 16.782 79.038 C 11.341 75.394 7.165 70.421 4.253 64.119 C 1.418 57.741 0 50.49 0 42.366 C 0 34.242 1.456 26.991 4.368 20.614 C 7.28 14.236 11.456 9.225 16.897 5.581 C 22.414 1.86 29.004 0 36.667 0 C 43.18 0 48.659 1.177 53.104 3.531 C 57.625 5.884 61.188 9.073 63.793 13.097 C 66.475 17.121 68.315 21.639 69.311 26.65 L 58.966 27.333 C 57.97 22.094 55.747 17.842 52.299 14.578 C 48.851 11.237 43.64 9.567 36.667 9.567 C 30.46 9.567 25.402 11.085 21.494 14.122 C 17.663 17.159 14.828 21.183 12.989 26.194 C 11.226 31.129 10.345 36.52 10.345 42.366 C 10.345 48.516 11.264 54.059 13.104 58.994 C 14.943 63.853 17.816 67.725 21.724 70.611 C 25.632 73.496 30.613 74.938 36.667 74.938 C 41.494 74.938 45.671 73.875 49.196 71.75 C 52.721 69.548 55.441 66.625 57.357 62.98 C 59.272 59.336 60.269 55.388 60.345 51.136 L 36.897 51.136 L 36.897 41.797 L 69.541 41.797 L 69.541 82.683 L 62.184 82.683 L 61.495 64.005 L 62.874 65.6 C 61.954 69.244 60.192 72.509 57.586 75.394 C 54.981 78.203 51.839 80.443 48.161 82.113 C 44.56 83.708 40.652 84.505 36.437 84.505 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 61.581,
    height: 83.681,
    viewBox: "0 0 61.581 83.681",
    fill: "none",
    style: {
      position: "absolute",
      left: 190.525,
      top: 0.847,
      width: 61.581,
      height: 83.681
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 30.848 83.681 C 24.556 83.681 19.069 82.454 14.388 79.998 C 9.784 77.542 6.216 74.051 3.683 69.523 C 1.228 64.919 0 59.509 0 53.294 L 0 0 L 9.899 0 L 9.899 53.294 C 9.899 59.893 11.702 64.996 15.309 68.603 C 18.992 72.209 24.172 74.013 30.848 74.013 C 37.448 74.013 42.551 72.209 46.157 68.603 C 49.84 64.996 51.682 59.893 51.682 53.294 L 51.682 0 L 61.581 0 L 61.581 53.294 C 61.581 59.509 60.315 64.919 57.783 69.523 C 55.327 74.051 51.797 77.542 47.193 79.998 C 42.589 82.454 37.141 83.681 30.848 83.681 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 51.337,
    height: 81.725,
    viewBox: "0 0 51.337 81.725",
    fill: "none",
    style: {
      position: "absolute",
      left: 133.41,
      top: 0.962,
      width: 51.337,
      height: 81.725
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 81.725 L 0 0 L 51.337 0 L 51.337 9.669 L 4.95 9.669 L 9.899 4.604 L 9.899 42.128 L 4.95 37.064 L 49.265 37.064 L 49.265 46.502 L 4.95 46.502 L 9.899 41.438 L 9.899 81.725 L 0 81.725 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { Frame49, __ds_default_figma_Frame49_9h2vlc: Frame49 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame49.jsx", error: String((e && e.message) || e) }); }

// figma/Frame54.jsx
try { (() => {
// figma node: 93:56 Frame 54
function Frame54(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 309,
      height: 309,
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      borderRadius: 58.49666213989258,
      backgroundColor: "rgb(0,87,254)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.030,47.935)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.953 55.62 L 76.953 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.953 55.62 L 76.953 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.953 166.861 L 76.953 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.953 166.861 L 76.953 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { Frame54, __ds_default_figma_Frame54_9h2vm4: Frame54 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame54.jsx", error: String((e && e.message) || e) }); }

// figma/Frame58.jsx
try { (() => {
// figma node: 93:57 Frame 58
function Frame58(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 309,
      height: 309,
      position: "relative",
      color: "rgb(0,87,254)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      borderRadius: 58.496665954589844,
      backgroundColor: "rgb(255,255,255)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.029,47.936)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.954 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.954 55.62 L 76.954 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.954 55.62 L 76.954 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.954 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.954 166.861 L 76.954 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.954 166.861 L 76.954 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { Frame58, __ds_default_figma_Frame58_9h2vm8: Frame58 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame58.jsx", error: String((e && e.message) || e) }); }

// figma/Frame59.jsx
try { (() => {
// figma node: 93:58 Frame 59
function Frame59(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 309,
      height: 309,
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      borderRadius: 58.49666213989258,
      backgroundColor: "rgb(0,0,0)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.030,47.936)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.953 55.62 L 76.953 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.953 55.62 L 76.953 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.953 166.861 L 76.953 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.953 166.861 L 76.953 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { Frame59, __ds_default_figma_Frame59_9h2vm9: Frame59 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame59.jsx", error: String((e && e.message) || e) }); }

// figma/Frame60.jsx
try { (() => {
// figma node: 93:59 Frame 60
function Frame60(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 309,
      height: 309,
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0.001,
      width: 309,
      height: 309,
      borderRadius: 58.49666213989258,
      background: "linear-gradient(20.591deg, rgba(0,0,0,0.81) 31.79%, rgba(0,87,254,0.72) 60.88%, rgb(14,96,254) 70.87%, rgb(48,119,255) 81.55%, rgb(115,163,255) 88.89%, rgb(255,255,255) 107.55%)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.030,47.935)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.953 55.62 L 76.953 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.953 55.62 L 76.953 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.953 166.861 L 76.953 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.953 166.861 L 76.953 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { Frame60, __ds_default_figma_Frame60_9h2vmx: Frame60 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame60.jsx", error: String((e && e.message) || e) }); }

// figma/Frame61.jsx
try { (() => {
// figma node: 93:60 Frame 61
function Frame61(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 309,
      height: 309,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      borderRadius: 58.496665954589844,
      backgroundColor: "rgb(255,255,255)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.031,47.930)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.953 55.62 L 76.953 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.953 55.62 L 76.953 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.953 166.861 L 76.953 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.953 166.861 L 76.953 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { Frame61, __ds_default_figma_Frame61_9h2vmy: Frame61 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Frame61.jsx", error: String((e && e.message) || e) }); }

// figma/Group51332.jsx
try { (() => {
// figma node: 140:12 Group 51332
function Group51332(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 1256.123,
      height: 309,
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 42.674,
      top: 47.936,
      width: 224.262,
      height: 211.065,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,70.355,0)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.953 55.62 L 76.953 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.953 55.62 L 76.953 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.953 166.861 L 76.953 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.953 166.861 L 76.953 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 316.936,
      top: 44.785,
      width: 867.123,
      height: 219.43,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 145.818,
    height: 212.153,
    viewBox: "0 0 145.818 212.153",
    fill: "none",
    style: {
      position: "absolute",
      left: 721.305,
      top: 2,
      width: 145.818,
      height: 212.153
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 212.153 L 0 185.858 L 113.547 25.1 L 3.885 25.1 L 3.885 0 L 142.83 0 L 142.83 26.295 L 29.283 187.053 L 145.818 187.053 L 145.818 212.153 L 0 212.153 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 187.651,
    height: 212.153,
    viewBox: "0 0 187.651 212.153",
    fill: "none",
    style: {
      position: "absolute",
      left: 518.654,
      top: 2.496,
      width: 187.651,
      height: 212.153
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 212.153 L 76.495 0 L 111.156 0 L 187.651 212.153 L 159.563 212.153 L 138.348 151.794 L 49.303 151.794 L 28.088 212.153 L 0 212.153 Z M 57.969 126.694 L 129.682 126.694 L 93.826 22.411 L 57.969 126.694 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 180.524,
    height: 219.371,
    viewBox: "0 0 180.524 219.371",
    fill: "none",
    style: {
      position: "absolute",
      left: 323.129,
      top: 0,
      width: 180.524,
      height: 219.371
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 94.589 219.371 C 74.696 219.371 57.688 214.641 43.564 205.18 C 29.441 195.719 18.599 182.809 11.04 166.45 C 3.68 149.894 0 131.071 0 109.981 C 0 88.892 3.78 70.069 11.339 53.512 C 18.898 36.956 29.739 23.948 43.863 14.487 C 58.185 4.829 75.293 0 95.185 0 C 112.094 0 126.317 3.055 137.855 9.165 C 149.591 15.275 158.841 23.553 165.605 34 C 172.567 44.446 177.341 56.173 179.927 69.182 L 153.072 70.956 C 150.486 57.356 144.718 46.318 135.766 37.843 C 126.814 29.171 113.288 24.834 95.185 24.834 C 79.073 24.834 65.944 28.776 55.798 36.66 C 45.852 44.544 38.492 54.991 33.718 67.999 C 29.142 80.811 26.855 94.805 26.855 109.981 C 26.855 125.946 29.242 140.334 34.016 153.146 C 38.79 165.76 46.25 175.812 56.395 183.302 C 66.54 190.792 79.47 194.537 95.185 194.537 C 107.718 194.537 118.559 191.777 127.71 186.258 C 136.86 180.543 143.922 172.954 148.895 163.493 C 153.868 154.033 156.454 143.784 156.653 132.746 L 95.782 132.746 L 95.782 108.503 L 180.524 108.503 L 180.524 214.641 L 161.427 214.641 L 159.637 166.154 L 163.218 170.293 C 160.831 179.754 156.255 188.229 149.492 195.719 C 142.728 203.012 134.572 208.826 125.024 213.162 C 115.675 217.301 105.53 219.371 94.589 219.371 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 159.862,
    height: 217.233,
    viewBox: "0 0 159.862 217.233",
    fill: "none",
    style: {
      position: "absolute",
      left: 148.268,
      top: 2.197,
      width: 159.862,
      height: 217.233
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 80.08 217.233 C 63.746 217.233 49.502 214.046 37.351 207.671 C 25.399 201.297 16.136 192.233 9.562 180.48 C 3.187 168.527 0 154.483 0 138.348 L 0 0 L 25.697 0 L 25.697 138.348 C 25.697 155.479 30.379 168.727 39.741 178.089 C 49.303 187.452 62.75 192.133 80.08 192.133 C 97.212 192.133 110.459 187.452 119.822 178.089 C 129.384 168.727 134.164 155.479 134.164 138.348 L 134.164 0 L 159.862 0 L 159.862 138.348 C 159.862 154.483 156.575 168.527 150.001 180.48 C 143.627 192.233 134.463 201.297 122.511 207.671 C 110.559 214.046 96.415 217.233 80.08 217.233 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 133.268,
    height: 212.153,
    viewBox: "0 0 133.268 212.153",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 2.496,
      width: 133.268,
      height: 212.153
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 212.153 L 0 0 L 133.268 0 L 133.268 25.1 L 12.849 25.1 L 25.697 11.952 L 25.697 109.363 L 12.849 96.216 L 127.89 96.216 L 127.89 120.718 L 12.849 120.718 L 25.697 107.571 L 25.697 212.153 L 0 212.153 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { Group51332, __ds_default_figma_Group51332_1rb696r: Group51332 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Group51332.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOBLACK.jsx
try { (() => {
// figma node: 93:48 LOGO_BLACK
function LOGOBLACK(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 645.861,
      height: 597.325,
      position: "relative",
      color: "rgb(0,0,0)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0.002,
      top: 0,
      width: 645.861,
      height: 597.325,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 223.398,
    height: 157.423,
    viewBox: "0 0 223.398 157.423",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,422.462,-0.000)",
      transformOrigin: "0 0",
      width: 223.398,
      height: 157.423
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.022 0 L 223.398 0 C 223.398 86.935 155.244 157.409 71.171 157.409 L 0.022 157.409 L 0.022 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.022 157.423 L 0 157.409 L 0.022 157.409 L 0.022 157.423 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.376,
    height: 157.409,
    viewBox: "0 0 223.376 157.409",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,149.331,149.331)",
      transformOrigin: "0 0",
      width: 223.376,
      height: 157.409
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 223.354 0 L 223.376 0.014 L 223.376 157.401 L 223.356 157.409 L 0 157.409 C 0 70.474 68.154 0 152.227 0 L 223.354 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.376,
    height: 157.409,
    viewBox: "0 0 223.376 157.409",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,49.777,447.993)",
      transformOrigin: "0 0",
      width: 223.376,
      height: 157.409
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 223.376 157.409 L 0 157.409 C 0 70.474 68.154 0 152.227 0 L 223.367 0 L 223.376 0.01 L 223.376 157.409 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.396,
    height: 157.427,
    viewBox: "0 0 223.396 157.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,322.913,298.655)",
      transformOrigin: "0 0",
      width: 223.396,
      height: 157.427
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0.008 L 0.02 0 L 0.02 0.008 L 0 0.008 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.02 0.008 L 223.396 0.008 C 223.396 86.942 155.242 157.417 71.169 157.417 L 0.02 157.417 L 0.02 0.008 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.02 157.427 L 0.011 157.417 L 0.02 157.417 L 0.02 157.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { LOGOBLACK, __ds_default_figma_LOGOBLACK_15irk4m: LOGOBLACK });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOBLACK.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOBLUE.jsx
try { (() => {
// figma node: 93:47 LOGO_BLUE
function LOGOBLUE(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 645.861,
      height: 597.325,
      position: "relative",
      color: "var(--fugaz-blue)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0.002,
      top: 0,
      width: 645.86,
      height: 597.325,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 223.398,
    height: 157.423,
    viewBox: "0 0 223.398 157.423",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,422.462,-0.000)",
      transformOrigin: "0 0",
      width: 223.398,
      height: 157.423
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.022 0 L 223.398 0 C 223.398 86.935 155.244 157.409 71.171 157.409 L 0.022 157.409 L 0.022 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.022 157.423 L 0 157.409 L 0.022 157.409 L 0.022 157.423 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.376,
    height: 157.409,
    viewBox: "0 0 223.376 157.409",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,149.330,149.331)",
      transformOrigin: "0 0",
      width: 223.376,
      height: 157.409
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 223.354 0 L 223.376 0.014 L 223.376 157.401 L 223.356 157.409 L 0 157.409 C 0 70.474 68.154 0 152.227 0 L 223.354 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.376,
    height: 157.409,
    viewBox: "0 0 223.376 157.409",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,49.777,447.993)",
      transformOrigin: "0 0",
      width: 223.376,
      height: 157.409
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 223.376 157.409 L 0 157.409 C 0 70.474 68.154 0 152.227 0 L 223.367 0 L 223.376 0.01 L 223.376 157.409 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.396,
    height: 157.427,
    viewBox: "0 0 223.396 157.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,322.912,298.655)",
      transformOrigin: "0 0",
      width: 223.396,
      height: 157.427
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0.008 L 0.02 0 L 0.02 0.008 L 0 0.008 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.02 0.008 L 223.396 0.008 C 223.396 86.942 155.242 157.417 71.169 157.417 L 0.02 157.417 L 0.02 0.008 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.02 157.427 L 0.011 157.417 L 0.02 157.417 L 0.02 157.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { LOGOBLUE, __ds_default_figma_LOGOBLUE_c0qjyp: LOGOBLUE });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOBLUE.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOBlueIcon.jsx
try { (() => {
// figma node: 93:61 LOGO_BlueIcon
function LOGOBlueIcon(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 50,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 309,
      overflow: "hidden",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      borderRadius: 58.49666213989258,
      backgroundColor: "rgb(0,87,254)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.030,47.935)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.953 55.62 L 76.953 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.953 55.62 L 76.953 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.953 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.953 166.861 L 76.953 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.953 166.861 L 76.953 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 766.418,
      display: "flex",
      flexDirection: "column",
      gap: 30,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 116.640,
    height: 185.683,
    viewBox: "0 0 116.640 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 116.64,
      height: 185.683,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 0 0 L 116.64 0 L 116.64 21.968 L 11.246 21.968 L 22.491 10.461 L 22.491 95.718 L 11.246 84.211 L 111.933 84.211 L 111.933 105.656 L 11.246 105.656 L 22.491 94.149 L 22.491 185.683 L 0 185.683 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 139.916,
    height: 190.129,
    viewBox: "0 0 139.916 190.129",
    fill: "none",
    style: {
      position: "relative",
      width: 139.916,
      height: 190.129,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 70.089 190.129 C 55.792 190.129 43.326 187.339 32.691 181.76 C 22.23 176.181 14.122 168.248 8.369 157.961 C 2.79 147.5 0 135.208 0 121.086 L 0 0 L 22.491 0 L 22.491 121.086 C 22.491 136.08 26.588 147.674 34.783 155.869 C 43.152 164.063 54.92 168.161 70.089 168.161 C 85.083 168.161 96.677 164.063 104.872 155.869 C 113.24 147.674 117.425 136.08 117.425 121.086 L 117.425 0 L 139.916 0 L 139.916 121.086 C 139.916 135.208 137.039 147.5 131.286 157.961 C 125.706 168.248 117.686 176.181 107.225 181.76 C 96.764 187.339 84.385 190.129 70.089 190.129 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 158,
    height: 192,
    viewBox: "0 0 158 192",
    fill: "none",
    style: {
      position: "relative",
      width: 158,
      height: 192,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 82.787 192 C 65.376 192 50.49 187.86 38.129 179.58 C 25.767 171.299 16.279 160 9.663 145.682 C 3.221 131.191 0 114.717 0 96.259 C 0 77.801 3.308 61.326 9.924 46.836 C 16.54 32.345 26.029 20.96 38.39 12.679 C 50.926 4.226 65.899 0 83.309 0 C 98.108 0 110.556 2.674 120.655 8.022 C 130.927 13.369 139.023 20.615 144.942 29.757 C 151.036 38.9 155.214 49.164 157.478 60.55 L 133.974 62.102 C 131.71 50.199 126.661 40.539 118.826 33.121 C 110.992 25.531 99.153 21.736 83.309 21.736 C 69.207 21.736 57.716 25.186 48.836 32.086 C 40.131 38.987 33.689 48.129 29.511 59.515 C 25.506 70.728 23.504 82.976 23.504 96.259 C 23.504 110.232 25.593 122.825 29.772 134.038 C 33.95 145.078 40.479 153.876 49.359 160.431 C 58.238 166.987 69.555 170.264 83.309 170.264 C 94.278 170.264 103.766 167.849 111.775 163.019 C 119.784 158.016 125.965 151.375 130.317 143.094 C 134.67 134.814 136.933 125.844 137.107 116.183 L 83.831 116.183 L 83.831 94.965 L 158 94.965 L 158 187.86 L 141.286 187.86 L 139.719 145.423 L 142.853 149.046 C 140.764 157.326 136.759 164.744 130.84 171.299 C 124.92 177.682 117.782 182.771 109.425 186.566 C 101.242 190.189 92.363 192 82.787 192 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 164.238,
    height: 185.683,
    viewBox: "0 0 164.238 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 164.238,
      height: 185.683,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 66.95 0 L 97.287 0 L 164.238 185.683 L 139.654 185.683 L 121.086 132.855 L 43.152 132.855 L 24.583 185.683 L 0 185.683 Z M 50.736 110.887 L 113.502 110.887 L 82.119 19.614 L 50.736 110.887 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 127.624,
    height: 185.683,
    viewBox: "0 0 127.624 185.683",
    fill: "none",
    style: {
      position: "relative",
      width: 127.624,
      height: 185.683,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 185.683 L 0 162.669 L 99.38 21.968 L 3.4 21.968 L 3.4 0 L 125.009 0 L 125.009 23.014 L 25.629 163.715 L 127.624 163.715 L 127.624 185.683 L 0 185.683 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 554,
      height: 49.604,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 39.309,
    height: 47.465,
    viewBox: "0 0 39.309 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 514.691,
      top: 1.07,
      width: 39.309,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16.78 47.465 L 16.78 28.078 L 0 0 L 6.819 0 L 19.655 22.195 L 32.49 0 L 39.309 0 L 22.529 28.078 L 22.529 47.465 L 16.78 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.315,
    height: 49.604,
    viewBox: "0 0 41.315 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 474.406,
      top: 0,
      width: 41.315,
      height: 49.604
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.326 49.604 C 17.092 49.604 13.371 48.624 10.162 46.663 C 6.953 44.657 4.457 41.805 2.674 38.106 C 0.891 34.407 0 29.994 0 24.869 C 0 19.744 0.891 15.331 2.674 11.632 C 4.457 7.889 6.953 5.014 10.162 3.008 C 13.371 1.003 17.092 0 21.326 0 C 27.075 0 31.532 1.448 34.696 4.345 C 37.861 7.242 39.933 11.187 40.914 16.178 L 34.83 16.579 C 34.162 13.192 32.735 10.518 30.552 8.557 C 28.368 6.596 25.293 5.616 21.326 5.616 C 18.295 5.616 15.621 6.396 13.304 7.955 C 11.031 9.471 9.248 11.677 7.955 14.574 C 6.663 17.426 6.017 20.858 6.017 24.869 C 6.017 28.88 6.663 32.312 7.955 35.164 C 9.248 38.017 11.031 40.201 13.304 41.716 C 15.621 43.231 18.295 43.989 21.326 43.989 C 25.471 43.989 28.68 42.919 30.953 40.78 C 33.226 38.596 34.652 35.655 35.231 31.955 L 41.315 32.357 C 40.735 35.788 39.599 38.797 37.905 41.382 C 36.212 43.967 33.961 45.994 31.153 47.465 C 28.39 48.891 25.114 49.604 21.326 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 37.370,
    height: 47.465,
    viewBox: "0 0 37.370 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 430.785,
      top: 1.07,
      width: 37.37,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 8.156 0 L 31.621 41.716 L 31.621 0 L 37.37 0 L 37.37 47.465 L 28.813 47.465 L 5.749 6.552 L 5.749 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 393.163,
      top: 1.07,
      width: 30.351,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40.446,
    height: 49.604,
    viewBox: "0 0 40.446 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 345.216,
      top: 0,
      width: 40.446,
      height: 49.604
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.192 49.604 C 16.735 49.604 12.925 48.535 9.76 46.396 C 6.596 44.256 4.167 41.337 2.474 37.638 C 0.824 33.894 0 29.638 0 24.869 C 0 20.1 0.847 15.844 2.54 12.1 C 4.234 8.357 6.663 5.415 9.827 3.276 C 13.036 1.092 16.869 0 21.326 0 C 25.114 0 28.301 0.691 30.886 2.072 C 33.515 3.454 35.588 5.326 37.103 7.688 C 38.663 10.05 39.733 12.702 40.312 15.643 L 34.295 16.045 C 33.716 12.969 32.423 10.474 30.418 8.557 C 28.412 6.596 25.382 5.616 21.326 5.616 C 17.716 5.616 14.774 6.507 12.501 8.29 C 10.273 10.072 8.624 12.435 7.554 15.376 C 6.529 18.273 6.017 21.437 6.017 24.869 C 6.017 28.479 6.552 31.733 7.621 34.63 C 8.691 37.482 10.362 39.755 12.635 41.448 C 14.908 43.142 17.805 43.989 21.326 43.989 C 24.134 43.989 26.563 43.365 28.613 42.117 C 30.663 40.824 32.245 39.109 33.359 36.969 C 34.474 34.83 35.053 32.513 35.097 30.017 L 21.46 30.017 L 21.46 24.535 L 40.446 24.535 L 40.446 48.535 L 36.167 48.535 L 35.766 37.571 L 36.568 38.507 C 36.033 40.646 35.008 42.563 33.493 44.256 C 31.978 45.905 30.15 47.22 28.011 48.201 C 25.916 49.136 23.643 49.604 21.192 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.983,
    height: 47.465,
    viewBox: "0 0 41.983 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 302.919,
      top: 1.07,
      width: 41.983,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 17.114 0 L 24.869 0 L 41.983 47.465 L 35.699 47.465 L 30.953 33.961 L 11.031 33.961 L 6.284 47.465 L 0 47.465 Z M 12.969 28.345 L 29.014 28.345 L 20.992 5.014 L 12.969 28.345 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 254.749,
      top: 1.07,
      width: 30.351,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.916,
    height: 47.465,
    viewBox: "0 0 41.916 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 208.853,
      top: 1.07,
      width: 41.916,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.181 47.465 L 0 0 L 6.284 0 L 20.992 41.181 L 35.632 0 L 41.916 0 L 24.735 47.465 L 17.181 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.749,
    height: 47.465,
    viewBox: "0 0 5.749 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 198.959,
      top: 1.07,
      width: 5.749,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 5.749 0 L 5.749 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 35.298,
    height: 47.465,
    viewBox: "0 0 35.298 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 160.754,
      top: 1.07,
      width: 35.298,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.774 47.465 L 14.774 5.616 L 0 5.616 L 0 0 L 35.298 0 L 35.298 5.616 L 20.524 5.616 L 20.524 47.465 L 14.774 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.983,
    height: 47.465,
    viewBox: "0 0 41.983 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 124.646,
      top: 1.07,
      width: 41.983,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 17.114 0 L 24.869 0 L 41.983 47.465 L 35.699 47.465 L 30.953 33.961 L 11.031 33.961 L 6.284 47.465 L 0 47.465 Z M 12.969 28.345 L 29.014 28.345 L 20.992 5.014 L 12.969 28.345 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 30.351,
    height: 47.465,
    viewBox: "0 0 30.351 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 91.183,
      top: 1.07,
      width: 30.351,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 29.816 0 L 29.816 5.616 L 5.749 5.616 L 5.749 20.925 L 29.014 20.925 L 29.014 26.407 L 5.749 26.407 L 5.749 41.85 L 30.351 41.85 L 30.351 47.465 L 0 47.465 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34.630,
    height: 47.465,
    viewBox: "0 0 34.630 47.465",
    fill: "none",
    style: {
      position: "absolute",
      left: 48.272,
      top: 1.07,
      width: 34.63,
      height: 47.465
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 47.465 L 0 0 L 17.983 0 C 21.326 0 24.201 0.579 26.607 1.738 C 29.014 2.897 30.863 4.568 32.156 6.752 C 33.493 8.891 34.162 11.432 34.162 14.373 C 34.162 16.513 33.649 18.429 32.624 20.123 C 31.643 21.772 30.373 23.086 28.813 24.067 C 27.253 25.047 25.627 25.582 23.933 25.671 L 23.532 25.07 C 26.429 25.07 28.702 25.738 30.351 27.075 C 32.045 28.412 33.025 30.552 33.292 33.493 L 34.63 47.465 L 28.813 47.465 L 27.61 34.095 C 27.432 32.134 26.719 30.685 25.471 29.749 C 24.267 28.813 22.284 28.345 19.521 28.345 L 5.749 28.345 L 5.749 47.465 L 0 47.465 Z M 5.749 22.73 L 18.719 22.73 C 21.616 22.73 23.911 21.994 25.604 20.524 C 27.298 19.053 28.145 16.958 28.145 14.24 C 28.145 11.476 27.276 9.359 25.538 7.889 C 23.799 6.373 21.281 5.616 17.983 5.616 L 5.749 5.616 L 5.749 22.73 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 41.315,
    height: 49.604,
    viewBox: "0 0 41.315 49.604",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 41.315,
      height: 49.604
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.326 49.604 C 17.092 49.604 13.37 48.624 10.162 46.663 C 6.953 44.657 4.457 41.805 2.674 38.106 C 0.891 34.407 0 29.994 0 24.869 C 0 19.744 0.891 15.331 2.674 11.632 C 4.457 7.889 6.953 5.014 10.162 3.008 C 13.37 1.003 17.092 0 21.326 0 C 27.075 0 31.532 1.448 34.696 4.345 C 37.861 7.242 39.933 11.187 40.914 16.178 L 34.83 16.579 C 34.162 13.192 32.735 10.518 30.552 8.557 C 28.368 6.596 25.292 5.616 21.326 5.616 C 18.295 5.616 15.621 6.396 13.304 7.955 C 11.031 9.471 9.248 11.677 7.955 14.574 C 6.663 17.426 6.017 20.858 6.017 24.869 C 6.017 28.88 6.663 32.312 7.955 35.164 C 9.248 38.017 11.031 40.201 13.304 41.716 C 15.621 43.231 18.295 43.989 21.326 43.989 C 25.471 43.989 28.68 42.919 30.953 40.78 C 33.226 38.596 34.652 35.655 35.231 31.955 L 41.315 32.357 C 40.735 35.788 39.599 38.797 37.905 41.382 C 36.212 43.967 33.961 45.994 31.153 47.465 C 28.39 48.891 25.114 49.604 21.326 49.604 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })))));
}
Object.assign(__ds_scope, { LOGOBlueIcon, __ds_default_figma_LOGOBlueIcon_axa7zu: LOGOBlueIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOBlueIcon.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOGRADIANT.jsx
try { (() => {
// figma node: 93:49 LOGO_GRADIANT
function LOGOGRADIANT(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 634.328,
      height: 597,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 634.328,
      height: 597,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 435.328,
    height: 629.293,
    viewBox: "0 0 435.328 629.293",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,199.000,0)",
      transformOrigin: "0 0",
      width: 435.328,
      height: 629.293
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 217.664 0 L 435.328 0 C 435.328 86.887 368.917 157.323 286.994 157.323 L 217.664 157.323 L 217.664 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 314.647 C 0 227.759 66.411 157.323 148.334 157.323 L 217.664 157.323 L 217.664 314.647 L 0 314.647 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 217.664 314.647 L 435.328 314.647 C 435.328 401.534 368.917 471.97 286.994 471.97 L 217.664 471.97 L 217.664 314.647 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 629.293 C 0 542.406 66.411 471.97 148.334 471.97 L 217.664 471.97 L 217.664 629.293 L 0 629.293 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { LOGOGRADIANT, __ds_default_figma_LOGOGRADIANT_x6reyb: LOGOGRADIANT });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOGRADIANT.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOHORIZONTAL.jsx
try { (() => {
// figma node: 282:105 LOGO HORIZONTAL
function LOGOHORIZONTAL(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 4096,
      height: 1024,
      overflow: "hidden",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 404.264,
      top: 206.8,
      width: 3287.736,
      height: 609.462
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0.454,
      top: 23.285,
      width: 3287.282,
      height: 562.974,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 616.791,
      top: 102.306,
      width: 2670.492,
      height: 358.345,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 2540.336,
    height: 358.345,
    viewBox: "0 0 2540.336 358.345",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 2540.336,
      height: 358.345
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 139.392 353.446 L 249.351 353.446 L 388.773 7.37 L 262.127 7.37 L 195.371 200.292 L 128.612 7.374 L 0 7.374 L 139.392 353.446 Z M 350.966 350.992 L 646.481 350.992 L 646.481 256.743 L 463.873 256.743 L 463.873 219.42 L 631.754 219.42 L 631.754 136.475 L 463.873 136.475 L 463.873 101.624 L 644.049 101.624 L 644.049 7.374 L 350.988 7.374 L 350.966 350.992 Z M 713.241 350.992 L 828.108 350.992 L 828.159 101.619 L 929.23 101.619 L 929.23 7.37 L 612.115 7.37 L 612.115 101.619 L 712.658 101.619 L 713.241 350.992 Z M 1043.607 357.375 C 1135.896 357.375 1195.29 313.189 1195.29 241.037 L 1195.29 240.055 C 1195.29 170.841 1136.385 145.312 1048.515 129.114 C 1012.188 122.25 1002.862 116.351 1002.862 107.025 L 1002.862 106.042 C 1002.862 97.698 1010.716 91.808 1027.897 91.808 C 1064.926 92.246 1100.92 104.079 1130.984 125.699 L 1186.942 48.116 C 1147.183 16.701 1098.093 0.995 1031.823 0.995 C 937.097 0.995 886.047 51.552 886.047 116.823 L 886.047 117.805 C 886.047 190.455 953.789 212.548 1030.858 228.253 C 1067.674 235.615 1078.476 241.016 1078.476 250.836 L 1078.476 251.818 C 1078.476 261.144 1069.638 266.545 1049.021 266.545 C 1005.59 266.759 963.306 252.607 928.753 226.293 L 867.408 299.436 C 911.066 337.753 973.905 357.375 1043.607 357.375 Z M 1348.929 358.345 C 1454.958 358.345 1536.939 278.823 1536.939 179.173 L 1536.939 178.19 C 1536.939 78.54 1455.941 0 1349.898 0 C 1243.856 0 1161.889 79.531 1161.889 179.181 L 1161.889 180.163 C 1161.889 279.814 1242.904 358.345 1348.929 358.345 Z M 1349.911 256.73 C 1305.725 256.73 1277.751 219.914 1277.751 179.168 L 1277.751 178.186 C 1277.751 137.934 1305.24 101.607 1348.929 101.607 C 1393.115 101.607 1421.09 138.423 1421.09 179.168 L 1421.09 180.151 C 1421.098 220.416 1393.608 256.743 1349.92 256.743 L 1349.911 256.73 Z M 1686.669 358.345 C 1772.082 358.345 1820.189 316.63 1849.133 265.58 L 1754.407 212.059 C 1740.173 237.584 1722.01 255.258 1689.63 255.258 C 1651.831 255.258 1625.324 223.843 1625.324 179.173 L 1625.324 178.19 C 1625.324 136.955 1650.849 103.082 1689.63 103.082 C 1721.045 103.082 1739.208 120.242 1751.971 144.806 L 1846.696 89.367 C 1817.735 36.825 1766.681 0.009 1691.084 0.009 C 1588.491 0.009 1508.475 76.588 1508.475 179.181 L 1508.475 180.163 C 1508.475 286.703 1591.433 358.345 1686.665 358.345 L 1686.669 358.345 Z M 1820.189 350.984 L 1935.055 350.984 L 1935.055 7.361 L 1820.189 7.361 L 1820.189 350.984 Z M 1898.24 350.984 L 2020.961 350.984 L 2038.631 304.85 L 2158.899 304.85 L 2177.062 350.992 L 2301.748 350.992 L 2156.938 4.916 L 2043.037 4.916 L 1898.24 350.984 Z M 2067.597 223.354 L 2099.012 139.903 L 2130.427 223.354 L 2067.597 223.354 Z M 2263.967 350.992 L 2540.336 350.992 L 2540.336 252.813 L 2378.817 252.813 L 2378.817 7.37 L 2263.967 7.37 L 2263.967 350.992 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 99.685,
    height: 98.827,
    viewBox: "0 0 99.685 98.827",
    fill: "none",
    style: {
      position: "absolute",
      left: 2570.807,
      top: 251.599,
      width: 99.685,
      height: 98.827
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 98.827 L 99.685 98.827 L 99.685 0 L 0 0 L 0 98.827 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 530.139,
      height: 562.974,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 358.778,
    height: 358.774,
    viewBox: "0 0 358.778 358.774",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,1,-1,0,389.309,0)",
      transformOrigin: "0 0",
      width: 358.778,
      height: 358.774
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 204.2 358.774 C 203.638 304.792 181.944 253.18 143.769 215.008 C 105.595 176.837 53.982 155.145 0 154.587 L 0 0 L 35.538 0 C 118.332 8.609 195.646 45.435 254.503 104.298 C 313.36 163.162 350.178 240.479 358.778 323.275 L 358.778 358.774 L 204.2 358.774 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 358.778,
    height: 358.778,
    viewBox: "0 0 358.778 358.778",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,140.828,562.974)",
      transformOrigin: "0 0",
      width: 358.778,
      height: 358.778
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 204.2 358.778 C 203.639 304.796 181.945 253.183 143.771 215.01 C 105.597 176.837 53.983 155.145 0 154.587 L 0 0 L 35.538 0 C 118.332 8.609 195.646 45.435 254.503 104.298 C 313.36 163.162 350.178 240.479 358.778 323.275 L 358.778 358.774 L 204.2 358.778 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 156.487,
      height: 530.139,
      border: "1px dashed currentColor",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      fontSize: 10,
      opacity: 0.45
    }
  }, "Rectangle 41606")))));
}
Object.assign(__ds_scope, { LOGOHORIZONTAL, __ds_default_figma_LOGOHORIZONTAL_1lyyiyb: LOGOHORIZONTAL });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOHORIZONTAL.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOMARK.jsx
try { (() => {
// figma node: 282:79 LOGO MARK
function LOGOMARK(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 1024,
      height: 1024,
      overflow: "hidden",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 178,
      top: 253,
      width: 667.092,
      height: 517.721
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 91,
      top: 0,
      width: 486.868,
      height: 517.021,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 329.494,
    height: 329.492,
    viewBox: "0 0 329.494 329.492",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,1,-1,0,357.532,0)",
      transformOrigin: "0 0",
      width: 329.494,
      height: 329.492
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 187.524 329.492 C 187.007 279.918 167.084 232.52 132.028 197.464 C 96.972 162.408 49.574 142.486 0 141.969 L 0 0 L 32.635 0 C 108.672 7.906 179.675 41.726 233.729 95.784 C 287.782 149.843 321.596 220.85 329.494 296.888 L 329.494 329.489 L 187.524 329.492 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 329.492,
    height: 329.492,
    viewBox: "0 0 329.492 329.492",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,129.335,517.021)",
      transformOrigin: "0 0",
      width: 329.492,
      height: 329.492
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 187.522 329.492 C 187.004 279.918 167.081 232.522 132.026 197.466 C 96.97 162.411 49.573 142.489 0 141.972 L 0 0 L 32.635 0 C 108.672 7.906 179.675 41.727 233.728 95.786 C 287.781 149.845 321.594 220.852 329.492 296.89 L 329.492 329.492 L 187.522 329.492 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 143.714,
      height: 486.868,
      border: "1px dashed currentColor",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      fontSize: 10,
      opacity: 0.45
    }
  }, "Rectangle 41606"))));
}
Object.assign(__ds_scope, { LOGOMARK, __ds_default_figma_LOGOMARK_c0yro4: LOGOMARK });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOMARK.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOMARKUNICOLOR.jsx
try { (() => {
// figma node: 282:162 LOGO MARK - UNICOLOR
function LOGOMARKUNICOLOR(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 1024,
      height: 1024,
      overflow: "hidden",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 178,
      top: 253,
      width: 667.092,
      height: 517.721
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 90.203,
      top: 0.979,
      width: 486.868,
      height: 517.021,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 329.494,
    height: 329.492,
    viewBox: "0 0 329.494 329.492",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,1,-1,0,357.532,0)",
      transformOrigin: "0 0",
      width: 329.494,
      height: 329.492
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 187.524 329.492 C 187.007 279.918 167.084 232.52 132.028 197.464 C 96.972 162.408 49.574 142.486 0 141.969 L 0 0 L 32.635 0 C 108.672 7.906 179.675 41.726 233.729 95.784 C 287.782 149.843 321.596 220.85 329.494 296.888 L 329.494 329.489 L 187.524 329.492 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 329.492,
    height: 329.492,
    viewBox: "0 0 329.492 329.492",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,129.335,517.021)",
      transformOrigin: "0 0",
      width: 329.492,
      height: 329.492
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 187.522 329.492 C 187.004 279.918 167.081 232.522 132.026 197.466 C 96.97 162.411 49.573 142.489 0 141.972 L 0 0 L 32.635 0 C 108.672 7.906 179.675 41.727 233.728 95.786 C 287.781 149.845 321.594 220.852 329.492 296.89 L 329.492 329.492 L 187.522 329.492 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 143.714,
      height: 486.868,
      border: "1px dashed currentColor",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      fontSize: 10,
      opacity: 0.45
    }
  }, "Rectangle 41606"))));
}
Object.assign(__ds_scope, { LOGOMARKUNICOLOR, __ds_default_figma_LOGOMARKUNICOLOR_r741vj: LOGOMARKUNICOLOR });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOMARKUNICOLOR.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOVERTICAL.jsx
try { (() => {
// figma node: 282:131 LOGO VERTICAL
function LOGOVERTICAL(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 4096,
      height: 2048,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 740,
      top: 278,
      width: 2616,
      height: 1492,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -0.001,
      top: 0,
      width: 2616,
      height: 1492,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 2616,
      height: 1492,
      clipPath: "inset(0px 0px 0px 0px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 143.214,
      top: 0,
      width: 2328.407,
      height: 1492,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 667.525,
    height: 441.841,
    viewBox: "0 0 667.525 441.841",
    fill: "none",
    style: {
      position: "absolute",
      left: 1616.114,
      top: 847.962,
      width: 667.525,
      height: 441.841,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 666.66 0 C 667.25 8.83 667.538 17.856 667.525 27.077 C 667.164 220.696 531.453 367.088 337.054 394.439 L 136.262 422.676 L 0 441.841 C 11.065 413.529 52.077 308.801 90.877 212.749 C 126.752 123.942 160.795 110.391 173.472 108.607 C 175.195 108.304 176.953 108.265 178.688 108.489 L 310.53 79.175 L 310.242 228.74 L 343.72 224.035 C 433.76 211.37 492.019 148.124 492.201 51.72 C 492.201 47.329 492.09 43.038 491.869 38.847 L 666.66 0 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 506.984,
    height: 283.343,
    viewBox: "0 0 506.984 283.343",
    fill: "none",
    style: {
      position: "absolute",
      left: 1775.377,
      top: 595.431,
      width: 506.984,
      height: 283.343,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 64.844 283.238 C -13.171 280.721 0.669 229.78 1.385 227.102 L 37.153 24.105 L 178.97 4.161 C 362.227 -21.612 492.904 73.918 506.984 247.156 C 464.743 251.486 398.387 258.15 329.297 264.584 C 315.304 194.489 261.799 161.983 185.01 172.778 L 151.533 177.488 L 151.348 279.561 C 112.407 282.263 81.254 283.766 64.812 283.238 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 48.333,
    height: 69.246,
    viewBox: "0 0 48.333 69.246",
    fill: "none",
    style: {
      position: "absolute",
      left: 2161.232,
      top: 532.074,
      width: 48.333,
      height: 69.246,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 48.333 0 L 48.333 7.323 L 28.188 10.154 L 28.078 68.118 L 20.042 69.246 L 20.146 11.288 L 0 14.123 L 0 6.8 L 48.333 0 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 60.298,
    height: 73.746,
    viewBox: "0 0 60.298 73.746",
    fill: "none",
    style: {
      position: "absolute",
      left: 2216.3,
      top: 522.648,
      width: 60.298,
      height: 73.746,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 60.298 0 L 60.18 65.28 L 52.562 66.351 L 52.663 12.056 L 52.472 12.079 L 33.515 69.03 L 26.659 69.997 L 7.869 18.351 L 7.618 72.675 L 0 73.746 L 0.124 8.466 L 11.131 6.916 L 30.068 59.069 L 49.291 1.547 L 60.298 0 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 2328.407,
      height: 1492,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 2328.407,
      height: 1492,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 2328.407,
      height: 1492,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 2328.4072265625,
      height: 1492,
      clipPath: "inset(0px 0px 0px 0px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 1799.163,
      height: 1492.004,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 226.937,
    height: 295.345,
    viewBox: "0 0 226.937 295.345",
    fill: "none",
    style: {
      position: "absolute",
      left: 1572.226,
      top: 621.427,
      width: 226.937,
      height: 295.345,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 30.031 291.763 C 25.539 292.482 20.989 292.772 16.442 292.629 L 0 295.345 L 0.485 31.848 L 189.666 5.242 L 226.937 0 C 207.42 46.993 178.067 117.448 149.964 184.079 C 113.67 270.092 56.081 288.098 30.039 291.76 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 165.502,
    height: 338.839,
    viewBox: "0 0 165.502 338.839",
    fill: "none",
    style: {
      position: "absolute",
      left: 1190.623,
      top: 1010.795,
      width: 165.502,
      height: 338.839,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 338.839 L 0.594 19.364 C 60.592 12.437 116.515 5.868 165.502 0 L 164.925 315.645 L 0 338.839 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 333.064,
    height: 296.041,
    viewBox: "0 0 333.064 296.041",
    fill: "none",
    style: {
      position: "absolute",
      left: 1191.308,
      top: 683.521,
      width: 333.064,
      height: 296.041,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 166.226 0 L 333.064 241.108 L 0 296.041 L 0.508 23.304 L 166.226 0 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 174.214,
    height: 301.764,
    viewBox: "0 0 174.214 301.764",
    fill: "none",
    style: {
      position: "absolute",
      left: 1001.648,
      top: 709.071,
      width: 174.214,
      height: 301.764,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 301.764 L 0.534 24.427 L 174.214 0 L 173.694 273.12 L 0 301.764 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 414.489,
    height: 704.302,
    viewBox: "0 0 414.489 704.302",
    fill: "none",
    style: {
      position: "absolute",
      left: 1029.04,
      top: 0,
      width: 414.489,
      height: 704.302,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 414.174 167.826 L 175.483 201.395 L 175.336 279.222 L 389.996 249.034 L 389.708 401.277 L 175.047 431.465 L 174.9 511.922 L 413.592 478.351 L 413.277 646.183 L 0 704.302 L 1.197 58.119 L 414.489 0 L 414.174 167.826 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 464.671,
    height: 322.649,
    viewBox: "0 0 464.671 322.649",
    fill: "none",
    style: {
      position: "absolute",
      left: 535.496,
      top: 765.052,
      width: 464.671,
      height: 322.649,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 173.937 179.085 L 173.723 294.002 L 0 322.649 L 0.534 33.997 L 212.494 4.19 C 361.488 -16.762 464.956 40.079 464.671 192.4 C 464.59 210.828 462.385 229.185 458.1 247.108 L 272.123 277.775 C 283.513 264.484 289.636 247.474 289.329 229.968 C 289.416 184.347 255.214 167.652 210.582 173.927 L 173.937 179.085 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1175.256,
    height: 682.979,
    viewBox: "0 0 1175.256 682.979",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 809.026,
      width: 1175.256,
      height: 682.979,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1001.031 524.119 L 1001.568 242.847 C 1061.378 236.062 1119.923 229.368 1175.256 222.978 L 1174.679 542.848 L 1000.962 567.278 L 825.684 591.927 L 712.899 409.081 L 708.944 409.638 L 708.572 608.4 L 534.835 632.841 L 534.938 577.38 C 477.421 628.492 406.866 667.206 318.086 679.69 C 146.765 703.77 -0.383 594.557 0.001 387.156 C 0.384 179.755 149.664 27.991 319.341 4.138 C 399.02 -7.067 461.94 5.581 510.481 28.868 L 510.149 209.614 C 459.231 172.894 394.739 167.326 344.537 174.383 C 237.74 189.392 175.44 274.739 175.27 366.796 C 175.094 460.628 236.327 522.546 321.602 510.535 C 343.241 507.359 363.919 499.468 382.177 487.419 L 382.491 318.724 L 498.083 299.203 C 636.303 283.906 811.567 264.385 979.337 245.37 C 961.32 285.929 929.53 326.964 876.284 358.552 L 1001.031 524.119 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 1015.874,
    height: 765.796,
    viewBox: "0 0 1015.874 765.796",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.546,
      top: 59.918,
      width: 1015.874,
      height: 765.796,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 840.818 265.896 L 841.28 24.554 L 1015.874 0 L 1014.677 646.183 L 840.083 670.737 L 840.516 436.311 L 653.091 462.669 L 652.658 697.095 L 478.064 721.649 L 478.949 245.882 L 339.589 265.483 L 338.704 741.245 L 164.109 765.796 L 164.995 290.034 L 0 313.238 L 0.314 142.816 L 504.079 71.974 L 653.838 50.904 L 653.391 292.239 L 840.818 265.896 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  }))))))), /*#__PURE__*/React.createElement("svg", {
    width: 281.632,
    height: 313.914,
    viewBox: "0 0 281.632 313.914",
    fill: "none",
    style: {
      position: "absolute",
      left: 1375.445,
      top: 982.282,
      width: 281.632,
      height: 313.914,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 196.629 0.766 C 292.003 -6.617 281.59 41.752 281.045 44.286 L 238.931 307.763 L 195.222 313.914 L 0 26.197 C 62.438 18.676 112.194 12.409 142.931 8.089 C 152.658 6.718 160.509 5.543 166.235 4.582 C 169.821 3.981 173.285 3.45 176.657 2.974 C 181.216 2.337 185.583 1.806 189.755 1.381 L 195.813 10.129 L 196.629 0.766 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })))))));
}
Object.assign(__ds_scope, { LOGOVERTICAL, __ds_default_figma_LOGOVERTICAL_13tup2b: LOGOVERTICAL });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOVERTICAL.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOWHITE.jsx
try { (() => {
// figma node: 93:46 LOGO_WHITE
function LOGOWHITE(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 645.861,
      height: 597.325,
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0.001,
      top: 0,
      width: 645.861,
      height: 597.325,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 223.398,
    height: 157.423,
    viewBox: "0 0 223.398 157.423",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,422.463,-0.000)",
      transformOrigin: "0 0",
      width: 223.398,
      height: 157.423
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.022 0 L 223.398 0 C 223.398 86.935 155.244 157.409 71.171 157.409 L 0.022 157.409 L 0.022 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.022 157.423 L 0 157.409 L 0.022 157.409 L 0.022 157.423 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.376,
    height: 157.409,
    viewBox: "0 0 223.376 157.409",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,149.332,149.331)",
      transformOrigin: "0 0",
      width: 223.376,
      height: 157.409
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 223.354 0 L 223.376 0.014 L 223.376 157.401 L 223.356 157.409 L 0 157.409 C 0 70.474 68.154 0 152.227 0 L 223.354 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.376,
    height: 157.409,
    viewBox: "0 0 223.376 157.409",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,49.778,447.993)",
      transformOrigin: "0 0",
      width: 223.376,
      height: 157.409
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 223.376 157.409 L 0 157.409 C 0 70.474 68.154 0 152.227 0 L 223.367 0 L 223.376 0.01 L 223.376 157.409 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 223.396,
    height: 157.427,
    viewBox: "0 0 223.396 157.427",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,322.913,298.655)",
      transformOrigin: "0 0",
      width: 223.396,
      height: 157.427
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0.008 L 0.02 0 L 0.02 0.008 L 0 0.008 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.02 0.008 L 223.396 0.008 C 223.396 86.942 155.242 157.417 71.169 157.417 L 0.02 157.417 L 0.02 0.008 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0.02 157.427 L 0.011 157.417 L 0.02 157.417 L 0.02 157.427 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
Object.assign(__ds_scope, { LOGOWHITE, __ds_default_figma_LOGOWHITE_15xigoa: LOGOWHITE });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOWHITE.jsx", error: String((e && e.message) || e) }); }

// figma/LOGOWhiteBlueIcon.jsx
try { (() => {
// figma node: 93:62 LOGO_White_blue-Icon
function LOGOWhiteBlueIcon(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 50.000003814697266,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 309,
      overflow: "hidden",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 309,
      height: 309,
      borderRadius: 58.496665954589844,
      backgroundColor: "rgb(255,255,255)"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 153.907,
    height: 222.482,
    viewBox: "0 0 153.907 222.482",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(1,0,-0.316,0.949,113.029,47.936)",
      transformOrigin: "0 0",
      width: 153.907,
      height: 222.482,
      color: "rgb(0,87,254)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 76.954 0 L 153.907 0 C 153.907 30.718 130.428 55.62 101.465 55.62 L 76.954 55.62 L 76.954 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 111.241 C 0 80.523 23.479 55.62 52.442 55.62 L 76.954 55.62 L 76.954 111.241 L 0 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 76.954 111.241 L 153.907 111.241 C 153.907 141.959 130.428 166.861 101.465 166.861 L 76.954 166.861 L 76.954 111.241 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 222.482 C 0 191.763 23.479 166.861 52.442 166.861 L 76.954 166.861 L 76.954 222.482 L 0 222.482 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 766.418,
      display: "flex",
      flexDirection: "column",
      gap: 29.999998092651367,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 769.653,
      height: 180.658,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 134.487,
    height: 172.804,
    viewBox: "0 0 134.487 172.804",
    fill: "none",
    style: {
      position: "absolute",
      left: 635.166,
      top: 4.098,
      width: 134.487,
      height: 172.804,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 134.487 172.804 L 0 172.804 L 0 149.513 L 101.929 23.291 L 3.256 23.291 L 3.256 0 L 132.734 0 L 132.734 23.291 L 32.307 149.513 L 134.487 149.513 L 134.487 172.804 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 166.042,
    height: 172.804,
    viewBox: "0 0 166.042 172.804",
    fill: "none",
    style: {
      position: "absolute",
      left: 462.977,
      top: 4.098,
      width: 166.042,
      height: 172.804,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 166.042 172.804 L 138.243 172.804 L 121.714 128.977 L 43.076 128.977 L 26.797 172.804 L 0 172.804 L 66.367 0 L 101.929 0 L 166.042 172.804 Z M 82.395 23.541 L 51.591 106.437 L 113.45 106.437 L 82.395 23.541 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 172.554,
    height: 180.317,
    viewBox: "0 0 172.554 180.317",
    fill: "none",
    style: {
      position: "absolute",
      left: 284.273,
      top: 0,
      width: 172.554,
      height: 180.317,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 87.654 180.317 C 38.067 180.317 0 143.002 0 90.409 C 0 38.067 38.067 0 88.155 0 C 130.73 0 163.788 26.296 171.802 66.868 L 143.753 66.868 C 136.991 41.824 116.455 24.293 88.656 24.293 C 52.843 24.293 28.049 52.092 28.049 90.159 C 28.049 127.725 52.593 156.025 88.656 156.025 C 117.206 156.025 137.742 138.494 143.002 112.698 L 89.407 112.698 L 89.407 89.908 L 172.554 89.908 L 172.554 176.561 L 150.014 176.561 L 150.014 147.259 C 137.743 168.296 116.455 180.317 87.654 180.317 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 144.504,
    height: 176.561,
    viewBox: "0 0 144.504 176.561",
    fill: "none",
    style: {
      position: "absolute",
      left: 133.623,
      top: 4.098,
      width: 144.504,
      height: 176.561,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 72.377 176.561 C 27.549 176.561 0 149.513 0 104.434 L 0 0 L 26.547 0 L 26.547 102.18 C 26.547 130.229 40.822 152.268 72.127 152.268 C 103.432 152.268 117.707 130.229 117.707 102.18 L 117.707 0 L 144.504 0 L 144.504 104.434 C 144.504 149.513 117.457 176.561 72.377 176.561 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 127.474,
    height: 172.804,
    viewBox: "0 0 127.474 172.804",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 4.098,
      width: 127.474,
      height: 172.804,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 26.547 172.804 L 0 172.804 L 0 0 L 127.474 0 L 127.474 24.042 L 26.547 24.042 L 26.547 71.877 L 114.451 71.877 L 114.451 95.919 L 26.547 95.919 L 26.547 172.804 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 20.80988883972168,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 286.14,
      height: 45.777,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 32.426,
    height: 43.870,
    viewBox: "0 0 32.426 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 253.715,
      top: 1.041,
      width: 32.426,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 32.426 43.87 L 0 43.87 L 0 0 L 32.044 0 L 32.044 4.514 L 4.959 4.514 L 4.959 18.947 L 28.929 18.947 L 28.929 23.461 L 4.959 23.461 L 4.959 39.356 L 32.426 39.356 L 32.426 43.87 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40.437,
    height: 43.870,
    viewBox: "0 0 40.437 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 210.547,
      top: 1.041,
      width: 40.437,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20.218 39.165 L 35.16 0 L 40.437 0 L 23.143 43.87 L 17.103 43.87 L 0 0 L 5.404 0 L 20.218 39.165 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 5.023,
    height: 43.870,
    viewBox: "0 0 5.023 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 202.797,
      top: 1.041,
      width: 5.023,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.023 43.87 L 0 43.87 L 0 0 L 5.023 0 L 5.023 43.87 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 38.784,
    height: 43.870,
    viewBox: "0 0 38.784 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 161.281,
      top: 1.041,
      width: 38.784,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.935 43.87 L 16.912 43.87 L 16.912 4.514 L 0 4.514 L 0 0 L 38.784 0 L 38.784 4.514 L 21.935 4.514 L 21.935 43.87 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40.818,
    height: 43.870,
    viewBox: "0 0 40.818 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 117.734,
      top: 1.041,
      width: 40.818,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 40.818 43.87 L 35.541 43.87 L 30.645 31.281 L 9.982 31.281 L 5.15 43.87 L 0 43.87 L 17.357 0 L 23.397 0 L 40.818 43.87 Z M 20.218 4.387 L 11.571 27.085 L 29.056 27.085 L 20.218 4.387 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 32.426,
    height: 43.870,
    viewBox: "0 0 32.426 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 82.582,
      top: 1.041,
      width: 32.426,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 32.426 43.87 L 0 43.87 L 0 0 L 32.044 0 L 32.044 4.514 L 4.959 4.514 L 4.959 18.947 L 28.929 18.947 L 28.929 23.461 L 4.959 23.461 L 4.959 39.356 L 32.426 39.356 L 32.426 43.87 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 34.206,
    height: 43.870,
    viewBox: "0 0 34.206 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 45.645,
      top: 1.041,
      width: 34.206,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5.023 43.87 L 0 43.87 L 0 0 L 20.218 0 C 28.102 0 33.888 4.641 33.888 12.144 C 33.888 19.01 29.183 23.524 22.444 24.287 L 34.206 43.87 L 28.42 43.87 L 17.23 24.478 L 5.023 24.478 L 5.023 43.87 Z M 4.959 4.387 L 4.959 20.155 L 19.71 20.155 C 25.241 20.155 28.802 17.421 28.802 12.398 C 28.802 7.121 25.241 4.387 19.71 4.387 L 4.959 4.387 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 42.916,
    height: 45.777,
    viewBox: "0 0 42.916 45.777",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 42.916,
      height: 45.777,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.062 45.777 C 9.537 45.777 0 36.177 0 22.952 C 0 9.791 9.537 0 22.062 0 C 32.616 0 40.818 6.358 42.916 16.276 L 37.639 16.276 C 35.859 9.41 29.946 4.514 22.126 4.514 C 12.207 4.514 5.214 12.398 5.214 22.889 C 5.214 33.252 12.207 41.263 22.126 41.263 C 30.01 41.263 35.668 36.685 37.703 30.137 L 42.916 30.137 C 40.627 39.483 32.934 45.777 22.062 45.777 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 245.65,
      height: 45.777,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 37.703,
    height: 43.870,
    viewBox: "0 0 37.703 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 207.947,
      top: 1.041,
      width: 37.703,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 21.363 43.87 L 16.34 43.87 L 16.34 28.039 L 0 0 L 5.659 0 L 18.883 23.588 L 32.362 0 L 37.703 0 L 21.363 27.721 L 21.363 43.87 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 42.916,
    height: 45.777,
    viewBox: "0 0 42.916 45.777",
    fill: "none",
    style: {
      position: "absolute",
      left: 162.299,
      top: 0,
      width: 42.916,
      height: 45.777,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.062 45.777 C 9.537 45.777 0 36.177 0 22.952 C 0 9.791 9.537 0 22.062 0 C 32.616 0 40.818 6.358 42.916 16.276 L 37.639 16.276 C 35.859 9.41 29.946 4.514 22.126 4.514 C 12.207 4.514 5.214 12.398 5.214 22.889 C 5.214 33.252 12.207 41.263 22.126 41.263 C 30.01 41.263 35.668 36.685 37.703 30.137 L 42.916 30.137 C 40.627 39.483 32.934 45.777 22.062 45.777 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 35.032,
    height: 43.870,
    viewBox: "0 0 35.032 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 124.537,
      top: 1.041,
      width: 35.032,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4.705 43.87 L 0 43.87 L 0 0 L 6.803 0 L 30.264 37.512 L 30.264 0 L 35.032 0 L 35.032 43.87 L 28.738 43.87 L 4.705 5.404 L 4.705 43.87 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 32.426,
    height: 43.870,
    viewBox: "0 0 32.426 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 89.385,
      top: 1.041,
      width: 32.426,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 32.426 43.87 L 0 43.87 L 0 0 L 32.044 0 L 32.044 4.514 L 4.959 4.514 L 4.959 18.947 L 28.929 18.947 L 28.929 23.461 L 4.959 23.461 L 4.959 39.356 L 32.426 39.356 L 32.426 43.87 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 43.107,
    height: 45.777,
    viewBox: "0 0 43.107 45.777",
    fill: "none",
    style: {
      position: "absolute",
      left: 43.549,
      top: 0,
      width: 43.107,
      height: 45.777,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.189 45.777 C 9.473 45.777 0 36.304 0 22.952 C 0 9.728 9.473 0 22.253 0 C 32.744 0 40.818 6.231 42.916 16.276 L 37.639 16.276 C 35.859 9.346 30.137 4.514 22.38 4.514 C 12.271 4.514 5.214 12.271 5.214 22.889 C 5.214 33.379 12.271 41.263 22.38 41.263 C 30.963 41.263 36.94 35.859 37.703 27.784 L 22.825 27.784 L 22.825 23.397 L 43.107 23.397 L 43.107 44.824 L 38.72 44.824 L 38.72 36.495 C 35.795 42.471 29.946 45.777 22.189 45.777 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 40.818,
    height: 43.870,
    viewBox: "0 0 40.818 43.870",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 1.041,
      width: 40.818,
      height: 43.87,
      color: "rgb(255,255,255)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 40.818 43.87 L 35.541 43.87 L 30.645 31.281 L 9.982 31.281 L 5.15 43.87 L 0 43.87 L 17.357 0 L 23.397 0 L 40.818 43.87 Z M 20.218 4.387 L 11.571 27.085 L 29.056 27.085 L 20.218 4.387 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))))));
}
Object.assign(__ds_scope, { LOGOWhiteBlueIcon, __ds_default_figma_LOGOWhiteBlueIcon_104257: LOGOWhiteBlueIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/LOGOWhiteBlueIcon.jsx", error: String((e && e.message) || e) }); }

// figma/WALLPAPERDARKMODEIOS.jsx
try { (() => {
// figma node: 282:182 WALLPAPER DARK MODE - IOS
function WALLPAPERDARKMODEIOS(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 698,
      height: 882,
      overflow: "hidden",
      backgroundColor: "rgb(255,255,255)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-dc15c8b050f5c9f6",
    style: {
      position: "absolute",
      left: 0,
      top: -631,
      width: 698,
      height: 1513
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -180,
      top: -335,
      width: 1010,
      height: 1512,
      background: "linear-gradient(rgb(250,49,57),rgb(250,49,57))"
    }
  }));
}
Object.assign(__ds_scope, { WALLPAPERDARKMODEIOS, __ds_default_figma_WALLPAPERDARKMODEIOS_1kuees2: WALLPAPERDARKMODEIOS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/WALLPAPERDARKMODEIOS.jsx", error: String((e && e.message) || e) }); }

// figma/WALLPAPERDARKMODEMACOS.jsx
try { (() => {
// figma node: 282:159 WALLPAPER DARK MODE - MACOS
function WALLPAPERDARKMODEMACOS(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 2824,
      height: 1769,
      overflow: "hidden",
      backgroundColor: "rgb(255,255,255)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 2824,
      height: 1769
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -136,
      top: -1483,
      width: 3095,
      height: 4634,
      background: "linear-gradient(rgb(250,49,57),rgb(250,49,57))"
    }
  }));
}
Object.assign(__ds_scope, { WALLPAPERDARKMODEMACOS, __ds_default_figma_WALLPAPERDARKMODEMACOS_zrbuuy: WALLPAPERDARKMODEMACOS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/WALLPAPERDARKMODEMACOS.jsx", error: String((e && e.message) || e) }); }

// figma/WALLPAPERLIGHTMODEIOS.jsx
try { (() => {
// figma node: 283:3550 WALLPAPER LIGHT MODE - IOS
function WALLPAPERLIGHTMODEIOS(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 698,
      height: 882,
      overflow: "hidden",
      backgroundColor: "rgb(255,255,255)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-c60eb7fcace7b4b0",
    style: {
      position: "absolute",
      left: 0,
      top: -631,
      width: 698,
      height: 1513
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -136,
      top: -1483,
      width: 3095,
      height: 4634,
      background: "linear-gradient(rgb(250,49,57),rgb(250,49,57))"
    }
  }));
}
Object.assign(__ds_scope, { WALLPAPERLIGHTMODEIOS, __ds_default_figma_WALLPAPERLIGHTMODEIOS_11e366g: WALLPAPERLIGHTMODEIOS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/WALLPAPERLIGHTMODEIOS.jsx", error: String((e && e.message) || e) }); }

// figma/WALLPAPERLIGHTMODEMACOS.jsx
try { (() => {
// figma node: 283:3547 WALLPAPER LIGHT MODE - MACOS
function WALLPAPERLIGHTMODEMACOS(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 2824,
      height: 1769,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 2830,
      height: 1769
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -136,
      top: -1483,
      width: 3095,
      height: 4634,
      background: "linear-gradient(rgb(250,49,57),rgb(250,49,57))"
    }
  }));
}
Object.assign(__ds_scope, { WALLPAPERLIGHTMODEMACOS, __ds_default_figma_WALLPAPERLIGHTMODEMACOS_iix1rk: WALLPAPERLIGHTMODEMACOS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/WALLPAPERLIGHTMODEMACOS.jsx", error: String((e && e.message) || e) }); }

// ui_kits/brand-book/Pages.jsx
try { (() => {
const {
  LogoMark,
  LogoTile,
  LogoLockup
} = window.FugazSystem;

// 2000 × 1125 guideline spread, transcribed from the Master File pages
// (e.g. 3.1 PRIMARY COLORS, node 282:777). Left column 412px of copy at
// left 59 / top 63; content column starts at left 529; footer at top 1004.

const SHEET = {
  position: "relative",
  width: 2000,
  height: 1125,
  background: "#000000",
  overflow: "hidden",
  fontFamily: "var(--font-core)"
};
function Footer({
  crumbs,
  page
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 59,
      top: 1004,
      width: 1882,
      height: 59
    }
  }, /*#__PURE__*/React.createElement(LogoMark, {
    size: 59,
    color: "#FFFFFF",
    style: {
      position: "absolute",
      left: 0,
      top: 3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      height: 59,
      display: "flex",
      alignItems: "center",
      gap: 26,
      fontWeight: 500,
      fontSize: 20,
      textTransform: "uppercase",
      letterSpacing: "0.02em",
      color: "rgb(66,66,66)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Fugaz. All rights reserved"), crumbs.map(c => /*#__PURE__*/React.createElement(React.Fragment, {
    key: c
  }, /*#__PURE__*/React.createElement("span", null, "\u203A"), /*#__PURE__*/React.createElement("span", null, c))), /*#__PURE__*/React.createElement("span", null, "\u203A"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 59,
      textAlign: "center"
    }
  }, page)));
}
function Sheet({
  title,
  body,
  crumbs,
  page,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: SHEET
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 59,
      top: 63,
      width: 412,
      height: 882,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      width: 412,
      fontWeight: 500,
      fontSize: 52,
      lineHeight: "43px",
      letterSpacing: "-0.020em",
      color: "#FFFFFF",
      textTransform: "uppercase"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "absolute",
      top: 176,
      margin: 0,
      width: 412,
      fontWeight: 400,
      fontSize: 21.5,
      lineHeight: "34px",
      color: "rgb(251,251,251)"
    }
  }, body)), children, /*#__PURE__*/React.createElement(Footer, {
    crumbs: crumbs,
    page: page
  }));
}
const Tile = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    borderRadius: 22,
    boxShadow: "inset 0 0 0 2px rgba(157,159,169,0.2)",
    overflow: "hidden",
    position: "relative",
    ...style
  }
}, children);
function ColorsPage() {
  const swatches = [["Primary Color — 01", "Fugaz Blue", "#0057FE", "0 | 87 | 254", "#FFFFFF"], ["Primary Color — 02", "Deep Blue", "#032D7E", "3 | 45 | 126", "#FFFFFF"], ["Primary Color — 03", "Night Black", "#000000", "0 | 0 | 0", "#FFFFFF"], ["Primary Color — 04", "Page White", "#F3F3F3", "243 | 243 | 243", "#000000"]];
  return /*#__PURE__*/React.createElement(Sheet, {
    title: "Primary\nColors.",
    crumbs: ["Brand Colors", "3.1"],
    page: "15",
    body: "Three values carry the whole identity: white, black and one electric blue. The blue never appears flat \u2014 it always runs to deep blue in one corner and always carries grain."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 529,
      top: 63,
      display: "grid",
      gridTemplateColumns: "698px 698px",
      gap: 16
    }
  }, swatches.map(([n, label, hex, rgb, fg]) => /*#__PURE__*/React.createElement(Tile, {
    key: hex,
    style: {
      width: 698,
      height: 433,
      background: hex === "#0057FE" ? "var(--fugaz-blue-gradient)" : hex
    }
  }, hex === "#0057FE" ? /*#__PURE__*/React.createElement("div", {
    className: "fugaz-grain"
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 40,
      top: 34,
      color: fg,
      fontSize: 20,
      fontWeight: 500,
      opacity: .7
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 40,
      bottom: 34,
      color: fg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 500,
      letterSpacing: "-0.02em",
      textTransform: "uppercase"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      opacity: .7,
      marginTop: 8
    }
  }, "HEX ", hex, " \xA0\xB7\xA0 RGB ", rgb))))));
}
function TypographyPage() {
  return /*#__PURE__*/React.createElement(Sheet, {
    title: "Primary\nTypography.",
    crumbs: ["Typography", "4.1"],
    page: "21",
    body: "One geometric grotesk across every surface. Medium weight, never black. Tracking tightens to -0.010em at display sizes and leading collapses to 0.909 so headlines set as a solid block."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 529,
      top: 63,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Tile, {
    style: {
      width: 1412,
      height: 433,
      background: "#FBFBFB"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 48,
      top: 62,
      fontSize: 296,
      fontWeight: 500,
      lineHeight: "218px",
      letterSpacing: "-0.010em",
      color: "#000"
    }
  }, "Aabc"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 48,
      bottom: 34,
      fontSize: 22,
      color: "#808080"
    }
  }, "Geist Medium \xB7 500")), /*#__PURE__*/React.createElement(Tile, {
    style: {
      width: 1412,
      height: 433,
      background: "var(--fugaz-blue-gradient)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fugaz-grain"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 48,
      top: 62,
      fontSize: 296,
      fontWeight: 400,
      lineHeight: "218px",
      letterSpacing: "-0.010em",
      color: "#FFF"
    }
  }, "Aabc"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 48,
      bottom: 34,
      fontSize: 22,
      color: "rgba(255,255,255,.75)"
    }
  }, "Geist Regular \xB7 400"))));
}
function LogoPage() {
  return /*#__PURE__*/React.createElement(Sheet, {
    title: "Brand\nLogo.",
    crumbs: ["Brand Logo", "2.0"],
    page: "07",
    body: "The mark is four skewed segments reading as a slanted F. It locks up horizontally with the FUGAZ wordmark, and sits alone inside the squircle tile for app and social use."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 529,
      top: 63,
      display: "grid",
      gridTemplateColumns: "698px 698px",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Tile, {
    style: {
      width: 698,
      height: 433,
      background: "var(--fugaz-blue-gradient)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fugaz-grain"
  }), /*#__PURE__*/React.createElement(LogoMark, {
    size: 180,
    color: "#FFFFFF",
    style: {
      position: "relative"
    }
  })), /*#__PURE__*/React.createElement(Tile, {
    style: {
      width: 698,
      height: 433,
      background: "#FBFBFB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(LogoMark, {
    size: 180,
    color: "#0057FE"
  })), /*#__PURE__*/React.createElement(Tile, {
    style: {
      width: 698,
      height: 433,
      background: "#000000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(LogoLockup, {
    size: 64,
    color: "#FFFFFF"
  })), /*#__PURE__*/React.createElement(Tile, {
    style: {
      width: 698,
      height: 433,
      background: "#FBFBFB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(LogoTile, {
    size: 200
  }), /*#__PURE__*/React.createElement(LogoTile, {
    size: 110
  }), /*#__PURE__*/React.createElement(LogoTile, {
    size: 64
  }))));
}
function Book() {
  const pages = [["Brand Logo", LogoPage], ["Primary Colors", ColorsPage], ["Primary Typography", TypographyPage]];
  const [i, setI] = React.useState(0);
  const Page = pages[i][1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#000",
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      padding: "18px 24px",
      background: "#000"
    }
  }, pages.map(([n], k) => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setI(k),
    style: {
      padding: "10px 20px",
      borderRadius: 84,
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-core)",
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-0.01em",
      background: i === k ? "#F3F3F3" : "transparent",
      color: i === k ? "#0057FE" : "rgb(120,120,120)",
      boxShadow: i === k ? "none" : "inset 0 0 0 1px rgb(45,45,45)"
    }
  }, n))), /*#__PURE__*/React.createElement(Page, null));
}
Object.assign(window, {
  Book,
  ColorsPage,
  TypographyPage,
  LogoPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/brand-book/Pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fugaz-site/Screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  HeroPanel,
  Panel,
  SiteHeader,
  HeroStatement,
  PartnerMarquee,
  WorkCard,
  TeamCard,
  PillButton,
  LogoCapsule,
  LogoMark,
  Preloader,
  ScarcityBadge
} = window.FugazSystem;
const {
  Reveal,
  AnimHeadline,
  Magnetic,
  Parallax,
  CursorFollower,
  initSmoothScroll,
  fugazScrollTo,
  useScrollY,
  EASE,
  REDUCED
} = window;
const A = "../../assets";
const AVATARS = ["fig-asset-5b4fd7c5b1b388bb-5cfa5377", "fig-asset-3bc5b42af6b345d3-43f8e39f"];
const PARTNERS = [{
  src: A + "/partner-dubai-airports.svg",
  alt: "Dubai Airports",
  width: 221.676,
  height: 50
}, {
  src: A + "/partner-louis-vuitton.svg",
  alt: "Louis Vuitton",
  width: 52.36,
  height: 63.854
}, {
  src: A + "/partner-hermes.svg",
  alt: "Hermès Paris",
  width: 110.452,
  height: 64
}, {
  src: A + "/partner-emirates.svg",
  alt: "Emirates",
  width: 88.624,
  height: 61
}];
const WORK = [{
  cls: "fig-asset-7e5a38dbd7cd5b88-85967375",
  label: "Dubai Airports — identity"
}, {
  cls: "fig-asset-d467647946611309-df75ee77",
  label: "Louis Vuitton — campaign site"
}, {
  cls: "fig-asset-5c8124936bc5c341-7d1f7aaa",
  label: "Hermès — pitch deck"
}, {
  cls: "fig-asset-2dab0c6134ce80a1-fcd45fb1",
  label: "Emirates — brand system"
}];
const SERVICES = [{
  n: "01",
  title: "Brand identity",
  body: "Mark, type, colour, motion. The whole system, built once, built to hold."
}, {
  n: "02",
  title: "Marketing sites",
  body: "Designed and shipped by the two of us. No handover, no dilution."
}, {
  n: "03",
  title: "Pitch & proposal decks",
  body: "The document that closes the room. Same restraint, same craft."
}];
const STATS = [{
  k: "12",
  label: "weeks, start to launch"
}, {
  k: "2",
  label: "founders, no juniors"
}];
const meta = color => ({
  fontFamily: "var(--font-core)",
  fontWeight: 500,
  fontSize: "var(--size-meta)",
  lineHeight: 0.909,
  letterSpacing: "-0.010em",
  color,
  whiteSpace: "nowrap",
  textDecoration: "none"
});

/* ---------------------------------------------------------------- hero -- */
function Hero({
  ready,
  onWork,
  onCall
}) {
  const enter = d => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "none" : "translateY(34px)",
    transition: `opacity 1.2s ${EASE} ${d}s, transform 1.2s ${EASE} ${d}s`
  });
  return /*#__PURE__*/React.createElement(HeroPanel, {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: enter(0.1)
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    avatars: AVATARS
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 444,
      top: 342,
      ...enter(0.28)
    }
  }, /*#__PURE__*/React.createElement(HeroStatement, {
    graphic: A + "/hero-f1-car.svg",
    onSecondary: onWork,
    onPrimary: onCall
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 46,
      display: "flex",
      justifyContent: "center",
      ...enter(0.6)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...meta("rgba(255,255,255,0.62)"),
      fontSize: 14
    }
  }, "Amsterdam \u2014 scroll")));
}

/* ------------------------------------------------------------ partners -- */
function Partners() {
  return /*#__PURE__*/React.createElement(Panel, {
    height: 192,
    style: {
      marginTop: 21
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 73,
      top: 45,
      width: 1253,
      height: 105
    }
  }, /*#__PURE__*/React.createElement(PartnerMarquee, {
    logos: [...PARTNERS, ...PARTNERS, ...PARTNERS]
  })));
}

/* ---------------------------------------------------------------- work -- */
function WorkSection() {
  return /*#__PURE__*/React.createElement(Panel, {
    height: 1180,
    style: {
      marginTop: 21
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 73,
      top: 90
    }
  }, /*#__PURE__*/React.createElement(AnimHeadline, {
    setup: "Built by a young team",
    point: "full with energy and new ideas."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 73,
      top: 250,
      display: "grid",
      gridTemplateColumns: "644.154px 644.154px",
      gap: "40px 39px"
    }
  }, WORK.map((w, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: w.cls,
    delay: i % 2 * 0.12,
    y: 40
  }, /*#__PURE__*/React.createElement(Parallax, {
    speed: 0.03
  }, /*#__PURE__*/React.createElement("div", {
    "data-cursor": "View"
  }, /*#__PURE__*/React.createElement(WorkCard, {
    mediaClass: w.cls,
    label: w.label
  })))))));
}

/* ------------------------------------------------------------ services -- */
function ServiceRow({
  n,
  title,
  body,
  last
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "grid",
      gridTemplateColumns: "88px 440px 1fr",
      alignItems: "baseline",
      gap: 24,
      padding: "38px 0 36px",
      borderBottom: last ? "none" : "1px solid var(--border-hairline)",
      transform: hover ? "translateX(10px)" : "none",
      transition: `transform var(--dur-base) var(--ease-fugaz)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: 17,
      letterSpacing: "-0.010em",
      color: "#808080"
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: 38,
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      color: hover ? "var(--fugaz-blue)" : "var(--black)",
      transition: `color var(--dur-fast) var(--ease-fugaz)`
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: "var(--size-lede)",
      lineHeight: 1.28,
      letterSpacing: "-0.020em",
      color: "#808080",
      maxWidth: 520
    }
  }, body));
}
function ServicesSection() {
  return /*#__PURE__*/React.createElement(Panel, {
    height: 720,
    style: {
      marginTop: 21
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 73,
      top: 90
    }
  }, /*#__PURE__*/React.createElement(AnimHeadline, {
    setup: "We do three things",
    point: "and we do them completely."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 73,
      right: 73,
      top: 268
    }
  }, SERVICES.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.n,
    delay: i * 0.08,
    y: 30
  }, /*#__PURE__*/React.createElement(ServiceRow, _extends({}, s, {
    last: i === SERVICES.length - 1
  }))))));
}

/* --------------------------------------------------------------- stats -- */
function StatsSection() {
  return /*#__PURE__*/React.createElement(Panel, {
    height: 300,
    style: {
      marginTop: 21
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 73,
      right: 73,
      top: 92,
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 40
    }
  }, STATS.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.k,
    delay: i * 0.1,
    y: 30
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: 96,
      lineHeight: 0.909,
      letterSpacing: "-0.030em",
      color: "var(--black)"
    }
  }, s.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: "var(--size-lede)",
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      color: "#808080"
    }
  }, s.label)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.2,
    y: 30
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: 105
    }
  }, /*#__PURE__*/React.createElement(ScarcityBadge, {
    color: "var(--black)"
  }, "0 spots left for Q3")))));
}

/* ---------------------------------------------------------------- team -- */
function TeamSection() {
  return /*#__PURE__*/React.createElement(Panel, {
    height: 860,
    style: {
      marginTop: 21
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 73,
      top: 90
    }
  }, /*#__PURE__*/React.createElement(AnimHeadline, {
    setup: "We help you design your brand",
    point: "to it\u2019s full potential."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 73,
      top: 268,
      width: 400
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: "var(--size-lede)",
      lineHeight: 1.3,
      letterSpacing: "-0.020em",
      color: "#808080"
    }
  }, "Two founders in Amsterdam. Every line of the work is ours."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 559,
      top: 230,
      display: "flex",
      gap: 43
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    y: 44
  }, /*#__PURE__*/React.createElement("div", {
    "data-cursor": "Luka"
  }, /*#__PURE__*/React.createElement(TeamCard, {
    name: "Luka Mili\u0107",
    photoClass: "fig-asset-65bb30874c349038-fe12f9f5"
  }))), /*#__PURE__*/React.createElement(Reveal, {
    y: 44,
    delay: 0.12
  }, /*#__PURE__*/React.createElement("div", {
    "data-cursor": "Diego"
  }, /*#__PURE__*/React.createElement(TeamCard, {
    name: "Diego Gomes",
    photoClass: "fig-asset-e7e329cec894fbf4-b11e275b"
  })))));
}

/* -------------------------------------------------------------- footer -- */
function FooterBand({
  onWork
}) {
  return /*#__PURE__*/React.createElement(Reveal, {
    y: 40,
    duration: 1.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 1411,
      height: 527,
      marginTop: 21,
      borderRadius: 29,
      background: "var(--fugaz-blue)",
      overflow: "hidden",
      boxShadow: "var(--shadow-panel)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fugaz-grain"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 61,
      top: 59
    }
  }, /*#__PURE__*/React.createElement(LogoCapsule, {
    avatars: AVATARS
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 58,
      top: 125,
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: "var(--size-wordmark)",
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      color: "var(--white)",
      whiteSpace: "nowrap"
    }
  }, "Fugaz Agency"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 58,
      bottom: 60,
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Magnetic, {
    strength: 0.28
  }, /*#__PURE__*/React.createElement(PillButton, {
    variant: "light",
    href: "mailto:info@fugaz-agency.com"
  }, "Book a call")), /*#__PURE__*/React.createElement(Magnetic, {
    strength: 0.28
  }, /*#__PURE__*/React.createElement(PillButton, {
    variant: "scrim",
    onClick: onWork
  }, "View work"))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 61,
      bottom: 60,
      ...meta("var(--white)")
    }
  }, "linkedin / X / instagram"), /*#__PURE__*/React.createElement(Parallax, {
    speed: 0.05,
    style: {
      position: "absolute",
      right: 61,
      top: 90
    }
  }, /*#__PURE__*/React.createElement(LogoMark, {
    size: 210,
    color: "#FFFFFF",
    style: {
      opacity: 0.18
    }
  }))));
}

/* ------------------------------------------------------- floating nav --- */
function FloatingNav({
  show,
  onWork,
  onCall
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 18,
      left: "50%",
      zIndex: 40,
      transform: `translateX(-50%) translateY(${show ? 0 : -90}px)`,
      opacity: show ? 1 : 0,
      transition: `transform 1s ${EASE}, opacity 0.8s ${EASE}`,
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "9px 10px 9px 20px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.82)",
      backdropFilter: "blur(14px)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05), 0 10px 34px rgba(0,0,0,0.07)",
      pointerEvents: show ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement(Magnetic, {
    strength: 0.4
  }, /*#__PURE__*/React.createElement(LogoMark, {
    height: 22,
    color: "#000000"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      ...meta("#808080"),
      fontSize: 15
    }
  }, "Fugaz Agency"), /*#__PURE__*/React.createElement(Magnetic, {
    strength: 0.3
  }, /*#__PURE__*/React.createElement(PillButton, {
    variant: "dark",
    onClick: onCall
  }, "Book a call")));
}

/* ---------------------------------------------------------------- site -- */
function Site() {
  const [ready, setReady] = React.useState(false);
  const workRef = React.useRef(null);
  const y = useScrollY();
  React.useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    if (ready) initSmoothScroll();
  }, [ready]);
  const goWork = () => {
    const el = workRef.current;
    if (el) fugazScrollTo(el.offsetTop - 40);
  };
  const goCall = () => {
    window.location.href = "mailto:info@fugaz-agency.com";
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 1440,
      margin: "0 auto",
      background: "var(--page)",
      paddingBottom: 21
    }
  }, /*#__PURE__*/React.createElement(CursorFollower, null), /*#__PURE__*/React.createElement(FloatingNav, {
    show: ready && y > 900,
    onWork: goWork,
    onCall: goCall
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1411,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Hero, {
    ready: ready,
    onWork: goWork,
    onCall: goCall
  }), /*#__PURE__*/React.createElement(Partners, null), /*#__PURE__*/React.createElement("div", {
    ref: workRef
  }, /*#__PURE__*/React.createElement(WorkSection, null)), /*#__PURE__*/React.createElement(ServicesSection, null), /*#__PURE__*/React.createElement(StatsSection, null), /*#__PURE__*/React.createElement(TeamSection, null), /*#__PURE__*/React.createElement(FooterBand, {
    onWork: goWork
  })), !ready ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(Preloader, {
    duration: 2600,
    onDone: () => setReady(true)
  })) : null);
}
Object.assign(window, {
  Site,
  Hero,
  Partners,
  WorkSection,
  ServicesSection,
  StatsSection,
  TeamSection,
  FooterBand,
  FloatingNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fugaz-site/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fugaz-site/motion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Fugaz motion layer: inertia scroll, masked word reveals, magnetic elements, parallax.
   One easing curve everywhere (--ease-fugaz). Everything animates once. Respects reduced motion. */

const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ---- Lenis-style inertia scrolling ------------------------------------- */
let smoothTarget = 0,
  smoothCurrent = 0,
  smoothRunning = false,
  smoothInit = false;
const scrollMax = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
function tick() {
  const d = smoothTarget - smoothCurrent;
  if (Math.abs(d) < 0.25) {
    smoothCurrent = smoothTarget;
    window.scrollTo(0, smoothCurrent);
    smoothRunning = false;
    return;
  }
  smoothCurrent += d * 0.082;
  window.scrollTo(0, smoothCurrent);
  requestAnimationFrame(tick);
}
function kick() {
  if (!smoothRunning) {
    smoothRunning = true;
    requestAnimationFrame(tick);
  }
}
function fugazScrollTo(y) {
  if (REDUCED) {
    window.scrollTo(0, y);
    return;
  }
  smoothTarget = Math.max(0, Math.min(scrollMax(), y));
  kick();
}
function initSmoothScroll() {
  if (smoothInit || REDUCED) return;
  smoothInit = true;
  smoothTarget = smoothCurrent = window.scrollY;
  window.addEventListener("wheel", e => {
    if (e.ctrlKey) return;
    e.preventDefault();
    smoothTarget = Math.max(0, Math.min(scrollMax(), smoothTarget + e.deltaY));
    kick();
  }, {
    passive: false
  });
  window.addEventListener("keydown", e => {
    const step = {
      PageDown: 720,
      PageUp: -720,
      ArrowDown: 90,
      ArrowUp: -90,
      Home: -1e7,
      End: 1e7
    }[e.key];
    if (step === undefined || /input|textarea/i.test(e.target.tagName || "")) return;
    e.preventDefault();
    smoothTarget = Math.max(0, Math.min(scrollMax(), smoothTarget + step));
    kick();
  });
  window.addEventListener("scroll", () => {
    if (!smoothRunning) smoothTarget = smoothCurrent = window.scrollY;
  }, {
    passive: true
  });
}

/* ---- Reveal on scroll (once) ------------------------------------------- */
function useReveal(options) {
  const {
    threshold = 0.18,
    rootMargin = "0px 0px -8% 0px"
  } = options || {};
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(REDUCED);
  React.useEffect(() => {
    if (REDUCED || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, {
      threshold,
      rootMargin
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, shown];
}

/** Fades and lifts its children in once, on scroll-in. */
function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 1.1,
  style,
  ...rest
}) {
  const [ref, shown] = useReveal();
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translateY(${y}px)`,
      transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
      willChange: "opacity, transform",
      ...style
    }
  }, rest), children);
}

/* ---- Word-by-word masked headline -------------------------------------- */
function MaskLine({
  text,
  className,
  shown,
  base
}) {
  const words = String(text).split(" ");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block"
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-block",
      overflow: "hidden",
      verticalAlign: "bottom",
      paddingBottom: "0.06em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: "inline-block",
      transform: shown ? "translateY(0)" : "translateY(105%)",
      transition: `transform 1.15s ${EASE} ${base + i * 0.055}s`
    }
  }, w, i < words.length - 1 ? "\u00A0" : ""))));
}

/**
 * The two-tone headline, revealed word-by-word from behind a mask.
 * The grey setup line arrives first; the black point lands after it.
 */
function AnimHeadline({
  setup,
  point,
  size = 50,
  align = "left",
  style
}) {
  const [ref, shown] = useReveal({
    threshold: 0.4
  });
  const setupWords = String(setup).split(" ").length;
  return /*#__PURE__*/React.createElement("h2", {
    ref: ref,
    style: {
      margin: 0,
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: size,
      lineHeight: 0.909,
      letterSpacing: "-0.020em",
      textAlign: align,
      textWrap: "pretty",
      ...style
    }
  }, /*#__PURE__*/React.createElement(MaskLine, {
    text: setup,
    className: "fugaz-setup",
    shown: shown,
    base: 0
  }), /*#__PURE__*/React.createElement(MaskLine, {
    text: point,
    className: "fugaz-point",
    shown: shown,
    base: 0.18 + setupWords * 0.02
  }));
}

/* ---- Magnetic elements -------------------------------------------------- */
/** Leans an element toward the cursor. Buttons and the logo are magnetic. */
function useMagnetic(strength = 0.32) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (REDUCED || !ref.current) return;
    const el = ref.current;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) * 0.9 + 60;
      if (dist > reach) {
        el.style.transform = "translate(0,0)";
        return;
      }
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
    };
    el.style.transition = `transform 0.6s ${EASE}`;
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

/** Wraps children in a magnetic shell. */
function Magnetic({
  children,
  strength = 0.32,
  style
}) {
  const ref = useMagnetic(strength);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      ...style
    }
  }, children);
}

/* ---- Scroll position + parallax ---------------------------------------- */
function useScrollY() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    const on = () => setY(window.scrollY);
    on();
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

/** Moves its children a few px against the scroll while they're on screen. */
function Parallax({
  children,
  speed = 0.06,
  style
}) {
  const ref = React.useRef(null);
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    if (REDUCED) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2 - window.innerHeight / 2;
        setOffset(-mid * speed);
      });
    };
    on();
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      transform: `translate3d(0,${offset.toFixed(2)}px,0)`,
      willChange: "transform",
      ...style
    }
  }, children);
}

/* ---- Cursor follower ---------------------------------------------------- */
/**
 * A small solid dot pinned to the pointer plus a larger ring that lags behind it.
 * Both sit in `mix-blend-mode: difference` so they invert over blue and over white
 * without a second accent colour. The ring opens up over anything interactive and
 * can carry a label via `data-cursor="View"`.
 */
function CursorFollower({
  size = 44,
  dot = 6
}) {
  const ring = React.useRef(null);
  const core = React.useRef(null);
  const [label, setLabel] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (REDUCED || window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.style.cursor = "none";
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      rx = mx,
      ry = my,
      raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (core.current) core.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onMove = e => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
      const hit = e.target.closest && e.target.closest("[data-cursor], a, button, [role=button]");
      setActive(!!hit);
      setLabel(hit ? hit.getAttribute("data-cursor") || "" : "");
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);
  if (REDUCED) return null;
  const scale = label ? 1.85 : active ? 1.5 : 1;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: ring,
    style: {
      position: "fixed",
      left: 0,
      top: 0,
      width: size,
      height: size,
      borderRadius: "50%",
      border: "1px solid #FFFFFF",
      zIndex: 9998,
      pointerEvents: "none",
      mixBlendMode: "difference",
      opacity: visible ? 1 : 0,
      display: "grid",
      placeItems: "center",
      transition: `opacity 0.4s ${EASE}`,
      willChange: "transform"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: -1,
      borderRadius: "50%",
      border: "1px solid #FFFFFF",
      transform: `scale(${scale})`,
      background: label ? "#FFFFFF" : "transparent",
      transition: `transform 0.7s ${EASE}, background 0.5s ${EASE}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "var(--font-core)",
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: "-0.010em",
      color: "#000000",
      whiteSpace: "nowrap",
      opacity: label ? 1 : 0,
      transition: `opacity 0.35s ${EASE}`
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    ref: core,
    style: {
      position: "fixed",
      left: 0,
      top: 0,
      width: dot,
      height: dot,
      borderRadius: "50%",
      background: "#FFFFFF",
      zIndex: 9999,
      pointerEvents: "none",
      mixBlendMode: "difference",
      opacity: visible && !label ? 1 : 0,
      transition: `opacity 0.35s ${EASE}`,
      willChange: "transform"
    }
  }));
}
Object.assign(window, {
  REDUCED,
  EASE,
  initSmoothScroll,
  fugazScrollTo,
  useReveal,
  Reveal,
  AnimHeadline,
  MaskLine,
  useMagnetic,
  Magnetic,
  useScrollY,
  Parallax,
  CursorFollower
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fugaz-site/motion.jsx", error: String((e && e.message) || e) }); }

__ds_ns.LogoLockup = __ds_scope.LogoLockup;

__ds_ns.LogoMark = __ds_scope.LogoMark;

__ds_ns.LogoTile = __ds_scope.LogoTile;

__ds_ns.HeroPanel = __ds_scope.HeroPanel;

__ds_ns.HeroStatement = __ds_scope.HeroStatement;

__ds_ns.LogoCapsule = __ds_scope.LogoCapsule;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.PartnerMarquee = __ds_scope.PartnerMarquee;

__ds_ns.PillButton = __ds_scope.PillButton;

__ds_ns.Preloader = __ds_scope.Preloader;

__ds_ns.ScarcityBadge = __ds_scope.ScarcityBadge;

__ds_ns.SectionHeadline = __ds_scope.SectionHeadline;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.TeamCard = __ds_scope.TeamCard;

__ds_ns.WorkCard = __ds_scope.WorkCard;

__ds_ns.Frame12 = __ds_scope.Frame12;

__ds_ns.Frame44 = __ds_scope.Frame44;

__ds_ns.Frame45 = __ds_scope.Frame45;

__ds_ns.Frame46 = __ds_scope.Frame46;

__ds_ns.Frame47 = __ds_scope.Frame47;

__ds_ns.Frame49 = __ds_scope.Frame49;

__ds_ns.Frame54 = __ds_scope.Frame54;

__ds_ns.Frame58 = __ds_scope.Frame58;

__ds_ns.Frame59 = __ds_scope.Frame59;

__ds_ns.Frame60 = __ds_scope.Frame60;

__ds_ns.Frame61 = __ds_scope.Frame61;

__ds_ns.Group51332 = __ds_scope.Group51332;

__ds_ns.LOGOBLACK = __ds_scope.LOGOBLACK;

__ds_ns.LOGOBLUE = __ds_scope.LOGOBLUE;

__ds_ns.LOGOBlueIcon = __ds_scope.LOGOBlueIcon;

__ds_ns.LOGOGRADIANT = __ds_scope.LOGOGRADIANT;

__ds_ns.LOGOHORIZONTAL = __ds_scope.LOGOHORIZONTAL;

__ds_ns.LOGOMARK = __ds_scope.LOGOMARK;

__ds_ns.LOGOMARKUNICOLOR = __ds_scope.LOGOMARKUNICOLOR;

__ds_ns.LOGOVERTICAL = __ds_scope.LOGOVERTICAL;

__ds_ns.LOGOWHITE = __ds_scope.LOGOWHITE;

__ds_ns.LOGOWhiteBlueIcon = __ds_scope.LOGOWhiteBlueIcon;

__ds_ns.WALLPAPERDARKMODEIOS = __ds_scope.WALLPAPERDARKMODEIOS;

__ds_ns.WALLPAPERDARKMODEMACOS = __ds_scope.WALLPAPERDARKMODEMACOS;

__ds_ns.WALLPAPERLIGHTMODEIOS = __ds_scope.WALLPAPERLIGHTMODEIOS;

__ds_ns.WALLPAPERLIGHTMODEMACOS = __ds_scope.WALLPAPERLIGHTMODEMACOS;

})();
