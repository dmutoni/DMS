const mysql = require('mysql');

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dms'
})
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("DB connection successful");
    } else {
        console.log("DB connection failed \n Error : " + JSON.stringify(err, undefined, 2));
    }
})
module.exports = mysqlConnection;