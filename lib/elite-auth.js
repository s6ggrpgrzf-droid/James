// Shared elite-cookie signing/verification for DropPilot.
// Works in both the Edge runtime (middleware) and Node serverless functions.
// Uses Web Crypto HMAC-SHA256, available in both.
//
// Cookie: dp_elite=<exp>.<sig>  where sig = HMAC_SHA256(secret, "dpelite:<exp>")
// Secret: ELITE_SECRET, falling back to STRIPE_SECRET_KEY (already set).

const COOKIE_NAME = "dp_elite";
const TEN_YEARS = 10 * 365 * 24 * 3600;

function getSecret() {
  return process.env.ELITE_SECRET || process.env.STRIPE_SECRET_KEY || "";
}

async function hmacHex(secret, msg) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function readCookie(header) {
  if (!header) return null;
  const m = header.match(/(?:^|;\s*)dp_elite=(\d+)\.([0-9a-f]{64})(?:;|$)/);
  return m ? { exp: m[1], sig: m[2] } : null;
}

// Issue a Set-Cookie value for a verified elite buyer. Returns null if no secret.
export async function issueEliteCookie() {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + TEN_YEARS;
  const sig = await hmacHex(secret, `dpelite:${exp}`);
  return `${COOKIE_NAME}=${exp}.${sig}; Path=/; Max-Age=${TEN_YEARS}; HttpOnly; Secure; SameSite=Lax`;
}

// Clear the elite cookie (logout / reset).
export function clearEliteCookie() {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

// req may be an Edge Request (headers.get) or a Node IncomingMessage (headers object).
export async function isEliteRequest(req) {
  const secret = getSecret();
  if (!secret) return false;
  const h = req.headers;
  const header = typeof h.get === "function" ? h.get("cookie") : h.cookie;
  const c = readCookie(header || "");
  if (!c) return false;
  if (Number(c.exp) < Math.floor(Date.now() / 1000)) return false;
  const want = await hmacHex(secret, `dpelite:${c.exp}`);
  return c.sig === want;
}
