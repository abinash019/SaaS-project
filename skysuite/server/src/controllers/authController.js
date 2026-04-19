const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  const data = await authService.registerUser(req.body);

  res.status(201).json({
    status: "success",
    data,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const data = await authService.loginUser(req.body);

  res.status(200).json({
    status: "success",
    data,
  });
});
