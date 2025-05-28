const express = require('express');
const controller = require('../controllers/book.js');
const router = express.Router();

router.get('/', (req, res) => {
    controller.getBooks(req, res);
});

router.get('/:searchParam', (req, res) => {
    controller.getBookById(req, res);
});

router.delete('/:id', (req, res) => {
    controller.deleteBook(req, res);
});

router.post('/', (req, res) => {
    controller.addBook(req, res);
});

module.exports = router;