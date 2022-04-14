const express = require("express");
const mongoose = require("mongoose");

const app = express();
const url =
  "mongodb+srv://mowgli:Cy5TvbmwBqVuqzF9@sheeta0.koc5v.mongodb.net/bookAPI?retryWrites=true&w=majority";
const db = mongoose.connect(url);
const port = process.env.PORT || 3000;

const Book = require("./models/bookModel");

const bookRouter = express.Router();

bookRouter.route("/books").get((req, res) => {
  const query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }

  Book.find(query, (err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

bookRouter.route("/books/:bookId").get((req, res) => {
  Book.findById(req.params.bookId, (err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my NOdemon api!");
});

app.listen(port, () => {
  console.log("Running on port " + port);
});
