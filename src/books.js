const BOOKS = Object.freeze([
    Object.freeze({ isbn: "038549081X", title: "A Handmaid's Tale"}),
    Object.freeze({ isbn: "140003065X", title: "A Fine Balance" }),
    Object.freeze({ isbn: "0061624268", title: "Microserfs" }),
    Object.freeze({ isbn: "031205436X", title: "Generation X" }),
    Object.freeze({ isbn: "0156027321", title: "Life of Pi" }),
    Object.freeze({ isbn: "1503214133", title: "Anne of Green Gables" }),
    Object.freeze({ isbn: "3759275893", title: "Wolf of Wall Street" })
  ]);
  
const AUTHORS = Object.freeze([
    Object.freeze({ id: "B001H6IREM", name: "Yann Martel" }),
    Object.freeze({ id: "B000APW60C", name: "Douglas Coupland" }),
    Object.freeze({ id: "B000AQTHI0", name: "Margaret Atwood " }),
    Object.freeze({ id: "B000AQTH1C", name: "Rohinton Mistry" }),
    Object.freeze({ id: "B000AP8S68", name: "L. M. Montgomery" })
  ]);
  
const BOOKS_AUTHORS = Object.freeze([
    Object.freeze({ isbn: "140003065X", authorId: "B000AQTH1C" }),
    Object.freeze({ isbn: "031205436X", authorId: "B000APW60C" }),
    Object.freeze({ isbn: "9780156027328", authorId: "B000AQTH1C" })
  ]);
  
const BOOKS_RELATED = Object.freeze([
    Object.freeze({ isbn: "140003065X", relatedIsbn: "0061624268" }),
    Object.freeze({ isbn: "0061624268", relatedIsbn: "140003065X" }),
    Object.freeze({ isbn: "0061624268", relatedIsbn: "031205436X" }),
    Object.freeze({ isbn: "031205436X", relatedIsbn: "1503214133" })
  ]);

module.exports = {
    BOOKS, AUTHORS, BOOKS_AUTHORS, BOOKS_RELATED
}