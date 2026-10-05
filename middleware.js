// Edge gate for DropPilot Elite.
//
// Two jobs:
//  1. Verify ?session_id= against Stripe. Paid -> set a signed, HTTP-only
//     elite cookie and redirect to the clean URL. Unpaid/unknown -> strip
//     the parameter and redirect.
//  2. On later visits the signed cookie proves elite without another
//     Stripe call.
//
// Runs only on /app.html. Requires STRIPE_SECRET_KEY (restricted key with
// Checkout Sessions read access is enough). The cookie is signed with
// ELITE_SECRET, falling back to STRIPE_SECRET_KEY.

import { issueEliteCookie, isEliteRequest } from "./lib/elite-auth.js";

export const config = { matcher: "/app.html" };

function redirect(url, setCookie) {
  const headers = { Location: url.toString() };
  if (setCookie) headers["Set-Cookie"] = setCookie;
  return new Response(null, { status: 302, headers });
}

export default async function middleware(req) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  // No session id -> nothing to guard. A valid elite cookie passes through.
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

  // Strip the parameter either way so the app never sees a raw session id.
  url.searchParams.delete("session_id");

  if (paid) {
    // Buyer verified: plant the signed elite cookie on the redirect.
    const cookie = await issueEliteCookie();
    return redirect(url, cookie);
  }

  // Anything else -> strip the parameter and send them to the clean app URL.
  return redirect(url, null);
}
