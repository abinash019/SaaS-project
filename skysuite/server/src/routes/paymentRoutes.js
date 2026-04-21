const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const paymentController = require("../controllers/paymentController");

router.post("/checkout", authMiddleware, paymentController.checkout);

module.exports = router;
