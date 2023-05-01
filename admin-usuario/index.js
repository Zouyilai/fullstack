const express = require('express');
const mongoose = require('mongoose');
const usuarioRoute = require('./routes/usuario-route')

const app = express();

//habilita a rota para o usuário incluindo como middleware
app.use(usuarioRoute);

app.get("/alo", (req, res) => {
    res.send('Alo');
});

//else (endpoins inexistentes\)
app.use((req, res) => {
    res.status(404).json({msg: "Endpoint inexistente!"})
})


const URL =  "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/admin-usuario?retryWrites=true&w=majority";
mongoose.connect(URL)
        .then(() => {
          app.listen(3000, () => console.log("Servidor iniciado!"));
}).catch ((err) => console.log(err));

// app.listen(3000, () => console.log('Servidor Iniciado...'));
