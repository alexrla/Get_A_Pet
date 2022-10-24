import { useContext } from "react";

import { Link } from "react-router-dom";

// Logo
import Logo from "../../../assets/img/logo.png";

// CSS
import styles from "./Navbar.module.css";

// Context
import { Context } from "../../../context/UserContext";

const Navbar = () => {

    const { authenticated, logout } = useContext(Context);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Logo | Get A Pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                {
                    authenticated ? (
                        <>
                            <li>
                                <Link to="/sign-in">Dashboard</Link>
                            </li>
                            <li onClick={logout}>
                                Sair
                            </li>
                        </>
                    ) : (
                        <> 
                            <li>
                                <Link to="/sign-in">Entrar</Link>
                            </li>
                            <li>
                                <Link to="/sign-up">Cadastrar</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
};

export default Navbar;