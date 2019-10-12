"use strict";
const express = require("express");
const app = express();
const { BOOKS, AUTHORS, BOOKS_AUTHORS, BOOKS_RELATED } = require("./books"); // see books.js for data

const findAuthor = isbn => {
  let bookAuthor = BOOKS_AUTHORS.find(obj => obj.isbn === isbn);
  let author = bookAuthor
    ? AUTHORS.find(obj => obj.id === bookAuthor.authorId)
    : null;

  return author ? author : {};
};
app.get("/books/:isbn", (req, res) => {
  const { includeAuthor, includeRelated } = req.query;
  const { isbn } = req.params;

  let book = BOOKS.find(book => book.isbn === isbn);
  if (!book) {
    return res.status(404).json({});
  }
  console.log(req.query);
  let final = { ...book };
  if (parseInt(includeAuthor, 10) === 1) {
    final.author = findAuthor(isbn);
  }
  if (parseInt(includeRelated, 10)) {
    let related = [];
    let existing = [book];

    for (let i = parseInt(includeRelated, 10); i > 0; i--) {
      let ISBN = related.length ? related[related.length - 1].isbn : isbn;

      let relatedBook = BOOKS_RELATED.find(obj => {
        if (parseInt(includeRelated, 10) > 1 && existing.length > 1) {
          console.log(existing.filter(book => book.isbn === obj.relatedIsbn));
          return (
            obj.isbn === ISBN &&
            existing.filter(book => book.isbn === obj.relatedIsbn).length === 0
          );
        }
        return obj.isbn === ISBN;
      });
      console.log({ ISBN, existing, relatedBook });
      let populatedBook = relatedBook ? BOOKS.find(
        book => book.isbn === relatedBook.relatedIsbn
      ) : {};
      let result = { ...populatedBook };
      if (parseInt(includeAuthor, 10) === 1) {
        result.author = findAuthor(result.isbn);
      }
      related.push(result);
      existing.push(result);
    }
    final.related = related;
  }

  // TODO: implement me

  // Express tips:
  // req.params => named route parameters
  //    e.g.req.params.isbn
  //
  // req.query => request query string (object)
  //    e.g. req.query.includeAuthor
  res.status(200).json(final);
});

module.exports = app;
