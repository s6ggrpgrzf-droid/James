// Edge gate for DropPilot Elite.
//
// The app unlocks Elite whenever the URL carries ?session_id=... — this
// middleware makes sure only a genuinely PAID Stripe Checkout Session can
// get through. Unpaid, unknown, or missing sessions are stripped from the
// URL before the app loads, so the app never sees them.
//
// Runs only on /app.html. Requires STRIPE_SECRET_KEY (restricted key with
// Checkout Sessions read access is enough).

export const config = { matcher: "/app.html" };

export default async function middleware(req) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  // No session id -> nothing to guard.
  if (!sessionId) return;

  const key = process.env.STRIPE_SECRET_KEY;
  let paid = false;

  if (key && sessionId.startsWith("cs_")) {
    try {
      const r = await fetch(
        "https://api.stripe.com/v1/checkout/sessions/" +
          encodeURIComponent(sessionId),
        {
          headers: {
            Authorization: "Basic " + btoa(key + ":"),
          },
        }
      );
      if (r.ok) {
        const session = await r.json();
        paid = session.payment_status === "paid";
      }
    } catch (e) {
      console.error("Elite gate verify error:", e);
    }
  }

  // Paid -> let the request through; the app unlocks Elite and remembers it.
  if (paid) return;

  // Anything else -> strip the parameter and send them to the clean app URL.
  url.searchParams.delete("session_id");
  return Response.redirect(url.toString(), 302);
}
