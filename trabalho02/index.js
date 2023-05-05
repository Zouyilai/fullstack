const express = require('express');
const mongoose = require('mongoose');
const usuarioRoute = require('./routes/usuario-route')
const premioRoute = require('./routes/premio-route')

const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/reciclagem?retryWrites=true&w=majority";

const app = express();

app.use(usuarioRoute);
app.use(premioRoute);

app.use((req, res) => {
    res.status(404).json({msg: "Endpoint inexistente!"})
})

mongoose.connect(uri)
        .then(() => {
          app.listen(3000, () => console.log("Servidor iniciado!"));
}).catch ((err) => console.log(err));


// mongoose.connect(uri).then(async (conn) => {

//    //teste!!!
//     //>>>>>>>>>>>>>>>>>PREMIO>>>>>>>>>>>>>>>>>>>>>>
//     ////CREATE PREMIO
//     // premioController.criarPremio('ouro', 1000, 1).then((resultado) => console.log(resultado));
//     //criarPremio('prata', 700, 3).then((resultado) => console.log(resultado));
//     //criarPremio('bronze', 400, 5).then((resultado) => console.log(resultado));

//     ////READ PREMIO
//     //visualizarPremio('64287291405ac14aae2e1cb9').then((resultado) => console.log(resultado));

//     ////UPDATE PREMIO - atualizar a quantidade
//     // premioController.atualizarPremio('644f28ec6170897ef0b112f4', 100).then((resultado) => console.log(resultado));
    
//     ////DELETE PREMIO
//     //deletarPremio('64287291405ac14aae2e1cb9').then((resultado) => console.log(resultado));

//     //>>>>>>>>>>>>>>>>>USUARIO>>>>>>>>>>>>>>>>>>>>>>
//     ////CREATE USUARIO - geralmente pontos = 0!, aqui não iremos informar a reciclagem do usuário
//     //criarUsuario('Zoou', 'zouyilai123', 0, 123, 456).then((resultado) => console.log(resultado));

//     ////READ USUARIO
//     // visualizarUsuario('6429e94d6a00dc27872170ef').then((resultado) => console.log(resultado));

//     ////UPDATE - atualizar a senha do usuário
//     //atualizarUsuario('64287492610311017d6bb1bb', 'zou123').then((resultado) => console.log(resultado));

//     ////DELETE
//     //deletarUsuario('64287492610311017d6bb1bb').then((resultado) => console.log(resultado));
    
//     //>>>>>>>>>>>>>>>>>RECICLAGEM>>>>>>>>>>>>>>>>>>>>>>
//     ////CREATE RECICLAGEM
//     //criarReciclagem('Papel', 'imagem', 0.5, new Date(), 44, '64287544225c2a5e57670351').then((resultado) => console.log(resultado));

//     ////READ RECICLAGEM
//     //visualizarReciclagem('6428756f68065f5f40fbf0f7').then((resultado) => console.log(resultado));

//     ////UPDATE RECICLAGEM - atualizar o peso
//     //atualizarReciclagem('6428756f68065f5f40fbf0f7', 2.5).then((resultado) => console.log(resultado));

//     ////DELETE RECICLAGEM
//     //deletarReciclagem('6428756f68065f5f40fbf0f7').then((resultado) => console.log(resultado));

//     //console.log(resultado);
    
// })