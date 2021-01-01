const mysql = require('mysql');
const util = require('util')

let mysqlConnection = mysql.createPool({
    connectionLimit: 10,
    host: 'benax.rw',
    user: 'benax_dms_root',
    password: '40Pj$L_Y]i2@',
    database: 'benax_dms'
})
mysqlConnection.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }
  console.log("connection successful")
    if (connection) connection.release()
  
    return
  })
  
  // Promisify for Node.js async/await.
  mysqlConnection.query = util.promisify(mysqlConnection.query)
module.exports = mysqlConnection;