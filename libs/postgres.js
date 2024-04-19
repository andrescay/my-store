const { Client } = require('pg')
const { config } = require('./../config/config')

async function getConection(){
  const client = new Client({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config. dbDatabase
  })

  await client.connect()
  return client
}

module.exports = getConection

/*
  Utilizar una conexión tipo cliente implica establecer una nueva conexión con la base de datos cada vez que se realiza una solicitud. Aunque esta aproximación es sencilla de implementar y puede ser adecuada para aplicaciones con un bajo volumen de tráfico, puede generar una sobrecarga significativa en el servidor de base de datos en entornos de alta concurrencia o con un gran número de solicitudes concurrentes. Cada vez que se crea una nueva conexión, se requieren recursos adicionales del servidor de base de datos para manejarla, lo que puede provocar una degradación del rendimiento o incluso la caída del servidor en situaciones de carga pesada. Además, la creación y destrucción frecuente de conexiones puede generar un aumento en el tiempo de respuesta de las solicitudes, afectando negativamente la experiencia del usuario.
*/
