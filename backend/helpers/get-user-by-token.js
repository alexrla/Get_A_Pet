const jwt = require("jsonwebtoken");

const User = require("../models/User");

const dotenv = require("dotenv");
dotenv.config();

// Pegando o usuário pelo token JWT
const getUserByToken = async(token) => {

    if(!token) {

        return res.status(401).json({ message: "Acesso negado!" });

    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const userId = decoded.id;

    const user = await User.find({ _id: userId });

    return user;

}

module.exports = getUserByToken;