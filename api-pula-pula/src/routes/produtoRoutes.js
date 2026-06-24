const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtosController');

// 1. Rota para CADASTRAR um produto (POST) - SQL Puro
router.post('/produtos', produtoController.criar);

// 2. Rota para LISTAR todos os produtos (GET) - SQL Puro
router.get('/produtos', produtoController.listar);

module.exports = router;