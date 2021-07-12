const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Comment = sequelize.define('Comment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    // timestamps: false
});

Comment.associate = function(models) {
    Comment.belongsTo(models.User, { });
    Comment.belongsTo(models.Media, { });
}

module.exports = Comment;