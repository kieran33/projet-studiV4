import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';

const DetailRecette = () => {
    const { id } = useParams(); // Obtenez l'ID de la recette depuis l'URL
    const [recette, setRecette] = useState({});
    const [listeId, setListeId] = useState([]);

    const boutonAdmin = localStorage.getItem('boutton admin');


    useEffect(() => {
        // Récupérez les recettes actuelles du localStorage
        const existingMeals = JSON.parse(localStorage.getItem('filteredMeals')) || [];
        setListeId(existingMeals);

        // Trouvez la recette avec l'ID correspondant
        const selectedRecette = existingMeals.find(meal => meal.id === parseInt(id));

        if (selectedRecette) {
            setRecette(selectedRecette);
        } else {
            console.error(`Recette avec l'ID ${id} introuvable dans le localStorage`);
        }
    }, [id]);


    const handleRemoveRecette = () => {

        const tableauListe = Object.keys(listeId);

        tableauListe.map(function (meal) {
            console.log([listeId[meal].id]);
            { listeId[meal].id == id ? console.log('même id') : console.log('pas le même id') }
        });
    }

    const handleModifRecette = () => {
        alert('modif')
    }


    return (
        <div>
            <Navigation />
            {boutonAdmin === "admin" ?
                <div className="conteneur-principal">
                    <div className="formulaire-connexion">
                        <h2>Détails de la recette</h2>
                        <p>Recette ID : {recette.id}</p>
                        <p>Titre : {recette.title}</p>
                        <p>Type de régime : {recette.diets?.join(', ')}</p>
                        <p>Temps de préparation : {recette.readyInMinutes} minutes</p>
                        <button type="button" onClick={handleModifRecette}>Modifier</button>
                        <button type="button" onClick={handleRemoveRecette}>Supprimer</button>
                    </div>
                </div>
                :
                <div className="conteneur-principal">
                    <div className="formulaire-connexion">
                        <h2>Détails de la recette</h2>
                        <p>Recette ID : {recette.id}</p>
                        <p>Titre : {recette.title}</p>
                        <p>Type de régime : {recette.diets?.join(', ')}</p>
                        <p>Temps de préparation : {recette.readyInMinutes} minutes</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default DetailRecette;