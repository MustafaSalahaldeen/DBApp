require("reflect-metadata");
const { DataSource } = require("typeorm");
const dbConfig = require("../config/ormconfig");
const redis = require("redis");

const client = redis.createClient();

const AppDataSource = new DataSource(dbConfig); //database

client.on("error", (err) => {
  console.error("Redis error:", err);
});
client.on("connect", () => {
  console.log("Redis client connected");
});

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}

module.exports = { AppDataSource, connectRedis, client };
