"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("votesInbox", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      shortCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.STRING,
      },
      uniqueKeyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      receivedDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("votesInbox");
  },
};
