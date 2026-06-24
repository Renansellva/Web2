const { Pool } = require('pg');
const path = require('path');

// Carrega o arquivo .env que está na pasta src
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // ou DB_DATABASE, ajuste conforme seu .env
  port: process.env.DB_PORT || 5432,
});

// Testa a conexão assim que o app inicia
pool.query('SELECT NOW()')
  .then(() => console.log('🔌 Conectado ao PostgreSQL com SQL Puro!'))
  .catch(err => console.error('❌ Erro ao conectar no Postgres:', err));

module.exports = pool;