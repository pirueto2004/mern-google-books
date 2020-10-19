require("dotenv").config()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const express = require("express")
const app = express()

// const PORT = process.env.PORT || 3001;

//Environment variables for mongoDB database
const port = process.env.PORT || 3001,
  database_name = process.env.DATABASE_NAME,
  mongodbPassword = process.env.MONGOPASSWORD,
  MONGODB_URI = process.env.CONNECTIONSTRING,
  mongoURI = `mongodb://localhost:27017/${database_name}`

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

//Connecting our app to mongoDB Atlas
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  // const mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017/googlebooks"
  // mongoose.connect(mongoURL, {useNewUrlParser: true})

  .then(() => {
    console.log("🗄 ==> Successfully connected to mongoDB.")
  })
  .catch(err => {
    console.log(`Error connecting to mongoDB: ${err}`)
  })

require("./routes/api-routes")(app)

app.listen(port, () => {
  console.log(`🌎 ==> API server now on port ${port}!`)
})
