const mongoose = require('mongoose');

const premioSchema = new mongoose.Schema({
    descricao: {type: String, required: [true, 'Informe a descrição do prêmio!!!']},
    pontos: {type: Number, required: [true, 'Informe a pontuação do prêmio!!!']},
    quantidade: {type: Number, required: [true, 'Informe a quantidade do prêmio!!!']},
});

const Premio = mongoose.model('Premio', premioSchema);

module.exports = Premio;