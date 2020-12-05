const mysql = require('mysql');

let mysqlConnection = mysql.createConnection({
    host: 'benax.rw',
    user: 'benax_dms_root',
    password: '40Pj$L_Y]i2@',
    database: 'benax_dms'
})
mysqlConnection.connect((err) => {
    if (!err) {
        console.log(`DB connection successful`);
    } else {
        console.log("DB connection failed \n Error : " + JSON.stringify(err, undefined, 2));
    }
})
module.exports = mysqlConnection;