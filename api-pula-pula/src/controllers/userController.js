const pool = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = {
  async criar(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const senhaCriptografada = await bcrypt.hash(senha, salt);

      const query = 'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, created_at';
      const values = [nome, email, senhaCriptografada];
      
      const resultado = await pool.query(query, values);
      return res.status(201).json(resultado.rows[0]);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async listar(req, res) {
    try {
      const resultado = await pool.query('SELECT id, nome, email, created_at FROM users');
      return res.json(resultado.rows);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};