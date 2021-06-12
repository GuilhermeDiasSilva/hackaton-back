const express = require('express');
const router = express.Router();


// retornando os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna o pedido'
    });
});

//insere um pedido
router.post('/', (req, res, next) => {

    const pedido = {
        id_veiculo: req.body.id_veiculo,
       quantidade: req.body.quantidade
    };

    res.status(200).send({
        mensagem: 'Inserido com sucesso',
        pedidoCriado: pedido
    });
});
router.get('/:id_pedido', (req, res, next) => {
    const id = req.param.id_pedido
    res.status(201).send({
        mensagem: 'usando id',
        id_pedido: id
    });
});

//altera um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'pedido alterado'
    });
});


//deleta um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'pedido excluido'
    });
});


module.exports = router;