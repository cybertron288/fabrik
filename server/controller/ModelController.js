const dotenv = require("dotenv")
const Grid = require("gridfs-stream")
const mongoose = require("mongoose")
const Models = require("../model/Model") // Mongo User Schema

dotenv.config()

const conn = mongoose.createConnection(process.env.MONGO_URL)
// Init gfs, gridfsBucket
let gfs, gridfsBucket

conn.once("open", () => {
  // Init stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "models",
  })
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection("models")
})

// @route POST /upload
// @desc  Uploads file to DB
const uploadFile = async (req, res) => {
  let modelObj = {
    originalname: req.file.originalname,
    filename: req.file.filename,
    bucketName: req.file.bucketName,
    contentType: req.file.contentType,
    mimetype: req.file.mimetype,
  }
  try {
    await Models.create(modelObj)
    return res
      .status(200)
      .json({ status: "ok", data: "model updated successfully" })
  } catch (error) {
    if (error.code === 11000) {
      // error.code === 11000 duplicate key
      return res
        .status(500)
        .json({ status: "error", error: "model with same name already there" })
    }
    throw error
  }
}

// @route GET /files
// @desc  Display all files in JSON
const getFiles = (req, res) => {
  try {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          error: "No files exist",
        })
      }

      Models.find({}, (err, models) => {
        return res.json(models)
      })
    })
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" })
  }
}

// @route GET /files/:filename
// @desc  Display single file object
const getFile = async (req, res) => {
  const { fileName } = req.params
  const model = await Models.findOne({ fileName }).lean()

  try {
    gfs.files.findOne({ filename: model.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          error: "No file exists",
        })
      }

      if (fileName) {
        const readStream = gridfsBucket.openDownloadStreamByName(fileName)
        readStream.pipe(res)
      } else {
        res.status(404).json({
          error: "Not found",
        })
      }
    })
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" })
  }
}

module.exports = { getFiles, uploadFile, getFile }
