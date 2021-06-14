const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


// retornando as marcas
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM marca;',
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    marca: result.map(mar => {
                        return {
                            id: mar.id,
                            marca: mar.marca,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os dados da marca',
                                url: 'http://localhost:3000/marca/' + marca.id
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });
});

//insere uma nova marca
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO marca (marca) VALUES (?);', [req.body.marca],

            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Nova Marca inserida',
                    id: result.insertId
                });
            }

        )
    });

});

//retornando os dados de uma marca pelo id
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM marca WHERE id = ?',
            [req.params.id],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send(resultado);
            }
        )
    });
});

//altera uma marca
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            ` UPDATE marca SET marca = ? WHERE marca.id = ?;`,
            [
                req.body.marca,
                req.body.id
            ],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Registro Alterado com Sucesso',

                })
            }
        )
    });
});


//deleta uma marca
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM marca WHERE id = ?`, [req.body.id],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Registro EXCLUIDO com Sucesso',

                })
            }
        )
    });
});


module.exports = router;