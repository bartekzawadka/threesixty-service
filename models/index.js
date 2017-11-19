"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config = require(path.join(__dirname, '..', 'config'));
if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL,config);
} else {
    var sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
        host: config.db.host,
        port: config.db.port,
        dialect: 'mysql'
    });
}
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;