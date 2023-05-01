//const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');

// const teste = async () => {
//     const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/?retryWrites=true&w=majority";
//     const conn = await MongoClient.connect(uri);
//     const db = conn.db("cadastro");
//     const collection = db.collection("pessoas");
//     await collection.insertOne({fruta: "mamao", preco: 15.0});
//     await conn.close();
//     return "Ok";
    
//}

//apenas connect ja funciona -> assincrono -> await 
//não preciso fazer conmect toda interação
const testeMongoose = async () => {
    const pessoa = new Pessoa({//nome: "JJJoao", 
                                telefone: 123, 
                                fruta: "Melancia", //ignorado por não está no esquema
                                endereco: "Rua x 123",
                                nascimento: new Date(),
                                idade: 10});
    //retorna uma lista de erros
    // const valida = await pessoa.validateSync();
    // return valida.errors["idade"].message;
    
    //const resultado = await pessoa.save();
    //return resultado;

    let valida;
    try {
        valida = await pessoa.validateSync();
        for (let erro in valida.errors) {
            console.log(valida.errors[erro].message);
        }
    } catch (err) {
        console.log(">>>> ERRO");
        return err;
    }
    return "";
}

const consultarPessoa = async () => {
    //nao trazer algo (-xxx)
    //findOne -> _id não precisa instanciar um novo objeto
    //ou sim...
    //CONSULTAR
    //const resultado = await Pessoa.findOne({nome: "Joao"}, "nome endereco -_id").exec();

    //UPDATE
    //1.
    // const resultado = await Pessoa.findOne({nome: "Joao"}).exec();
    // resultado.nome = "Joao da Silva";
    //await resultado.save();
    //save apreseta 2 funções: sem id definido gera insert, para quem possui id, antes de inserir  -> entende que é um update
    
    //2.
    const resultado = await Pessoa.updateOne({_id: new mongoose.Types.ObjectId("6407cce70ad8edf4f0241f1e")}, {endereco: "ruaaaaa 333", telefone: "123456"});
    return resultado;
}

//definição de esquema -> 1 vez só para todas as aplicações 
const pessoaSchema = mongoose.Schema({
    //nome: String,
    //nome: {type: String, required: true},
    //Tornando o nome obrigatorio
    nome: {type: String, required: [true, "Informe o nome da pessoa obrigatoriamente"]},
    telefone: Number,
    endereco: String, 
    nascimento: Date,
    idade: {type: Number, min: [18, "Idade mínima deve ser de 18 anos!"]}
});

const Pessoa = new mongoose.model("Pessoa", pessoaSchema)

//posso siimplesmento apontar o db aqui
const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/cadastro?retryWrites=true&w=majority";

//usar assincrono fora do sincrono é usando then
mongoose.connect(uri).then((conn) => {
    testeMongoose().then((resultado) => console.log(resultado));
    //consultarPessoa().then((resultado) => console.log(resultado));
})

//teste().then((ret) => console.log(ret)).catch((err) => console.log(err))