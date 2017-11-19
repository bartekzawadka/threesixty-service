'use strict';

module.exports = function(sequelize, DataTypes) {
    var Chunk = sequelize.define("Chunk", {
        index: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mimeType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        timestamps: false,
        updatedAt: false,
        createdAt: false
    });

    Chunk.associate = function(models) {
      Chunk.belongsTo(models.Image, {
          onDelete: "CASCADE",
          foreignKey: {
              allowNull: false
          }
      });
    };

    return Chunk;
};