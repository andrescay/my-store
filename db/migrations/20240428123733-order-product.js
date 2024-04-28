'use strict';

const { ORDER_PRODUCT_TABLE, orderProductsSchema } = require('../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.createTable(ORDER_PRODUCT_TABLE, orderProductsSchema)
  },

  async down (queryInterface) {
    queryInterface.dropTable(ORDER_PRODUCT_TABLE)
  }
};
