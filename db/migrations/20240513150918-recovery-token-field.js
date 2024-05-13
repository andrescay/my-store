const { DataTypes } = require('sequelize')

'use strict';

const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.addColumn(USER_TABLE, 'recovery_token',{
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING
    })
  },

  async down (queryInterface) {
    queryInterface.removeColumn(USER_TABLE, 'recovery_token')
  }
};
