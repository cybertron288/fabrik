var express = require("express")
var router = express.Router()
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()
const {
  getFiles,
  uploadFile,
  getFile,
} = require("../controller/ModelController")
const { upload } = require("../middleware/ModelMiddleware")

router.get("/files", getFiles)

router.get("/file/:fileName", getFile)

router.post("/upload", upload.single("file"), uploadFile)

module.exports = router
