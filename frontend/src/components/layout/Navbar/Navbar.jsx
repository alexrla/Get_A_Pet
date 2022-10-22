import { Link } from "react-router-dom";

// Logo
import Logo from "../../../assets/img/logo.png";

// CSS
import styles from "./Navbar.module.css";

const Navbar = () => {
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
                <li>
                    <Link to="/sign-in">Entrar</Link>
                </li>
                <li>
                    <Link to="/sign-up">Cadastrar</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;