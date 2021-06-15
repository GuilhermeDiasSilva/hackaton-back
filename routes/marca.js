const express = require('express');
const router = express.Router();



const MarcaController = require('../controllers/marca-controllers');

router.get('/', MarcaController.getMarca);
router.post('/', MarcaController.postMarca);
router.get('/:id', MarcaController.getUmaMarca);
router.patch('/', MarcaController.updateMarca);
router.delete('/', MarcaController.delete);

module.exports = router;