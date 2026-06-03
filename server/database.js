require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    port:3306,
    password:process.env.SENHA_DB,
    database:"pet"
});

module.exports = db;