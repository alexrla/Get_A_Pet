// CSS
import styles from "./RoundedImage.module.css";

const RoundedImage = ({ src, alt, width}) => {

    return (
        <img 
            src={src} 
            alt={alt} 
            className={`${styles.rounded_image} ${styles[width]}`} 
        />
    )

};

export default RoundedImage;