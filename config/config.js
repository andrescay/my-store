require('dotenv').config({path:'./.env'});
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000 ,
  dbSystem: process.env.DB_SYSTEM ,
  dbPassword: process.env.DB_PASSWORD ,
  dbHost: process.env.DB_HOST ,
  dbName: process.env.DB_NAME ,
  dbPort: process.env.DB_PORT ,
  dbUserPostg: process.env.DB_USER_POSTGRES ,
  dbPortPostg: process.env.DB_PORT_POSTGRES ,
  dbUserSql: process.env.DB_USER_SQL ,
  dbPortSql: process.env.DB_PORT_SQL,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpSecret: process.env.SMTP_SECRET
}

module.exports = {config}
