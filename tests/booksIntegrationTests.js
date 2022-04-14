require("should");
const request = require("supertest");
process.env.ENV = "TEST";

const app = require("../app.js");
const mongoose = require("mongoose");
//eslint-disable-next-line no-unused-vars
const Book = mongoose.model("Book");

const agent = request.agent(app);

describe("Books Integration Tests on mocha", () => {
  it("should allow a book to be posted and return read and _id", (done) => {
    //Arrange
    const bookPost = {
      title: "One title",
      author: "one author",
      genre: "one genre",
    };

    //Act
    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        //Assert
        results.body.should.have.property("read");
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
