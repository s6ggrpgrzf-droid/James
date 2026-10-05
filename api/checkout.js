// Creates a Stripe Checkout Session for DropPilot Elite ($10 one-time)
// and redirects the buyer to Stripe's hosted checkout page.
//
// After payment, Stripe sends the buyer back to:
//   /app.html?session_id={CHECKOUT_SESSION_ID}
// The app then calls /api/verify to confirm the payment before unlocking Elite.
//
// Requires the STRIPE_SECRET_KEY environment variable (a restricted key with
// Checkout Sessions write access is enough).

const PRICE_ID = "price_1TDCkgFiKgrWyiUSXyDZW2H3"; // DropPilot Elite — $10 one-time

// Basic rate limit: 10 checkout starts per IP per 10 minutes. Stops
// someone hammering the endpoint to flood Stripe with unpaid sessions.
// (In-memory: per serverless instance, enough as a first line of defense.)
const HITS = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 10;
function rateLimited(ip) {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_HITS) return true;
  arr.push(now);
  HITS.set(ip, arr);
  // Prune old entries so the map can't grow unbounded.
  if (HITS.size > 5000) {
    for (const [k, v] of HITS) {
      if (v.every((t) => now - t >= WINDOW_MS)) HITS.delete(k);
    }
  }
  return false;
}

module.exports = async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "unknown";
    if (rateLimited(ip)) {
      res.status(429).send("Too many checkout attempts. Please wait a few minutes.");
      return;
    }
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      res.status(500).send("Payments are not configured yet. Please try again later.");
      return;
    }

    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const origin = `${proto}://${host}`;

    const body = new URLSearchParams({
      mode: "payment",
      "line_items[0][price]": PRICE_ID,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/app.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });

    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(key + ":").toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const session = await r.json();
    if (!r.ok || !session.url) {
      console.error("Stripe checkout error:", session);
      res.status(502).send("Could not start checkout. Please try again.");
      return;
    }

    res.writeHead(303, { Location: session.url });
    res.end();
  } catch (e) {
    console.error("Checkout handler error:", e);
    res.status(500).send("Could not start checkout. Please try again.");
  }
};
