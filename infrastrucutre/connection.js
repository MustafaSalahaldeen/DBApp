require("reflect-metadata");
const { createConnection } = require("typeorm");
const dbConfig = require("../config/ormconfig");

async function connect() {
    try {
        const connection = await createConnection(dbConfig);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

exports.connect = connect;