const { Model, DataTypes, Sequelize} = require('sequelize')
const { CUSTOMER_TABLE } = require('./customer.model')

const ORDER_TABLE = 'orders'

const orderSchema = {
  id:{
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  customerId:{
    field: 'customer_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  createdAt:{
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  total:{
    type: DataTypes.VIRTUAL,
    get(){
      if(this.items.length > 0){
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount)
        }, 0)
      }
      return 0
    }
  }

}

class Order extends Model{
  static associate(models){
    this.belongsTo(models.Customer, {as: 'customer'}),
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      as: 'items',
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }

}

module.exports = {ORDER_TABLE, orderSchema, Order}
