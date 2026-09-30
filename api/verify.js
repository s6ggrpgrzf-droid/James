// Verifies a Stripe Checkout Session and reports whether it was paid.
//
// The app calls this after Stripe redirects the buyer back to
// /app.html?session_id=... — Elite is unlocked only when this endpoint
// confirms payment_status === "paid" with Stripe's API.
//
// Only session IDs starting with "cs_" are accepted, and the endpoint never
// reveals anything besides { paid: true/false }.

module.exports = async (req, res) => {
  try {
    const sessionId = req.query && req.query.session_id;

    if (!sessionId || typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
      res.status(200).json({ paid: false });
      return;
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      res.status(200).json({ paid: false });
      return;
    }

    const r = await fetch(
      "https://api.stripe.com/v1/checkout/sessions/" + encodeURIComponent(sessionId),
      {
        headers: {
          Authorization: "Basic " + Buffer.from(key + ":").toString("base64"),
        },
      }
    );

    if (!r.ok) {
      res.status(200).json({ paid: false });
      return;
    }

    const session = await r.json();
    res.status(200).json({ paid: session.payment_status === "paid" });
  } catch (e) {
    console.error("Verify handler error:", e);
    res.status(200).json({ paid: false });
  }
};
