const express = require('express');
const bodyParser = require('body-parser');
const reciclagemController = require("../controller/reciclagem-controller");
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
                                                                        new Date(),
                                                                        req.body.pontos,
                                                                        idUsuario);
                res.status(200).json({resultado: 'Reciclagem criada!', reciclagem: novo});
            } else {
                res.status(400).json(validacao);
            }
        } else {
            res.status(400).json({resultado: 'Informe o token!'});
        }
})


module.exports = router;
