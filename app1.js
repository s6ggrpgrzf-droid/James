"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useCallback = _React.useCallback,
  useRef = _React.useRef;
var pick = function pick(lg, en, es) {
  return lg === "en" ? en : es || en;
};
var CSS = "\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}\nhtml,body,#root{height:100%;background:#07080A;}\nbody{overscroll-behavior:none;-webkit-tap-highlight-color:transparent;}\ninput,textarea{font-family:inherit;}\ninput::placeholder{color:#6B7A8D;}\ninput:focus{border-color:#F5A623!important;outline:none;box-shadow:0 0 0 1px rgba(245,166,35,0.6),0 0 0 4px rgba(245,166,35,0.18),0 8px 24px rgba(245,166,35,0.18);}\ntextarea:focus{border-color:#F5A623!important;outline:none;box-shadow:0 0 0 1px rgba(245,166,35,0.6),0 0 0 4px rgba(245,166,35,0.18),0 8px 24px rgba(245,166,35,0.18);}\n::-webkit-scrollbar{display:none;}\n@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}\n@keyframes floatY{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.01)}}\n@keyframes glowPulse{0%,100%{box-shadow:0 0 0 1px rgba(245,166,35,0.15),0 0 18px rgba(245,166,35,0.30),0 0 40px rgba(245,166,35,0.15)}50%{box-shadow:0 0 0 1px rgba(245,166,35,0.30),0 0 32px rgba(245,166,35,0.55),0 0 72px rgba(245,166,35,0.32)}}\n@keyframes borderPulse{0%,100%{border-color:rgba(245,166,35,0.35);box-shadow:inset 0 0 0 1px rgba(245,166,35,0)}50%{border-color:rgba(245,166,35,0.85);box-shadow:inset 0 0 16px rgba(245,166,35,0.18)}}\n@keyframes iUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}\n@keyframes iPop{from{opacity:0;transform:scale(0.65)}to{opacity:1;transform:scale(1)}}\n@keyframes vUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}\n@keyframes vPop{from{opacity:0;transform:scale(0.65)}to{opacity:1;transform:scale(1)}}\n@keyframes vFade{from{opacity:0}to{opacity:1}}\n@keyframes trainPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,166,35,0),0 0 0 0 rgba(245,166,35,0),0 0 0 0 rgba(245,166,35,0)}50%{box-shadow:0 0 0 8px rgba(245,166,35,0.22),0 0 28px rgba(245,166,35,0.45),0 0 64px rgba(245,166,35,0.22)}}\n@keyframes trainShimmer{0%{background-position:-200% center}100%{background-position:200% center}}\n@keyframes trainFloat{0%,100%{transform:translateY(0) scale(1);filter:drop-shadow(0 4px 8px rgba(0,0,0,0.25))}50%{transform:translateY(-6px) scale(1.04);filter:drop-shadow(0 14px 22px rgba(0,0,0,0.35))}}\n@keyframes toastIn{from{opacity:0;transform:translate(-50%,-50%) scale(0.85)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}\n@keyframes toastOut{from{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(0.85)}}\n@keyframes tabSlide{from{opacity:0;transform:translateY(18px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}\n@keyframes cardIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\n@keyframes shimmerSlide{0%{background-position:-200% 0}100%{background-position:200% 0}}\n@keyframes navPop{0%{transform:scale(1)}40%{transform:scale(1.22)}70%{transform:scale(0.96)}100%{transform:scale(1)}}\n@keyframes lockShake{0%,100%{transform:translateX(0);box-shadow:0 0 0 0 rgba(244,63,94,0)}20%{transform:translateX(-4px);box-shadow:0 0 14px rgba(244,63,94,0.30)}40%{transform:translateX(4px);box-shadow:0 0 20px rgba(244,63,94,0.40)}50%{box-shadow:0 0 24px rgba(244,63,94,0.45)}60%{transform:translateX(-3px);box-shadow:0 0 18px rgba(244,63,94,0.35)}80%{transform:translateX(3px);box-shadow:0 0 10px rgba(244,63,94,0.20)}}\n@keyframes defenderPulse{0%,100%{box-shadow:0 0 0 0 rgba(139,92,246,0),0 0 0 0 rgba(139,92,246,0),0 0 0 0 rgba(139,92,246,0)}50%{box-shadow:0 0 0 10px rgba(139,92,246,0.20),0 0 32px rgba(139,92,246,0.40),0 0 64px rgba(139,92,246,0.22)}}\n@keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}\n.page{animation:tabSlide 0.28s cubic-bezier(0.22,1,0.36,1) forwards;}\n.float{animation:floatY 3.5s ease-in-out infinite;}\n.glow{animation:glowPulse 3s ease-in-out infinite;}\n.border-pulse{animation:borderPulse 3s ease-in-out infinite;}\n.iup{animation:iUp 0.5s cubic-bezier(0.22,1,0.36,1) both;}\n.ipop{animation:iPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both;}\n.id1{animation-delay:0.15s;opacity:0;}.id2{animation-delay:0.35s;opacity:0;}.id3{animation-delay:0.55s;opacity:0;}\n.card-in{animation:cardIn 0.35s cubic-bezier(0.22,1,0.36,1) both;}\n.c0{animation-delay:0.04s;opacity:0}.c1{animation-delay:0.10s;opacity:0}.c2{animation-delay:0.16s;opacity:0}.c3{animation-delay:0.22s;opacity:0}.c4{animation-delay:0.28s;opacity:0}.c5{animation-delay:0.34s;opacity:0}.c6{animation-delay:0.40s;opacity:0}.c7{animation-delay:0.46s;opacity:0}.c8{animation-delay:0.52s;opacity:0}.c9{animation-delay:0.58s;opacity:0}\nbutton{transition:all 0.22s cubic-bezier(0.22,1,0.36,1);}\nbutton:active{opacity:0.82;transform:scale(0.96);}\n.tip{transition:border-color 0.25s cubic-bezier(0.22,1,0.36,1),transform 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s cubic-bezier(0.22,1,0.36,1);}\n.tip:active{transform:scale(0.99);}\n.train-pulse{animation:trainPulse 2.2s ease-in-out infinite;}\n.train-float{animation:trainFloat 3s ease-in-out infinite;}\n.nav-pop{animation:navPop 0.4s cubic-bezier(0.34,1.56,0.64,1);}\n.lock-shake{animation:lockShake 0.5s ease;}\n.defender-pulse{animation:defenderPulse 2.4s ease-in-out infinite;}\n.shimmer-locked{background:linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.03) 38%,rgba(255,255,255,0.10) 50%,rgba(255,255,255,0.03) 62%,transparent 80%);background-size:200% 100%;animation:shimmerSlide 2.6s ease-in-out infinite;}\n.brand-wordmark{font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:-0.3px;background:linear-gradient(110deg,#EDF0F7 40%,#F5A623);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}\n.brand-display{font-family:'Bebas Neue','Outfit',sans-serif;letter-spacing:0.5px;line-height:1;}\n.brand-headline-grad{background:linear-gradient(110deg,#fff 35%,#F5A623);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-family:'Bebas Neue','Outfit',sans-serif;letter-spacing:-0.5px;line-height:1.05;}\n.brand-btn-primary{background:linear-gradient(135deg,#F5A623,#C8820A);border:none;border-radius:9999px;padding:14px 28px;font-family:'Outfit',sans-serif;font-size:15px;font-weight:900;color:#000;cursor:pointer;letter-spacing:-0.2px;box-shadow:0 0 0 1px rgba(245,166,35,0.25),0 4px 14px rgba(245,166,35,0.32),0 14px 40px rgba(245,166,35,0.36),0 28px 80px rgba(245,166,35,0.20);transition:transform 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s cubic-bezier(0.22,1,0.36,1);}\n.brand-btn-primary:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 0 0 1px rgba(245,166,35,0.35),0 6px 18px rgba(245,166,35,0.42),0 18px 50px rgba(245,166,35,0.48),0 34px 96px rgba(245,166,35,0.28);}\n.brand-card{background:#12151A;border:1px solid rgba(255,255,255,0.11);border-radius:18px;padding:16px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.20);}\n";
(function () {
  var s = document.createElement('style');
  s.textContent = CSS;
  document.head.appendChild(s);
})();
function load(_x, _x2) {
  return _load.apply(this, arguments);
}
function _load() {
  _load = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(k, fb) {
    var v, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          v = localStorage.getItem(k);
          return _context.a(2, v ? JSON.parse(v) : fb);
        case 1:
          _context.p = 1;
          _t = _context.v;
          return _context.a(2, fb);
      }
    }, _callee, null, [[0, 1]]);
  }));
  return _load.apply(this, arguments);
}
function save(_x3, _x4) {
  return _save.apply(this, arguments);
}
function _save() {
  _save = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(k, v) {
    var _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          localStorage.setItem(k, JSON.stringify(v));
          return _context2.a(2, true);
        case 1:
          _context2.p = 1;
          _t2 = _context2.v;
          console.warn("Save failed:", k, _t2);
          return _context2.a(2, false);
      }
    }, _callee2, null, [[0, 1]]);
  }));
  return _save.apply(this, arguments);
}
var C = {
  bg: "#07080A",
  s1: "#0D0F13",
  s2: "#12151A",
  s3: "#1A1E26",
  border: "rgba(255,255,255,0.11)",
  amber: "#F5A623",
  amberD: "#C8820A",
  amberL: "#ffc84a",
  green: "#10B981",
  teal: "#06B6D4",
  blue: "#3B82F6",
  red: "#F43F5E",
  purple: "#8B5CF6",
  text: "#EDF0F7",
  text2: "#8B95A8",
  text3: "#6B7A8D",
  sans: "'Outfit',system-ui,sans-serif",
  display: "'Bebas Neue','Outfit',sans-serif",
  mono: "'JetBrains Mono','Courier New',monospace",
  r: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    full: 9999
  },
  sp: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 64,
    10: 80
  },
  sh: {
    1: "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.20)",
    2: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.18)",
    3: "0 8px 24px rgba(0,0,0,0.30), 0 18px 48px rgba(0,0,0,0.18), 0 24px 60px rgba(0,0,0,0.45)",
    hero: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04), 0 60px 120px -20px rgba(245,166,35,0.18)",
    amber: "0 0 0 1px rgba(245,166,35,0.25),0 4px 14px rgba(245,166,35,0.32),0 14px 40px rgba(245,166,35,0.36),0 28px 80px rgba(245,166,35,0.20)",
    amberHi: "0 0 0 1px rgba(245,166,35,0.35),0 6px 18px rgba(245,166,35,0.42),0 18px 50px rgba(245,166,35,0.48),0 34px 96px rgba(245,166,35,0.28)",
    accent: function accent(c) {
      return "0 0 0 1px ".concat(c, "33,0 4px 14px ").concat(c, "55,0 14px 36px ").concat(c, "55,0 28px 64px ").concat(c, "30");
    }
  },
  ease: {
    out: "cubic-bezier(0.22,1,0.36,1)",
    spring: "cubic-bezier(0.34,1.56,0.64,1)"
  }
};
var S = {
  wordmark: {
    background: "linear-gradient(110deg,".concat(C.text, " 40%,").concat(C.amber, ")"),
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    letterSpacing: "-0.3px"
  },
  headlineGrad: function headlineGrad() {
    var accent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : C.amber;
    return {
      background: "linear-gradient(110deg,#fff 35%,".concat(accent, ")"),
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontFamily: C.display,
      letterSpacing: "-0.5px",
      lineHeight: 1.05
    };
  },
  pageTitle: {
    fontFamily: C.display,
    fontSize: "clamp(22px,5vw,28px)",
    fontWeight: 400,
    letterSpacing: "0.5px",
    lineHeight: 1,
    color: C.text
  },
  btnPrimary: {
    background: "linear-gradient(135deg,".concat(C.amber, ",").concat(C.amberD, ")"),
    border: "none",
    borderRadius: C.r.full,
    padding: "14px 28px",
    fontFamily: C.sans,
    fontSize: 15,
    fontWeight: 900,
    color: "#000",
    cursor: "pointer",
    boxShadow: C.sh.amber,
    transition: "transform 0.25s ".concat(C.ease.out, ", box-shadow 0.25s ").concat(C.ease.out),
    letterSpacing: "-0.2px",
    WebkitTapHighlightColor: "transparent"
  },
  btnGhost: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: C.r.sm,
    padding: "7px 12px",
    fontFamily: C.sans,
    fontSize: 12,
    fontWeight: 800,
    color: C.text2,
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "background 0.18s ".concat(C.ease.out, ", color 0.18s ").concat(C.ease.out)
  },
  card: {
    background: C.s2,
    border: "1px solid ".concat(C.border),
    borderRadius: C.r.lg,
    padding: C.sp[4],
    boxShadow: C.sh[1]
  },
  modalSheet: {
    position: "relative",
    background: "linear-gradient(180deg,".concat(C.s2, ",").concat(C.s1, ")"),
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "".concat(C.r.xl, "px ").concat(C.r.xl, "px 0 0"),
    padding: C.sp[6],
    paddingBottom: C.sp[8],
    width: "100%",
    maxWidth: 430,
    zIndex: 1,
    boxShadow: C.sh[3]
  },
  modalScrim: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.78)"
  },
  modalGrip: {
    width: 40,
    height: 4,
    borderRadius: C.r.full,
    background: "rgba(255,255,255,0.15)",
    margin: "0 auto ".concat(C.sp[5], "px")
  },
  logoBox: function logoBox() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 38;
    return {
      width: size,
      height: size,
      borderRadius: size >= 60 ? C.r.xl : size >= 30 ? C.r.lg : C.r.sm,
      background: "linear-gradient(135deg,".concat(C.amber, ",").concat(C.amberD, ")"),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: size >= 60 ? C.sh.amber : C.sh[1]
    };
  }
};
function Toast(_ref) {
  var msg = _ref.msg,
    onDone = _ref.onDone;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    out = _useState2[0],
    setOut = _useState2[1];
  useEffect(function () {
    var t1 = setTimeout(function () {
      return setOut(true);
    }, 1600);
    var t2 = setTimeout(function () {
      return onDone();
    }, 2000);
    return function () {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    "aria-live": "polite",
    "aria-atomic": "true",
    style: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: 999,
      pointerEvents: "none",
      background: "rgba(16,185,129,0.95)",
      borderRadius: 16,
      padding: "14px 24px",
      fontSize: 14,
      fontWeight: 800,
      color: "#000",
      fontFamily: C.sans,
      animation: out ? "toastOut 0.4s ease forwards" : "toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
      boxShadow: "0 0 0 1px rgba(16,185,129,0.30),0 6px 18px rgba(16,185,129,0.32),0 14px 40px rgba(16,185,129,0.32),0 28px 72px rgba(16,185,129,0.20)",
      whiteSpace: "nowrap"
    }
  }, "\u2713 ", msg);
}
function QuickSituationsCarousel(_ref2) {
  var lang = _ref2.lang,
    onCardClick = _ref2.onCardClick;
  var t = function t(en, es) {
    return lang === "en" ? en : es;
  };
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    scrollPos = _useState4[0],
    setScrollPos = _useState4[1];
  var scrollRef = useRef(null);
  var situations = pick(lang, QUICK_SITUATIONS, QUICK_SITUATIONS_ES);
  var cardWidth = 280;
  var gap = 12;
  var cardsPerView = 2.3;
  var dotIdx = Math.round(scrollPos / (cardWidth + gap));
  function handleScroll(e) {
    setScrollPos(e.target.scrollLeft);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.amber,
      letterSpacing: "1px",
      textTransform: "uppercase",
      paddingLeft: 2,
      marginBottom: 12
    }
  }, t("🚀 Quick Help", "🚀 Ayuda Rápida")), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    onScroll: handleScroll,
    style: {
      display: "flex",
      gap: "".concat(gap, "px"),
      overflowX: "auto",
      paddingBottom: 8,
      scrollBehavior: "smooth",
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
      msOverflowStyle: "none",
      scrollbarWidth: "none"
    }
  }, situations.map(function (sit, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: function onClick() {
        return onCardClick(i);
      },
      style: {
        flex: "0 0 ".concat(cardWidth, "px"),
        minWidth: "".concat(cardWidth, "px"),
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        background: "linear-gradient(135deg,".concat(C.s2, ",").concat(C.s1, ")"),
        border: "1px solid ".concat(C.border),
        borderRadius: 18,
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 16px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.18)",
        transition: "all 0.2s ease",
        cursor: "pointer"
      },
      onMouseEnter: function onMouseEnter(e) {
        e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px rgba(0,0,0,0.35), 0 22px 48px rgba(0,0,0,0.28), 0 0 0 1px rgba(245,166,35,0.18)";
        e.currentTarget.style.transform = "translateY(-2px)";
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 16px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.18)";
        e.currentTarget.style.transform = "translateY(0)";
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 64,
        marginBottom: 12,
        display: "block"
      }
    }, sit.e), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 16,
        fontWeight: 800,
        marginBottom: 6,
        color: C.text,
        lineHeight: 1.3
      }
    }, lang === "en" ? sit.l : sit.le), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: C.text2,
        margin: 0,
        lineHeight: 1.4
      }
    }, t("Tap to explore", "Toca para explorar")));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      justifyContent: "center",
      marginTop: 10
    }
  }, situations.map(function (_, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: dotIdx === i ? 24 : 6,
        height: 6,
        borderRadius: 99,
        background: dotIdx === i ? C.amber : "rgba(255,255,255,0.2)",
        transition: "all 0.3s ease"
      }
    });
  })), /*#__PURE__*/React.createElement("style", null, "\n        div::-webkit-scrollbar { display: none; }\n      "));
}
function IntroAnimation(_ref3) {
  var onDone = _ref3.onDone,
    lang = _ref3.lang;
  var t = function t(en, es) {
    return lang === "en" ? en : es;
  };
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    scene = _useState6[0],
    setScene = _useState6[1];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    progress = _useState8[0],
    setProgress = _useState8[1];
  var TOTAL = 32000;
  var SCENES = [{
    id: 0,
    start: 0
  }, {
    id: 1,
    start: 4500
  }, {
    id: 2,
    start: 9500
  }, {
    id: 3,
    start: 14500
  }, {
    id: 4,
    start: 19000
  }, {
    id: 5,
    start: 23500
  }, {
    id: 6,
    start: 28000
  }];
  useEffect(function () {
    var t0 = Date.now();
    var _tick = function tick() {
      var elapsed = Date.now() - t0;
      setProgress(Math.min(elapsed / TOTAL * 100, 100));
      for (var i = SCENES.length - 1; i >= 0; i--) {
        if (elapsed >= SCENES[i].start) {
          setScene(SCENES[i].id);
          break;
        }
      }
      if (elapsed < TOTAL) {
        requestAnimationFrame(_tick);
      } else {
        setTimeout(onDone, 400);
      }
    };
    requestAnimationFrame(_tick);
  }, []);
  var A = C.amber,
    G = C.green,
    B = C.blue,
    T = C.teal,
    P = C.purple;
  var ss = function ss(n) {
    return {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "36px 28px",
      opacity: scene === n ? 1 : 0,
      transition: "opacity 0.5s ease",
      pointerEvents: scene === n ? "auto" : "none"
    };
  };
  var Divider = function Divider(_ref4) {
    var _ref4$color = _ref4.color,
      color = _ref4$color === void 0 ? A : _ref4$color;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 2,
        borderRadius: 99,
        background: "linear-gradient(90deg,".concat(color, ",#fff)"),
        margin: "0 auto 16px",
        opacity: 0,
        animation: "iUp 0.4s 0.35s cubic-bezier(0.22,1,0.36,1) both"
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: C.bg,
      zIndex: 999,
      fontFamily: C.sans,
      color: C.text,
      overflow: "hidden",
      maxWidth: 430,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      height: 3,
      width: "".concat(progress, "%"),
      background: "linear-gradient(90deg,".concat(A, ",#ffd280)"),
      boxShadow: "0 0 8px rgba(245,166,35,0.85),0 0 18px rgba(245,166,35,0.45)",
      transition: "width 0.08s linear",
      zIndex: 10
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.22)",
      borderRadius: 20,
      padding: "7px 16px",
      color: "rgba(255,255,255,0.7)",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      zIndex: 10,
      fontFamily: C.sans
    }
  }, t("Skip →", "Omitir →")), /*#__PURE__*/React.createElement("div", {
    style: ss(0)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -60,
      right: -40,
      width: 240,
      height: 240,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(245,166,35,0.15),transparent 68%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ipop",
    style: {
      width: 76,
      height: 76,
      borderRadius: 24,
      background: "linear-gradient(135deg,".concat(A, ",#C8820A)"),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 22,
      boxShadow: "0 0 0 1px rgba(245,166,35,0.20),0 4px 14px rgba(245,166,35,0.32),0 14px 40px rgba(245,166,35,0.36),0 28px 80px rgba(245,166,35,0.22)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "38",
    height: "38",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      filter: "drop-shadow(0 0 12px rgba(255,255,255,0.35))"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 10 L3 6 L8 4 L10 2 L12 4 L17 6 L19 10 L17.5 18 L2.5 18 Z",
    fill: "white"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 2 L10 18",
    stroke: "white",
    strokeWidth: "0.8",
    opacity: "0.4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 4 L12 4",
    stroke: "white",
    strokeWidth: "1",
    opacity: "0.6",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: _objectSpread(_objectSpread({}, S.headlineGrad(A)), {}, {
      fontSize: 48,
      marginBottom: 6,
      textAlign: "center"
    })
  }, "DropPilot"), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.3)",
      letterSpacing: "4px",
      fontWeight: 700,
      textTransform: "uppercase",
      marginBottom: 24
    }
  }, t("Customer Service · Gig Edition", "Servicio al Cliente · Edición Gig")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: "iup id2",
    style: {
      fontSize: 15,
      color: "rgba(255,255,255,0.55)",
      textAlign: "center",
      lineHeight: 1.9,
      fontWeight: 500
    }
  }, t("The first customer service app", "La primera app de servicio al cliente"), /*#__PURE__*/React.createElement("br", null), t("built specifically for gig drivers.", "hecha específicamente para conductores de apps."), /*#__PURE__*/React.createElement("br", null), t("The delivery is the task.", "La entrega es la tarea."), /*#__PURE__*/React.createElement("br", null), t("The service is the job.", "El servicio es el trabajo."))), /*#__PURE__*/React.createElement("div", {
    style: ss(1)
  }, /*#__PURE__*/React.createElement("div", {
    className: "iup",
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "rgba(245,166,35,0.7)",
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 18
    }
  }, t("what your job actually is", "cuál es tu trabajo en realidad")), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: _objectSpread(_objectSpread({}, S.headlineGrad(A)), {}, {
      fontSize: 34,
      lineHeight: 1.15,
      textAlign: "center",
      marginBottom: 20
    })
  }, t("You don't get rated", "No te califican"), /*#__PURE__*/React.createElement("br", null), t("on speed.", "por velocidad."), /*#__PURE__*/React.createElement("br", null), t("You get rated on", "Te califican por"), /*#__PURE__*/React.createElement("br", null), t("how you made them feel.", "cómo los hiciste sentir.")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: "iup id2",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%"
    }
  }, [[t("Your rating is a customer service score — every delivery adds to it.", "Tu calificación es un puntaje de servicio al cliente — cada entrega suma."), "rgba(245,166,35,0.08)", "rgba(245,166,35,0.25)"], [t("Tips are emotional, not logical. Customers tip how they felt, not how fast you were.", "Las propinas son emocionales, no lógicas. Los clientes dan propina según cómo se sintieron, no según tu velocidad."), "rgba(59,130,246,0.08)", "rgba(59,130,246,0.25)"], [t("Drivers who master service earn significantly more. Same roads. Same apps.", "Los conductores que dominan el servicio ganan mucho más. Mismas calles. Mismas apps."), "rgba(16,185,129,0.08)", "rgba(16,185,129,0.25)"]].map(function (_ref5, i) {
    var _ref6 = _slicedToArray(_ref5, 3),
      t = _ref6[0],
      bg = _ref6[1],
      border = _ref6[2];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "iup",
      style: {
        padding: "12px 15px",
        background: bg,
        border: "1px solid ".concat(border),
        borderRadius: 13,
        animationDelay: "".concat(0.3 + i * 0.14, "s"),
        opacity: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 1.55,
        fontWeight: 600
      }
    }, t));
  }))), /*#__PURE__*/React.createElement("div", {
    style: ss(2)
  }, /*#__PURE__*/React.createElement("div", {
    className: "iup",
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "rgba(139,92,246,0.7)",
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 18
    }
  }, t("the service gap", "la brecha del servicio")), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: _objectSpread(_objectSpread({}, S.headlineGrad(P)), {}, {
      fontSize: 34,
      lineHeight: 1.15,
      textAlign: "center",
      marginBottom: 20
    })
  }, t("Most gig drivers", "La mayoría de los conductores"), /*#__PURE__*/React.createElement("br", null), t("were never taught", "nunca aprendieron"), /*#__PURE__*/React.createElement("br", null), t("customer service.", "servicio al cliente."), /*#__PURE__*/React.createElement("br", null), t("That's the gap.", "Esa es la brecha.")), /*#__PURE__*/React.createElement(Divider, {
    color: P
  }), /*#__PURE__*/React.createElement("div", {
    className: "iup id2",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9,
      width: "100%"
    }
  }, [["📞", t("Built by someone who managed call center teams processing support tickets daily — who knows exactly how your appeals get read and what actually gets your account reinstated.", "Creado por alguien que dirigió equipos de call center procesando tickets de soporte a diario — que sabe exactamente cómo se leen tus apelaciones y qué logra que te reactiven la cuenta.")], ["🏨", t("Hotel front desk management means face-to-face de-escalation with guests who feel entitled. The customer scripts come directly from that experience — not from a textbook.", "La experiencia en recepción de hotel significa calmar cara a cara a huéspedes exigentes. Los mensajes para clientes vienen directo de esa experiencia — no de un libro.")], ["🚗", t("DropPilot brings real professional service experience to gig drivers. The person who built this has managed both sides of the counter.", "DropPilot trae experiencia real de servicio profesional a los conductores. Quien creó esto ha estado en ambos lados del mostrador.")]].map(function (_ref7, i) {
    var _ref8 = _slicedToArray(_ref7, 2),
      e = _ref8[0],
      t = _ref8[1];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "iup",
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 14px",
        background: "rgba(139,92,246,0.06)",
        border: "1px solid rgba(139,92,246,0.18)",
        borderRadius: 13,
        animationDelay: "".concat(0.28 + i * 0.14, "s"),
        opacity: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        flexShrink: 0,
        marginTop: 1
      }
    }, e), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "rgba(255,255,255,0.72)",
        lineHeight: 1.6,
        fontWeight: 500
      }
    }, t));
  }))), /*#__PURE__*/React.createElement("div", {
    style: ss(3)
  }, /*#__PURE__*/React.createElement("div", {
    className: "iup",
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "rgba(245,166,35,0.7)",
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 18
    }
  }, t("five sections. one toolkit.", "cinco secciones. un kit.")), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: _objectSpread(_objectSpread({}, S.headlineGrad(A)), {}, {
      fontSize: 34,
      lineHeight: 1.15,
      textAlign: "center",
      marginBottom: 20
    })
  }, t("Scripts. Habits. Defense.", "Mensajes. Hábitos. Defensa."), /*#__PURE__*/React.createElement("br", null), t("Training. All built for", "Capacitación. Todo hecho para"), /*#__PURE__*/React.createElement("br", null), t("the real job.", "el trabajo real.")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: "iup id2",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%"
    }
  }, [["⭐", A, t("Earn", "Ganar"), t("Service habits and psychology that raise your rating and tips", "Hábitos de servicio y psicología que suben tu calificación y propinas")], ["💬", B, t("Scripts", "Mensajes"), t("Word-for-word messages for every customer situation", "Mensajes palabra por palabra para cada situación con clientes")], ["📖", T, t("Basics", "Básicos"), t("Platform rules, policies, and how gig work actually works", "Reglas, políticas y cómo funciona en realidad este trabajo")], ["🛡️", P, t("Defend", "Defensa"), t("Protect your account when complaints and disputes happen", "Protege tu cuenta cuando haya quejas y disputas")], ["🎓", A, t("Training", "Capacitación"), t("Customer service lessons backed by real research", "Lecciones de servicio al cliente respaldadas por investigación real")]].map(function (_ref9, i) {
    var _ref0 = _slicedToArray(_ref9, 4),
      e = _ref0[0],
      col = _ref0[1],
      label = _ref0[2],
      desc = _ref0[3];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "iup",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12,
        animationDelay: "".concat(0.25 + i * 0.1, "s"),
        opacity: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 9,
        background: "".concat(col, "15"),
        border: "1px solid ".concat(col, "30"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        flexShrink: 0
      }
    }, e), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: col,
        marginBottom: 1
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "rgba(255,255,255,0.45)",
        lineHeight: 1.3
      }
    }, desc)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: ss(4)
  }, /*#__PURE__*/React.createElement("div", {
    className: "iup",
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "rgba(6,182,212,0.7)",
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 18
    }
  }, t("built for every platform", "hecho para cada plataforma")), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: _objectSpread(_objectSpread({}, S.headlineGrad(T)), {}, {
      fontSize: 36,
      lineHeight: 1.15,
      textAlign: "center",
      marginBottom: 20
    })
  }, "DoorDash. Uber Eats.", /*#__PURE__*/React.createElement("br", null), "Instacart. Lyft. Flex."), /*#__PURE__*/React.createElement(Divider, {
    color: T
  }), /*#__PURE__*/React.createElement("div", {
    className: "iup id2",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%"
    }
  }, [["🍔", "#FF3008", "DoorDash", t("Habits, scripts, and appeal letters built for DD drivers", "Hábitos, mensajes y cartas de apelación para conductores DD")], ["🛵", "#06C167", "Uber Eats", t("Service tips, rating recovery, and dispute templates", "Consejos de servicio, recuperación de calificación y plantillas de disputas")], ["🛒", "#43B02A", "Instacart", t("Shopper etiquette, substitution handling, and IC appeals", "Etiqueta de comprador, manejo de sustituciones y apelaciones IC")], ["🚙", "#FF00BF", "Lyft", t("Passenger service, rating protection, and driver tips", "Servicio a pasajeros, protección de calificación y consejos")], ["📦", "#FF9900", "Flex", t("Block scheduling, standing protection, and TBA handling", "Programación de bloques, protección de nivel y manejo de TBA")]].map(function (_ref1, i) {
    var _ref10 = _slicedToArray(_ref1, 4),
      e = _ref10[0],
      col = _ref10[1],
      label = _ref10[2],
      desc = _ref10[3];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "iup",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: "rgba(6,182,212,0.05)",
        border: "1px solid rgba(6,182,212,0.15)",
        borderRadius: 12,
        animationDelay: "".concat(0.25 + i * 0.1, "s"),
        opacity: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 9,
        background: "".concat(col, "18"),
        border: "1px solid ".concat(col, "35"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        flexShrink: 0
      }
    }, e), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: "rgba(255,255,255,0.85)",
        marginBottom: 1
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "rgba(255,255,255,0.4)",
        lineHeight: 1.3
      }
    }, desc)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: ss(5)
  }, /*#__PURE__*/React.createElement("div", {
    className: "iup",
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "rgba(245,166,35,0.7)",
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 18
    }
  }, t("elite access — $10 one time", "acceso elite — $10 una vez")), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: _objectSpread(_objectSpread({}, S.headlineGrad(A)), {}, {
      fontSize: 36,
      lineHeight: 1.15,
      textAlign: "center",
      marginBottom: 20
    })
  }, t("Lifetime access.", "Acceso de por vida."), /*#__PURE__*/React.createElement("br", null), t("Every update", "Cada actualización"), /*#__PURE__*/React.createElement("br", null), t("we ever ship.", "que lanzamos.")), /*#__PURE__*/React.createElement(Divider, {
    color: G
  }), /*#__PURE__*/React.createElement("div", {
    className: "iup id2",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      width: "100%"
    }
  }, [["💬", B, t("30+ Scripts", "30+ Mensajes")], ["🛡️", P, t("Appeal Letters", "Cartas de Apelación")], ["🎓", A, t("Lessons", "Lecciones")], ["🧠", G, t("Psychology", "Psicología")], ["🎯", T, t("Scenarios", "Escenarios")], ["💰", A, t("Tip Science", "Ciencia de Propinas")]].map(function (_ref11, i) {
    var _ref12 = _slicedToArray(_ref11, 3),
      e = _ref12[0],
      col = _ref12[1],
      label = _ref12[2];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "".concat(col, "08"),
        border: "1px solid ".concat(col, "20"),
        borderRadius: 12,
        padding: "11px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, e), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: col
      }
    }, label));
  }))), /*#__PURE__*/React.createElement("div", {
    style: ss(6)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -80,
      left: "50%",
      transform: "translateX(-50%)",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(245,166,35,0.18),transparent 65%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      background: "linear-gradient(90deg,transparent,".concat(A, "70,transparent)")
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ipop",
    style: {
      width: 76,
      height: 76,
      borderRadius: 24,
      background: "linear-gradient(135deg,".concat(A, ",#C8820A)"),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 18px",
      boxShadow: "0 0 0 1px rgba(245,166,35,0.20),0 4px 14px rgba(245,166,35,0.32),0 14px 40px rgba(245,166,35,0.36),0 28px 80px rgba(245,166,35,0.22)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "38",
    height: "38",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      filter: "drop-shadow(0 0 12px rgba(255,255,255,0.35))"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 10 L3 6 L8 4 L10 2 L12 4 L17 6 L19 10 L17.5 18 L2.5 18 Z",
    fill: "white"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 2 L10 18",
    stroke: "white",
    strokeWidth: "0.8",
    opacity: "0.4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 4 L12 4",
    stroke: "white",
    strokeWidth: "1",
    opacity: "0.6",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: _objectSpread(_objectSpread({}, S.headlineGrad(A)), {}, {
      fontSize: 48,
      marginBottom: 4,
      textAlign: "center"
    })
  }, "DropPilot"), /*#__PURE__*/React.createElement("div", {
    className: "iup id1",
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.28)",
      letterSpacing: "4px",
      fontWeight: 700,
      textTransform: "uppercase",
      marginBottom: 22
    }
  }, t("Customer Service · Gig Edition", "Servicio al Cliente · Edición Gig")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 2,
      borderRadius: 99,
      background: "linear-gradient(90deg,".concat(A, ",#fff)"),
      margin: "0 auto 22px",
      animation: "iUp 0.4s 0.28s both",
      opacity: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "iup id2",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      marginBottom: 26,
      width: "100%"
    }
  }, [["⭐", t("Earn", "Ganar"), A, t("Free", "Gratis")], ["💬", t("Scripts", "Mensajes"), B, t("Elite", "Elite")], ["📖", t("Basics", "Básicos"), T, t("Elite", "Elite")], ["🛡️", t("Defend", "Defensa"), P, t("Elite", "Elite")], ["🎓", t("Training", "Capacitación"), A, t("Elite", "Elite")]].map(function (_ref13, i) {
    var _ref14 = _slicedToArray(_ref13, 4),
      e = _ref14[0],
      t = _ref14[1],
      col = _ref14[2],
      badge = _ref14[3];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "iup",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "9px 14px",
        background: "rgba(255,255,255,0.04)",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.07)",
        animationDelay: "".concat(0.25 + i * 0.09, "s"),
        opacity: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        flexShrink: 0
      }
    }, e), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "rgba(255,255,255,0.75)",
        fontWeight: 600,
        flex: 1
      }
    }, t), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        padding: "3px 9px",
        borderRadius: 6,
        background: badge === t("Free", "Gratis") ? "rgba(16,185,129,0.15)" : "rgba(245,166,35,0.12)",
        color: badge === t("Free", "Gratis") ? G : A,
        border: "1px solid ".concat(badge === t("Free", "Gratis") ? "rgba(16,185,129,0.3)" : "rgba(245,166,35,0.25)")
      }
    }, badge));
  })), /*#__PURE__*/React.createElement("div", {
    className: "iup id3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: _objectSpread(_objectSpread({}, S.btnPrimary), {}, {
      padding: "15px 44px",
      fontSize: 16
    })
  }, t("Let's Go →", "¡Vamos! →"))), /*#__PURE__*/React.createElement("div", {
    className: "iup",
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.2)",
      marginTop: 14,
      animationDelay: "0.75s",
      opacity: 0
    }
  }, t("Free to explore · Elite access $10 · Lifetime · Free updates forever", "Gratis para explorar · Acceso Elite $10 · De por vida · Actualizaciones gratis para siempre")))));
}
function ScenarioTrainer(_ref15) {
  var lang = _ref15.lang;
  var t = function t(en, es) {
    return lang === "en" ? en : es;
  };
  var _useState9 = useState(0),
    _useState0 = _slicedToArray(_useState9, 2),
    idx = _useState0[0],
    setIdx = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    chosen = _useState10[0],
    setChosen = _useState10[1];
  var SCN = pick(lang, SCENARIOS, SCENARIOS_ES);
  var sc = SCN[idx % SCN.length];
  var diffColor = {
    high: C.red,
    medium: C.amber,
    low: C.green
  };
  var next = function next() {
    setIdx(idx + 1);
    setChosen(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.text3,
      fontWeight: 700,
      letterSpacing: "0.5px"
    }
  }, t("SCENARIO", "ESCENARIO"), " ", idx % SCN.length + 1, " ", t("OF", "DE"), " ", SCN.length), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "".concat(diffColor[sc.difficulty], "15"),
      border: "1px solid ".concat(diffColor[sc.difficulty], "35"),
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 10,
      fontWeight: 800,
      color: diffColor[sc.difficulty],
      textTransform: "uppercase"
    }
  }, sc.difficulty)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.s1,
      border: "1px solid ".concat(C.border),
      borderRadius: 16,
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: C.text3,
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, sc.e, " ", sc.tag), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: C.text,
      lineHeight: 1.75,
      fontWeight: 500
    }
  }, sc.situation)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, sc.choices.map(function (ch, i) {
    var isChosen = chosen === i;
    var revealed = chosen !== null;
    var ok = ch.correct;
    var bc = !revealed ? C.border : ok ? "#10B981" : isChosen ? "#F43F5E" : C.border;
    var bg = !revealed ? C.s1 : ok ? "rgba(16,185,129,0.08)" : isChosen ? "rgba(244,63,94,0.06)" : C.s1;
    return /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        if (chosen === null) setChosen(i);
      },
      style: {
        background: bg,
        border: "1px solid ".concat(bc),
        borderRadius: 13,
        padding: "13px 14px",
        width: "100%",
        textAlign: "left",
        cursor: chosen === null ? "pointer" : "default",
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        transition: "all 0.18s",
        fontFamily: C.sans,
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: !revealed ? "rgba(255,255,255,0.06)" : ok ? "rgba(16,185,129,0.2)" : isChosen ? "rgba(244,63,94,0.2)" : "rgba(255,255,255,0.04)",
        border: "1.5px solid ".concat(bc),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 900,
        color: !revealed ? C.text3 : ok ? C.green : isChosen ? C.red : C.text3,
        flexShrink: 0,
        marginTop: 1
      }
    }, !revealed ? String.fromCharCode(65 + i) : ok ? "✓" : isChosen ? "✗" : String.fromCharCode(65 + i)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: revealed && !ok && !isChosen ? C.text3 : C.text,
        lineHeight: 1.55,
        fontWeight: 500
      }
    }, ch.text)), revealed && isChosen && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        padding: "11px 14px",
        background: ok ? "rgba(16,185,129,0.07)" : "rgba(244,63,94,0.06)",
        border: "1px solid ".concat(ok ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.15)"),
        borderRadius: 11,
        fontSize: 12,
        color: C.text2,
        lineHeight: 1.65
      }
    }, ok && sc.rule && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.display,
        fontSize: 18,
        letterSpacing: "0.5px",
        lineHeight: 1.05,
        color: C.amberL,
        marginBottom: 6
      }
    }, sc.rule), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        color: ok ? C.green : C.red,
        marginRight: 6
      }
    }, ok ? "✓ Right —" : "✗ Not ideal —"), ch.why), revealed && !isChosen && ok && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        padding: "11px 14px",
        background: "rgba(16,185,129,0.07)",
        border: "1px solid rgba(16,185,129,0.2)",
        borderRadius: 11,
        fontSize: 12,
        color: C.text2,
        lineHeight: 1.65
      }
    }, sc.rule && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.display,
        fontSize: 18,
        letterSpacing: "0.5px",
        lineHeight: 1.05,
        color: C.amberL,
        marginBottom: 6
      }
    }, sc.rule), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        color: C.green,
        marginRight: 6
      }
    }, t("✓ Best response —", "✓ Mejor respuesta —")), ch.why));
  })), chosen !== null && /*#__PURE__*/React.createElement("button", {
    onClick: next,
    style: {
      background: "linear-gradient(135deg,".concat(C.amber, ",").concat(C.amberD, ")"),
      border: "none",
      borderRadius: 13,
      padding: "14px",
      fontSize: 14,
      fontWeight: 800,
      color: "#000",
      cursor: "pointer",
      width: "100%",
      WebkitTapHighlightColor: "transparent"
    }
  }, idx % SCN.length === SCN.length - 1 ? t("Start Over →", "Empezar de Nuevo →") : t("Next Scenario →", "Siguiente Escenario →")));
}
function VideoPlayer(_ref16) {
  var video = _ref16.video,
    lang = _ref16.lang;
  var t = function t(en, es) {
    return lang === "en" ? en : es;
  };
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    scene = _useState12[0],
    setScene = _useState12[1];
  var _useState13 = useState(0),
    _useState14 = _slicedToArray(_useState13, 2),
    progress = _useState14[0],
    setProgress = _useState14[1];
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    playing = _useState16[0],
    setPlaying = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    quizPhase = _useState18[0],
    setQuizPhase = _useState18[1];
  var _useState19 = useState(0),
    _useState20 = _slicedToArray(_useState19, 2),
    quizIdx = _useState20[0],
    setQuizIdx = _useState20[1];
  var _useState21 = useState(null),
    _useState22 = _slicedToArray(_useState21, 2),
    answered = _useState22[0],
    setAnswered = _useState22[1];
  var elapsed = useRef(0);
  var rafRef = useRef(null);
  var t0Ref = useRef(null);
  useEffect(function () {
    restart(false);
    return function () {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [video.id]);
  function restart() {
    var autoplay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    elapsed.current = 0;
    t0Ref.current = null;
    setScene(0);
    setProgress(0);
    setPlaying(autoplay);
    setQuizPhase(null);
    setQuizIdx(0);
    setAnswered(null);
    if (autoplay) rafRef.current = requestAnimationFrame(tick);
  }
  function tick(ts) {
    if (!t0Ref.current) t0Ref.current = ts;
    elapsed.current = ts - t0Ref.current;
    setProgress(Math.min(elapsed.current / video.dur * 100, 100));
    var sc = 0;
    for (var i = video.scenes.length - 1; i >= 0; i--) {
      if (elapsed.current >= video.scenes[i].t) {
        sc = i;
        break;
      }
    }
    setScene(sc);
    if (elapsed.current < video.dur) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      var _pick$video$id;
      setPlaying(false);
      if ((_pick$video$id = pick(lang, QUIZZES, QUIZZES_ES)[video.id]) !== null && _pick$video$id !== void 0 && _pick$video$id.length) setQuizPhase('quiz');
    }
  }
  function togglePlay() {
    if (!playing && elapsed.current >= video.dur) {
      restart(true);
      return;
    }
    if (playing) {
      cancelAnimationFrame(rafRef.current);
      setPlaying(false);
    } else {
      var saved = elapsed.current;
      t0Ref.current = null;
      rafRef.current = requestAnimationFrame(function (ts) {
        t0Ref.current = ts - saved;
        tick(ts);
      });
      setPlaying(true);
    }
  }
  function jumpToScene(si) {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    var targetMs = video.scenes[si].t;
    elapsed.current = targetMs;
    t0Ref.current = null;
    setScene(si);
    setProgress(targetMs / video.dur * 100);
    var saved = targetMs;
    rafRef.current = requestAnimationFrame(function (ts) {
      t0Ref.current = ts - saved;
      tick(ts);
    });
    setPlaying(true);
  }
  var sc = video.scenes[scene];
  var vc = video.color;
  var A = "#F5A623",
    G = "#10B981",
    R = "#F43F5E";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: 22,
      overflow: "hidden",
      background: "#07080A",
      border: "1px solid ".concat(vc, "30")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      height: 4,
      width: "".concat(progress, "%"),
      background: "linear-gradient(90deg,".concat(vc, ",#fff)"),
      boxShadow: "0 0 8px ".concat(vc, "cc,0 0 20px ").concat(vc, "66"),
      transition: "width 0.1s linear",
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -5,
      top: -3,
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 0 8px ".concat(vc, ",0 0 16px ").concat(vc, "80")
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 320,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "28px 22px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -40,
      right: -30,
      width: 180,
      height: 180,
      borderRadius: "50%",
      background: "radial-gradient(circle,".concat(vc, "20,transparent 65%)"),
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -40,
      left: -20,
      width: 140,
      height: 140,
      borderRadius: "50%",
      background: "radial-gradient(circle,".concat(vc, "15,transparent 65%)"),
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    key: "".concat(video.id, "-").concat(scene),
    style: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }
  }, sc.tag && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: vc,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      animation: "vUp 0.4s cubic-bezier(0.22,1,0.36,1) both",
      background: "".concat(vc, "15"),
      border: "1px solid ".concat(vc, "35"),
      borderRadius: 99,
      padding: "4px 12px"
    }
  }, sc.tag), sc.emoji && !sc.stat && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: sc.hed ? 48 : 64,
      animation: "vPop 0.4s 0.1s cubic-bezier(0.34,1.56,0.64,1) both",
      opacity: 0
    }
  }, sc.emoji), sc.stat && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 72,
      fontWeight: 900,
      letterSpacing: "-3px",
      color: G,
      lineHeight: 1,
      animation: "vPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both"
    }
  }, sc.stat), sc.statSub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: "rgba(255,255,255,0.8)",
      animation: "vUp 0.4s 0.15s both",
      opacity: 0
    }
  }, sc.statSub), sc.hed && /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, S.headlineGrad(vc)), {}, {
      fontSize: sc.hed.length > 30 ? 32 : 38,
      lineHeight: 1.15,
      textAlign: "center",
      whiteSpace: "pre-line",
      animation: "vUp 0.5s 0.15s ".concat(C.ease.out, " both"),
      opacity: 0
    })
  }, sc.hed), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 2,
      borderRadius: 99,
      background: "linear-gradient(90deg,".concat(vc, ",#fff)"),
      animation: "vFade 0.4s 0.3s both",
      opacity: 0
    }
  }), sc.sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.55)",
      textAlign: "center",
      lineHeight: 1.75,
      animation: "vUp 0.5s 0.3s both",
      opacity: 0
    }
  }, sc.sub.split('\n').map(function (line, i, arr) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, line, i < arr.length - 1 && /*#__PURE__*/React.createElement("br", null));
  })), sc.hi && /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      background: "".concat(sc.hi.color, "10"),
      border: "1px solid ".concat(sc.hi.color, "40"),
      borderRadius: 12,
      padding: "11px 14px",
      animation: "vUp 0.5s 0.45s both",
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: sc.hi.color,
      lineHeight: 1.7,
      whiteSpace: "pre-line"
    }
  }, sc.hi.text)), sc.cite && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.25)",
      fontStyle: "italic",
      textAlign: "center",
      animation: "vFade 0.4s 0.6s both",
      opacity: 0
    }
  }, sc.cite), sc.vs && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      width: "100%",
      animation: "vUp 0.5s 0.3s both",
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "".concat(R, "10"),
      border: "1px solid ".concat(R, "30"),
      borderRadius: 12,
      padding: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: R,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 6
    }
  }, sc.vs.bad[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.5)",
      fontStyle: "italic",
      lineHeight: 1.5
    }
  }, sc.vs.bad[1])), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "".concat(G, "10"),
      border: "1px solid ".concat(G, "30"),
      borderRadius: 12,
      padding: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: G,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 6
    }
  }, sc.vs.good[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.7)",
      fontStyle: "italic",
      lineHeight: 1.5
    }
  }, sc.vs.good[1]))), sc.why && /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      background: "".concat(sc.why.color, "10"),
      border: "1px solid ".concat(sc.why.color, "35"),
      borderRadius: 12,
      padding: "11px 14px",
      animation: "vUp 0.5s 0.45s both",
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: sc.why.color,
      lineHeight: 1.7
    }
  }, sc.why.text)), sc.vs2 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%",
      animation: "vUp 0.5s 0.3s both",
      opacity: 0
    }
  }, sc.vs2.map(function (_ref17, i) {
    var _ref18 = _slicedToArray(_ref17, 4),
      e = _ref18[0],
      label = _ref18[1],
      txt = _ref18[2],
      col = _ref18[3];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: "".concat(col, "10"),
        border: "1px solid ".concat(col, "25"),
        borderRadius: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 22,
        flexShrink: 0
      }
    }, e), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: col,
        marginBottom: 3
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "rgba(255,255,255,0.55)",
        lineHeight: 1.5
      }
    }, txt)));
  })), sc.math && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      width: "100%",
      animation: "vUp 0.5s 0.3s both",
      opacity: 0
    }
  }, sc.math.map(function (_ref19, i) {
    var _ref20 = _slicedToArray(_ref19, 3),
      label = _ref20[0],
      val = _ref20[1],
      big = _ref20[2];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: big ? "rgba(245,166,35,0.1)" : "rgba(255,255,255,0.04)",
        borderRadius: 12,
        padding: "10px 14px",
        border: big ? "1px solid rgba(245,166,35,0.3)" : "1px solid rgba(255,255,255,0.07)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: big ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
        fontWeight: big ? 700 : 400
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: big ? 20 : 15,
        fontWeight: 900,
        color: A
      }
    }, val));
  })), sc.listBad && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      width: "100%",
      animation: "vUp 0.5s 0.2s both",
      opacity: 0
    }
  }, sc.listBad.map(function (t, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        background: "".concat(R, "10"),
        border: "1px solid ".concat(R, "25"),
        borderRadius: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: R,
        fontWeight: 900,
        fontSize: 14
      }
    }, "\u2717"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "rgba(255,255,255,0.6)"
      }
    }, t));
  })), sc.listGood && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      width: "100%",
      animation: "vUp 0.5s 0.2s both",
      opacity: 0
    }
  }, sc.listGood.map(function (_ref21, i) {
    var _ref22 = _slicedToArray(_ref21, 2),
      e = _ref22[0],
      t = _ref22[1];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        background: "".concat(G, "10"),
        border: "1px solid ".concat(G, "25"),
        borderRadius: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        flexShrink: 0
      }
    }, e), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "rgba(255,255,255,0.8)",
        fontWeight: 600
      }
    }, t));
  })), sc.bars && /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      animation: "vUp 0.5s 0.3s both",
      opacity: 0
    }
  }, sc.bars.map(function (_ref23, i) {
    var _ref24 = _slicedToArray(_ref23, 4),
      label = _ref24[0],
      stars = _ref24[1],
      pct = _ref24[2],
      col = _ref24[3];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        marginBottom: i < sc.bars.length - 1 ? 14 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        color: "rgba(255,255,255,0.45)",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, stars)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(255,255,255,0.07)",
        borderRadius: 99,
        height: 9,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: "".concat(pct, "%"),
        background: "linear-gradient(90deg,".concat(col, ",").concat(col, "CC)"),
        borderRadius: 99
      }
    })));
  })), sc.cta && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      animation: "vUp 0.5s 0.45s both",
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(245,166,35,0.12)",
      border: "2px solid rgba(245,166,35,0.5)",
      borderRadius: 14,
      padding: "11px 20px",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: A
    }
  }, t("Free to explore — droppilot.app", "Gratis para explorar — droppilot.app")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.35)",
      marginTop: 2
    }
  }, t("Full access — $10 one time", "Acceso completo — $10 una vez")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px 18px",
      borderTop: "1px solid ".concat(vc, "20")
    }
  }, quizPhase === 'quiz' && (pick(lang, QUIZZES, QUIZZES_ES)[video.id] || []).length > 0 ? function () {
    var qd = pick(lang, QUIZZES, QUIZZES_ES)[video.id];
    var q = qd[quizIdx];
    return /*#__PURE__*/React.createElement("div", {
      key: quizIdx
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: vc,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 10
      }
    }, t("Quick Check", "Repaso Rápido"), " \xB7 ", quizIdx + 1, "/", qd.length), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: C.text,
        lineHeight: 1.55,
        marginBottom: 12
      }
    }, q.q), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 7
      }
    }, q.options.map(function (opt, oi) {
      var isAnswered = answered !== null;
      var isCorrect = oi === q.correct;
      var isSelected = oi === answered;
      var bg = "rgba(255,255,255,0.04)",
        brd = "1px solid rgba(255,255,255,0.1)",
        col = C.text;
      if (isAnswered && isCorrect) {
        bg = "rgba(16,185,129,0.12)";
        brd = "1px solid ".concat(C.green, "50");
        col = C.green;
      } else if (isAnswered && isSelected && !isCorrect) {
        bg = "rgba(244,63,94,0.1)";
        brd = "1px solid ".concat(C.red, "40");
        col = C.red;
      }
      return /*#__PURE__*/React.createElement("button", {
        key: oi,
        onClick: function onClick() {
          if (!isAnswered) setAnswered(oi);
        },
        style: {
          background: bg,
          border: brd,
          borderRadius: 10,
          padding: "10px 12px",
          fontSize: 13,
          fontWeight: isAnswered && isCorrect ? 700 : 400,
          cursor: isAnswered ? "default" : "pointer",
          color: col,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "all 0.18s"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 18,
          height: 18,
          borderRadius: 4,
          background: isAnswered && isCorrect ? C.green : isAnswered && isSelected ? C.red : "rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          color: "#000",
          fontWeight: 900,
          flexShrink: 0
        }
      }, isAnswered && isCorrect ? "✓" : isAnswered && isSelected ? "✗" : String.fromCharCode(65 + oi)), opt);
    })), answered !== null && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: "9px 11px",
        fontSize: 12,
        color: C.text2,
        lineHeight: 1.6
      }
    }, q.explain), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        if (quizIdx < qd.length - 1) {
          setQuizIdx(function (i) {
            return i + 1;
          });
          setAnswered(null);
        } else {
          setQuizPhase('takeaways');
        }
      },
      style: {
        marginTop: 10,
        background: vc,
        border: "none",
        borderRadius: 10,
        padding: "11px 14px",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        color: "#000",
        width: "100%"
      }
    }, quizIdx < qd.length - 1 ? t("Next question →", "Siguiente pregunta →") : t("See key takeaways →", "Ver puntos clave →"))));
  }() : quizPhase === 'takeaways' && (pick(lang, KEY_TAKEAWAYS, KEY_TAKEAWAYS_ES)[video.id] || []).length > 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.green,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, t("✓ 3 Things to Remember", "✓ 3 Cosas para Recordar")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      marginBottom: 14
    }
  }, (pick(lang, KEY_TAKEAWAYS, KEY_TAKEAWAYS_ES)[video.id] || []).map(function (t, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: "linear-gradient(135deg,rgba(245,166,35,0.08),rgba(245,166,35,0.02))",
        border: "1px solid rgba(245,166,35,0.28)",
        borderRadius: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: C.display,
        fontSize: 36,
        lineHeight: 1,
        color: C.amberL,
        letterSpacing: "0.5px",
        flexShrink: 0,
        minWidth: 32,
        textAlign: "center"
      }
    }, i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: C.text,
        lineHeight: 1.45,
        fontWeight: 600
      }
    }, t));
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return restart(false);
    },
    style: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 10,
      padding: "11px 14px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      color: C.text2,
      width: "100%"
    }
  }, t("↺ Restart Lesson", "↺ Reiniciar Lección"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      marginBottom: 14
    }
  }, video.scenes.map(function (_, si) {
    return /*#__PURE__*/React.createElement("button", {
      key: si,
      onClick: function onClick() {
        return jumpToScene(si);
      },
      "aria-label": "Scene ".concat(si + 1),
      style: {
        width: si === scene ? 22 : 9,
        height: 9,
        borderRadius: 99,
        background: si === scene ? vc : "rgba(255,255,255,0.15)",
        border: "none",
        cursor: "pointer",
        padding: 0,
        transition: "all 0.2s"
      }
    });
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "".concat(vc, "90"),
      fontWeight: 800,
      marginLeft: 6,
      letterSpacing: "0.5px",
      fontFamily: "'JetBrains Mono',monospace"
    }
  }, scene + 1, "/", video.scenes.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return restart(false);
    },
    "aria-label": "Restart",
    style: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 99,
      width: 42,
      height: 42,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 17,
      color: "rgba(255,255,255,0.4)"
    }
  }, "\u21BA"), /*#__PURE__*/React.createElement("button", {
    onClick: togglePlay,
    "aria-label": playing ? "Pause" : "Play",
    style: {
      background: "linear-gradient(135deg,".concat(vc, ",").concat(vc, "BB)"),
      border: "none",
      borderRadius: 50,
      width: 56,
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 22,
      boxShadow: "0 0 0 1px ".concat(vc, "33,0 4px 14px ").concat(vc, "55,0 14px 36px ").concat(vc, "55,0 28px 64px ").concat(vc, "30"),
      flexShrink: 0,
      transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1)",
      fontFamily: "inherit"
    }
  }, playing ? "⏸" : elapsed.current >= video.dur ? "↺" : "▶"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 99,
      width: 42,
      height: 42,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 11,
      fontWeight: 700,
      color: "".concat(vc, "90")
    }
  }, Math.max(0, Math.ceil(video.dur * (1 - progress / 100) / 1000)), "s")))));
}
function PaywallModal(_ref25) {
  var lang = _ref25.lang,
    setShowPay = _ref25.setShowPay,
    payStep = _ref25.payStep,
    setPayStep = _ref25.setPayStep,
    setTab = _ref25.setTab;
  var t = function t(en, es) {
    return pick(lang, en, es);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      setShowPay(false);
      setPayStep("offer");
    },
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.78)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "linear-gradient(180deg,#12151a,#0d0f13)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px 24px 0 0",
      padding: 24,
      paddingBottom: 40,
      width: "100%",
      maxWidth: 430,
      zIndex: 1,
      maxHeight: "88vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 99,
      background: "rgba(255,255,255,0.15)",
      margin: "0 auto 22px"
    }
  }), payStep === "offer" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 44,
      marginBottom: 10
    }
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      marginBottom: 6
    }
  }, t("Become Elite", "Hazte Elite")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: C.text2,
      lineHeight: 1.7
    }
  }, t("Everything you need to earn more, protect your account, and stay sharp — all in one place.", "Todo lo que necesitas para ganar más, proteger tu cuenta y mantenerte alerta — en un solo lugar."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 12,
      marginBottom: 12,
      borderBottom: "1px solid rgba(255,255,255,0.07)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, t("Elite Access", "Acceso Elite")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: C.amber,
      fontFamily: C.sans
    }
  }, "$10")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, [t("4 free tips + 6 more with full psychology breakdowns", "4 consejos gratis + 6 más con análisis psicológicos completos"), t("7 in-depth learning sections — psychology, tip science, de-escalation & more", "7 secciones de aprendizaje — psicología, ciencia de propinas, desescalada y más"), t("30 message templates with one-tap copy", "30 plantillas de mensajes para copiar con un toque"), t("5 training lessons — the science behind what earns more", "5 lecciones — la ciencia detrás de lo que te hace ganar más"), t("Platform habits & appeal scripts for all 6 platforms", "Hábitos y guiones de apelación para las 6 plataformas"), t("Per-delivery checklists + safety score per platform", "Listas por entrega + puntaje de seguridad por plataforma"), t("Notes log for problem addresses and difficult customers", "Registro de notas para direcciones problemáticas y clientes difíciles"), t("📡 Policy Watch — monthly platform policy updates", "📡 Policy Watch — actualizaciones mensuales de políticas")].map(function (f, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        fontSize: 12,
        color: C.text2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.green,
        fontWeight: 900,
        fontSize: 13,
        flexShrink: 0
      }
    }, "\u2713"), f);
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      window.location.href = STRIPE_LINK;
    },
    style: _objectSpread(_objectSpread({}, S.btnPrimary), {}, {
      background: "linear-gradient(135deg,".concat(C.amber, ",").concat(C.amberD, ",").concat(C.amberL, ")"),
      borderRadius: C.r.lg,
      padding: "17px",
      fontSize: 16,
      width: "100%",
      letterSpacing: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginBottom: 8
    })
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDCB3"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", null, t("Become Elite — $10", "Hazte Elite — $10")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      opacity: 0.75,
      marginTop: 2
    }
  }, t("Secure Stripe checkout · unlocks instantly on return", "Pago seguro con Stripe · se desbloquea al regresar")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: C.text3,
      marginBottom: 4
    }
  }, t("One-time payment · Lifetime access · No recurring charges, ever", "Pago único · Acceso de por vida · Sin cargos recurrentes, nunca")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 11,
      color: "rgba(107,122,141,0.7)",
      marginTop: 8,
      lineHeight: 1.5,
      padding: "0 4px"
    }
  }, t("DropPilot is not affiliated with, endorsed by, or connected to DoorDash, Uber Eats, Walmart Spark, Instacart, Lyft, or Amazon Flex.", "DropPilot no está afiliado, respaldado ni conectado con DoorDash, Uber Eats, Walmart Spark, Instacart, Lyft o Amazon Flex."))), payStep === "done" && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 64,
      marginBottom: 16
    }
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      marginBottom: 8
    }
  }, t("You're Elite.", "Eres Elite.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: C.text2,
      marginBottom: 26,
      lineHeight: 1.7
    }
  }, t("You now have lifetime access to everything in DropPilot — every template, script, training lesson, and all future app feature updates. Yours forever.", "Ahora tienes acceso de por vida a todo en DropPilot — cada plantilla, mensaje, lección y todas las futuras actualizaciones. Para siempre tuyo.")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setShowPay(false);
      setPayStep("offer");
      setTab("defend");
    },
    style: {
      background: C.purple,
      border: "none",
      borderRadius: 16,
      padding: "16px",
      fontSize: 16,
      fontWeight: 800,
      cursor: "pointer",
      width: "100%",
      color: "#fff",
      boxShadow: "0 0 0 1px rgba(139,92,246,0.30),0 4px 14px rgba(139,92,246,0.35),0 14px 40px rgba(139,92,246,0.38),0 28px 64px rgba(139,92,246,0.20)",
      marginBottom: 10
    }
  }, t("Go to Account Defense", "Ir a Defensa de Cuenta")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setShowPay(false);
      setPayStep("offer");
      setTab("templates");
    },
    style: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 14,
      padding: "13px",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      width: "100%",
      color: C.text2
    }
  }, t("See Message Templates", "Ver Plantillas de Mensajes")))));
}
function PlatformPicker(_ref26) {
  var lang = _ref26.lang,
    setShowPlatformPicker = _ref26.setShowPlatformPicker,
    startShift = _ref26.startShift;
  var t = function t(en, es) {
    return pick(lang, en, es);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setShowPlatformPicker(false);
    },
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.78)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "linear-gradient(180deg,#12151a,#0d0f13)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px 24px 0 0",
      padding: 24,
      paddingBottom: 40,
      width: "100%",
      maxWidth: 430,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 99,
      background: "rgba(255,255,255,0.15)",
      margin: "0 auto 20px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 900,
      marginBottom: 4
    }
  }, "\uD83D\uDE97 ", t("Which app are you driving for?", "¿Para qué app estás manejando?")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.text3,
      marginBottom: 20
    }
  }, t("Your shift will be focused on that platform.", "Tu turno se enfocará en esa plataforma.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, pick(lang, PLATFORMS_DEFEND, PLATFORMS_DEFEND_ES).map(function (p) {
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: function onClick() {
        return startShift(p.id);
      },
      style: {
        background: "".concat(p.color, "0F"),
        border: "1.5px solid ".concat(p.color, "40"),
        borderRadius: 16,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        textAlign: "left",
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 13,
        background: "".concat(p.color, "20"),
        border: "1px solid ".concat(p.color, "50"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0
      }
    }, p.e), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 800,
        color: p.color
      }
    }, p.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.text3,
        marginTop: 2
      }
    }, t("Tap to start your shift", "Toca para iniciar tu turno"))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        color: "".concat(p.color, "60")
      }
    }, "\u203A"));
  }))));
}