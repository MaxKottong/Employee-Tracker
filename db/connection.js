const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'eTrackerDB'
    },
    console.log('Connected to Employee database.')
);

module.exports = db;