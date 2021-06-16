const mysql = require('../mysql').pool;

exports.getVeiculos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT 
                veiculo.*,
                marca.marca,
                cor.cor
            FROM 	
                    veiculo as veiculo
            INNER JOIN
                    marca as marca
            ON veiculo.marca_id = marca.id
            INNER JOIN 
                    cor as cor
            ON veiculo.cor_id = cor.id;`,
        (error, result, field) => {
            if (error) { return res.status(500).send({ error: error }) }
            const response = {
                quantidade: result.length,
                veiculos: result.map(veic => {
                    return {
                        id: veic.id,
                        modelo: veic.modelo,
                        ano_modelo: veic.ano_modelo,
                        ano_fabricacao: veic.ano_fabricacao,
                        valor: veic.valor,
                        tipo: veic.tipo,
                        foto_destaque: veic.foto_destaque,
                        estado_veiculo: veic.estado_veiculo,
                        url: veic.url,
                        usuario_id: veic.usuario_id,
                        cor_id: veic.cor_id,
                        cor:  veic.cor,
                        marca_id: veic.marca_id,
                        marca:  veic.marca,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os dados de um veiculo',
                            url: 'http://localhost:3000/veiculo/' + veic.id
                        }
                    }
                })
            }
            return res.status(200).send({ response })
        }
        )
});
    

};

exports.postVeiculos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        //  if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO veiculo ( modelo, ano_modelo, ano_fabricacao, valor, tipo, foto_destaque, estado_veiculo, url, usuario_id, cor_id, marca_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)',

            [
                req.body.modelo,
                req.body.ano_modelo,
                req.body.ano_fabricacao,
                req.body.valor,
                req.body.tipo,
                req.body.foto_destaque,
                req.body.estado_veiculo,
                req.body.url,
                req.body.usuario_id,
                req.body.cor_id,
                req.body.marca_id
            ],

            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Veiculo inserido com Successo',
                    id: resultado.insertId
                });
            }
        )
    });

};

exports.getUmVeiculo = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM veiculo WHERE id = ?',
            [req.params.id],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send(resultado);
            }
        )
    });
};

exports.update = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            ` UPDATE veiculo SET modelo = ?, ano_modelo = ?, ano_fabricacao = ?, valor = ?, tipo = ?, foto_destaque = ?, estado_veiculo = ?, url = ? WHERE veiculo.id = ?;`,
            [req.body.modelo,
            req.body.ano_modelo,
            req.body.ano_fabricacao,
            req.body.valor,
            req.body.tipo,
            req.body.foto_destaque,
            req.body.estado_veiculo,
            req.body.url,
            req.body.id],
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

exports.deleteVeiculo = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM veiculo WHERE id = ?`, [req.body.id],
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
