const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  fileController.uploadFile,
);
router.get("/list", authMiddleware, fileController.listFiles);
router.delete("/delete/:id", authMiddleware, fileController.deleteFile);

module.exports = router;
