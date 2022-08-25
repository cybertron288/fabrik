const dotenv = require("dotenv")
const crypto = require("crypto")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")
const path = require("path")

dotenv.config()

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString("hex") + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: "models",
        }
        resolve(fileInfo)
      })
    })
  },
})
const upload = multer({ storage })

module.exports = { upload }
