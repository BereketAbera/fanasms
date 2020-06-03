/* jshint indent: 2 */
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let voteGroups = sequelize.define(
    "voteGroups",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
      },
      replyMessage: {
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
    },
    {
      tableName: "voteGroups",
    }
  );

  return voteGroups;
};
