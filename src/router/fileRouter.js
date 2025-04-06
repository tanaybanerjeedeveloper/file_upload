const express = require("express");
const upload = require("../middleware/multer_config");
const multer = require("multer");
const UNEXPECTED_FILE_TYPE = require("../constants/error_constants");
const fileController = require("../controllers/fileController");
const imageResize = require("../middleware/imageResize");
const authenticateJWT = require("../middleware/authentication");

const fileRouter = express.Router();

fileRouter.post(
  "/upload",
  authenticateJWT,
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === UNEXPECTED_FILE_TYPE.code) {
          // return res.status(400).json({ error: UNEXPECTED_FILE_TYPE.message });
          return res.status(400).json({ error: { description: err.field } });
        }
      } else if (err) {
        return res.status(500).json({ error: { description: err.message } });
      }
      next();
    });

    // next();
  },
  imageResize,
  fileController
);

module.exports = fileRouter;
