import React from 'react';
import Navigation from '../components/Navigation';
import SectionAPropos from '../components/SectionAPropos';
import SectionMesServices from '../components/SectionMesServices';
import AjouterRecetteAdmin from '../components/AjouterRecetteAdmin';

const Accueil = () => {

    const co = localStorage.getItem("connexion");

    return (
        <div>
            <Navigation />
            <h1>Accueil</h1>
            <h2>Connecté : {co}</h2>

            <AjouterRecetteAdmin />

            <SectionAPropos />
            <SectionMesServices />
        </div>
    );
};

export default Accueil;