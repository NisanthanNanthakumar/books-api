var request = require("supertest");

describe("books server", function() {
  var server;
  before(function() {
    server = require("../index");
  });
  after(function() {
    server.close();
  });

  describe("/books/:isbn", function() {
    it("returns the book matching the given isbn", function(done) {
      request(server)
        .get("/books/140003065X")
        .expect(
          200,
          {
            title: "A Fine Balance",
            isbn: "140003065X"
          },
          done
        );
    });

    it("returns 404 if the isbn is not found", function(done) {
      request(server)
        .get("/books/NaN")
        .expect(404, done);
    });

    describe("includeAuthor", function() {
      it("returns a book with author information present", function(done) {
        request(server)
          .get("/books/140003065X?includeAuthor=1")
          .expect(
            200,
            {
              isbn: "140003065X",
              title: "A Fine Balance",
              author: {
                id: "B000AQTH1C",
                name: "Rohinton Mistry"
              }
            },
            done
          );
      });

      it("returns a book with author information absent", function(done) {
        request(server)
          .get("/books/0061624268?includeAuthor=1")
          .expect(
            200,
            {
              title: "Microserfs",
              isbn: "0061624268",
              author: {} /* note: intentiontionally absent; author data not available */
            },
            done
          );
      });
    });

    describe("includeRelated", function() {
      it("returns a book with 1-level of related books present", function(done) {
        request(server)
          .get("/books/140003065X?includeRelated=1")
          .expect(
            200,
            {
              title: "A Fine Balance",
              isbn: "140003065X",
              related: [{ isbn: "0061624268", title: "Microserfs" }]
            },
            done
          );
      });

      it("returns a book with 2-levels of related books present (case 1/2)", function(done) {
        request(server)
          .get("/books/140003065X?includeRelated=2")
          .expect(
            200,
            {
              title: "A Fine Balance",
              isbn: "140003065X",
              related: [
                { isbn: "0061624268", title: "Microserfs" },
                { isbn: "031205436X", title: "Generation X" }
              ]
            },
            done
          );
      });

      it("returns a book with 2-levels of related books present (case 2/2)", function(done) {
        request(server)
          .get("/books/0061624268?includeRelated=2")
          .expect(
            200,
            {
              title: "Microserfs",
              isbn: "0061624268",
              related: [
                { isbn: "140003065X", title: "A Fine Balance" },
                { isbn: "031205436X", title: "Generation X" },
                { isbn: "1503214133", title: "Anne of Green Gables" },
              ]
            },
            done
          );
      });
    });

    describe("includeRelated and includeAuthor", function() {
      it("returns a book with 1-level of related books, including authors", function(done) {
        request(server)
          .get("/books/140003065X?includeRelated=1&includeAuthor=1")
          .expect(
            200,
            {
              title: "A Fine Balance",
              isbn: "140003065X",
              related: [
                { isbn: "0061624268", title: "Microserfs", author: {} }
              ],
              author: {
                id: "B000AQTH1C",
                name: "Rohinton Mistry"
              }
            },
            done
          );
      });
    });
  });
});
