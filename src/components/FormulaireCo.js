import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormulaireCo = ({ onLogin }) => {
    const [pseudo, setPseudo] = useState(localStorage.getItem('pseudo utilisateur') || '');
    const [motDePasse, setMotDePasse] = useState('');
    const [email, setEmail] = useState('');
    const [regime, setRegime] = useState(localStorage.getItem('regime utilisateur') || '');
    const [estConnecte, setEstConnecte] = useState('false');
    const [action, setAction] = useState('Se connecter');
    const [regimes, setRegimes] = useState([]);
    const [buttonAdmin, setButtonAdmin] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('connexion', estConnecte);
        localStorage.setItem('pseudo utilisateur', pseudo);
        localStorage.setItem('regime utilisateur', regime);
        localStorage.setItem('boutton admin', buttonAdmin);
        localStorage.setItem('liste regime', regimes);
    }, [estConnecte]);


    const handleConnexion = (e) => {
        e.preventDefault();
        onLogin(pseudo, regime, buttonAdmin);
    };


    useEffect(() => {
        // la fonction pour récupérer les régimes à partir de l'URL/API
        const fetchRegimes = async () => {
            const apiKey = '3920762e722a470d8689313132c0bae4';
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=5&apiKey=${apiKey}`);
                const regimesUniques = new Set();
                response.data.results.forEach(item => {
                    item.diets.forEach(diet => {
                        regimesUniques.add(diet);
                    });
                });
                setRegimes(Array.from(regimesUniques));
            } catch (error) {
                console.error("Erreur lors de la récupération des régimes", error);
            }
        };

        fetchRegimes();
    }, []);


    return (
        <>
            <div>
                <div className="conteneur-principal">
                    <div className="formulaire-connexion">
                        <form onSubmit={handleConnexion}>
                            <input
                                type="text"
                                name="pseudo"
                                id="pseudo"
                                placeholder="Votre pseudo"
                                required
                                value={pseudo}
                                onChange={(e) => setPseudo(e.target.value)}
                            />
                            <input
                                type="password"
                                name="motdepasse"
                                id="motdepasse"
                                placeholder="Votre mot de passe"
                                required
                                value={motDePasse}
                                onChange={(e) => setMotDePasse(e.target.value)}
                            />
                            {action === "Se connecter" ? <div></div> : <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Votre email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />}
                            {/*{action === "Se connecter" ? <div></div> : */}<div className="choixRegime">
                                <select
                                    name="regime"
                                    //required
                                    value={regime}
                                    onChange={(e) => setRegime(e.target.value)} /* setRegime(e.target.value) :
                        pour changer la valeur de régime */
                                >
                                    <option value="">Veuillez choisir votre type de régime</option>
                                    {regimes.map((regimeOption, index) => (
                                        <option key={index} value={regimeOption}>
                                            {regimeOption}
                                        </option>
                                    ))}
                                </select>
                            </div>{/*}*/}

                            <div className="spanAdmin">
                                <span>Se connecter en tant qu'admin ?</span>
                            </div>

                            <div className="containerButtonAdmin">
                                <label htmlFor="buttonAdmin">Oui</label>
                                <input
                                    type="radio"
                                    name="buttonAdmin"
                                    id="buttonAdmin"
                                    required
                                    value={buttonAdmin}
                                    onChange={(e) => setButtonAdmin('admin')}
                                />
                                <label htmlFor="buttonAdmin">Non</label>
                                <input
                                    type="radio"
                                    name="buttonAdmin"
                                    id="buttonAdmin"
                                    required
                                    value={buttonAdmin}
                                    onChange={(e) => setButtonAdmin('user')}
                                />
                            </div>

                            <button type="submit" onClick={() => setEstConnecte('true')}>{action}</button>

                            <div className="connexionOuInscription">
                                {action === "Se connecter" ? (
                                    <span onClick={() => setAction("S'inscrire")}>Je n'ai pas de compte</span>
                                ) : (
                                    <span onClick={() => setAction("Se connecter")}>J'ai déjà un compte</span>
                                )}
                            </div>
                            <span className="pasDeCompte" onClick={() => (navigate('/accueil'), window.location.reload())}>Je continue sans compte</span>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};

export default FormulaireCo;