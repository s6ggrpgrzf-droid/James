// Creates a Stripe Checkout Session for DropPilot Elite ($10 one-time)
// and redirects the buyer to Stripe's hosted checkout page.
//
// After payment, Stripe sends the buyer back to:
//   /app.html?session_id={CHECKOUT_SESSION_ID}
// The app then calls /api/verify to confirm the payment before unlocking Elite.
//
// Requires the STRIPE_SECRET_KEY environment variable (a restricted key with
// Checkout Sessions write access is enough).

// Price ID comes from the STRIPE_PRICE_ID env var so preview deployments can
// point at a test-mode price. Falls back to the live $10 price when unset.
const PRICE_ID = process.env.STRIPE_PRICE_ID || "price_1TDCkgFiKgrWyiUSXyDZW2H3"; // DropPilot Elite — $10 one-time

module.exports = async (req, res) => {
  try {
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
