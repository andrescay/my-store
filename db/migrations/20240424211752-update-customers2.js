'use strict';

const { customerSchema, CUSTOMER_TABLE } = require('./../../db/models/customer.model')
const { DataTypes} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE,'user_id' , {
      field: 'user_id',
      type: DataTypes.INTEGER,
      unique:true
    })
  },

  async down (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE,'user_id', customerSchema.phone)
  }
};
