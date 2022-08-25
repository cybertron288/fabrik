const mongoose = require("mongoose")

// model schema

const ModelSchema = new mongoose.Schema(
  {
    originalname: { type: String },
    filename: { type: String },
    bucketName: { type: String },
    contentType: { type: String },
    mimetype: { type: String },
  },
  { collection: "modelList" }
)

const model = mongoose.model("ModelSchema", ModelSchema)

module.exports = model