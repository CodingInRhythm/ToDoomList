'use strict';

const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

      const hashedPassword = bcrypt.hashSync('Evil00!', 10)
   return queryInterface.bulkInsert('Villains', [
     {firstName: "Thanos", userName: "Thanoz", email: "thanos@evilinc.com", hashedPassword: hashedPassword, createdAt: "2021-04-06", updatedAt: "2021-04-06"}], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Villains', null, {});
  }
};
