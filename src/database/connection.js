const Sequelize = require("sequelize");

const sequelize = new Sequelize("fanasms", "root", "password", {
  host: "192.168.0.10",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
