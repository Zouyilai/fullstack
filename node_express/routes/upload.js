const express = require('express');
const fileUpload = require('express-fileupload');

const router = express.Router();

router.use(fileUpload())

router.post("/upload", (req, res) => {
    const file = req.files.arquivo;
    const path = __dirname + "../files/" + file.name;
    file.mv(path, (err) => {
        res.status(500).send('Erro ao mover!')
    });
    res.json({path:path});
});

module.exports = router;


// const express = require('express');
// const fileUpload = require("express-fileupload");
// const path = require('path');

// const router = express.Router();

// router.use(fileUpload());

// router.post("/upload", (req, res) => {

//     const file = req.files.arquivo;
//     const fileName = file.name;
//     const fullpath = path.join(__dirname, '..','files', fileName);
//     console.log(fullpath);
//     file.mv(fullpath, (err) => {
//         console.log(err);
//         if (err) {
//             res.status(500).send('Erro ao mover!')
//         }
//     });
//     res.json({path: fullpath});
// })

// module.exports = router;
