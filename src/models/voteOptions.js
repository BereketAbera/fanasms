/* jshint indent: 2 */
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let voteOptions = sequelize.define(
    "voteOptions",
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
      choiceTitle: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
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
      UniqueKeyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "uniqueKeys",
          key: "id",
        },
      },
      ShortCodeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "shortCodes",
          key: "id",
        },
      },
    },
    {
      tableName: "voteOptions",
    }
  );

  return voteOptions;
};