const { AppDataSource } = require("../infrastrucutre/data-source");
const { validateBook, validateBookId } = require("../middleware/book");
const bookRepository = AppDataSource.getRepository("Book");
const { redisClient } = require("../app");

async function getBooks(req, res) {
  const result = await bookRepository.find();
  await redisClient.get("books", (err, books) => {
    if (err) {
      console.error("Error fetching books from Redis:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (books) {
      console.log("Books fetched from Redis");
      return res.json(JSON.parse(books));
    } else {
      redisClient.setex("books", 3600, JSON.stringify(result));
      console.log("Books fetched from database and cached in Redis");
    }
  });
  res.json(result);
}

async function getBookById(req, res) {
  try {
    const searchParam = req.params.searchParam;
    const param = validateBookId(searchParam);
    await redisClient.get(`book/${searchParam}`, async (err, book) => {
      if (err) {
        console.error("Error fetching book from Redis:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (book) {
        console.log("Book fetched from Redis");
        return res.json(JSON.parse(book));
      }
      if (!book) {
        console.log("Book not found in Redis, fetching from database");
        const result = await bookRepository.findOneBy(
          param == "id"
            ? { id: searchParam }
            : { title: searchParam.substring(1, searchParam.length - 1) }
        );
        if (result) {
          res.json(result);
        } else {
          result = { error: "Book not found" };
          res.status(404).json(result);
        }
        redisClient.setex(`book/${searchParam}`, 3600, JSON.stringify(result));
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
}

async function deleteBook(req, res) {
  try {
    const bookId = req.params.id;
    const result = await bookRepository.delete(bookId);
    if (result.affected > 0) {
      res.status(204).json({ message: "deleted Successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
}

async function addBook(req, res) {
  try {
    const validatedBook = validateBook(req.body);
    console.log(validatedBook);
    const newBook = await bookRepository.create(validatedBook);
    const result = await bookRepository.save(newBook);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
}

module.exports = {
  getBooks,
  addBook,
  getBookById,
  deleteBook,
};
