import { useState, useContext } from "react";

import { Link } from "react-router-dom";

import Input from '../../../components/form/Input/Input';

// CSS
import styles from "../../../components/form/Form.module.css";

// Context
import { Context } from "../../../context/UserContext";

const Login = () => {

    const [ user, setUser ] = useState({});

    const { login } = useContext(Context);

    function handleChange(event) {

        setUser({...user, [event.target.name]: event.target.value});

    }

    function handleSubmit(event) {

        event.preventDefault();

        login(user);

    }

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar" />
            </form>
            <p>
                Não tem conta? <Link to="/sign-up" className="bold">Clique aqui!</Link>
            </p>
        </section>
    )
};

export default Login;