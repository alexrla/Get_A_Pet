import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../../utils/api";

import useFlashMessage from "../../../hooks/useFlashMessage";

// Componentes
import PetForm from "../../../components/form/PetForm/PetForm";

// CSS
import styles from "./AddPet.module.css";

const AddPets= () => {



    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm btnText="Cadastrar Pet" />
        </section>
    )
};

export default AddPets;