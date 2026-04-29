module.exports = function handler(req, res) {
  const ok = !!process.env.STRIPE_SECRET_KEY && !!process.env.TOKEN_SECRET;
  res.status(ok ? 200 : 503).json({
    ok,
    stripe: !!process.env.STRIPE_SECRET_KEY,
    token: !!process.env.TOKEN_SECRET,
  });
};
