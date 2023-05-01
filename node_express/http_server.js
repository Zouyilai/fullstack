const http = require('http');

http.createServer((req, res) => {
    console.log(JSON.stringify(req.headers))

    console.log(req.headers['host']);
    // console.log('Requisição recebida!');
    console.log(req.method);
    console.log(req.url);

    res.write("OK!");
    res.end();
    //aguarda resposta na porta 8000
}).listen(8000);