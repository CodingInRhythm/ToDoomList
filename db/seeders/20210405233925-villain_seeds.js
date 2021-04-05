'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Villains', [
     {firstName: "Thanos", lastName: "Thanos", userName: "Thanoz", email: "thanos@evilinc.com", hashedPassword: '451635818fhfhSDB', createdAt}], {});
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
