const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Anime",
    tableName: "Anime",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
            length: 255,
        },
        author: {
            type: "varchar",
            length: 255,
        },
        publishedDate: {
            type: "date",
        },
        author: {
            type: "varchar",
            length: 255,
        },
        genreId: {
            type: "int",
        },
    },
    relations: {
        genre: {
            type: "many-to-one",
            target: "Genre",
            joinColumn: {
                name: "genreId",
                referencedColumnName: "id",
            },
            inverseSide: "anime", 
        }
    }
});