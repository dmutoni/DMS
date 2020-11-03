const mysql = require('mysql');

let mysqlConnection = mysql.createConnection({
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9374228',
    password: '3pyCJb6V7P',
    database: 'sql9374228',
    // port: 3306
})
mysqlConnection.connect((err) => {
    if (!err) {
        console.log(`DB connection successful`);
    } else {
        console.log("DB connection failed \n Error : " + JSON.stringify(err, undefined, 2));
    }
})
module.exports = mysqlConnection;