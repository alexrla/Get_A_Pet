const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

// Rotas
const UserRoutes = require("./routes/UserRoutes");
const PetRoutes = require("./routes/PetRoutes");

const app = express();

app.use(express.json());

// Liberando o "origin", para acessar a API
app.use(cors({ credentials: true, origin: process.env.ORIGIN_HOST }));

app.use(express.static("public"));

app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

app.listen(5000, console.log("App funcionando!"));