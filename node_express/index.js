const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const fileUpload = require('express-fileupload');
const uploadRoute = require('./routes/upload')
// const path_base = requere('path')

const app = express();

//mid -> bodyparser -> encoded -> formulário para post
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());

// http://localhost:9000/fumante.jpg
app.use(express.static('img'));
app.use(uploadRoute)

app.use(session({secret : 'cat'}));

// app.post("/upload", (req, res) => {
//     const file = req.files.arquivo;
//     const path = __dirname + "/files/" + file.name;
//     file.mv(path, (err) => {
//         res.status(500).send('Erro ao mover!')
//     });
//     res.json({path:path});
// });
//
app.get("/contador", (req, res) => {
    if(req.session.page_views){
        req.session.page_views++;
        res.send("Total " + req.session.page_views);
    } else {
        //contador sem usar session teriamos que passar um parametro para poder armazenar pq http perde o estado...
        req.session.page_views = 1;
        res.send("Bem vindo! Primeiro acesso!!!");
    }
});

//http://localhost:9000/filme
app.get("/filme", (req, res) => {
    res.send("Bom filme!");
});

//http://localhost:9000/cinema/filme/id
app.get("/cinema/filme/:id/:ano", (req, res) => {
    res.send(req.params);
    //res.send("Bom filme!");
});

app.get("/form", (req, res, next) => {
    if (req.cookies.username != null) {
        res.send('Login Ok!!');
    } else {
        res.send('<form method="POST" action="login">Username:<input type="text" name="username">Senha:<input type="password" name="senha"><button type="submit">Login</button></form>');
    }

});

app.post("/login", (req, res) => {
    console.log(req.cookies);
    console.log(req.body.username);
    console.log(req.body.senha);
    //agora eu passo a ter corpo da requisição
    //res.send(req.body);
    if (req.cookies.username != null ||
    (req.body.username === 'teste' && req.body.senha === '123')) {
        res.cookie('username', req.body.username);
        res.status(200).send('feliz :)')
    } else {
        res.status(401).json({erro : "triste :("})
    }
})

//http://localhost:9000/filme
//http://localhost:9000/autor?nome=Joao&nacionalidade=Zou
app.get("/autor", (req, res) => {
    //res.send("Ganhou Nobel!");
    //.nacionalidade
    //res.send(req.query);
    if(req.query.nacionalidade){
        res.send(req.query.nacionalidade);
    } else {
        res.send('informe!');
    }
});

var msg = '';
//Middleware
app.use((req, res, next) => {
    //send manda de volta para browser
    // res.send("<h1>Teste ok!</h1>");
    msg = 'Boa ';
    next();
});

app.use((req, res, next) => {
    //send manda de volta para browser
    // res.send("<h1>Teste ok!</h1>");
    msg += 'Noite';
    res.send("<h1>"+msg+"</h1>")
});

app.listen(9000, () => {
    console.log('servidor inciado!');
})