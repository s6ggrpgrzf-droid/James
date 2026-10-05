// Returns whether this browser holds a valid elite cookie.
// The app uses this as the source of truth for the Elite unlock instead of
// trusting localStorage.

import { isEliteRequest } from "../lib/elite-auth.js";

export default async function handler(req, res) {
  const elite = await isEliteRequest(req);
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ elite });
}
