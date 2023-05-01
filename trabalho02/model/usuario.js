const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: [true, 'Informe o nome do usuário!!!']},
    senha: {type: String, required: [true, 'Informe a senha do usuário!!!']},
    pontos: {type: Number, required: [true, 'Informe a pontuação do usuário!!!']},
    latitude: {type: Number, required: [true, 'Informe a latitude do usuário!!!']},
    longitude: {type: Number, required: [true, 'Informe a longitude do usuário!!!']},
    reciclagem: [{type: mongoose.Types.ObjectId, ref: "Reciclagem"}]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;