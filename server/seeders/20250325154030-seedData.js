'use strict';
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let users = require('../data/users.json').map((el) => {
      el.role = 'Customer';
      el.password = hashPassword(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert('Users', users, {});

    let categories = require('../data/categories.json').map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert('Categories', categories, {});

    let products = require('../data/products.json').map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
