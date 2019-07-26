require("dotenv").config();

const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  migrations: {
    tableName: "migrations"
  }
};
