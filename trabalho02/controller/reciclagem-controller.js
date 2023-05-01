const mongoose = require('mongoose');

const Usuario = require('../model/usuario');
const Reciclagem = require('../model/reciclagem');

const criarReciclagem = async (item, imagem, peso, data, pontos, usuarioId) => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const usuario = await Usuario.findById(usuarioId).exec();
        if (usuario) {
            let reciclagem = new Reciclagem({item: item,
                                             imagem: imagem, 
                                             peso: peso,
                                             data: data,
                                             pontos: pontos,
                                             usuario: usuario,
                                             });
            reciclagem = await reciclagem.save({session: session});
            usuario.pontos = usuario.pontos + pontos;
            usuario.reciclagem.push(reciclagem);
            await usuario.save({session: session});
            session.commitTransaction();
            return reciclagem;
        }
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    }
}

const visualizarReciclagem = async (id) => {
    const resultado = await Reciclagem.findOne({_id: new mongoose.Types.ObjectId(id)}).populate("usuario").exec();
    return resultado;
}

const atualizarReciclagem = async (id, atualizacao) => {
    const reciclagem = await Reciclagem.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (reciclagem == null) {
        return 'Item de reciclagem não encontrado!!!';
    } else {
        const resultado = await Reciclagem.updateOne({_id: new mongoose.Types.ObjectId(id)}, {peso: atualizacao});
        return resultado;
    }
}

const deletarReciclagem = async (id) => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const reciclagem = await Reciclagem.findById(id).exec();
        if (reciclagem) {
            const usuario = await Usuario.findById(reciclagem.usuario).exec();
            usuario.pontos = usuario.pontos - reciclagem.pontos;
            const resultado = await Reciclagem.deleteOne({_id: new mongoose.Types.ObjectId(id)}, {session: session});
            usuario.reciclagem.pull(reciclagem);
            await usuario.save({session: session});
            session.commitTransaction();
            return resultado;
        } else {
            return 'ID inválido!'
        }
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    }
}



module.exports.criarReciclagem = criarReciclagem;
module.exports.visualizarReciclagem = visualizarReciclagem;
module.exports.atualizarReciclagem = atualizarReciclagem;
module.exports.deletarReciclagem = deletarReciclagem;