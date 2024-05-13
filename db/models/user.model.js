const { Model, DataTypes, Sequelize} = require('sequelize')
const bcrypt = require('bcrypt')

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
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: { // Nombre con el que se manipulara dentro de JS, cammelCase buena práctica
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', // Nombre en la tabla, snakeCase en SQL buena práctica
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate(models){
    this.hasOne(models.Customer,{
      as: 'customer',
      foreignKey: 'userId'
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false, // Creación de campos por defecto
      hooks: {
        // eslint-disable-next-line no-unused-vars
        beforeCreate: async (user, options) => {
          const password = await bcrypt.hash(user.password, 10)
          user.password = password
        },
      }
    }
  }
}

module.exports = {USER_TABLE, userSchema, User}
