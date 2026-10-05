// Precompiles app1.jsx + app2.jsx into a single minified app.bundle.js and
// stages every static file into public/ for Vercel.
//
// Replaces the old in-browser Babel standalone transpile (which downloaded ~3MB
// and recompiled all JSX on every page load). The two sources share one global
// scope (same as the old eval-based loader), so each is transformed
// individually with esbuild and the outputs are concatenated.
//
// Vercel runs `npm run build` on deploy and serves static files from the
// output directory configured in vercel.json ("public"). api/ and
// middleware.js stay at the repo root — Vercel picks those up separately.
//
// Run: npm run build

import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { transformSync } from "esbuild";
import { filterFile } from "./filter-content.mjs";

const SOURCES = ["app1.jsx", "app2.jsx"];
const OUT_DIR = "public";
const BUNDLE = "app.bundle.js";

// Static files served as-is alongside the bundle. (debug*.html diagnostics
// are intentionally excluded — they are slated for removal before merge.)
// PWA icons are embedded as base64 so the repo stays text-only.
// The build writes them out before staging static files.
const ICONS = {
  "icon-192.png": "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",
  "icon-512.png": "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAPwklEQVR4nO3c25IeVRnH4U6kCopDsiETAoYDrfLcDSDgvSiBQKyiykPBRBA8E40KBILei4CIF6AoKKhkn+AFuBsPJGYmTGb3fd3r7fV/njMLSlZlpnv9+u3V2XP7HXeuDgBAlL2tFwAATE8AAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEEgAAEEgAAEAgAQAAgQQAAAQSAAAQSAAAQCABAACBBAAABBIAABBIAABAIAEAAIEEAAAEuq31AmARf//lSuslEOyub15svQTYtT2333HnautFwGY++cWh1kuAHdv3rUutlwCbEgCUY8OnR4KAagQAzdnwSSQIaE0A0IRNH24QA7QgAJiMTR+2JgaYigBgVDZ92D0xwJgEAKOw8cPyCAHGIABYqms2fhjNfiHAEgkAluLaGzZ+mMr+x4QAixMALMTGD+0IARYhANgVGz/UIQTYDQHAjtj4oS4hwE4IALbt2ht3t14CsIX9j11uvQRmQgCwJRs/zI8QYCsCgE1dtfnDbB0QAWxCALAhGz/0Qwiwkb2tF0A9Nn/oi2uajZgAsM7Vs24U0KsDx0wCuEEAMAyDjR+SCAGGwSsABps/pHHNMwwCIJ4bAWRy7eMVQLArbgAQ76DXAbFMAELZ/IFhcC9IJgACueCBtdwTMgmAMC50YCPuDXmcAQhy5ezB1ksAijt47ErrJTARARDiyus2f2B7Dj4uAhJ4BRDA5g/shHtGBhOAzl12IQO7dLdJQNdMADpm8wcW4R7SNwHQKRcusAzuJf0SAB1ywQLL5J7SJwHQGRcqMAb3lv4IAAAIJAA6otCBMbnH9MVngJ249JoLE5jGoSd8HtgDE4AO2PyBKbnn9EEAAEAgrwBm7tJrB1ovAQh16ImrrZfAAkwAZszmD7TkHjRvAgAAAgmAmVLeQAXuRfPlDMAMXXTBAcWsOA8wOyYAABDIBGBmLp7x9A/UtHLcFGBOTAAAIJAAmBFP/0Bl7lHzIgAAIJAAmAllDcyBe9V83NZ6AWyPk5oALJOvAGbgwpn9rZcAsCOHj19rvQS24BUAAAQyASjuwque/oF5OvykKUBlJgAAEEgAFObpH5gz97DaBAAABPIZYGEOZwAwFhOAos4bnQEdcC+rSwAAQCABAACBBEBBRmZAT9zTanIIsCKn/wAYmQkAAATyVwEXc+6Vfa2XADCKI0990noJrGECAACBBAAABBIAABBIABTi/T/QM/e4WgQAAAQSAAAQyF8EVMiqDzIBmIgJQBEfv+zdGNA/97o6BAAABBIAABBIAABAIAEAAIF8BVCGTwAAmI4AKML2D8CUvAIo4G8v39V6CQCTcc+rwQSgAo//AEzMBAAAAgkAAAgkAAAgkAAAgEAOARbgDCAAUzMBAIBAAgAAAgkAAAjkDEAFq04BADAtEwAACCQAACCQVwAFeAEAwNRMAAAgkAAAgEACAAACCQAACOQQYAVOAQIwMRMACHXo2LnWSwAaMgEowACAqa18uvkfOnZuuHj2SOPVAC2YAECYlZue/G/+30AGAQBBbrXZiwDI4xVACV4CML6VY+e3+Ofnhotn75loNUBrJgAQYKvNf6f/HjB/AgA6t9NNXQRABgEAHdvtZi4CoH/OABSw6ggAIzj8+GKb+Mqx88OF150JgF6ZAECHFt38l/3/A9QjAKAzy960RQD0SQBAR8barEUA9EcAQCfG3qRFAPRFAEAHptqcRQD0QwDAzE29KYsA6IPPAAvwFSC7dU+jzfjw4+eH8z4RhFkzAYCZarX5V/nvA4sxAajA3wTENt3zxIXWS1hnbQScf+1ww5UAOyUAYAaqbfwbub5GIQDzIACgqDls+htZu24xAHUJAChmrhv/RkwFoC4BAAX0tOlvxFQA6hEABTgCmOlI55v+rayNgXNiAJoRADCx1I1/I9f/LIQATE8AwARs+ps7YioAkxMAMCIb/86ZCsA0BEAFDgF05chxm/4yrJsKnBEDsGwCAJbApj+utX++YgCWQwDAAmz807v+Zy4EYDECoIBV7wBm5d7jF1svgWF9fH18ZqXhSmCeBABsk42/rus/GyEA2ycAYBM2/XlZ+/MSA7C5va0XAABMTwDALXj6nzc/P9icAACAQM4AVOAjgHLufdLTYw/uPX5x+PhVZwFgIwKgAPs/jMf1BRvzCgBucp+n/674ecLGBAAABBIAsIanxT75ucJnCQAACCQA4FOeEvvm5wvr+QqgBOeUYRquNbhOABSw6p7U3OefutR6CUzgvicvDX995VDrZUAJXgEAQCABQDxP/1n8vOF/BAAABBIARPM0mMnPHQQAAEQSAMTyFJjNz590PgMswFeA0IZrj2QmAEQ66umPwe8B2UwAKvAYAu24/ghlAkCcoyc89XGD3wdSCQAACOQVQAlmkFM5euJy6yVQ0NETl4a/vHx362XApEwAACCQCUABnv+ncb+nfzZx9MTl4SNTAIKYAABAIAFABE//bIffE5IIAAAI5AxABQ4BjOr+b3uqY/vuP3F5+OjnzgLQPxMAAAgkAOiap392w+8NCQQAAARyBqAARwCgHtclvTMBoGsfOszFLvi9IYEJQAmeNaAW1yT9MwEAgEACAAACeQVQgWkj1OKaJIAJAN378GcHWy+BGfH7QgoTgAI8bEAdrkdSmAAAQCABAACBBAAABBIAABBIABDhz052sw1+T0giAAAgkM8AC1j13RGU4FokiQAowV0HanAtksMrAAAIJACI8aefHmi9BArz+0EaAQAAgQQAAAQSAAAQyFcABTh3DO25DkkjACpw55nMB6cPDF94+mrrZVDMB6cdACSPVwAAEEgAAEAgAQAAgQQAAAQSAAAQyFcABaz6DGBS75/eP3zx6Wutl0ER75/e33oJ0IQJAAAEEgAAEMgrgAq8AYB2XH+EMgEAgEACgEjv/8TBL/wekE0AAEAgZwAK8AoS2nDtkcwEAAACCQAACCQAiPVHB8Ci+fmTTgAAQCCHACtYdRQJJue6I5wJAAAEMgEowHMITM91RzoTAAAIJACI9ocf72u9BBrwcwcBAACRBAAABBIAABBIAABAIJ8BFuDvI2nrvZf2DV/6zietl8FE3nvJAUAYBhMAAIgkAAAgkAAAgEDOAJTgEABMx/UGw2ACAMMwDMN7L93VeglMwM8ZbhAAABDIK4ACDCRhGq41uMEEAAACmQBU4LEEpuFag/8zAQCAQAIAPvX7Hzkh3jM/X1hPAABAIAEAAIEcAizAuaQ6fmdMDIQwAQCAQAIAAAJ5BVDBqpcAAEzLBAAAAgkAAAgkAAAgkDMABTgBAMDUTAAAIJAAAIBAAgAAAgkAAAjkEGAFTgECMDETgAK+fPIfrZcAMBn3vBpMAIowBABgSgKgDAkAwHS8AgCAQAIAAAIJAAAIJAAAIJAAKOIrJ//ZegkAo3Ovq8NXAIWs+hAAgImYAABAIAEAAIEEQCFfPeXdGNAv97haBAAABBIAABBIAABAoD2333Gnj8+K+e1zvs4E+vK1U/9qvQRuYgIAAIE8alZkJgPAyEwACvra943KgH64p9UkAAAgkAAAgEACoCgjM6AH7mV1OQRYmLOAAIzFBAAAAgmAwh4wOgNmzD2sNgEAAIH8VcAz8O4pRzWAeXngOU//1ZkAAEAgE4CZePfU51ovAWBbHnju362XwDaYLc+ESgNgmbwCmIkHFTUwA+5V8yEAACCQAJgRZQ1U5h41LwIAAAL5CmCGfnPSFwFALQ8+7+l/bkwAACCQCcBMvWMKABTxkKf/WTIBmCkXHFCBe9F8CQAACCQAZkx5Ay25B82bMwAdeOekjgOm9dDz/2m9BBZk5wCAQAKgA0ocmJJ7Th+8AujIr7+n54Bxff0HNv9e2DE64sIExuQe0xcBAACBBEBnFDowBveW/giADrlQgWVyT+mTAOiUCxZYBveSfgmAjrlwgUW4h/TNZ4AB3vZ5ILBDD9v8u2dnCOBCBnbCPSODCUCQt5/Ve8DmHn7B5p9CAIR5+9k9rZcAFPXwC7aDJB4Jw7jAgY24N+QRAIFc6MBa7gmZBEAoFzwwDO4FyZwBCPeWMwEQ6xGbfzQTgHBuAJDJtY8AwI0AwrjmGQavALiJVwLQLxs/awkAPuOtZ0QA9OaRF93qWc8rAD7DjQL64ppmIyYAbMo0AObLxs9mBABbelMEwOw8avNnCwKAbRMCUJ+Nn+0SAOzIm8+0XgFwK4++2HoFzIkAYFeEANRh42c3BAALEQLQjo2fRQgAlkIIwHRs/CyDAGCp3vxu6xVAvx79YesV0BMBwCh+JQRgab5h42cEAoBRCQHYPRs/YxIATEYMwNZs+kxFANCEGIAbbPq0IABoTgyQyKZPawKAcgQBPbLhU40AoDxBwBzZ8KlOADBr4oCWbPLMmQAAgEB7Wy8AAJieAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACCQAACCQAACAQAIAAAIJAAAIJAAAIJAAAIBAAgAAAgkAAAgkAAAgkAAAgEACAAACCQAACPRfLSavO5KqUssAAAAASUVORK5CYII=",
};

const STATIC = [ 
  "app.html",
  "index.html",
  "privacy.html",
  "terms.html",
  "robots.txt",
  ".nojekyll",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
];

const parts = SOURCES.map((file) => {
  const code = readFileSync(file, "utf8");
  const out = transformSync(code, {
    loader: "jsx",
    jsx: "transform", // classic React.createElement (matches old Babel preset)
    minify: true,
    target: "es2019",
    sourcefile: file,
  });
  return `// ---- ${file} ----\n${out.code}`;
});

// Fail loudly if app.html still references the old in-browser Babel loader.
const html = readFileSync("app.html", "utf8");
if (html.includes("babel.min.js") || html.includes("text/babel")) {
  console.error(
    "ERROR: app.html still references in-browser Babel. " +
      "Remove the babel script tag and text/babel loader before building."
  );
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

const banner = `/* DropPilot app bundle — generated by npm run build. Do not edit directly; edit app1.jsx / app2.jsx instead. */\n`;
const bundlePath = join(OUT_DIR, BUNDLE);
writeFileSync(bundlePath, banner + parts.join("\n") + "\n");
console.log(
  `Wrote ${bundlePath} (${(banner.length + parts.join("\n").length).toLocaleString()} bytes)`
);

for (const [name, b64] of Object.entries(ICONS)) {
  writeFileSync(name, Buffer.from(b64, "base64"));
  console.log(`Wrote ${name} from embedded icon`);
}

for (const file of STATIC) {
  const dest = join(OUT_DIR, file);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(file, dest);
  console.log(`Copied ${file} -> ${dest}`);
}

// Content: full sources live in content-src/ (never deployed publicly).
// The build writes FILTERED free-tier files to public/; elite bodies are
// stripped. Full files are served only via /api/content to verified buyers.
const CONTENT_FILES = [
  "content-en1.js",
  "content-en2.js",
  "content-es1.js",
  "content-es2.js",
];
for (const file of CONTENT_FILES) {
  const full = readFileSync(join("content-src", file), "utf8");
  const free = filterFile(full, file);
  const dest = join(OUT_DIR, file);
  writeFileSync(dest, free);
  console.log(
    `Filtered content-src/${file} -> ${dest} (${full.length.toLocaleString()} -> ${free.length.toLocaleString()} bytes)`
  );
}

// Vendor: third-party libs served locally (no CDN dependency, no integrity risk).
for (const file of ["react.min.js", "react-dom.min.js"]) {
  const dest = join(OUT_DIR, "vendor", file);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(join("vendor", file), dest);
  console.log(`Copied vendor/${file} -> ${dest}`);
}

// Service worker: inject a unique build version so every deploy busts the
// old cache. Uses Vercel's commit SHA when available, else a timestamp.
const BUILD_VERSION =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) || String(Date.now());
const swSrc = readFileSync("sw.js", "utf8");
if (!swSrc.includes("__BUILD_VERSION__")) {
  console.error("ERROR: sw.js must contain the __BUILD_VERSION__ placeholder.");
  process.exit(1);
}
const swOut = swSrc.replaceAll("__BUILD_VERSION__", BUILD_VERSION);
writeFileSync(join(OUT_DIR, "sw.js"), swOut);
console.log(`Wrote ${join(OUT_DIR, "sw.js")} with version ${BUILD_VERSION}`);
