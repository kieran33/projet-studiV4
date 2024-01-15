import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Error from './pages/Error';
import PolitiqueConfiden from './pages/PolitiqueConfiden';
import MentionsLegales from './pages/MentionsLegales';
import Contact from './pages/Contact';
import DetailRecette from './pages/DetailRecette'; // Importez le composant de détails
import "./App.css";
import SeConnecter from './pages/SeConnecter';

const App = () => {

  const co = localStorage.getItem('connexion');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SeConnecter />} />
        {co === 'true' ?
          <Route path="/accueil/:pseudo/:buttonAdmin/:regime" element={<Accueil />} />
          :
          <Route path="/accueil" element={<Accueil />} />
        }
        <Route path="/recette/:id" element={<DetailRecette />} /> {/* Nouvelle route pour les détails de la recette */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfiden />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        {/*path="*" fonctionne si jamais l'url ne correspond à rien de connu*/}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;