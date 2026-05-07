// Generate a fresh ECDSA P-256 keypair for signing Elite unlock tokens.
//
// Usage:  node workers/generate-keys.mjs
//
// Then:
//   • Paste the printed `publicKey` JSON into ELITE_PUBLIC_JWK in app.html.
//   • Save the printed `privateKey` JSON as a Cloudflare Worker secret:
//       cd workers && npx wrangler secret put SIGNING_PRIVATE_JWK
//
// Never commit the private key. Re-run this script to rotate; old tokens
// become invalid the next time users open the app, and they'll need to
// re-verify (or be re-issued tokens via Stripe webhook replay / support).

import { webcrypto } from "node:crypto";
const { subtle } = webcrypto;

const pair = await subtle.generateKey(
  { name: "ECDSA", namedCurve: "P-256" },
  true,
  ["sign", "verify"]
);

const [publicJwk, privateJwk] = await Promise.all([
  subtle.exportKey("jwk", pair.publicKey),
  subtle.exportKey("jwk", pair.privateKey)
]);

const cleanPublic = { kty: publicJwk.kty, crv: publicJwk.crv, x: publicJwk.x, y: publicJwk.y };

console.log("=== Public key — paste into app.html (ELITE_PUBLIC_JWK) ===");
console.log(JSON.stringify(cleanPublic, null, 2));
console.log("");
console.log("=== Private key — set as Worker secret SIGNING_PRIVATE_JWK ===");
console.log(JSON.stringify(privateJwk));
console.log("");
console.log("Then run:  cd workers && npx wrangler secret put SIGNING_PRIVATE_JWK");
console.log("and paste the private key JSON when prompted.");
