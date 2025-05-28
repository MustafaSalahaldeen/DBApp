const {client, connectRedis} = require("../infrastrucutre/data-source");

async function getRedisData(key){
    connectRedis();
    client.get(key, (err, data) => {
        if (err) {
            console.error("Error fetching data from Redis:", err);
            throw new Error("Internal server error");
        }
        if (data) {
            console.log("Data fetched from Redis");
        } else {
            console.log("Data not found in Redis");
            throw new Error("Data not found in Redis");
        }
    });
}

async function setRedisData(key, value){
    connectRedis();
    client.setex(key, 3600, JSON.stringify(value), (err) => {
        if (err) {
            console.error("Error setting data in Redis:", err);
        }
        console.log("Data cached in Redis");
    });
}

module.exports = {
    getRedisData,
    setRedisData
};