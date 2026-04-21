const paymentService = require("../services/paymentService");
const asyncHandler = require("../utils/asyncHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Subscription = require("../models/Subscription");

exports.checkout = asyncHandler(async (req, res) => {
  const session = await paymentService.createCheckoutSession(req.user);

  res.status(200).json({
    status: "success",
    url: session.url,
  });
});

exports.verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ message: "Session ID required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ success: false });
    }

    const userId = session.metadata.userId;

    if (!userId) {
      return res.status(400).json({ message: "Invalid session" });
    }

    // 🔐 SECURITY CHECK
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Subscription.findOneAndUpdate(
      { user: userId },
      {
        stripeCustomerId: session.customer,
        plan: "pro",
        status: "active",
        isPro: true,
      },
      { upsert: true, new: true },
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Stripe error" });
  }
};
