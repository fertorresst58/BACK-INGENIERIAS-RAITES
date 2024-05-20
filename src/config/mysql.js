const mysql = require('mysql');
const { promisify } = require('util');

// Promisify es un módulo para manejo de promesas (operaciones asíncronas)

// Configurar la conexión a la base de datos
const connection = mysql.createPool(
  {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'raitesug'
  }
)

connection.getConnection ((err, conn) => {
    if (err)
      console.log('ERROR AL CONECTAR DB => ', err)

    if (conn)
      console.log('DB CONECTADA')

    return
  }
)

connection.query = promisify(connection.query)

// El objeto query se refiere a cualquier operación que hagamos sobre la basse de datos
// INSERT, DELETE, UPDATE, SELECT

// Al envolverlo sobre promisify, indica que esas operacones son promesas.

// Exporta el objeto connection para usarlo desde otros archivos de código.
module.exports = connection