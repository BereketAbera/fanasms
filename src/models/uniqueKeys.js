/* jshint indent: 2 */
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let uniqueKeys = sequelize.define(
    "uniqueKeys",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      tableName: "uniqueKeys",
    }
  );

  return uniqueKeys;
};
