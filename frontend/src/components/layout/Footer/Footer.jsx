import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                <span className="bold">Get A Pet </span> 
                <span>&copy; 2022</span>
            </p>
        </footer>
    )
};

export default Footer;