/* jshint indent: 2 */
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let messages = sequelize.define(
    "messages",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      shortCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.STRING,
      },
      receivedDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        // defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "messages",
    }
  );

  return messages;
};
