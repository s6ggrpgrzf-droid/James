const Stripe = require("stripe");
const crypto = require("crypto");

function createToken() {
  const payload = Buffer.from(JSON.stringify({
    e: 1,                                          // elite = true
    t: Date.now(),                                 // issued at
    x: Date.now() + 365 * 24 * 60 * 60 * 1000,   // expires in 1 year
  })).toString("base64url");
  const sig = crypto
    .createHmac("sha256", process.env.TOKEN_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.TOKEN_SECRET) {
    return res.status(503).json({ valid: false, error: "Payment system not configured" });
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
      const token = createToken();
      return res.status(200).json({ valid: true, token });
    } else {
      return res.status(200).json({ valid: false });
    }
  } catch (err) {
    // Don't expose Stripe error details to client
    return res.status(400).json({ valid: false, error: "Could not verify session" });
  }
};
