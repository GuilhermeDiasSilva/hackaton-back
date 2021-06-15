const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM usuario WHERE login = ?', [req.body.login], (error, results) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length > 0) {
                res.status(409).send({ mensagem: 'Usuario já cadastrado' })
            } else {
                bcrypt.hash( req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO usuario (nome, login, senha) VALUES (?, ?, ?)`,
                        [req.body.nome, req.body.login, hash.string],
                        (error, results) => {
                            conn.release(); //iniciando conexão
                            if (error) { return res.status(500).send({ error: error }) }
                            response = {
                                mensagem: 'Usuario criado com Sucesso',
                                usuarioCriado: {
                                    id: results.insertId,
                                    nome: req.body.nome,
                                    login: req.body.login,

                                }
                            }
                            return res.status(201).send(response);
                        });
                });
            }
        })

    });
})

router.post('login', (req,res, next)=>{
    mysql.getConnection((error, conn)=>{
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM usuario WHERE login = ?`;
        conn.query(query,[req.body.login],(error, results, Fields) =>{
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if(results.length < 1){
                return res.status(401)({ mensagem: 'Falha na autenticação'})
            }
           bcrypt.compare(req.body.senha, results[0].senha, (err, result)=>{
                if (err){
                    return res.status(401)({ mensagem: 'Falha na autenticação'})
                }
                if(result) {
                    const token = jwt.sign({
                        id:   results[0].id,
                        login:results[0].login
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });

                    return res.status(200).send({
                         mensagem: 'Autenticado com sucesso',
                         token: token
                        });
                   
                }
                return res.status(401)({ mensagem: 'Falha na autenticação'})
            })
        })
    })
})
module.exports = router;