const mongoose = require('mongoose');

const reciclagemSchema = new mongoose.Schema({
    item: {type: String, required: [true, 'Informe o item de reciclagem!!!']},
    imagem: {type: String, required: [true, 'Informe a imagem do reciclagem!!!']},
    peso: {type: Number, required: [true, 'Informe o peso!!!']},
    data: {type: Date, required: [true, 'Informe a data de reciclagem!!!']},
    pontos: {type: Number, required: [true, 'Informe a pontuação!!!']},
    usuario: {type: mongoose.Types.ObjectId, required: true, ref: "Usuario"}
});

const Reciclagem = mongoose.model('Reciclagem', reciclagemSchema);

module.exports = Reciclagem;