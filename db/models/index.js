const {User, userSchema} = require('./user.model')
const {Customer, customerSchema} = require('./customer.model')


function setupModels(sequelize){
  User.init(userSchema, User.config(sequelize))
  Customer.init(customerSchema, Customer.config(sequelize))

  // Ejecutar asociaciones
  Customer.associate(sequelize.models)
  User.associate(sequelize.models)
}

module.exports = setupModels
