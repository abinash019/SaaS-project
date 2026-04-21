const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    plan: String,
    status: String,
    isPro: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
