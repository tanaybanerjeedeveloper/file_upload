const { uploadToCloudinary } = require("../config/cloudinary");
const fs = require("fs");

const cloudinaryUpload = async (file) => {
  try {
    let result = await uploadToCloudinary(file.path);
    fs.unlink(file.path, (error) => {
      if (error) {
        console.error(error);
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { cloudinaryUpload };
