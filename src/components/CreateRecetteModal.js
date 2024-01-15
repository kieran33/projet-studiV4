import React, { useState } from 'react';

const CreateRecetteModal = ({ onClose }) => {
    const [newRecette, setNewRecette] = useState({ title: '', diet: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewRecette({ ...newRecette, [name]: value });
    };

    const handleCreateRecette = () => {
        // You can add the logic to handle the creation of the recipe here.
        // For this example, we'll just log the new recipe data.
        console.log('New Recipe:', newRecette);

        // Close the modal
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Créer une nouvelle recette</h2>
                <form>
                    <label>Titre:</label>
                    <input
                        type="text"
                        name="title"
                        value={newRecette.title}
                        onChange={handleInputChange}
                    />
                    <label>Type de régime:</label>
                    <input
                        type="text"
                        name="diet"
                        value={newRecette.diet}
                        onChange={handleInputChange}
                    />
                    <button type="button" onClick={handleCreateRecette}>
                        Enregistrer
                    </button>
                    <button type="button" onClick={onClose}>
                        Annuler
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecetteModal;