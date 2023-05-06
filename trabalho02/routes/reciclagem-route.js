const express = require('express');
const bodyParser = require('body-parser');
const reciclagemController = require("../controller/reciclagem-controller");
const premioController = require("../controller/premio-controller");
const jsonwebtoken = require('jsonwebtoken');
const { body, validationResult, matchedData } = require('express-validator');
const router = express.Router();

// /reciclagem/{id} (POST): incluir um registro de reciclagem pelo id do usuário
router.post('/reciclagem/:id', 
    body('item').notEmpty().withMessage("Item inválido!"),
    body('imagem').notEmpty().withMessage("Imagem inválida!"),
    body('peso').notEmpty().withMessage("Peso inválido!"),
    body('peso').isNumeric().withMessage("Peso deve ser número!"),
    body('pontos').notEmpty().withMessage("Pontuação inválida!"),
    body('pontos').isNumeric().withMessage("Pontuação deve ser número!"),
    async (req, res) => {
        const authHeader = req.headers["authorization"];
        if(authHeader){
            const token = authHeader.split(" ")[1]
            var decodificado;
            try {
                decodificado = jsonwebtoken.verify(token, "topsecret");
                console.log(decodificado);
            } catch (err) {
                res.status(401).json({resultado: 'Token inválido!'})
                return;
            }

            const idUsuario = req.params.id;
            const validacao = validationResult(req).array();
            if (validacao.length === 0) {
                const novo = await reciclagemController.criarReciclagem(req.body.item,
                                                                        req.body.imagem,
                                                                        req.body.peso, 
                                                                        req.body.pontos,
                                                                        idUsuario);
                if (novo) {
                    res.status(200).json({resultado: 'Reciclagem criada!', reciclagem: novo});
                } else {
                    res.status(404).json({resultado: 'Usuário não encontrado!'});
                }
            } else {
                res.status(400).json(validacao);
            }
        } else {
            res.status(401).json({resultado: 'Informe o token!'});
        }
})


// /reciclagem/{id} (GET): lista todos os itens reciclados do usuário id
router.get('/reciclagem/:id', async (req, res) => {
    const authHeader = req.headers["authorization"];
    if(authHeader){
        const token = authHeader.split(" ")[1]
        var decodificado;
        try {
            decodificado = jsonwebtoken.verify(token, "topsecret");
            // console.log(decodificado);
        } catch (err) {
            res.status(401).json({resultado: 'Token inválido!'});
            return;
        }

        const idUsusario = req.params.id;
        const resultado = await reciclagemController.listarReciclagens(idUsusario);
        if(resultado) {
            res.status(200).json({resultado: resultado});
        } else {
            res.status(404).json({resultado: "Usuário não encontrado!"});
        }
    } else {
        res.status(401).json({resultado: 'Informe o token!'});
    }
})


// /reciclagem/total/{id} (GET): retornar o total de pontos e pesos de itens reciclados pelo usuário id
router.get('/reciclagem/total/:id', async (req, res) => {
    const authHeader = req.headers["authorization"];
    if(authHeader){
        const token = authHeader.split(" ")[1]
        var decodificado;
        try {
            decodificado = jsonwebtoken.verify(token, "topsecret");
            // console.log(decodificado);
        } catch (err) {
            res.status(401).json({resultado: 'Token inválido!'});
            return;
        }

        const idUsusario = req.params.id;
        const resultado = await reciclagemController.pontoTotalUsuario(idUsusario);
        if(resultado) {
            res.status(200).json({resultado: resultado});
        } else {
            res.status(404).json({resultado: "Usuário não encontrado!"});
        }
    } else {
        res.status(401).json({resultado: 'Informe o token!'});
    }
})


// /reciclagem/premio/{id} (GET): subtrair 1 da quantidade disponível do prêmio id
router.get('/reciclagem/premio/:id', async (req, res) => {
    const authHeader = req.headers["authorization"];
    if(authHeader){
        const token = authHeader.split(" ")[1]
        var decodificado;
        try {
            decodificado = jsonwebtoken.verify(token, "topsecret");
            // console.log(decodificado);
        } catch (err) {
            res.status(401).json({resultado: 'Token inválido!'});
            return;
        }

        const idPremio = req.params.id;
        const resultado = await premioController.menosUmPremio(idPremio);
        if(resultado) {
            if (resultado.execucao) {
                res.status(200).json({resultado: resultado});
            } else {
                res.status(400).json({resultado: resultado});
            }
        } else {
            res.status(404).json({resultado: "Prêmio não encontrado!"});
        }
    } else {
        res.status(401).json({resultado: 'Informe o token!'});
    }
})

module.exports = router;
