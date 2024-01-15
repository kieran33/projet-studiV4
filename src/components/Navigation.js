import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {

    const navigate = useNavigate();

    const userPseudoStorage = localStorage.getItem('pseudo utilisateur');
    const userButtonAdminStorage = localStorage.getItem('boutton admin');
    const userRegimeStorage = localStorage.getItem('regime utilisateur');

    const co = localStorage.getItem('connexion');

    const handleDeconnexion = () => {
        localStorage.removeItem('connexion');
        localStorage.removeItem('pseudo utilisateur');
        localStorage.removeItem('boutton admin');
        localStorage.removeItem('regime utilisateur');
        localStorage.removeItem('filteredMeals')
        navigate('/');
    }

    return (
        <div className="navigation">
            <ul>
                {co === 'true' ?
                    <NavLink to={`/accueil/${userPseudoStorage}/${userButtonAdminStorage}/${userRegimeStorage}`}>
                        <li>Accueil</li>
                    </NavLink>
                    :
                    <NavLink to={'/accueil'}>
                        <li>Accueil</li>
                    </NavLink>
                }

                <NavLink to="/contact">
                    <li>Contact</li>
                </NavLink>

                <NavLink to="/politique-confidentialite">
                    <li>Politique de confidentialité</li>
                </NavLink>

                <NavLink to="/mentions-legales">
                    <li>Mentions légales</li>
                </NavLink>

                {co === 'true' ?
                    <button className="deco" onClick={handleDeconnexion}>Se déconnecter</button>
                    :
                    <button className="seco" onClick={handleDeconnexion}>Se connecter</button>
                }

            </ul>
        </div>
    );
};

export default Navigation;