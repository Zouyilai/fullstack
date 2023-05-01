const mongoose = require('mongoose');

const Usuario = require('../model/usuario');
const Reciclagem = require('../model/reciclagem');


const criarUsuario = async (nome, senha, pontos, latitude, longitude) => {
    const usuario = new Usuario({nome: nome, 
                                 senha: senha, 
                                 pontos: pontos,
                                 latitude: latitude,
                                 longitude: longitude,
                                });

    const resultado = await usuario.save();
    return resultado;
}

const visualizarUsuario = async (id) => {
    const resultado = await Usuario.findOne({_id: new mongoose.Types.ObjectId(id)}).populate("reciclagem").exec();
    return resultado;
}

const atualizarUsuario = async (id, atualizacao) => {
    const usuario = await Usuario.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (usuario == null) {
        return 'Usuário não encontrado!!!';
    } else {
        const resultado = await Usuario.updateOne({_id: new mongoose.Types.ObjectId(id)}, {senha: atualizacao});
        return resultado;
    }
}

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (usuario == null) {
        return 'Usuário não encontrado!!!';
    } else {
        const resultado = await Usuario.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        return resultado;
    }
}

module.exports.criarUsuario = criarUsuario;
module.exports.visualizarUsuario = visualizarUsuario;
module.exports.atualizarUsuario = atualizarUsuario;
module.exports.deletarUsuario = deletarUsuario;