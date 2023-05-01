const express = require('express');
//npm install --save body-parser
const bodyParser = require('body-parser');
const usuario_controller = require("../controllers/usuario-controller");
const jsonwebtoken = require('jsonwebtoken');
const { body, validationResult, matchedData } = require('express-validator');
// const bcryptjs = require('bcryptjs')
const router = express.Router();

//habilita o tratamento de requisição o formato JSON
router.use(bodyParser.json());

//cria um usuário
//converte o texto em objeto JSON
// router.post('/usuario', (req, res) => {
//     // const criptoSenha = bcryptjs.hashSync(req.body.senha)
//     // retorna a senha criptografada
//     //parar de mandar somente a senha
//     const novo = usuario_controller.novoUsuario(req.body.username, req.body.senha);
//     // res.json({resultado: 'Usuário criado!', corpo: req.body.username});
//     res.json({resultado: 'Usuário criado!', usuario: novo});
// })


router.post('/usuario', 
    body('username').notEmpty().withMessage("Username inválido!"),
    body('senha').isNumeric().withMessage('Apenas número!'),
    async (req, res) => {
        //mostra os campos válidos (que passaram da validação)
        console.log(matchedData(req));
        const validacao = validationResult(req).array();
        if (validacao.length === 0) {
            const novo = await usuario_controller.novoUsuario(req.body.username, req.body.senha);
            res.json({resultado: 'Usuário criado!', usuario: novo});
        } else {
            res.status(401).json(validacao);
        }
        // console.log(validacao);
})


//valida user e senha
router.post('/usuario/login/', (req, res) => {
    // const criptoSenha = bcryptjs.hashSync(req.body.senha)
    // console.log(bcryptjs.compareSync(req.body.senha, criptoSenha))
    const login = usuario_controller.login(req.body.username, req.body.senha);
    if(login.valido){
        // res.json({resultado: "Login Ok!"});
        res.json(login);
    } else res.status(401).json(login);
    // else res.status(401).json({resultado: 'Usuário / senha inválidos!'})
})


//alterar a senha de um usuario
//: variável
// router.put('/usuario/novasenha/:username', (req, res) => {
//     //para a leitura do variável
//     const username = req.params.username;
//     const novaSenha = req.body.senha;
//     if (usuario_controller.alterarSenha(username, novaSenha)){
//         res.json({resultado: "Senha alterada com sucesso!"});
//     } else res.status(400).json({resultado: 'Problema para alterar a senha!'})
// })

router.put('/usuario/novasenha', (req, res) => {
// router.put('/usuario/novasenha/:token', (req, res) => {
    //pegar o token no header
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader.split(" ")[1]
    //para a leitura do variável;
    // const token = req.params.token;
    var decodificado;
    try {
        decodificado = jsonwebtoken.verify(token, process.env.SEGREDO);
        // decodificado = jsonwebtoken.verify(token, "topsecret");
    } catch (err) {
        res.status(400).json({resultado: 'Problema para alterar a senha!'})
        return;
    }
    //decodificar o token 
    const novaSenha = req.body.senha;
    console.log(decodificado)
    if (usuario_controller.alterarSenha(decodificado.username, novaSenha)){
        res.json({resultado: "Senha alterada com sucesso!"});
    } else res.status(400).json({resultado: 'Problema para alterar a senha!'})
})

module.exports = router;

