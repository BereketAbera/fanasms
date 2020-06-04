"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("voteGroups", "ShortCodeId", {
      type: Sequelize.INTEGER,
      references: {
        model: "shortCodes",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      constraints: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("voteGroups", "ShortCodeId");
  },
};
