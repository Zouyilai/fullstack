const mongoose = require('mongoose');

const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/pizza?retryWrites=true&w=majority";

const pizzaSchema = new mongoose.Schema({
    nome: {type:String, required: [true, 'nome!']},
    preco: {type:Number, min: [10.0, 'preço!']},
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

const criarPizza = async () => {
    const pizza = new Pizza({ pizza: '2 Queijos' });
    const resultado = await pizza.save();
    return resultado;
}

const pedidoSchema = new mongoose.Schema({
    pizza: String,
    quantidade: Number,
    endereco: String
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

const criarPedido =async () => {
    const Pizza = mongoose.model('Pizza', pizzaSchema);

    let pizza = await Pizza.findOne({_id: '641101bc77c2f12d1c0cea45'},  "pizza -_id").exec();
    //const pizza = await Pessoa.updateOne(
    const pedido = new Pedido({ pizza: pizza,
                                quantidade: 10,
                                endereco: 'Rua xxx, 123, apto 111'});
    const resultado = await pedido.save();
    return resultado;
}
mongoose.connect(uri).then((conn) => {
    //criarPizza().then((resultado) => console.log(resultado));
    criarPedido().then((resultado) => console.log(resultado));
})