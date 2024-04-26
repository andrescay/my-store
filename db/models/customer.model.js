const {Model, DataTypes, Sequelize} = require('sequelize')
const { USER_TABLE } = require('./user.model')

const CUSTOMER_TABLE = 'customers'

const customerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.BIGINT
  },
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    unique:true,
    references:{
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    field: 'create_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}

class Customer extends Model{
  static associate(models){
    this.belongsTo(models.User,{as: 'user'})
    this.hasMany(models.Order,{
      as: 'order',
      foreignKey: 'customerId'
    })

  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { CUSTOMER_TABLE, customerSchema, Customer}
