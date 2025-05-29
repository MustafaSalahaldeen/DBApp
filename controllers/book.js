const { AppDataSource } = require("../infrastrucutre/data-source");
const { validateBook, validateBookId } = require("../middleware/book");
const bookRepository = AppDataSource.getRepository("Book");
const { getRedisData, setRedisData } = require("../middleware/redis");

async function getBooks(req, res) {
  try {
    const cachedBooks = await getRedisData("Book");
    res.json(JSON.parse(cachedBooks));
  } catch (e) {
    const dbBooks = bookRepository.find({ relations: ["genre"] });
    res.json(dbBooks);
    await setRedisData("Book", dbBooks);
  }
}

async function getBookById(req, res) {
  const searchParam = req.params.searchParam;
  const param = validateBookId(searchParam);
  console.log(`${param} : ${searchParam}`);
  try {
    const cachedBook = await getRedisData(`Book_${searchParam}`);
    res.json(JSON.parse(cachedBook));
  } catch (e) {
    const dbBook = await bookRepository.find(
      param == "id" ? { id: searchParam } : { title: searchParam }
    );
    res.json(dbBook);
    await setRedisData(`Book_${searchParam}`, dbBook);
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
