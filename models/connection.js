const mysql2 = require('mysql2/promise');

const connection = mysql2.createPool({
  host: 'db',
  user: 'root',
  password: 'password',
  port: '3306',
  database: 'StoreManager',
});

module.exports = connection;
