const {User, userSchema} = require('./user.model')
const {Customer, customerSchema} = require('./customer.model')
const {Category, categorySchema} = require('./category.model')
const {Product, productSchema} = require('./product.model')
const {Order, orderSchema} = require('./order.model')



function setupModels(sequelize){
  // Crear tablas
  User.init(userSchema, User.config(sequelize))
  Customer.init(customerSchema, Customer.config(sequelize))
  Category.init(categorySchema, Category.config(sequelize))
  Product.init(productSchema, Product.config(sequelize))
  Order.init(orderSchema, Order.config(sequelize))


  // Ejecutar asociaciones
  Customer.associate(sequelize.models)
  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)
  Order.associate(sequelize.models)

}

module.exports = setupModels
