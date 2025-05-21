module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'genres',
        timestamps: false
    });

    Genre.associate = (models) => {
        Genre.hasMany(models.Movie, { foreignKey: 'genre_id' });
    };

    return Genre;
};