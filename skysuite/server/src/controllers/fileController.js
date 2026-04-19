const fileService = require("../services/fileService");
const asyncHandler = require("../utils/asyncHandler");

exports.uploadFile = asyncHandler(async (req, res) => {
  const savedFile = await fileService.uploadFile(req.file, req.user._id);

  res.status(201).json({
    status: "success",
    data: savedFile,
  });
});

exports.listFiles = asyncHandler(async (req, res) => {
  const files = await fileService.listFiles(req.user._id);

  res.status(200).json({
    status: "success",
    data: files,
  });
});

exports.deleteFile = asyncHandler(async (req, res) => {
  const result = await fileService.deleteFile(req.params.id, req.user._id);

  res.status(200).json({
    status: "success",
    message: result.message,
  });
});
