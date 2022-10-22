import { Link } from "react-router-dom";

import Input from "../../../components/form/Input/Input";

// CSS
import styles from "../../../components/form/Form.module.css";

const Register = () => {

    function handleChange(event) {

    }

    return (
        <section className={styles.form_container}>
            <h1>Realizar Cadastro</h1>
            <form>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                />
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
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Criar conta" />
            </form>
            <p>
                Já tem conta? <Link to="/sign-in" className="bold">Clique aqui!</Link>
            </p>
        </section>
    )

};

export default Register;