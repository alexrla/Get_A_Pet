const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

async function main() {

    await mongoose.connect(process.env.DATABASE_HOST);

    console.log("Conectado ao Mongoose, com sucesso!");

}

main().catch((error) => console.log(error));

module.exports = mongoose;