const sinon = require("sinon");
//eslint-disable-next-line no-unused-vars
const should = require("should");
const bookController = require("../controllers/bookController");

describe("bookController Tests on mocha", () => {
  describe("Post", () => {
    it("should not allow an empty title on post", () => {
      //Arrange
      //eslint-disable-next-line no-unused-vars
      const Book = function (book) {
        this.save = () => {};
      };
      const req = {
        body: {
          author: "one author",
          genre: "Fantasy",
        },
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      //Act
      const controller = bookController(Book);
      controller.post(req, res);

      //Assert
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
