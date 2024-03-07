import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const CreateCategoryComponent = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleCreateCategory = async () => {
    try {
      // Envoyer une requête POST vers l'endpoint de création de catégorie
      const response = await axios.post('http://localhost:3001/categories', { category_name: categoryName });
      
      // Si la création est réussie, mettre à jour l'état ou afficher un message de succès
      console.log('Catégorie créée avec succès:', response.data);

      // Réinitialiser le champ de saisie
      setCategoryName('');
    } catch (error) {
      // Gérer les erreurs en cas d'échec de la création
      console.error('Erreur lors de la création de la catégorie:', error);
    }
  };

  return (
    <div className="container">
      <h2>Créer une nouvelle catégorie :</h2>
      <div className="input-group mb-3">
        <input type="text" className="form-control" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        <button className="btn btn-primary" type="button" onClick={handleCreateCategory}>Créer</button>
      </div>
    </div>
  );
};

export default CreateCategoryComponent;
