const { Sequelize} = require('sequelize')
const {config} = require('./../config/config')
const setupModels = require('./../db/models')

const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost);
const DATABASE = encodeURIComponent(config.dbName);

let URL = ''
if(config.dbSystem == 'postgres'){
  const USER = encodeURIComponent(config.dbUserPostg);
  const PORT = encodeURIComponent(config.dbPortPostg);
  URL = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
}
else{
  const USER = encodeURIComponent(config.dbUserSql);
  const PORT = encodeURIComponent(config.dbPortSql);
  URL = `mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`
}

// Es una buena práctica conectarse a partir de una url de conexión
const sequelize = new Sequelize(URL,{
  dialect: config.dbSystem,
  logging: true,
})

setupModels(sequelize)

// sequelize.sync() // Sincroniza tablas, en caso de tener que crear tablas lo hace, sinm embargo esto es una MALA PRÁCTICA, lo correcto es utilizar migraciones

module.exports = sequelize