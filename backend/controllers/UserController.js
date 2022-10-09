const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

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

    static async getUserById(req, res) {

        const id = req.params.id;

        // Pegando o usuário pelo id e, se o usuário existir, eliminando a senha
        const user = await User.findById(id).select("-password");

        if(!user) {

            res.status(422).json({ message: "Usuário não encontrado!" })

            return;

        }

        res.status(200).json({ user });

    }

    static async editUser(req, res) {

        const id = req.params.id;

        const { name, email, password, confirmPassword, phone } = req.body;

        const token = getToken(req);

        const usersData = await getUserByToken(token);

        const user = usersData[0];

        let image = "";

        // Verificando a existência do usuário
        if(!user) {

            res.status(422).json({ message: "Usuário não encontrado!" });

            return;

        }

        // validações
        if(!name) {

            res.status(422).json({ message: "O nome é obrigatório!" });
            
            return;

        }

        user.name = name;

        if(!email) {

            res.status(422).json({ message: "O e-mail é obrigatório!" });
            
            return;

        }

        // if(!password) {

        //     res.status(422).json({ message: "A senha é obrigatória!" });
            
        //     return;

        // }

        // if(!confirmPassword) {

        //     res.status(422).json({ message: "Confirme sua senha!" });
            
        //     return;

        // }

        if(!phone) {

            res.status(422).json({ message: "O telefone é obrigatório!" });
            
            return;

        }

        user.phone = phone;

        // Verificiando se o email atualizado, já é de um usuário cadastrado
        const userExists = await User.findOne({ email: email });

        if(user.email !== email && userExists) {

            res.status(422).json({ message: "Utilize outro e-mail!" });

            return;

        }

        user.email = email;

        // Criando nova senha, caso o usuário queira trocar de senha
        if(password != confirmPassword) {

            res.status(422).json({ message: "As senhas não conferem!" });
            
            return;

        } else if(password === confirmPassword && password !== null)    {

            const salt = await bcrypt.genSalt(12);

            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash;

        }

        try {

            await User.findOneAndUpdate(
                { _id: user._id},
                { $set: user },
                { new: true }
            );
            
            res.status(200).json({ message: "Usuário atualizado com sucesso!" });

        } catch (error) {

            res.status(500).json({ message: error });

            return;
            
        }

    }

}