const { Model, DataTypes, Sequelize} = require('sequelize')

const USER_TABLE = 'users'

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: { // Nombre con el que se manipulara dentro de JS, cammelCase buena práctica
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', // Nombre en la tabla, snakeCase en SQL buena práctica
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate(){

  }
  static config(sequelize){
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false // Creación de campos por defecto
    }
  }
}

module.exports = {USER_TABLE, userSchema, User}
