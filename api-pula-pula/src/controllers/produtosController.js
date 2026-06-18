const pool = require('../config/database');

module.exports = {
  // C - CREATE (Cadastrar um novo brinquedo no banco)
  async criar(req, res) {
    const { nome, descricao, preco_por_hora } = req.body;
    try {
      const sql = `INSERT INTO produtos (nome, descricao, preco_por_hora) VALUES ($1, $2, $3) RETURNING *`;
      const resultado = await pool.query(sql, [nome, descricao, preco_por_hora]);
      
      // Retorna o produto criado com sucesso
      return res.status(201).json(resultado.rows[0]);
    } catch (error) {
      // Se o preço for menor ou igual a zero, a TRIGGER do banco vai disparar e cair aqui!
      return res.status(400).json({ erro: error.message });
    }
  },

  // R - READ (Listar todos os brinquedos cadastrados)
  async listar(req, res) {
    try {
      const sql = `SELECT * FROM produtos ORDER BY id DESC`;
      const resultado = await pool.query(sql);
      return res.json(resultado.rows);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  // U - UPDATE (Atualizar os dados de um brinquedo pelo ID)
  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco_por_hora, disponivel } = req.body;
    try {
      const sql = `
        UPDATE produtos 
        SET nome = $1, descricao = $2, preco_por_hora = $3, disponivel = $4, updated_at = NOW()
        WHERE id = $5 RETURNING *`;
      const resultado = await pool.query(sql, [nome, descricao, preco_por_hora, disponivel, id]);
      
      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
      }
      return res.json(resultado.rows[0]);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  // D - DELETE (Excluir um brinquedo do sistema pelo ID)
  async deletar(req, res) {
    const { id } = req.params;
    try {
      const sql = `DELETE FROM produtos WHERE id = $1 RETURNING *`;
      const resultado = await pool.query(sql, [id]);
      
      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
      }
      return res.json({ mensagem: 'Produto deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};