require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); // Sua conexão do Sequelize

const produtoRoutes = require('./routes/produtoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api', produtoRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // O Sequelize sincroniza com o banco e CRIA as tabelas se elas não existirem!
    await sequelize.authenticate();
    console.log('🔌 Conectado ao PostgreSQL com Sequelize com sucesso!');
    
    await sequelize.sync({ alter: true });
    console.log('📊 Tabelas sincronizadas e atualizadas!');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar o servidor:', error);
  }
}

startServer();