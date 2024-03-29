const express = require('express');
const bodyParser = require('body-parser');
const usuarioController = require("../controller/usuario-controller");
// const jsonwebtoken = require('jsonwebtoken');
const { body, validationResult, matchedData } = require('express-validator');
// const bcryptjs = require('bcryptjs')
const router = express.Router();

router.use(bodyParser.json());

// /usuario (POST): cria um novo usuário
router.post('/usuario', 
    body('nome').notEmpty().withMessage("Nome inválido!"),
    body('senha').notEmpty().withMessage("Senha inválida!"),
    body('senha').isLength({ min: 6 }).withMessage("A senha deve ter no mínimo 6 dígitos!"),
    body('pontos').notEmpty().withMessage("Pontuação inválida!"),
    body('latitude').notEmpty().withMessage("Latutude inválida!"),
    body('longitude').notEmpty().withMessage("longitude inválida!"),
    async (req, res) => {
        // console.log(matchedData(req));
        const validacao = validationResult(req).array();
        if (validacao.length === 0) {
            const novo = await usuarioController.criarUsuario(req.body.nome, 
                                                            req.body.senha,
                                                            req.body.pontos,
                                                            req.body.latitude,
                                                            req.body.longitude);
            res.status(200).json({resultado: 'Usuário criado!', usuario: novo});
        } else {
            res.status(400).json(validacao);
        }
})

// /usuario/{id} (GET): obtém um usuário pelo id
router.get('/usuario/:id', async (req, res) => {
    const idUsusario = req.params.id;
    const resultado = await usuarioController.visualizarUsuario(idUsusario);
    if(resultado) {
        res.status(200).json({resultado: resultado});
    } else {
        res.status(404).json({resultado: "Usuário não encontrado!"});
    }
})

// /usuario/{id} (PUT): atualiza um usuário pelo id
router.put('/usuario/:id', 
    body('senha').notEmpty().withMessage("Senha inválida!"),
    body('senha').isLength({ min: 6 }).withMessage("A senha nova deve ter no mínimo 6 dígitos!"),
    async (req, res) => {
        const validacao = validationResult(req).array();
        if (validacao.length === 0) {
            const idUsuario = req.params.id;
            const novaSenha = req.body.senha;
            const resultado = await usuarioController.atualizarUsuario(idUsuario, novaSenha);
            if (resultado){
                res.status(200).json({resultado: "Senha alterada com sucesso!"});
            } else {
                res.status(404).json({resultado: 'Usuário não encontrado!'});
            }
        } else {
            res.status(400).json(validacao);
        }
})

// /usuario/{id} (DELETE): remove um usuário pelo id
router.delete('/usuario/:id', async (req, res) => {
    const idUsusario = req.params.id;
    const resultado = await usuarioController.deletarUsuario(idUsusario);
    if(resultado) {
        res.status(200).json({resultado: resultado});
    } else {
        res.status(404).json({resultado: "Usuário não encontrado!"});
    }
})

// /usuario/login (POST): efetuar o login do usuário e retorna um token composto pelo nome e _id
router.post('/usuario/login/', 
    body('nome').notEmpty().withMessage("Nome inválido!"),
    body('senha').notEmpty().withMessage("Senha inválida!"),
    async (req, res) => {
        const validacao = validationResult(req).array();
        if (validacao.length === 0) {
            const login = await usuarioController.login(req.body.nome, req.body.senha);
            if(login.valido){
                res.json(login);
            } else res.status(401).json({login: login, resultado: "erro"});
        } else {
            res.status(401).json(validacao);
        }
})

module.exports = router;

