"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("shortCodes", "status", {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("shortCodes", "status");
  },
};

