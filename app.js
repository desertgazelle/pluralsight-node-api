const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { URL } = require("./local.config");
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

const app = express();
//eslint-disable-next-line no-unused-vars
const db = mongoose.connect(URL);
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my NOdemon api!");
});

app.listen(port, () => {
  console.log("Running on port " + port);
});
