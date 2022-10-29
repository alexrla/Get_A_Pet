import { useState, useEffect } from "react";

import api from "../../../utils/api";

import styles from "../Dashboard.module.css";

import RoundedImage from "../../../components/layout/Rounded_Image/RoundedImage";

const MyAdoptions = () => {

    const [ pets, setPets ] = useState([]);
    const [ token ] = useState(localStorage.getItem("token") || "");

    useEffect(() => {

        api.get("/pets/myadoptions", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets);
        })

    }, [ token ])

    return (
        <section>
            <div className={styles.petlist_header }>
                <h1>Minhas adoções</h1>
            </div>
            <div className={styles.petlist_container}>
                {
                    pets.length > 0 && (
                        pets.map((pet) => (
                            <div key={pet._id} className={styles.petlist_row}>
                                <RoundedImage
                                        src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                        alt={pet.name}
                                        width="px75"
                                    />
                                    <span className="bold">{pet.name}</span>
                                    <div className={styles.contacts}>
                                        <p>
                                            Ligue para: <span className="bold">{pet.user.phone}</span>
                                        </p>
                                        <p>
                                            Fale com: <span className="bold">{pet.user.name}</span>
                                        </p>
                                    </div>
                                    <div className={styles.actions}>
                                        {
                                            pet.available ?
                                            (
                                                <p>
                                                    Adoção em processo
                                                </p>
                                            ):
                                            <p>Parabéns por concluir a adoção</p>
                                        }
                                    </div>
                            </div>
                        ))
                    )
                }
                {
                    pets.length === 0 && <p>Ainda não há adoções de Pets.</p>
                }
            </div>
        </section>
    )
};

export default MyAdoptions;