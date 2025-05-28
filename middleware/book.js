const book = require("../entities/book");

function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    throw new Error("Invalid book title");
  }
  if (!book.author || typeof book.author !== "string") {
    throw new Error("Invalid book author");
  }
  if (
    !book.publishedDate ||
    isNaN(new Date(book.publishedDate).getTime()) ||
    new Date(book.publishedDate) > new Date()
  ) {
    throw new Error("Invalid published date");
  } else {
    book.publishedDate = new Date(book.publishedDate).toISOString();
  }

  return book;
}

function validateBookId(bookId) {
  let paramType = "id";
  if (!bookId || isNaN(bookId)) {
    paramType = "title";
    if (
      bookId[0] + bookId[bookId.length - 1] == '""' ||
      bookId[0] + bookId[bookId.length - 1] == "''"
    ) {
      return paramType;
    }
    throw new Error("Invalid book ID");
  }
  return paramType;
}

module.exports = {
  validateBook,
  validateBookId,
};
