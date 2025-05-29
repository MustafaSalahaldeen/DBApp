const express = require("express");
const dotenv = require("dotenv");
const booksRouter = require("./routers/book.js");
const animesRouter = require("./routers/anime.js");
require("dotenv").config({ path: `./config/.env.${process.env.NODE_ENV}` });
const { connect } = require("./infrastrucutre/connection.js");
const { AppDataSource, connectRedis } = require("./infrastrucutre/data-source.js");
const { createClient } = require("redis");
const anime = require("./entities/anime.js");

const REDIS_URL = process.env.REDIS_URL;

const PORT = process.env.PORT || 3000;

const app = express();

app.set("config", {
  REDIS_URL: process.env.REDIS_URL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_TYPE: process.env.DATABASE_TYPE,
});

console.log(1);

connectRedis();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use(express.json());

app.use("/book", booksRouter);
app.use("/anime", animesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
