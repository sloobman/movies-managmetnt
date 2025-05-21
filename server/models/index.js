const { sequelize, mongoose } = require('../config/db');
const { DataTypes } = require('sequelize');

const models = {
    Movie: require('./movie')(sequelize, DataTypes),
    Director: require('./director')(sequelize, DataTypes),
    Genre: require('./genre')(sequelize, DataTypes),
};

const User = require('./user');

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = {
    ...models,
    sequelize,
    mongoose,
    User
};