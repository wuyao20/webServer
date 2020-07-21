const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

const con = mysql.createConnection(MYSQL_CONFIG)

con.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec
}