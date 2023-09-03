const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:0225@localhost:5432/clinica';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};