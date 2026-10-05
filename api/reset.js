// Clears the elite cookie (the in-app "Reset Elite Access" button).
// Lets Jimmy or a tester drop back to the free tier without devtools.

import { clearEliteCookie } from "../lib/elite-auth.js";

export default async function handler(req, res) {
  res.setHeader("Set-Cookie", clearEliteCookie());
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ elite: false });
}
