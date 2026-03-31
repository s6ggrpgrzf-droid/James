// DropPilot — Stripe Webhook Worker
// Secrets needed in Cloudflare dashboard:
//   STRIPE_WEBHOOK_SECRET  — Stripe → Webhooks → your endpoint → Signing secret
//   RESEND_API_KEY         — Resend → API Keys

const UNLOCK_CODE = "DP-HNK9-HEX9-HWMX";
const FROM_EMAIL  = "onboarding@resend.dev";
const FROM_NAME   = "DropPilot";

export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response("Not found", { status: 404 });
    }

    const body = await request.text();
    const sig  = request.headers.get("stripe-signature");
    if (!sig) return new Response("Missing signature", { status: 400 });

    let event;
    try {
      event = await verifyStripeSignature(body, sig, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return new Response("Bad signature: " + err.message, { status: 400 });
    }

    if (event.type !== "checkout.session.completed" &&
        event.type !== "payment_intent.succeeded") {
      return new Response("OK", { status: 200 });
    }

    let customerEmail =
      event.data.object.customer_details?.email ||
      event.data.object.customer_email ||
      event.data.object.receipt_email || null;

    if (!customerEmail) return new Response("No email", { status: 200 });

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [customerEmail],
        subject: "Your DropPilot Elite Unlock Code",
        html: buildEmail(UNLOCK_CODE),
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error("Resend error:", err);
      return new Response("Email failed", { status: 500 });
    }

    return new Response("OK", { status: 200 });
  }
};

async function verifyStripeSignature(payload, sigHeader, secret) {
  const parts = Object.fromEntries(sigHeader.split(",").map(p => p.split("=")));
  const timestamp = parts["t"], signature = parts["v1"];
  if (!timestamp || !signature) throw new Error("Malformed header");

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) throw new Error("Timestamp too old");

  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC", key, new TextEncoder().encode(`${timestamp}.${payload}`)
  );
  const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2,"0")).join("");
  if (expected !== signature) throw new Error("Signature mismatch");
  return JSON.parse(payload);
}

function buildEmail(code) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#07080A;font-family:Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#07080A;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:480px;background:#0D0F13;border-radius:20px;border:1px solid rgba(255,255,255,0.08);">
        <tr><td style="padding:32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:36px;">🚗</div>
          <div style="font-size:26px;font-weight:900;color:#F5A623;">DropPilot</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:3px;">DRIVER COMMAND CENTER</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;margin:0 0 24px;">You're in. Here is your Elite unlock code:</p>
          <div style="background:#07080A;border:2px solid #F5A623;border-radius:14px;padding:20px;text-align:center;margin-bottom:28px;">
            <div style="font-size:11px;font-weight:700;color:rgba(245,166,35,0.6);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Your Unlock Code</div>
            <div style="font-size:28px;font-weight:900;color:#F5A623;letter-spacing:4px;font-family:'Courier New',monospace;">${code}</div>
          </div>
          <p style="color:rgba(255,255,255,0.5);font-size:13px;font-weight:700;margin:0 0 8px;">How to unlock:</p>
          <ol style="color:rgba(255,255,255,0.5);font-size:13px;line-height:2;margin:0 0 28px;padding-left:20px;">
            <li>Open DropPilot</li>
            <li>Tap any locked feature</li>
            <li>Tap <strong style="color:rgba(255,255,255,0.8);">Unlock with Code</strong></li>
            <li>Enter the code above</li>
          </ol>
          <p style="color:rgba(255,255,255,0.3);font-size:12px;line-height:1.6;margin:0;">This code is for your personal use. Keep it safe — you will need it if you switch devices.</p>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">DropPilot · Lifetime access · Free updates forever</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
