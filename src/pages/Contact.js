import React from 'react';
import Navigation from '../components/Navigation';

const Contact = () => {

    const co = localStorage.getItem("connexion");

    return (
        <div>
            <Navigation />

            <h2>Connecté : {co}</h2>

            <form id="formulaireContact">
                <legend>Une question ? Contactez-nous</legend>
                <input type="text" name="nom" id="nom" placeholder="Votre nom"></input>
                <label htmlFor="nom"></label>

                <input type="text" name="prenom" id="prenom" placeholder="Votre prenom"></input>
                <label htmlFor="prenom"></label>

                <input type="email" name="email" id="email" placeholder="Votre email"></input>
                <label htmlFor="email"></label>

                <input type="tel" name="phone" id="phone" placeholder="Votre numéro de téléphone"></input>
                <label htmlFor="phone"></label>

                <textarea name="question" id="question" cols="100" rows="10" placeholder="Votre commentaire"></textarea>

                <button type="submit" value="Envoyer">Envoyer</button>
            </form>
        </div>
    );
};

export default Contact;