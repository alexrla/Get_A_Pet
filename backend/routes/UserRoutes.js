const router = require("express").Router();

const UserController = require("../controllers/UserController");

// middlewares
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
    "/edit/:id", 
    verifyToken,
    /*
        - Abaixo estamos recebendo uma única imagem (single);

        - O campo a ser enviado do formulário, se chama image;
    */
    imageUpload.single("image"), 
    UserController.editUser
);

module.exports = router;