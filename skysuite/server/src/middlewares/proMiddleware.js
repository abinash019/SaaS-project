const Subscription = require("../models/Subscription");

const requirePro = async (req, res, next) => {
  const sub = await Subscription.findOne({ user: req.user._id });

  if (!sub || !sub.isPro) {
    return res.status(403).json({
      message: "Pro plan required",
    });
  }

  next();
};

module.exports = requirePro;
