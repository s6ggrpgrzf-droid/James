// Cloudflare Worker — verifies a Stripe Checkout session and issues a
// signed unlock token the app can re-verify locally on every load.
//
// ── One-time setup ───────────────────────────────────────────────────────
//   1) cd workers
//   2) Generate a fresh keypair:
//        node generate-keys.mjs
//   3) Save the printed `privateKey` JSON as a Worker secret:
//        npx wrangler secret put SIGNING_PRIVATE_JWK
//      (paste the entire JSON object when prompted)
//   4) Save your Stripe restricted secret key as a Worker secret:
//        npx wrangler secret put STRIPE_SECRET_KEY
//      Use a *restricted* key with read access to "Checkout Sessions" only.
//   5) Update APP_URL in wrangler.toml if your app lives somewhere other
//      than https://s6ggrpgrzf-droid.github.io/James (no trailing slash).
//   6) Deploy:
//        npx wrangler deploy
//   7) In Stripe Dashboard, edit the Payment Link's "After payment" URL to:
//        https://<your-worker-host>/verify?session_id={CHECKOUT_SESSION_ID}
//   8) Paste the printed `publicKey` JSON into ELITE_PUBLIC_JWK in app.html.
//
// ── Behaviour ────────────────────────────────────────────────────────────
//   GET /verify?session_id=cs_live_...  →
//     Looks the session up via the Stripe API (server-to-server, with the
//     secret key) and confirms `payment_status === "paid"`. On success,
//     redirects the user to {APP_URL}/app.html?dp_token=<signed token>.
//     On failure, redirects to {APP_URL}/app.html?dp_error=<code> so the
//     app can show a friendly toast.
//
// The token cannot be forged by a client — the private signing key never
// leaves the Worker, and the app only knows the public half.

const TOKEN_VERSION = 1;
// Lifetime access. If you change to a subscription, lower this and
// re-issue tokens periodically (e.g. on each successful invoice webhook).
const TOKEN_TTL_SEC = 100 * 365 * 24 * 60 * 60;

const SESSION_ID_RE = /^cs_(test|live)_[A-Za-z0-9]{1,200}$/;

function b64u(buf){
  let bin = "";
  const bytes = new Uint8Array(buf);
  for(let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function redirect(url){
  return new Response(null, {
    status: 302,
    headers: { Location: url, "Cache-Control": "no-store" }
  });
}

async function loadSigningKey(env){
  const jwk = JSON.parse(env.SIGNING_PRIVATE_JWK);
  return crypto.subtle.importKey(
    "jwk", jwk,
    { name: "ECDSA", namedCurve: "P-256" },
    false, ["sign"]
  );
}

async function signToken(env, sid){
  const now = Math.floor(Date.now() / 1000);
  const payloadJson = JSON.stringify({ v: TOKEN_VERSION, sid, iat: now, exp: now + TOKEN_TTL_SEC });
  const payloadB64 = b64u(new TextEncoder().encode(payloadJson));
  const key = await loadSigningKey(env);
  const sig = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    key, new TextEncoder().encode(payloadB64)
  );
  return `${payloadB64}.${b64u(sig)}`;
}

async function fetchStripeSession(env, sid){
  const r = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sid)}`,
    { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } }
  );
  if(r.status === 404) return null;
  if(!r.ok) throw new Error(`Stripe ${r.status}`);
  return r.json();
}

export default {
  async fetch(req, env){
    const url = new URL(req.url);
    if(req.method !== "GET") return new Response("Method not allowed", { status: 405 });
    if(url.pathname !== "/verify") return new Response("Not found", { status: 404 });

    const appBase = String(env.APP_URL || "").replace(/\/$/, "");
    if(!appBase) return new Response("Server misconfigured: APP_URL", { status: 500 });
    const fail = (code) => redirect(`${appBase}/app.html?dp_error=${encodeURIComponent(code)}`);

    const sid = url.searchParams.get("session_id");
    if(!sid || !SESSION_ID_RE.test(sid)) return fail("invalid_session");

    let session;
    try{ session = await fetchStripeSession(env, sid); }
    catch{ return fail("stripe_unreachable"); }
    if(!session || session.id !== sid) return fail("not_found");
    if(session.payment_status !== "paid") return fail("unpaid");

    let token;
    try{ token = await signToken(env, sid); }
    catch{ return fail("sign_error"); }

    return redirect(`${appBase}/app.html?dp_token=${token}`);
  }
};
