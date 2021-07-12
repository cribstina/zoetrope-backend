const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Media = sequelize.define('Media', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    posterimage: {
        type: DataTypes.STRING,
    },

    synopsis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    cast: {
        type: DataTypes.STRING,
    },

    datereleased: {
        type: DataTypes.DATEONLY,
    },

    availableat: {
        type: DataTypes.STRING,
    },

    agerating: {
        type: DataTypes.STRING,
    },
    
    rottentomatoes: {
        type: DataTypes.STRING,
    }
}, {
    // timestamps: false
});

Media.associate = function(models) {
    Media.belongsTo(models.User, { });
    Media.hasMany(models.Comment, { });
}

module.exports = Media;