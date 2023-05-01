const mongoose = require('mongoose');

const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/reciclagem?retryWrites=true&w=majority";

//>>>>>>>>>>>>>>>>>PREMIO>>>>>>>>>>>>>>>>>>>>>>
const premioSchema = new mongoose.Schema({
    descricao: {type: String, required: [true, 'Informe a descrição do prêmio!!!']},
    pontos: {type: Number, required: [true, 'Informe a pontuação do prêmio!!!']},
    quantidade: {type: Number, required: [true, 'Informe a quantidade do prêmio!!!']},
});

const Premio = mongoose.model('Premio', premioSchema);

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
        return 'Prêmio não encontrado!!!';
    } else {
        const resultado = await Premio.updateOne({_id: new mongoose.Types.ObjectId(id)}, {quantidade: atualizacao});
        return resultado;
    }
}

const deletarPremio = async (id) => {
    const premio = await Premio.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (premio == null) {
        return 'Prêmio não encontrado!!!';
    } else {
        const resultado = await Premio.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        return resultado;
    }
}

//>>>>>>>>>>>>>>>>>USUARIO>>>>>>>>>>>>>>>>>>>>>>
const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: [true, 'Informe o nome do usuário!!!']},
    senha: {type: String, required: [true, 'Informe a senha do usuário!!!']},
    pontos: {type: Number, required: [true, 'Informe a pontuação do usuário!!!']},
    latitude: {type: Number, required: [true, 'Informe a latitude do usuário!!!']},
    longitude: {type: Number, required: [true, 'Informe a longitude do usuário!!!']},
    reciclagem: [{type: mongoose.Types.ObjectId, ref: "Reciclagem"}]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

const criarUsuario = async (nome, senha, pontos, latitude, longitude) => {
    const usuario = new Usuario({nome: nome, 
                                 senha: senha, 
                                 pontos: pontos,
                                 latitude: latitude,
                                 longitude: longitude,
                                });

    const resultado = await usuario.save();
    return resultado;
}

const visualizarUsuario = async (id) => {
    const resultado = await Usuario.findOne({_id: new mongoose.Types.ObjectId(id)}).populate("reciclagem").exec();
    return resultado;
}

const atualizarUsuario = async (id, atualizacao) => {
    const usuario = await Usuario.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (usuario == null) {
        return 'Usuário não encontrado!!!';
    } else {
        const resultado = await Usuario.updateOne({_id: new mongoose.Types.ObjectId(id)}, {senha: atualizacao});
        return resultado;
    }
}

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (usuario == null) {
        return 'Usuário não encontrado!!!';
    } else {
        const resultado = await Usuario.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        return resultado;
    }
}

//>>>>>>>>>>>>>>>>>RECICLAGEM>>>>>>>>>>>>>>>>>>>>>>
const reciclagemSchema = new mongoose.Schema({
    item: {type: String, required: [true, 'Informe o item de reciclagem!!!']},
    imagem: {type: String, required: [true, 'Informe a imagem do reciclagem!!!']},
    peso: {type: Number, required: [true, 'Informe o peso!!!']},
    data: {type: Date, required: [true, 'Informe a data de reciclagem!!!']},
    pontos: {type: Number, required: [true, 'Informe a pontuação!!!']},
    usuario: {type: mongoose.Types.ObjectId, required: true, ref: "Usuario"}
});

const Reciclagem = mongoose.model('Reciclagem', reciclagemSchema);

const criarReciclagem = async (item, imagem, peso, data, pontos, usuarioId) => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const usuario = await Usuario.findById(usuarioId).exec();
        if (usuario) {
            let reciclagem = new Reciclagem({item: item,
                                             imagem: imagem, 
                                             peso: peso,
                                             data: data,
                                             pontos: pontos,
                                             usuario: usuario,
                                             });
            reciclagem = await reciclagem.save({session: session});
            usuario.pontos = usuario.pontos + pontos;
            usuario.reciclagem.push(reciclagem);
            await usuario.save({session: session});
            session.commitTransaction();
            return reciclagem;
        }
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    }
}

const visualizarReciclagem = async (id) => {
    const resultado = await Reciclagem.findOne({_id: new mongoose.Types.ObjectId(id)}).populate("usuario").exec();
    return resultado;
}

const atualizarReciclagem = async (id, atualizacao) => {
    const reciclagem = await Reciclagem.findOne({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (reciclagem == null) {
        return 'Item de reciclagem não encontrado!!!';
    } else {
        const resultado = await Reciclagem.updateOne({_id: new mongoose.Types.ObjectId(id)}, {peso: atualizacao});
        return resultado;
    }
}

const deletarReciclagem = async (id) => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const reciclagem = await Reciclagem.findById(id).exec();
        if (reciclagem) {
            const usuario = await Usuario.findById(reciclagem.usuario).exec();
            usuario.pontos = usuario.pontos - reciclagem.pontos;
            const resultado = await Reciclagem.deleteOne({_id: new mongoose.Types.ObjectId(id)}, {session: session});
            usuario.reciclagem.pull(reciclagem);
            await usuario.save({session: session});
            session.commitTransaction();
            return resultado;
        } else {
            return 'ID inválido!'
        }
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    }
}

mongoose.connect(uri).then(async (conn) => {
    
    //teste!!!
    //>>>>>>>>>>>>>>>>>PREMIO>>>>>>>>>>>>>>>>>>>>>>
    ////CREATE PREMIO
    //criarPremio('ouro', 1000, 1).then((resultado) => console.log(resultado));
    //criarPremio('prata', 700, 3).then((resultado) => console.log(resultado));
    //criarPremio('bronze', 400, 5).then((resultado) => console.log(resultado));

    ////READ PREMIO
    //visualizarPremio('64287291405ac14aae2e1cb9').then((resultado) => console.log(resultado));

    ////UPDATE PREMIO - atualizar a quantidade
    //atualizarPremio('64287291405ac14aae2e1cb9', 10).then((resultado) => console.log(resultado));
    
    ////DELETE PREMIO
    //deletarPremio('64287291405ac14aae2e1cb9').then((resultado) => console.log(resultado));

    //>>>>>>>>>>>>>>>>>USUARIO>>>>>>>>>>>>>>>>>>>>>>
    ////CREATE USUARIO - geralmente pontos = 0!, aqui não iremos informar a reciclagem do usuário
    //criarUsuario('Zoou', 'zouyilai123', 0, 123, 456).then((resultado) => console.log(resultado));

    ////READ USUARIO
    // visualizarUsuario('6429e94d6a00dc27872170ef').then((resultado) => console.log(resultado));

    ////UPDATE - atualizar a senha do usuário
    //atualizarUsuario('64287492610311017d6bb1bb', 'zou123').then((resultado) => console.log(resultado));

    ////DELETE
    //deletarUsuario('64287492610311017d6bb1bb').then((resultado) => console.log(resultado));
    
    //>>>>>>>>>>>>>>>>>RECICLAGEM>>>>>>>>>>>>>>>>>>>>>>
    ////CREATE RECICLAGEM
    //criarReciclagem('Papel', 'imagem', 0.5, new Date(), 44, '64287544225c2a5e57670351').then((resultado) => console.log(resultado));

    ////READ RECICLAGEM
    //visualizarReciclagem('6428756f68065f5f40fbf0f7').then((resultado) => console.log(resultado));

    ////UPDATE RECICLAGEM - atualizar o peso
    //atualizarReciclagem('6428756f68065f5f40fbf0f7', 2.5).then((resultado) => console.log(resultado));

    ////DELETE RECICLAGEM
    //deletarReciclagem('6428756f68065f5f40fbf0f7').then((resultado) => console.log(resultado));

    //console.log(resultado);

}).catch((err) => console.log(err))