module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            field: 'release_year'
        },
        duration: {
            type: DataTypes.INTEGER // продолжительность в минутах
        },
        rating: {
            type: DataTypes.FLOAT // рейтинг фильма
        }
    }, {
        tableName: 'movies',
        timestamps: false
    });

    Movie.associate = (models) => {
        Movie.belongsTo(models.Director, { foreignKey: 'director_id' });
        Movie.belongsTo(models.Genre, { foreignKey: 'genre_id' });
    };

    return Movie;
};