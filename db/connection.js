const mysql = require("mysql2");
const PORT = 3001;

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: PORT,
        user: 'root',
        password: '',
        database: 'eTrackerDB'
    },
    console.log('Connected to Employee database.')
);

module.exports = db;