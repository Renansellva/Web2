const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtosController'); // Adicionado o 's' aqui!

// 1. Rota para CADASTRAR um produto (POST)
router.post('/produtos', produtoController.criar);

// 2. Rota para LISTAR todos os produtos (GET)
router.get('/produtos', produtoController.listar);

// 3. Rota para ATUALIZAR um produto pelo ID (PUT)
router.put('/produtos/:id', produtoController.atualizar);

// 4. Rota para DELETAR um produto pelo ID (DELETE)
router.delete('/produtos/:id', produtoController.deletar);

module.exports = router;