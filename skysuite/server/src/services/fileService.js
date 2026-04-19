const s3 = require("../config/s3");
const File = require("../models/File");
const AppError = require("../utils/AppError");

exports.uploadFile = async (file, userId) => {
  if (!file) throw new AppError("No file provided", 400);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // upload to S3
  const data = await s3.upload(params).promise();

  // save to DB
  const savedFile = await File.create({
    user: userId,
    fileName: file.originalname,
    fileUrl: data.Location,
    fileType: file.mimetype,
  });

  return savedFile;
};

exports.listFiles = async (userId) => {
  return await File.find({ user: userId }).sort({ createdAt: -1 });
};

exports.deleteFile = async (fileId, userId) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new AppError("File not found", 404);

  // delete from S3
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.fileUrl.split("/").pop(),
  };
  await s3.deleteObject(params).promise();

  await file.remove();

  return { message: "File deleted successfully" };
};
