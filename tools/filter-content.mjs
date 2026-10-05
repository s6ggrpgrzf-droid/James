// DropPilot content filter: full source -> free public version.
// Elite bodies are stripped; teaser metadata (titles/headers) is kept
// so the free UI's locked-state teasers render identically.
import vm from "node:vm";

function loadVars(src) {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx;
}

function stripTip(tip, i) {
  return { e: tip.e, t: tip.t, s: tip.s, d: i < 3 ? tip.d : "" };
}

function stripMsgSec(sec, free) {
  return {
    h: sec.h,
    msg: free ? sec.msg : "",
    w: free ? sec.w : "",
    hint: free ? sec.hint : "",
    caution: sec.caution || false,
  };
}

function stripMsgCat(cat, ci) {
  return {
    e: cat.e, t: cat.t, sub: cat.sub,
    secs: cat.secs.map((s, si) => stripMsgSec(s, ci === 0 && si < 2)),
  };
}

function stripLearnCat(cat, ci) {
  return {
    e: cat.e, t: cat.t, sub: cat.sub,
    secs: ci === 0 ? cat.secs : cat.secs.map((s) => ({ h: s.h, body: "" })),
  };
}

function stripAppeals(byPlatform) {
  const out = {};
  for (const k of Object.keys(byPlatform)) {
    out[k] = byPlatform[k].map((a) => ({ t: a.t, body: "" }));
  }
  return out;
}

function stripChecklists(byPlatform) {
  const out = {};
  for (const k of Object.keys(byPlatform)) {
    out[k] = byPlatform[k].map((c) => ({ t: c.t, items: [] }));
  }
  return out;
}

function filterEn1(v, sfx) {
  const g = (n) => v[n + sfx];
  return {
    ["ALL_TIPS" + sfx]: g("ALL_TIPS").map(stripTip),
    ["LEARN_CATS" + sfx]: g("LEARN_CATS").map(stripLearnCat),
    ["MSG_CATS" + sfx]: g("MSG_CATS").map(stripMsgCat),
    ["PLATFORMS_DEFEND" + sfx]: g("PLATFORMS_DEFEND"),
    ["PLATFORM_HABITS" + sfx]: g("PLATFORM_HABITS"),
    ["PLATFORM_APPEALS" + sfx]: stripAppeals(g("PLATFORM_APPEALS")),
    ["PLATFORM_CHECKLISTS" + sfx]: stripChecklists(g("PLATFORM_CHECKLISTS")),
  };
}

function filterEn2(v, sfx) {
  const g = (n) => v[n + sfx];
  // VIDEOS: first video free (full), rest metadata only
  const videos = g("VIDEOS").map((vd, i) => i === 0 ? vd : {
    id: vd.id, title: vd.title, dur: vd.dur, icon: vd.icon,
    color: vd.color, desc: vd.desc, scenes: [], t: "",
  });
  // POLICY_WATCH: month + first update free, rest titles only
  const pw = {
    month: g("POLICY_WATCH").month,
    updates: g("POLICY_WATCH").updates.map((u, i) => i === 0 ? u : { title: u.title, isNew: false, body: "" }),
  };
  return {
    ["POLICY_WATCH" + sfx]: pw,
    ["VIDEOS" + sfx]: videos,
    ["SCENARIOS" + sfx]: g("SCENARIOS").map((s) => ({ t: s.t, e: s.e, body: "" })),
    ["MISTAKES" + sfx]: g("MISTAKES").map((m) => ({ t: m.t, body: "" })),
    ["QUIZZES" + sfx]: {},   // elite-only, no free teaser
    ["KEY_TAKEAWAYS" + sfx]: {}, // elite-only
    ["QUICK_SITUATIONS" + sfx]: g("QUICK_SITUATIONS"), // pointers + labels, content gated via MSG_CATS
    ["BASICS_CATS" + sfx]: g("BASICS_CATS").map((c) => ({ e: c.e, t: c.t, sub: c.sub, secs: [] })),
  };
}

function serialize(vars) {
  let out = "// DropPilot content (free tier). Elite bodies served via /api/content.\n";
  for (const k of Object.keys(vars)) {
    out += `var ${k} = ${JSON.stringify(vars[k])};\n`;
  }
  return out;
}

function filterFile(src, name) {
  const v = loadVars(src);
  const isEs = /es\d/i.test(name);
  const is2 = /2\.js$/.test(name);
  const sfx = isEs ? "_ES" : "";
  const filtered = is2 ? filterEn2(v, sfx) : filterEn1(v, sfx);
  return serialize(filtered);
}

export { filterFile };
