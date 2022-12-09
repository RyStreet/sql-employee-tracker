require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection(
  {
  host: 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}
);


module.exports = connection; 