module.exports = (sequelize, DataTypes) => {
    const Director = sequelize.define('Director', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            field: 'birth_date'
        },
        country: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'directors',
        timestamps: false
    });

    Director.associate = (models) => {
        Director.hasMany(models.Movie, { foreignKey: 'director_id' });
    };

    return Director;
};