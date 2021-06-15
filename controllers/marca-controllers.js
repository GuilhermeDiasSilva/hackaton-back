const mysql = require('../mysql').pool;

exports.getMarca = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM marca;',
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    marca: result.map(m => {
                        return {
                            id:    m.id,
                            marca: m.marca,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os dados de uma marca',
                                url: 'http://localhost:3000/marca/' + m.id
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });

};

exports.postMarca = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      //  if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO marca ( marca ) VALUES ( ? )',  [req.body.marca],
            
            (error, resultado, field) => {
                conn.release();

                if (error) { 
                    return res.status(500).send({
                         error: error ,
                          response:null
                        });
                    }
                
                res.status(201).send({
                    mensagem: 'Marca inserido com Successo',
                    id: resultado.insertId
                });
            }
        )
    });
};

exports.getUmaMarca = (req, res, next) => {
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
};

exports.updateMarca = (req, res, next) => {
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
};

exports.delete = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM marca WHERE marca.id = ?`, [req.body.id],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Registro EXCLUIDO com Sucesso',

                })
            }
        )
    });
};