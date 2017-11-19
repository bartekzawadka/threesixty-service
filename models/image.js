'use strict';

module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define("Image", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        chunkWidth: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chunkHeight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false,
        updatedAt: false,
        hooks: {
            beforeCreate: function(image, options){
                image.createdAt = new Date();
            }
        }
    });

    Image.associate = function(models) {
        Image.hasMany(models.Chunk);
    };

    return Image;
};