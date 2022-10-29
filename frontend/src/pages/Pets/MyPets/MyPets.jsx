import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import RoundedImage from '../../../components/layout/Rounded_Image/RoundedImage';

import api from "../../../utils/api";

// hook
import useFlashMessage from '../../../hooks/useFlashMessage';

const MyPets= () => {

    const [ pets, setPets ] = useState([]);
    const [ token ] = useState(localStorage.getItem("token") || "");

    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {

        api.get("/pets/mypets", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setPets(response.data.pets);
        });

    }, [token]);

    return (
        <section>
            <div>
                <h1>Meus Pets</h1>
                <Link to="/pet/add">Cadastrar Pet!</Link>
            </div>
            <div>
                {
                    pets.length > 0 &&
                                    <p>Meus Pets cadastrados</p>
                }
                {
                    pets.length === 0 &&
                                    <p>Não há pets cadastrados</p>
                }
            </div>
        </section>
    )
};

export default MyPets;