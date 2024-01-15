import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecetteData from '../components/RecetteData';
import Modal from 'react-modal';
import axios from 'axios';


const AjouterRecetteAdmin = () => {

    const { regime } = useParams();

    const [recettes, setRecettes] = useState([]);
    const [newRecette, setNewRecette] = useState(getDefaultRecette()); // getDefaultRecette : la recette par défaut définie précedemment
    // controler si le modal est ouvert ou pas
    const [isModalOpen, setIsModalOpen] = useState(false);

    const buttonAdmin = localStorage.getItem('boutton admin');

    const [regimes, setRegimes] = useState([]);
    const [ajoutRegime, setAjoutRegime] = useState('');

    const [rangeValue, setRangeValue] = useState(20);


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


    useEffect(() => {
        const existingMeals = JSON.parse(localStorage.getItem('filteredMeals')) || [];
        setRecettes(existingMeals);
    }, []);

    function getNextRecetteId() {
        const existingMeals = JSON.parse(localStorage.getItem('filteredMeals')) || [];
        const lastRecette = existingMeals[existingMeals.length - 1];
        return lastRecette ? lastRecette.id + 1 : 1;
    }

    // Fonction pour obtenir la recette par défaut
    function getDefaultRecette() {
        return {
            title: 'Par exemple Red Kidney Bean Jambalaya',
            diets: [],
            aggregateLikes: 26,
            analyzedInstructions: [{ name: '' }],
            cheap: false,
            cookingMinutes: -1,
            creditsText: 'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
            cuisines: [],
            dairyFree: true,
            dishTypes: ['side dish'],
            gaps: 'no',
            glutenFree: false,
            healthScore: 100,
            id: getNextRecetteId(), // Utilisez le prochain ID disponible
            image: 'https://spoonacular.com/recipeImages/640941-312x231.jpg',
            imageType: 'jpg',
            license: 'CC BY 3.0',
            lowFodmap: false,
            occasions: [],
            preparationMinutes: -1,
            pricePerServing: 169.38,
            readyInMinutes: 30,
            servings: 4,
            sourceName: 'Foodista',
            sourceUrl: 'http://www.foodista.com/recipe/LKJMG5RP/crunchy-brussels-sprouts',
            spoonacularScore: 98.37364196777344,
            spoonacularSourceUrl: 'https://spoonacular.com/crunchy-brussels-sprouts-side-dish-640941',
            summary: 'The recipe Crunchy Brussels Sprouts Side Dish can be made in about 30 minutes',
            sustainable: false,
            vegan: false,
            vegetarian: false,
            veryHealthy: false,
            veryPopular: false,
            weightWatcherSmartPoints: 0,
        };
    }

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = value;
        setNewRecette({
            ...newRecette,
            [name]: newValue,
        });
    };

    const handleAddRecette = () => {
        // Récupérer les données du localstorage
        const existingMeals = JSON.parse(localStorage.getItem('filteredMeals')) || [];
        // les recettes mises à jour
        const updatedMeals = [...existingMeals, newRecette];
        // Mettre à jour les recettes dans le localstorage
        localStorage.setItem('filteredMeals', JSON.stringify(updatedMeals));
        // mettre à jour l'affichage
        setRecettes(updatedMeals); // Mettez à jour la liste des recettes dans l'état

        // reprendre la valeur par défaut
        setNewRecette(getDefaultRecette());
        setIsModalOpen(false);
        window.location.reload();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            {buttonAdmin === 'admin' ?
                <div>
                    <h2>Interface admin</h2>
                    <button onClick={openModal}>Ajouter une recette</button>
                </div>
                :
                <div></div>
            }

            <RecetteData regime={regime} /*recettes={recettes */ />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Ajouter une recette"
            >
                <h2>Ajouter une recette</h2>
                <form>
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={newRecette.title}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="ajouteRegime">Types de régime :</label>
                    <div>
                        <select
                            name="ajoutRegime"
                            required
                            value={ajoutRegime}
                            onChange={(e) => setAjoutRegime(e.target.value)}
                        /* setRegime(e.target.value) : pour changer la valeur de régime */

                        >
                            <option value="">Veuillez choisir votre type de régime</option>
                            {regimes.map((regimeOption, index) => (
                                <option key={index} value={regimeOption}>
                                    {regimeOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label htmlFor="tempsPreparation">Temps de préparation : {rangeValue} min</label>
                    <input
                        type="range"
                        min="1"
                        max="120"
                        defaultValue={rangeValue}
                        onChange={(e) => setRangeValue(e.target.value)}
                    />

                    {/* Ajoutez d'autres cases à cocher pour d'autres régimes alimentaires */}

                    <button type="button" onClick={closeModal}>
                        Annuler
                    </button>
                    <button type="button" onClick={handleAddRecette}>
                        Ajouter
                    </button>
                </form>
            </Modal>
        </div >
    );
};

export default AjouterRecetteAdmin;