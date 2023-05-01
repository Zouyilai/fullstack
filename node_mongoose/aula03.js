const mongoose = require('mongoose');

const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/pizza?retryWrites=true&w=majority";

const pizzaSchema = new mongoose.Schema({
    nome: {type:String, required: [true, 'nome!']},
    preco: {type:Number, min: [10.0, 'preço!']},
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

const pedidoSchema = new mongoose.Schema({
    usuario: String,
    pizza: [{type:mongoose.Types.ObjectId, 
            required: [true, 'nome!'], 
            //referencia ao objeto pizza (unidirecional pedido -> pizza)
            ref: "Pizza"}],
    quantidade: Number,
    endereco: String    
    });

const Pedido = mongoose.model('Pedido', pedidoSchema);

const obterPedidoUsuario = async (usuario) => {
    //obter o pedido do user
    const pedido = await Pedido.findOne({usuario: usuario}).exec();
    //obter pizza por id
    const pizza = await Pizza.findById(pedido.pizza).exec();

    return{
        nome: pizza.nome,
        preco: pizza.preco,
        endereco: pedido.endereco,
        quantidade: pedido.quantidade
    };
}

const obterPedidoUsuarioV2 = async (usuario) => {
    //obter o pedido do user
    //utiliza o populate () para criar objeto dentro do objeto
    //utilizar os atributos ref!!!! (populate)
    const pedido = await Pedido.findOne({usuario: usuario}).populate("pizza").exec();
    
    console.log(pedido);
   
    // return{
    //     nome: pedido.pizza.nome,
    //     preco: pedido.pizza.preco,
    //     endereco: pedido.endereco,
    //     quantidade: pedido.quantidade
    // };
    return pedido;
}


mongoose.connect(uri).then(async (conn) => {
    //criarPizza().then((resultado) => console.log(resultado));
    // const p1 = new Pizza({nome: 'atum', preco: 44.44});
    // await p1.save();

    // const p2 = new Pizza({nome: 'picanha', preco: 34.44});
    // await p2.save();

    // const p3 = new Pizza({nome: 'salmao', preco: 24.44});
    // await p3.save();

    //criar pedido com mais que 1 item
    const pedido_p2 = await Pizza.findOne({nome:'picanha'});
    const pedido_p3 = await Pizza.findOne({nome:'salmao'})

    // const pd1 = new Pedido({usuario:'zou', pizza: new mongoose.Types.ObjectId('6411076834acb171885cd698'), endereco: 'rua xx', quantidade: 20})
    // await pd1.save();

    const pd1 = new Pedido({usuario:'zou', 
                            //armazenar um array
                            pizza: [pedido_p2, pedido_p3],
                            endereco: 'rua xx', 
                            quantidade: 20});
    await pd1.save();

    // const resultado = await obterPedidoUsuario("zou");
    // console.log(resultado);

    const resultado = await obterPedidoUsuarioV2("zou");
    console.log(resultado);
}).catch((err) => console.log(err))