const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileName: String,
    fileUrl: String,
    fileType: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("File", fileSchema);
