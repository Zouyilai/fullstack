//import do modulo inteiro
//posso importar por partes -> const {MongoClient, ObjectId} = require('mongodb'); -> dai nao precisa colocar mongodb. no começo ao chamar a função
const mongodb = require('mongodb');

const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/?retryWrites=true&w=majority";

// const criarPessoa = async () => {
//     const client = new mongodb.MongoClient(uri);
//     const db = client.db('cadastro');
//     const col = db.collection('pessoas');
//     /*A função não procegue se o criente nao retornar algo */
//     //sincrono
//     const novaPessoa = await col.insertOne({nome :'Zou'});
//     await client.close();
//     return novaPessoa
// }

const criarPessoa = async () => {

    const cli = new mongodb.MongoClient(uri);
    
    try {
        const db = cli.db('cadastro');
        const col = db.collection('pessoas');
        /*await permite sincronismo -> se tiver promise é bom colocar pq é assincronica*/
        const novaPessoa = await col.insertOne({nome :'Lili'});
        return novaPessoa
    } catch(err) {
        console.log(err);
    } finally {
        await cli.close();
    }
}

// '63fe97a8da2feb5aa97b2554'
const atualizarPessoa = async (id, novoNome) => {

    const cli = new mongodb.MongoClient(uri);
    
    try {
        const db = cli.db('cadastro');
        const col = db.collection('pessoas');
        /*await permite sincronismo -> se tiver promise é bom colocar pq é assincronica*/
        const novaPessoa = await col.updateOne({_id : new mongodb.ObjectId(id)}, {$set: {nome: novoNome}});
        return novaPessoa
    } catch(err) {
        console.log(err);
    } finally {
        await cli.close();
    }
}


const removerPessoa = async (id) => {

    const cli = new mongodb.MongoClient(uri);
    
    try {
        const db = cli.db('cadastro');
        const col = db.collection('pessoas');
        /*await permite sincronismo -> se tiver promise é bom colocar pq é assincronica*/
        const novaPessoa = await col.deleteOne({_id : new mongodb.ObjectId(id)});
        return novaPessoa
    } catch(err) {
        console.log(err);
    } finally {
        await cli.close();
    }
}


const localizarPessoa = async (id) => {

    const cli = new mongodb.MongoClient(uri);
    
    try {
        const db = cli.db('cadastro');
        const col = db.collection('pessoas');
        /*await permite sincronismo -> se tiver promise é bom colocar pq é assincronica*/
        const novaPessoa = await col.findOne({_id : new mongodb.ObjectId(id)});
        return novaPessoa
    } catch(err) {
        console.log(err);
    } finally {
        await cli.close();
    }
}

const listarPessoas = async () => {

    const cli = new mongodb.MongoClient(uri);
    
    try {
        const db = cli.db('cadastro');
        const col = db.collection('pessoas');
        /*await permite sincronismo -> se tiver promise é bom colocar pq é assincronica*/
        const novaPessoa = await col.find().toArray();
        return novaPessoa
    } catch(err) {
        console.log(err);
    } finally {
        await cli.close();
    }
}

const listarPessoas2 = async () => {

    const cli = new mongodb.MongoClient(uri);
    
    try {
        const db = cli.db('cadastro');
        const col = db.collection('pessoas');
        //const tot = await col.countDocuments({nome: 'Maria'});
        //posso colocar condição no find tb 
        await col.find().forEach((item) => console.log(item.nome, item._id.toString()));
        /*await permite sincronismo -> se tiver promise é bom colocar pq é assincronica*/
        const novaPessoa = await col.find().toArray();
        return novaPessoa
    } catch(err) {
        console.log(err);
    } finally {
        await cli.close();
    }
}


/*crud */
//criarPessoa().then((res) => process.exit(0))

// atualizarPessoa('63fe97a8da2feb5aa97b2554', 'ZZZ').then((res) => {
//     console.log(res);
//     process.exit(0);
// });

// removerPessoa('63fe97a8da2feb5aa97b2554').then((res) => {
//     console.log(res);
//     process.exit(0);
// });

// localizarPessoa('63fe96d2927473c31a607d70').then((res) => {
//     console.log(res);
//     process.exit(0);
// });

//no enquanto ele retornou um ponteiro que aponta para o primeiro resultado -> podemos colocar to Array
// listarPessoas().then((res) => {
//     console.log(res);
//     process.exit(0);
// });

listarPessoas2().then((res) => {
    console.log(res);
    process.exit(0);
});

//resolução -> colocar .toArray() depois do find!


////criarPessoa().then((res) => console.log(res))

// const client = new mongodb.MongoClient(uri);

// /*Se existe usa e não existir cria*/
// const db = client.db('agencia_viagem');
// //sincrono
// const col = db.collection('trecho');

// /*Inserir um objeto dentro do nosso banco*/
// // col.insertOne({origem:"SP", destino:"ZOU", distancia:500}).then((ret) => {
// //     console.log(ret);
// //     client.close();
// // })

// /*Função assíncrona - */
// /*Listar um objeto dentro do nosso banco */
// const ret = col.findOne().then((ret) => {
//     console.log('Início pesquisa');
//     /*Retorna um promise console.log(ret);*/
//     /*Para poder imprimir o conteúdo em si, temos que abrir um then */
//     console.log(ret);
//     console.log('Fim pesquisa');
//     client.close();
// })

// /*Aviso: close precisa ser fora do then! */

