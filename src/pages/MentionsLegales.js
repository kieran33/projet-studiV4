import React from 'react';
import Navigation from '../components/Navigation';

const MentionsLegales = () => {

    const co = localStorage.getItem('connexion');

    return (
        <div>
            <Navigation />
            <div className="page-mentions-legales">
                <h1>Mentions légales</h1>
                <br></br>
                <h2>Connecté : {co}</h2>
                <div className="text-container">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at tortor non neque lobortis gravida. Proin accumsan, tellus scelerisque vestibulum semper, tellus nisi aliquet urna, a cursus nibh orci rutrum lorem. Nam ut leo cursus, blandit quam sed, rutrum sapien. Nam sit amet pharetra mi. Ut non lectus sit amet libero tempor tempor. Integer rhoncus aliquet faucibus. Ut lorem velit, semper molestie ante ac, elementum tincidunt mi. Donec finibus condimentum leo, in porta arcu porta id. Mauris mattis ipsum a elit dapibus, sed finibus tellus pretium. Sed bibendum urna non dictum porta. Phasellus sed nunc vitae nulla commodo mattis. Integer gravida risus vel sapien cursus iaculis vel tempus eros. Vivamus ut tincidunt lectus. </p>
                    <br></br>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at tortor non neque lobortis gravida. Proin accumsan, tellus scelerisque vestibulum semper, tellus nisi aliquet urna, a cursus nibh orci rutrum lorem. Nam ut leo cursus, blandit quam sed, rutrum sapien. Nam sit amet pharetra mi. Ut non lectus sit amet libero tempor tempor. Integer rhoncus aliquet faucibus. Ut lorem velit, semper molestie ante ac, elementum tincidunt mi. Donec finibus condimentum leo, in porta arcu porta id. Mauris mattis ipsum a elit dapibus, sed finibus tellus pretium. Sed bibendum urna non dictum porta. Phasellus sed nunc vitae nulla commodo mattis. Integer gravida risus vel sapien cursus iaculis vel tempus eros. Vivamus ut tincidunt lectus. </p>
                </div>
            </div>
        </div>
    );
};

export default MentionsLegales;