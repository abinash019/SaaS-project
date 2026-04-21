const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const requirePro = require("../middlewares/proMiddleware");
const aiController = require("../controllers/aiController");

router.post("/chat", authMiddleware, aiController.chat); // requirePro,

module.exports = router;
