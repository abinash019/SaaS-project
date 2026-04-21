const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (user) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment", // ✅ SIMPLE

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Pro Plan",
          },
          unit_amount: 500, // $5
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,

    customer_email: user.email,
    metadata: {
      userId: user._id.toString(),
    },
  });

  return session;
};

/*const stripe = require('../config/stripe');
const Subscription = require('../models/Subscription');

exports.createCheckoutSession = async (user) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',

    line_items: [
      {
        price: 'price_12345', // 👉 replace with your Stripe price ID
        quantity: 1,
      },
    ],

    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,

    customer_email: user.email,
  });

  return session;
}; */
