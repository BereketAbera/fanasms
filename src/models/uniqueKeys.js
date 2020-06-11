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
      },
      type: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "uniqueKeys",
    }
  );

  return uniqueKeys;
};
