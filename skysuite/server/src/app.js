const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SkySuite API Running 🚀");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);
app.use(errorMiddleware);
app.use(morgan("dev"));

const fileRoutes = require("./routes/fileRoutes");

app.use("/api/files", fileRoutes);
module.exports = app;
