/* jshint indent: 2 */
const bcryptjs = require("bcryptjs");
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let user = sequelize.define(
    "users",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      replyMessage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "TYPE1",
      },
      lastLoggedIn: {
        type: DataTypes.DATE,
        defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
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
      tableName: "users",
    }
  );
  user.beforeCreate((u, options) => {
    u.password = bcryptjs.hashSync(u.password, 10);
    return user;
  });

  return user;
};
