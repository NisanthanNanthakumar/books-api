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

const findNewRelatedBooks = (ISBN, existing) => {
  let related = BOOKS_RELATED.filter(obj => obj.isbn === ISBN).filter(
    book => existing.find(({ isbn }) => isbn === book.relatedIsbn) === undefined
  );
  let populated = related.map(obj =>
    BOOKS.find(book => book.isbn === obj.relatedIsbn)
  );
  return populated;
};

app.get("/books", (req,res) => {
  res.send(BOOKS)
})

app.get("/books/:isbn", (req, res) => {
  const { includeAuthor, includeRelated } = req.query;
  const { isbn } = req.params;

  let book = BOOKS.find(book => book.isbn === isbn);
  if (!book) {
    return res.status(404).json({});
  }
  let final = { ...book };

  if (parseInt(includeAuthor, 10) === 1) {
    final.author = findAuthor(isbn);
  }
  if (parseInt(includeRelated, 10)) {
    let related = [];
    let existing = [book];

    for (let i = parseInt(includeRelated, 10); i > 0; i--) {
      let ISBN = related.length ? related[related.length - 1].isbn : isbn;
      let newRelatedBooks = findNewRelatedBooks(ISBN, existing);

      if (parseInt(includeAuthor, 10) === 1) {
        newRelatedBooks = newRelatedBooks.map(book => ({
          ...book,
          author: findAuthor(book.isbn)
        }));
      }
      related.push(...newRelatedBooks);
      existing.push(...newRelatedBooks);
    }
    final.related = related;
  }

  res.status(200).json(final);
});


app.get("/health_status", (req,res) => {
  console.log("ping")
  res.send({message: "healthy"})
})

module.exports = app;
