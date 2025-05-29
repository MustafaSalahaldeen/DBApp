const { AppDataSource, client } = require("../infrastrucutre/data-source");
const { validateAnime, validateAnimeId } = require("../middleware/anime");
const animeRepository = AppDataSource.getRepository("Anime");
const {getRedisData , setRedisData} = require("../middleware/redis");

async function getAnime(req, res) {
  //Search in the cahce for the required data
  try {
    const cachedAnimes = await getRedisData("Anime");
    res.json(JSON.parse(cachedAnimes));
  } catch (e) {
    const dbAnimes = await animeRepository.find({ relations: ["genre"] });
    console.log("Im here");
    await setRedisData("Anime", dbAnimes);
    res.json(dbAnimes);
  }
}

async function getAnimeById(req, res) {
  //Search in the cahce for the required data
  const searchParam = req.params.searchParam;
  const param = validateAnimeId(searchParam);
  try {
    const cachedAnimes = getRedisData(`Anime_${searchParam}`);
    res.json(JSON.parse(cachedAnimes));
  } catch (e) {
    const dbAnimes = animeRepository.find(
      param == "id" ? { id: searchParam } : { title: searchParam }
    );
    console.log(dbAnimes);
    res.json(dbAnimes);
    await setRedisData(`Anime_${param}`, dbAnimes);
  }
}

async function addAnime(req, res) {
  try {
    const validateAnime = validateAnime(req.body);
    const newAnime= await animeRepository.create(validateAnime);
    const result = await animeRepository.save(newAnime);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
}


module.exports = {
  getAnime,
  getAnimeById,
  addAnime
};
