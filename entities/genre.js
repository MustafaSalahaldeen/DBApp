const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Genre",
    tableName: "Genre",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        arbicTitle: {
            type: "varchar",
            length: 255,
        },
        englishTitle: {
            type: "varchar",
            length: 255,
        }
    },
        relations: {
            books: {
                type: "one-to-many",
                target: "Book",
                inverseSide: "genre",
            },
            anime: {
                type: "one-to-many",
                target: "Anime",
                inverseSide: "genre",
            }
        }
});
