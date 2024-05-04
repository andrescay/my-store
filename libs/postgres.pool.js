const { Pool } = require('pg')
const config = require('./../config/config')

// Una buena practica es codificar los parámetros

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost);
const PORT = encodeURIComponent(config.dbPort);
const DATABASE = encodeURIComponent(config.dbName);


// También es una buena práctica conectarse a partir de una url de conexión
const URL = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

const pool = new Pool({
  connectionString: URL
})

module.exports = pool

/*
  Esta es una forma más eficiente de establecer una conexión con la base de datos. En lugar de crear una nueva conexión cada vez que se realiza una solicitud, se utiliza un pool de conexiones. Un pool de conexiones mantiene varias conexiones abiertas en espera y las reutiliza muchas veces, lo que mejora significativamente el rendimiento y la eficiencia de las operaciones de base de datos. Esto reduce la sobrecarga de la creación y destrucción de conexiones, y permite que el servidor maneje un mayor volumen de solicitudes sin degradar el rendimiento. Además, el pool de conexiones puede gestionar automáticamente la liberación de conexiones inactivas, evitando problemas de fugas de memoria o agotamiento de recursos.
*/
