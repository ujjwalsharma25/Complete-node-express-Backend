const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',        // default PostgreSQL superuser
  password: 'Usharma2005', // your PostgreSQL password
  database: 'airbnb',      // your database name
  port: 5432               // default PostgreSQL port
});

module.exports = pool;
