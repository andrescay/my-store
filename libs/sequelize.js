const { Sequelize} = require('sequelize')
const {config} = require('./../config/config')
const setupModels = require('./../db/models')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost);
const PORT = encodeURIComponent(config.dbPort);
const DATABASE = encodeURIComponent(config.dbName);


// ***** Postgres *****

// También es una buena práctica conectarse a partir de una url de conexión
// const URL = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
// const sequelize = new Sequelize(URL,{
//   dialect: 'postgres',
//   logging: true
// })

// ***** mySQL *****
const URL = `mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`
const sequelize = new Sequelize(URL,{
  dialect: 'mysql',
  logging: true,


})

setupModels(sequelize)

sequelize.sync() // Sincroniza tablas, en caso de tener que crear tablas lo hace

module.exports = sequelize
