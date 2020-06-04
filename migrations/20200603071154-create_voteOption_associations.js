"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("voteOptions", "UniqueKeyId", {
        type: Sequelize.INTEGER,
        references: {
          model: "uniqueKeys",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        constraints: false,
      })
      .then(() => {
        return queryInterface.addColumn("voteOptions", "VoteGroupId", {
          type: Sequelize.INTEGER,
          references: {
            model: "voteGroups",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          constraints: false,
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("voteOptions", "UniqueKeyId")
      .then(() => {
        return queryInterface.removeColumn("voteOptions", "VoteGroupId");
      });
  },
};
