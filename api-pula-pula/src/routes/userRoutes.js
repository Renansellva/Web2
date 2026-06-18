const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para CADASTRAR usuários (POST)
router.post('/usuarios', userController.criar);

// Rota para LISTAR usuários cadastrados (GET) - ADICIONADA AQUI
router.get('/usuarios', userController.listar);

module.exports = router;