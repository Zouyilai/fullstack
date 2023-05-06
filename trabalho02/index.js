const express = require('express');
const mongoose = require('mongoose');
const usuarioRoute = require('./routes/usuario-route')
const premioRoute = require('./routes/premio-route')
const reciclagemRoute = require('./routes/reciclagem-route')

const uri = "mongodb+srv://zouyilai:zouyilai@cluster-zou.tpwhkjr.mongodb.net/reciclagem?retryWrites=true&w=majority";

const app = express();

app.use(usuarioRoute);
app.use(premioRoute);
app.use(reciclagemRoute);

app.use((req, res) => {
    res.status(404).json({msg: "Endpoint inexistente!"})
})

mongoose.connect(uri)
        .then(() => {
          app.listen(3000, () => console.log("Servidor iniciado!"));
}).catch ((err) => console.log(err));