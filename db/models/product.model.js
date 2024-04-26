const {Model, DataTypes, Sequelize} = require('sequelize')
const { CATEGORY_TABLE } = require('../models/category.model')


const PRODUCT_TABLE = 'products'

const productSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  categoryId: {
    field: 'category_id',
    type: DataTypes.INTEGER,
    allowNull:false,
    references:{
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    field:'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Product extends Model {
  static associate(models){
    this.belongsTo(models.Category, {as: 'category'})
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps:false
    }
  }

}

module.exports = { PRODUCT_TABLE, productSchema, Product}
