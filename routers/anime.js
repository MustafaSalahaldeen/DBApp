const express = require('express');
const controller = require('../controllers/anime.js');
const router = express.Router();

router.get('/', (req, res) => {
    controller.getAnime(req, res);
});

router.get('/:searchParam', (req, res) => {
    controller.getAnimeById(req, res);
});

router.delete('/:id', (req, res) => {
    controller.deleteAnime(req, res);
});

router.post('/', (req, res) => {
    controller.addAnime(req, res);
});

module.exports = router;