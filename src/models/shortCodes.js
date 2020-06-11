/* jshint indent: 2 */
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let shortCodes = sequelize.define(
    "shortCodes",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      defaultReply: {
        type: DataTypes.STRING,
      },
      defaultMessage: {
        type: DataTypes.STRING,
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
      tableName: "shortCodes",
    }
  );

  return shortCodes;
};
