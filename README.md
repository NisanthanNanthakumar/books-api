# Book Store API

In this exercise, you'll be given incomplete web server code for a book store's API.

You need to implement a single HTTP endpoint, `/books/:isbn`, which returns a description of the book matching the provided ISBN.

```bash
$ curl http://127.0.0.1:3000/books/1503214133
{  
   "isbn":"1503214133",
   "title":"Anne of Green Gables"
}
```

The provided source code will include a list of books (`BOOKS`) to pull from.

## Requirements

This endpoint supports two additional query parameters, `includeAuthor` and `includeRelated`.

### includeAuthor

If you specify `?includeAuthor=1` in the query string, the endpoint should additionally attach an associated author object. Authors and book/author relationships are provided via the `AUTHORS` and `BOOKS_AUTHORS` arrays.

```bash
$ curl http://127.0.0.1:3000/books/1503214133?includeAuthor=1
{  
   "isbn":"1503214133",
   "title":"Anne of Green Gables",
   "author":{  
      "name":"L. M. Montgomery"
   }
}
```

### includeRelated

If you specify `?includeRelated=<depth>`, the endpoint should additionally attach any related books. "Related" books are pre-defined and provided to you via the `BOOKS_RELATED` array.

```bash
$ curl http://127.0.0.1:3000/books/1503214133?includeRelated=1
{  
   "isbn":"1503214133",
   "title":"Anne of Green Gables",
   "related":{  
      "isbn": "038549081X",
      "title": "A Handmaid's Tale"
   }
}
```

For each `depth` level, the endpoint should return a larger set of related books by traversing through deeper book relationships.

For example, if book `A` is related to book `B`, and  `B` is related to book `C`, fetching book `A` with `?includeRelated=2` should return both `B` and `C` under the `related` property.

## Tests

You are provided with a working set of unit tests; please see `test/test.js`. A complete submission should satisfy each of these tests.

## Evaluations

* This exercise is scored out of 8, one for each passing test.
* Partial solutions are accepted, provided the program compiles and executes.
* If you are having difficulty with one part of the test, consider skipping ahead and coming back.