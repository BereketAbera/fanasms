"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("users", "UniqueKeysId", {
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
        return queryInterface.addColumn("users", "ShortCodeId", {
          type: Sequelize.INTEGER,
          references: {
            model: "shortCodes",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          constraints: false,
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "UniqueKeysId").then(() => {
      return queryInterface.removeColumn("users", "ShortCodeId");
    });
  },
};
