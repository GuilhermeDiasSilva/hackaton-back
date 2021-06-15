const mysql = require('../mysql').pool;

exports.getCor = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM cor;',
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    cor: result.map(cor => {
                        return {
                            id: cor.id,
                            cor: cor.cor,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os dados da cor',
                                url: 'http://localhost:3000/cor/' + cor.id
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });
};

exports.postCor = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO cor (cor) VALUES (?);', [req.body.cor],

            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Nova cor inserida',
                    id: result.insertId
                });
            }

        )
    });

};

exports.getUmaCor = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM cor WHERE id = ?',
            [req.params.id],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send(resultado);
            }
        )
    });
};

exports.update =(req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            ` UPDATE cor SET cor = ? WHERE cor.id = ?;`,
            [
                req.body.cor,
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

exports.delete =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM cor WHERE id = ?`, [req.body.id],
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
