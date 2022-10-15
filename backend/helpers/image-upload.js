const multer = require("multer");
const path = require("path");

// Configurando o multer
const imageStore = multer.diskStorage({
    // Local onde a imagem será salva
    destination: function(req, file, myCallback) {

        let folder = "";

        if(req.baseUrl.includes("users"))   {

            folder = "users";

        } else if(req.baseUrl.includes("pets")) {

            folder = "pets";

        }

        myCallback(null, `public/imgs/${folder}`);

    },
    // Nome do arquivo após ser salvo
    filename: function(req, file, myCallback) {

        /*
            - Concatenando a extensão do arquivo, com a data atual;

            - A data vem em milisegundos;
        */
        myCallback(
            null, 
            Date.now() + 
            String(Math.floor(Math.random() * 1000)) + 
            path.extname(file.originalname)
        );

    }
});

const imageUpload = multer({
    storage: imageStore,
    // Filtrando os arquivos que queremos receber
    fileFilter(req, file, myCallback) {

        if(!file.originalname.match(/\.(png|jpg)$/)) {

            return myCallback(new Error("Por favor, envie apenas jpg ou png!"));

        }

        myCallback(undefined, true);

    }
});

module.exports = { imageUpload };