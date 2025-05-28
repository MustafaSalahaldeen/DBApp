const {
  AppDataSource,
  connectRedis,
  client,
} = require("../infrastrucutre/data-source");
const { validateanime, validateAnimeId } = require("../middleware/anime");
const { get } = require("../routers/anime");
const { getRedisData, setRedisData } = require("./redis");
const animeRepository = AppDataSource.getRepository("Anime");

async function getAnime(req, res) {
  let result = {};
  try {
    result = getRedisData("anime");
  } catch (error) {
    result = await animeRepository.find();
    setRedisData("anime", result);
  } finally {
    await client.quit();
  }
  res.json(result);
}

async function getAnimeById(req, res) {
  const searchParam = validateAnimeId(req.params.searchParam);
  let result = {};
  try {
    result = getRedisData(`anime_${searchParam}`);
  } catch (error) {
    result = await animeRepository.findOneBy(
      searchParam == "id"
        ? { id: req.params.searchParam }
        : {
            title: req.params.searchParam.substring(
              1,
              req.params.searchParam.length - 1
            ),
          }
    );
    setRedisData(`anime_${searchParam}`, result);
  } finally {
    await client.quit();
  }
  res.json(result);
}

module.exports = {
  getAnime,
  getAnimeById,
};
