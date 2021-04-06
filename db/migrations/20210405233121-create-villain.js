'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Villains", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(25),
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      lastName: {
        type: Sequelize.STRING(50),
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING(25),
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Villains');
  }
};