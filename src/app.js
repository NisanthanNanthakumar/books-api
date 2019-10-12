"use strict";
const express = require("express");
const app = express();

const { 
  BOOKS, 
  AUTHORS, 
  BOOKS_AUTHORS, 
  BOOKS_RELATED
} = require("./books"); // see books.js for data

app.get("/books/:isbn", (req, res) => {
  // TODO: implement me

  // Express tips:
  // req.params => named route parameters
  //    e.g.req.params.isbn
  //
  // req.query => request query string (object)
  //    e.g. req.query.includeAuthor

  res.status(200).json({ todo: "return a book object here" });
});

module.exports = app;
