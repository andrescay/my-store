const {config} = require('./../config/config')

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

module.exports = {
  development: {
    url: URL,
    dialect: config.dbSystem
  },
  production: {
    url: URL,
    dialect: config.dbSystem
  }
}
