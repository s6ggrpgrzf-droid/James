// Serves the FULL DropPilot content files, but only to verified elite buyers.
// Free users get the filtered public files (public/content-*.js, built from
// content-src/ by tools/build.mjs). This endpoint requires the signed
// dp_elite cookie set by the edge middleware after a verified Stripe payment.

import { isEliteRequest } from "../lib/elite-auth.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const FILES = {
  en1: "content-en1.js",
  en2: "content-en2.js",
  es1: "content-es1.js",
  es2: "content-es2.js",
};

export default async function handler(req, res) {
  if (!(await isEliteRequest(req))) {
    res.status(403).send("// elite content only");
    return;
  }
  const name = FILES[req.query.f];
  if (!name) {
    res.status(404).end();
    return;
  }
  try {
    const src = readFileSync(join(process.cwd(), "content-src", name), "utf8");
    res.setHeader("Content-Type", "application/javascript; charset=utf-8");
    // Private: per-buyer, but cacheable on the device for offline elite use.
    res.setHeader("Cache-Control", "private, max-age=86400");
    res.status(200).send(src);
  } catch (e) {
    console.error("content serve error:", e);
    res.status(500).end();
  }
}
