const express = require('express');
const bodyParser = require('body-parser');
const premioController = require("../controller/premio-controller");
const jsonwebtoken = require('jsonwebtoken');
const { body, validationResult, matchedData } = require('express-validator');
const router = express.Router();

router.use(bodyParser.json());

// /premio (POST): cadastra um novo prêmio
router.post('/premio', 
    body('descricao').notEmpty().withMessage("Descrição inválida!"),
    body('pontos').notEmpty().withMessage("Pontuação inválida!"),
    body('pontos').isNumeric().withMessage("Pontuação deve ser número!"),
    body('quantidade').notEmpty().withMessage("Pontuação inválida!"),
    body('quantidade').isNumeric().withMessage("Quantidade deve ser número!"),
    async (req, res) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1]
        var decodificado;
        try {
            decodificado = jsonwebtoken.verify(token, "topsecret");
            console.log(decodificado);
        } catch (err) {
            res.status(401).json({resultado: 'Token inválido!'})
            return;
        }

        const validacao = validationResult(req).array();
        if (validacao.length === 0) {
            const novo = await premioController.criarPremio(req.body.descricao, 
                                                            req.body.pontos,
                                                            req.body.quantidade);
            res.status(200).json({resultado: 'Prêmio criado!', premio: novo});
        } else {
            res.status(400).json(validacao);
        }
})

// /premio/{id} (GET): obtém um prêmio pelo id
router.get('/premio/:id', async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1]
    var decodificado;
    try {
        decodificado = jsonwebtoken.verify(token, "topsecret");
        // console.log(decodificado);
    } catch (err) {
        res.status(401).json({resultado: 'Token inválido!'})
        return;
    }

    const idPremio = req.params.id;
    const resultado = await premioController.visualizarPremio(idPremio);
    if(resultado) {
        res.status(200).json({resultado: resultado});
    } else {
        res.status(404).json({resultado: "Premio não encontrado!"});
    }
})

// /usuario/{id} (PUT): atualiza um usuário pelo id

module.exports = router;

