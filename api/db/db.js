require("dotenv").config();
const mysql = require("mysql2/promise");

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const port = process.env.DB_PORT;
const password = process.env.DB_PW;
const database = process.env.DB_DATABASE;

const config = {
  host,
  user,
  port,
  password,
  database,
};

const pool = mysql.createPool(config);

module.exports = pool;
