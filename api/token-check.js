const crypto = require("crypto");

function verifyToken(token) {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = crypto
    .createHmac("sha256", process.env.TOKEN_SECRET)
    .update(payload)
    .digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;
  const data = JSON.parse(Buffer.from(payload, "base64url").toString());
  return data.e === 1 && Date.now() < data.x;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { token } = req.body;
  if (!token || typeof token !== "string") {
    return res.status(400).json({ valid: false });
  }
  try {
    return res.status(200).json({ valid: verifyToken(token) });
  } catch {
    return res.status(400).json({ valid: false });
  }
};
