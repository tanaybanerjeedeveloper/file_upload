const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fileRouter = require("./src/router/fileRouter");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/files", fileRouter);
app.use("/", (req, res) => {
  return res.status(200).send("Welcome to file upload");
});
app.use("/src/uploads", express.static("src/uploads"));

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
