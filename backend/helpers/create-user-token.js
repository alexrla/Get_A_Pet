const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const createUserToken = async(user, req, res) => {

    // Criando token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.SECRET)

    res.status(200).json({ 
        message: "Você está autenticado!", 
        token,
        userId: user._id
    });

};

module.exports = createUserToken;