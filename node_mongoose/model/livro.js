const mongoose = require('mongoose');

const livroSchema = mongoose.Schema({
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    emprestimo: [{type: mongoose.Types.ObjectId, ref: "Emprestimo"}],
});

const Livro = mongoose.model('Livro', livroSchema);

//exportar Livro para que o schema(model do schema!!!) seja visível fora da classe
//só um item: export
module.exports = Livro;