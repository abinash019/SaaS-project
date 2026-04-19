const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// Protected route to get user profile
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
