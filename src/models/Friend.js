const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Friend = sequelize.define('Friend', {
    displayname: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Friend.associate = function(models) {
    Friend.belongsTo(models.User, { });
}

module.exports = Friend; 