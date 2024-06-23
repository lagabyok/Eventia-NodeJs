const mysql = require('mysql2');

export const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3360,
    database: 'EVENTIAEVOK',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


module.exports = {
    conn: pool.promise()
}