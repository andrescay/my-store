const {Model, DataTypes, Sequelize} = require('sequelize')

const CATEGORY_TABLE = 'categories'

const categorySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique:true,
    type: DataTypes.STRING
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    field:'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Category extends Model {
  static associate(models){
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps:false
    }
  }

}

module.exports = { CATEGORY_TABLE, categorySchema, Category}
