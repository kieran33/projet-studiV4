import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecetteData = ({ regime }) => {
    const [meals, setMeals] = useState([]);
    const apiKey = '3920762e722a470d8689313132c0bae4'; // Replace with your Spoonacular API key


    useEffect(() => {
        const fetchMeals = async () => {
            try {
                // Vérifiez d'abord si "filteredMeals" existe dans le localStorage
                const filteredMealsData = localStorage.getItem('filteredMeals');
                if (filteredMealsData) {
                    // Si "filteredMeals" existe, utilisez-le au lieu de faire une requête à l'API
                    const filteredMeals = JSON.parse(filteredMealsData);
                    setMeals(filteredMeals);
                } else if (filteredMealsData == undefined) {
                    // Si "filteredMeals" n'existe pas, faites une requête à l'API pour obtenir les recettes
                    let url = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=10&apiKey=${apiKey}`;
                    if (regime) {
                        url += `&diet=${regime}`;
                    }
                    const response = await axios.get(url);
                    setMeals(response.data.results);

                    // Mise en localStorage
                    localStorage.setItem('filteredMeals', JSON.stringify(response.data.results));
                }
            } catch (error) {
                console.error('Error fetching meal data:', error);
            }
        };

        fetchMeals();
    }, [regime]);

    const addRecetteToFiltredMeals = (newRecette) => {
        setMeals((prevMeals) => [newRecette, ...prevMeals]);

        // Mettez à jour "filteredMeals" dans le localStorage avec la nouvelle recette ajoutée
        localStorage.setItem('filteredMeals', JSON.stringify([...meals, newRecette]));
    };

    const regimeUser = localStorage.getItem('regime utilisateur');
    const co = localStorage.getItem('connexion');

    return (
        <>
            <div id='listePlat'>
                {meals.map((meal, index) => (
                    <div>
                        {co === 'true' ?
                            <div>
                                {
                                    meal.diets.includes(regimeUser) ?
                                        < div className='Plat' key={index} >
                                            < Link to={`/recette/${meal.id}`}> {/* Lien vers la page de détails */}
                                                <p>Recette numéro : {meal.id}</p>
                                                <p>Titre : {meal.title}</p>
                                                <p>Type de régime : {meal.diets?.join(', ')}</p>
                                                <img src={meal.image} />
                                            </Link>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            :
                            < div className='Plat' key={index} >
                                < Link to={`/recette/${meal.id}`}> {/* Lien vers la page de détails */}
                                    <p>Recette numéro : {meal.id}</p>
                                    <p>Titre : {meal.title}</p>
                                    <p>Type de régime : {meal.diets?.join(', ')}</p>
                                    <img src={meal.image} />
                                </Link>
                            </div>
                        }
                    </div>
                ))
                }
            </div >
        </>
    );
};

export default RecetteData;