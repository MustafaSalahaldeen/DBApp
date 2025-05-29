const {client} = require("../infrastrucutre/data-source");

async function getRedisData(key){
    return await client.get(key);
}

async function setRedisData(key, value){
    await client.setEx(key, 3600, JSON.stringify(value), (err) => {
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