const { cloudinaryUpload } = require("../services/fileService");

const fileController = async (req, res) => {
  try {
    if (
      !req.files ||
      (Array.isArray(req.files) && req.files.length === 0) ||
      (typeof req.files === "object" && Object.keys(req.files).length === 0)
    ) {
      return res.status(400).json({
        error: "No file is sent in the request or there's client-side error",
      });
    }

    let result = await cloudinaryUpload(req.files[0]);
    return res
      .status(200)
      .json({ message: "File uploaded successfully!", uploadResult: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = fileController;
