const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const errorMiddleware = require("./middlewares/errorMiddleware");
const requirePro = require("./middlewares/proMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

//  Global middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//  Routes
app.get("/", (req, res) => {
  res.send("SkySuite API Running 🚀");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const fileRoutes = require("./routes/fileRoutes");
app.use("/api/files", fileRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const paymentSuccessRoutes = require("./routes/paymentSuccess");
app.use("/api/payment", paymentSuccessRoutes);

//  Static
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Protected test route
app.get("/api/premium-feature", authMiddleware, requirePro, (req, res) => {
  res.json({ message: "Welcome Pro user 🚀" });
});

app.use("/api/ai", aiRoutes);

// Error handler (LAST)
app.use(errorMiddleware);

module.exports = app;
