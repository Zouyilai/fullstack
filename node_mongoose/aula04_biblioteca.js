const mongoose = require('mongoose');
const livroController = require('./controller/livro-controller')
const emprestimoController = require('./controller/emprestimo-controller')

const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/biblioteca?retryWrites=true&w=majority";

mongoose.connect(uri).then(async(conn) => {
    //const res = await livroController.criar('livro de Java', 'Zou');
    const res = await emprestimoController.emprestar('641a4f028932d12613aaaf6d');
    console.log(res);
})