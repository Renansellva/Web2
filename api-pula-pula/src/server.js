require('dotenv').config();
const express = require('express');
const pool = require('./config/database');
const fs = require('fs');
const path = require('path');

const produtoRoutes = require('./routes/produtoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api', produtoRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('🔄 Faxina no banco: Apagando tabelas antigas e limpando a memória...');
    // Força a remoção de qualquer tabela antiga com aspas (padrão Sequelize) ou sem aspas
    await pool.query('DROP TABLE IF EXISTS "produtos" CASCADE;');
    await pool.query('DROP TABLE IF EXISTS "users" CASCADE;');
    await pool.query('DROP TABLE IF EXISTS produtos CASCADE;');
    await pool.query('DROP TABLE IF EXISTS users CASCADE;');
    
    // Lê o arquivo init.sql da pasta database
    const sqlPath = path.resolve(__dirname, '../database/init.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');
    
    // Executa o script SQL Puro para criar tabelas, funções e triggers novas
    await pool.query(sqlScript);
    console.log('📊 Tabelas e Triggers criadas via SQL Puro com sucesso!');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em SQL Puro na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao rodar o script SQL:', error);
  }
}

startServer();