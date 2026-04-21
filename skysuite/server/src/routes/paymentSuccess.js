const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

// THIS RUNS AFTER PAYMENT
router.post("/success", authMiddleware, async (req, res) => {
  const user = req.user;

  user.isPro = true;
  await user.save();

  res.json({
    message: "Payment success → User is now PRO",
  });
});

module.exports = router;
