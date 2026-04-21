const aiService = require("../services/aiService");
const asyncHandler = require("../utils/asyncHandler");

exports.chat = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  const reply = await aiService.generateResponse(prompt);

  res.json({ reply });
});
