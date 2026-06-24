const pool = require('../config/database');

module.exports = {
  // Cadastrar Produto
  async criar(req, res) {
    const { nome, descricao, preco_por_hora } = req.body;
    try {
      const query = 'INSERT INTO produtos (nome, descricao, preco_por_hora) VALUES ($1, $2, $3) RETURNING *';
      const values = [nome, descricao, preco_por_hora];

      const resultado = await pool.query(query, values);
      return res.status(201).json(resultado.rows[0]);
    } catch (error) {
      // Captura o erro da Trigger de preço negativo
      return res.status(400).json({ erro: error.message });
    }
  },

  // Listar Produtos
  async listar(req, res) {
    try {
      const resultado = await pool.query('SELECT * FROM produtos ORDER BY id DESC');
      return res.json(resultado.rows);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};