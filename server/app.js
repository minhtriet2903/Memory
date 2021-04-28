const bodyParser = require("body-parser");
const dot = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./routes/userRoute");
const mainRoute = require("./routes/articleRoute");
const port = 3000;
global.__basedir = __dirname;

mongoose
  .connect(
    "mongodb+srv://helloadmin:helloadmin@cluster0.upitw.mongodb.net/helloadmin?authSource=admin&replicaSet=atlas-khilou-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
    // "mongodb://localhost:27017/sps",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(userRouter);
app.use(mainRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
