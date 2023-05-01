const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({
    username: String,
    senha: String,
    endereco: String,
    bloqueado: Boolean,
    totalFalhaLogin: Number,
    admin: Boolean
});
const Usuario = mongoose.model('Usuario', usuarioSchema)

var usuarios = [];

// const novoUsuario = (username, senha) => {
//     usuarios[username] = {
//         username: username,
//         senha: bcryptjs.hashSync(senha),
//         bloqueado: false,
//         totalFalhaLogin: 0,
//         admin: false
//     }
//     return usuarios[username];
// }

const novoUsuario = async (username, senha) => {
    const usuario = new Usuario ({
        username: username,
        senha: bcryptjs.hashSync(senha),
        bloqueado: false,
        totalFalhaLogin: 0,
        admin: false
    });
    const ret = await usuario.save();
    return ret;
}

//criar uam função que valida usuario e senha 
//retorna true casa username / senha validos ou false caso contrario
const login = (username, senha) => {
    if (usuarios[username]){
        const valido = bcryptjs.compareSync(senha, usuarios[username].senha);
        if (valido) {
            // poder qualquer coisa, senha, segredo...
            const token = jsonwebtoken.sign({username: username}, "topsecret");
            return {valido: true, token: token};
        } else return {valido: false};
    } else {
        return {valido:false};
    }
}

//função que altera a senha do usuário
const alterarSenha = (username, novoSenha) => {
    if (usuarios[username]){
        usuarios[username].senha = novoSenha;
        return true;
    } else {
        return false;
    }
}

// novoUsuario('user1', 'senha123');
// novoUsuario('user2', 'senha456');
// console.log(usuarios['user1'].senha)
// console.log(login('user1', 'senhaa'))
// console.log(login('user1', 'senha123'))

module.exports.novoUsuario = novoUsuario;
module.exports.login = login;
module.exports.alterarSenha = alterarSenha;