const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { URL, URLTest } = require("./local.config");
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

const app = express();

if (process.env.ENV === "TEST") {
  console.log("This is for test");
  //eslint-disable-next-line no-unused-vars
  const db = mongoose.connect(URLTest);
} else {
  console.log("This is for real");
  //eslint-disable-next-line no-unused-vars
  const db = mongoose.connect(URL);
}
//eslint-disable-next-line no-unused-vars
const db = mongoose.connect(URL);
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my NOdemon api!");
});

app.server = app.listen(port, () => {
  console.log("Running on port " + port);
});

module.exports = app;
