const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");

module.exports = class UserController {

    static async register(req, res) {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const phone = req.body.phone;

        // Validações
        if(!name) {

            res.status(422).json({ message: "O nome é obrigatório!" });
            
            return;

        }

        if(!email) {

            res.status(422).json({ message: "O e-mail é obrigatório!" });
            
            return;

        }

        if(!password) {

            res.status(422).json({ message: "A senha é obrigatória!" });
            
            return;

        }

        if(!confirmPassword) {

            res.status(422).json({ message: "Confirme sua senha!" });
            
            return;

        }

        if(!phone) {

            res.status(422).json({ message: "O telefone é obrigatório!" });
            
            return;

        }

        if(password != confirmPassword) {

            res.status(422).json({ message: "A senha e a confirmação de senha, precisam ser iguais!" });
            
            return;

        }

        // Verificando a existência do usuário
        const userExists = await User.findOne({ email: email });

        if(userExists) {

            res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
            
            return;

        }

        // Criando a senha
        const salt = await bcrypt.genSalt(12);

        const passwordHash = await bcrypt.hash(password, salt);

        // Criando usuário
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        });

        try {

            const newUser = await user.save();

            await createUserToken(newUser, req, res);
            
        } catch (error) {
            
            res.status(500).json({ message: error });

        }

    }

    static async login(req, res) {

        const { email, password } = req.body;

        if(!email) {

            res.status(422).json({ message: "O e-mail é obrigatório!" });
            
            return;

        }

        if(!password) {

            res.status(422).json({ message: "A senha é obrigatória!" });
            
            return;

        }

        // Verificando a existência do usuário
        const user = await User.findOne({ email: email });

        if(!user) {

            res.status(422).json({ message: "E-mail não encontrado!" });
            
            return;

        }

        // Verificando a senha
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {

            res.status(422).json({ message: "Senha incorreta!" });
            
            return;

        }

        await createUserToken(user, req, res);

    }

    static async checkUser(req, res) {
        
        let currentUser;

        if(req.headers.authorization)   {

            const token = getToken(req);

            // Decodificando o token
            const decoded = jwt.verify(token, process.env.SECRET);

            currentUser = await User.findById(decoded.id);

            // Zerando a senha
            currentUser.password = undefined;

        } else {

            currentUser = null;

        }

        res.status(200).send(currentUser);

    }


}