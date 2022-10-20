const Pet = require("../models/Pet");

const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {

    static async create(req, res) {

        const { name, age, weight, color } = req.body;

        const images = req.files;

        const available = true;

        // Upload de imagens


        // Validações
        if(!name) {

            res.status(422).json({ mesage: "O nome é obrigatório! "});

            return;

        }

        if(!age) {

            res.status(422).json({ mesage: "A idade é obrigatória! "});

            return;

        }

        if(!weight) {

            res.status(422).json({ mesage: "O peso é obrigatório! "});

            return;

        }

        if(!color) {

            res.status(422).json({ mesage: "A cor é obrigatória! "});

            return;

        }

        if(images.length === 0) {

            res.status(422).json({ mesage: "A imagem é obrigatória! "});

            return;

        }

        // Usuário dono do pet
        const token = getToken(req);
        const user = await getUserByToken(token);

        console.log(user);

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        });

        images.map((image) => {

            pet.images.push(image.filename);

        });

        try {

            const newPet = await pet.save();

            res.status(201).json({

                message: "Pet cadastrado com sucesso!",

                newPet

            });
            
        } catch (error) {

            res.status(500).json({ message: error });
            
        }

    }

    static async getAll(req, res) {

        const pets = await Pet.find().sort("-createdAt");

        res.status(200).json({ pets: pets });

    }

    static async getAllUserPets(req, res) {

        // Pegando o usuário
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");


        res.status(200).json({ pets: pets });
        
    }

    static async getAllUserAdoptions(req, res) {

        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");


        res.status(200).json({ pets: pets });

    }

    static async getPetById(req, res) {

        const id = req.params.id;

        if(!ObjectId.isValid(id)) {

            res.status(422).json({
                mesage: "ID inválido!"
            });

            return;

        }

        const pet = await Pet.findOne({ _id: ObjectId(id) });

        if(!pet) {

            res.status(404).json({
                message: "Pet não encontrado!"
            });

        }

        res.status(200).json({
            pet
        });

    }

}