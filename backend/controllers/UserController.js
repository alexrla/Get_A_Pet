const User = require("../models/User");
const bcrypt = require("bcrypt");
const createUserToken = require("../helpers/create-user-token");

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

}