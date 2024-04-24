'use strict';

const { customerSchema, CUSTOMER_TABLE } = require('./../../db/models/customer.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE,'phone' , customerSchema.phone)
  },

  async down (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE,'phone', customerSchema.phone)
  }
};
