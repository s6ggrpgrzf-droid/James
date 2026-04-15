const Stripe = require("stripe");

module.exports = async function handler(req, res) {
  // Same-origin: app and API are on the same Vercel domain, no CORS needed.
  // OPTIONS pre-flight not required for same-origin requests.
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.body;

  // Basic sanity check — Stripe session IDs always start with cs_
  if (!session_id || typeof session_id !== "string" || !session_id.startsWith("cs_")) {
    return res.status(400).json({ valid: false, error: "Invalid session_id" });
  }

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false });
    }
  } catch (err) {
    // Don't expose Stripe error details to client
    return res.status(400).json({ valid: false, error: "Could not verify session" });
  }
};
