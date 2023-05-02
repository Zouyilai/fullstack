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
            res.status(401).json(validacao);
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
    body('senha').isLength({ min: 6 }).withMessage("A senha deve ter no mínimo 6 dígitos!"),
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
            res.status(401).json(validacao);
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
router.post('/usuario/login/', (req, res) => {
    const login = usuarioController.login(req.body.id, req.body.username, req.body.senha);
    if(login.valido){
        // res.json({resultado: "Login Ok!"});
        res.json(login);
    } else res.status(401).json(login);
    // else res.status(401).json({resultado: 'Usuário / senha inválidos!'})
})



// //valida user e senha
// router.post('/usuario/login/', (req, res) => {
//     // const criptoSenha = bcryptjs.hashSync(req.body.senha)
//     // console.log(bcryptjs.compareSync(req.body.senha, criptoSenha))
//     const login = usuario_controller.login(req.body.username, req.body.senha);
//     if(login.valido){
//         // res.json({resultado: "Login Ok!"});
//         res.json(login);
//     } else res.status(401).json(login);
//     // else res.status(401).json({resultado: 'Usuário / senha inválidos!'})
// })


// //alterar a senha de um usuario
// //: variável
// // router.put('/usuario/novasenha/:username', (req, res) => {
// //     //para a leitura do variável
// //     const username = req.params.username;
// //     const novaSenha = req.body.senha;
// //     if (usuario_controller.alterarSenha(username, novaSenha)){
// //         res.json({resultado: "Senha alterada com sucesso!"});
// //     } else res.status(400).json({resultado: 'Problema para alterar a senha!'})
// // })

// router.put('/usuario/novasenha', (req, res) => {
// // router.put('/usuario/novasenha/:token', (req, res) => {
//     //pegar o token no header
//     const authHeader = req.headers["authorization"];
//     console.log(authHeader);
//     const token = authHeader.split(" ")[1]
//     //para a leitura do variável;
//     // const token = req.params.token;
//     var decodificado;
//     try {
//         decodificado = jsonwebtoken.verify(token, process.env.SEGREDO);
//         // decodificado = jsonwebtoken.verify(token, "topsecret");
//     } catch (err) {
//         res.status(400).json({resultado: 'Problema para alterar a senha!'})
//         return;
//     }
//     //decodificar o token 
//     const novaSenha = req.body.senha;
//     console.log(decodificado)
//     if (usuario_controller.alterarSenha(decodificado.username, novaSenha)){
//         res.json({resultado: "Senha alterada com sucesso!"});
//     } else res.status(400).json({resultado: 'Problema para alterar a senha!'})
// })

module.exports = router;

