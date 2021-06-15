const express = require('express');
const router = express.Router();


const CorController = require('../controllers/cor-controllers');

router.get('/',    CorController.getCor);
router.post('/',   CorController.postCor);
router.get('/:id', CorController.getUmaCor);
router.patch('/',  CorController.update); 
router.delete('/', CorController.delete);

module.exports = router;