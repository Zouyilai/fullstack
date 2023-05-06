const mongoose = require('mongoose');

const Premio = require('../model/premio');

const criarPremio = async (descricao, pontos, quantidade) => {
    const premio = new Premio({ descricao: descricao, 
                                pontos: pontos, 
                                quantidade: quantidade,});

    const resultado = await premio.save();
    return resultado;
}

const visualizarPremio = async (id) => {
    const resultado = await Premio.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    return resultado;
}

const atualizarPremio = async (id, atualizacao) => {
    const premio = await Premio.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (premio == null) {
        return null;
    } else {
        const resultado = await Premio.updateOne({_id: new mongoose.Types.ObjectId(id)}, {quantidade: atualizacao});
        return resultado;
    }
}

const deletarPremio = async (id) => {
    const premio = await Premio.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (premio == null) {
        return null;
    } else {
        const resultado = await Premio.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        return resultado;
    }
}

const listarPremios = async () => {
    const resultado = await Premio.find().exec();
    return resultado;
}

const listarPremioDisponivel = async (pontos) => {
    const resultado = await Premio.find({pontos: {$lte: pontos}}, {}).exec()
    return resultado;
}

module.exports.criarPremio = criarPremio;
module.exports.visualizarPremio = visualizarPremio;
module.exports.atualizarPremio = atualizarPremio;
module.exports.deletarPremio = deletarPremio;
module.exports.listarPremios = listarPremios;
module.exports.listarPremioDisponivel = listarPremioDisponivel;