const express = require("express")
const app = express()
const server = require("http").Server(app)
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")

const ModelRoutes = require("./routes/ModelRoutes") // Routes import
dotenv.config()
app.use(bodyParser.json())

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
}

// mongo db connection
try {
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err
      console.log(
        "\x1b[106m\x1b[30m%s\x1b[0m",
        " <<-- DB Connected Successfully -->> "
      )
    }
  )
} catch (error) {
  console.log("DB Connection Error")
}

app.use(cors(corsOpts)) // Allowing all connection from any origin

app.use("/api", ModelRoutes) // model routes

server.listen(process.env.PORT || 5005, () => {
  console.log(
    "\x1b[103m\x1b[30m%s\x1b[0m",
    ` <<<<<<<--- Listening to port ${process.env.PORT || 5005} --->>>>>>>`
  )
})
