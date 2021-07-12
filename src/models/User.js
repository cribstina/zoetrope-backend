const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
    profilepicture: {
        type: DataTypes.STRING,
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    username: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    displayname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    gender: {
        type: DataTypes.STRING
    },

}, {
    // timestamps: false
});

User.associate = function(models) {
    User.hasMany(models.Comment, { });
    User.hasMany(models.Friend, { });
    User.hasMany(models.Media, { });
}

module.exports = User;