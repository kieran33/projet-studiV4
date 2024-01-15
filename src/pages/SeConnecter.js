import React from 'react';
import FormulaireCo from '../components/FormulaireCo';
import { useNavigate } from 'react-router-dom';

const SeConnecter = () => {

    const navigate = useNavigate();

    const userPseudoStorage = localStorage.getItem('pseudo utilisateur');
    const userButtonAdminStorage = localStorage.getItem('boutton admin');
    const userRegimeStorage = localStorage.getItem('regime utilisateur');

    const handleSuccessfulLogin = (userPseudoStorage, userRegimeStorage, userButtonAdminStorage) => {

        navigate(`/accueil/${userPseudoStorage}/${userButtonAdminStorage}/${userRegimeStorage}`);
        // Redirige l'utilisateur vers la page d'accueil avec le régime, le pseudo et la valeur de buttonAdmin comme paramètre d'URL
        window.location.reload();
    };


    return (
        <div>
            <FormulaireCo onLogin={handleSuccessfulLogin} />
        </div>
    );
};

export default SeConnecter;