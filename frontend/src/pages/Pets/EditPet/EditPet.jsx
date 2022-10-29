import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import api from "../../../utils/api";

import styles from "../AddPets/AddPet.module.css";

import PetForm from '../../../components/form/PetForm/PetForm';

// hook
import useFlashMessage from "../../../hooks/useFlashMessage";

const EditPet = () => {

    const [ pet, setPet ] = useState({});
    const [ token ] = useState(localStorage.getItem("token") || "");

    const { id } = useParams();

    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {

        api.get(`/pets/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setPet(response.data.pet);
        })

    }, [token, id]);

    async function updatePet(pet) {}

    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema</p>
            </div>
            {
                pet.name &&
                <PetForm 
                    handleSubmit={updatePet} 
                    btnText="Atualizar Pet" 
                    petData={pet}
                />
            }
        </section>
    )
};

export default EditPet;