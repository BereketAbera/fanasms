/* jshint indent: 2 */
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let usersInbox = sequelize.define(
    "usersInbox",
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
      uniqueKeyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receivedDate: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: "usersInbox",
    }
  );

  return usersInbox;
};
