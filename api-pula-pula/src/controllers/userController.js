const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  // C - CREATE (Cadastrar Usuário)
  async criar(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const senhaCriptografada = await bcrypt.hash(senha, salt);

      const novoUsuario = await User.create({
        nome,
        email,
        senha: senhaCriptografada
      });
      
      return res.status(201).json({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        createdAt: novoUsuario.createdAt
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ erro: '❌ Este e-mail já está cadastrado!' });
      }
      return res.status(400).json({ erro: error.message });
    }
  },

  // R - READ (Puxar/Listar todos os usuários cadastrados)
  async listar(req, res) {
    try {
      // Busca todos os usuários do banco, mas esconde a senha (attributes) por segurança!
      const usuarios = await User.findAll({
        attributes: ['id', 'nome', 'email', 'createdAt']
      });
      
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};