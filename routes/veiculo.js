const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login');

const veiculosController = require('../controllers/veiculos-controller');

router.get('/', veiculosController.getVeiculos);
router.post('/', veiculosController.postVeiculos);
router.get('/:id', veiculosController.getUmVeiculo);
router.patch('/', veiculosController.update);
router.delete('/', veiculosController.deleteVeiculo);


module.exports = router;