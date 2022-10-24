import { useState, useEffect } from "react";

import Input from "../../components/form/Input/Input";

import api from "../../utils/api";

import useFlashMessage from "../../hooks/useFlashMessage";

// CSS
import styles from "./Profile.module.css";
import formStyle from "../../components/form/Form.module.css";

const Profile = () => {

    const [ user, setUser ] = useState({});
    const [ preview, setPreview ] = useState("");
    const [ token ] = useState(localStorage.getItem("token") || "");
    
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {

        api.get("/users/checkuser", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data);
        })

    }, [token])

    function onFileChange(event) {

        setPreview(event.target.files[0]);

        setUser({...user, [event.target.name]: event.target.files[0]});

    }

    function handleChange(event) {

        setUser({...user, [event.target.name]: event.target.value});

    }

    async function handleSubmit(event) {

        event.preventDefault();

        let msgType = "success", data, msgText;

        if(!user.password && !user.confirmPassword) {

            msgType = "error";

            msgText = "Preencha todos os campos!";

        } else if(!user.password) {

            msgType = "error";

            msgText = "Senha é obrigatória!";

        } else if(!user.confirmPassword) {

            msgType = "error";

            msgText = "Confirme sua senha!";

        } else {

            const formData = new FormData();

            await Object.keys(user).forEach((key) => 
                formData.append(key, user[key])
            )

            data = await api.patch(`/users/edit/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                return response.data;
            }).catch((error) => {
                msgType = "error";

                return error.response.data;
            });

        }

        if(msgText) setFlashMessage(msgText, msgType);
        else setFlashMessage(data.message, msgType);

    }

    return (
        <section className={formStyle.form_container}>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <img src={
                                preview ? 
                                URL.createObjectURL(preview) :
                                `${process.env.REACT_APP_API}/images/users/${user.image}`
                            } alt={`Usuário | ${user.name}`} />
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                    value={user.name || ""}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                    value={user.phone || ""}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    value={user.email || ""}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    )

};

export default Profile;