"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("voteGroups", "question", {
      type: Sequelize.STRING,
    }).then(() => {
      return queryInterface.removeColumn(
        'voteGroups',
        'message',
      )
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("voteGroups", "question").then(() => {
      return queryInterface.addColumn(
        'voteGroups',
        'message', {
        type: Sequelize.STRING,
      }

      )
    });
  },
};
