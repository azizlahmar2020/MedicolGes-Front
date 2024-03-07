import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubcategoryDetailComponent = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/subcategories');
        setSubcategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleSubcategorySelection = async (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleDeleteSubcategory = async () => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette sous-catégorie ?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/subcategories/${selectedSubcategory._id}`);
        console.log('Sous-catégorie supprimée avec succès');
        // Mettre à jour l'état ou afficher un message de succès ici
      } catch (error) {
        console.error('Erreur lors de la suppression de la sous-catégorie:', error);
        // Gérer les erreurs en cas d'échec de la suppression
      }
    } else {
      console.log("Suppression annulée");
      // Gérer l'annulation de la suppression ici
    }
  };

  return (
    <div className="container">
      <h2>Choisir une sous-catégorie pour afficher les détails :</h2>
      <ul className="list-group mb-3">
        {subcategories.map(subcategory => (
          <li key={subcategory._id} className="list-group-item">
            <button className="btn btn-link" onClick={() => handleSubcategorySelection(subcategory)}>{subcategory.subcategory_name}</button>
          </li>
        ))}
      </ul>

      {selectedSubcategory && (
        <div>
          <h3>Détails de la sous-catégorie :</h3>
          <p>ID: {selectedSubcategory._id}</p>
          <p>Nom: {selectedSubcategory.subcategory_name}</p>
          {/* Afficher d'autres détails de la sous-catégorie ici */}
          <button className="btn btn-danger" onClick={handleDeleteSubcategory}>Supprimer la sous-catégorie</button>
        </div>
      )}
    </div>
  );
};

export default SubcategoryDetailComponent;
