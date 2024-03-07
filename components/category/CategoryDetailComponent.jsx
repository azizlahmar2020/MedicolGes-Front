import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryDetailComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (selectedCategoryId) {
        try {
          const response = await axios.get(`http://localhost:3001/categories/${selectedCategoryId}`);
          setCategoryDetails(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de la catégorie:', error);
        }
      }
    };

    fetchCategoryDetails();
  }, [selectedCategoryId]);

  const handleCategorySelection = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleDeleteCategory = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await axios.delete(`http://localhost:3001/categories/${selectedCategoryId}`);
        console.log('Catégorie supprimée avec succès');
        // Vous pouvez également mettre à jour l'état des catégories ici si nécessaire
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Choisir une catégorie :</h2>
      <ul className="list-group mb-3">
        {categories.map(category => (
          <li key={category._id} className="list-group-item">
            <button className="btn btn-link" onClick={() => handleCategorySelection(category._id)}>{category.category_name}</button>
          </li>
        ))}
      </ul>

      <div>
        <h2>Détails de la catégorie sélectionnée :</h2>
        {categoryDetails ? (
          <div>
            <p>ID: {categoryDetails._id}</p>
            <p>Nom: {categoryDetails.category_name}</p>
            {/* Autres détails de la catégorie */}
            <button className="btn btn-danger" onClick={handleDeleteCategory}>Supprimer la catégorie</button>
          </div>
        ) : (
          <p>Veuillez sélectionner une catégorie pour afficher ses détails.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailComponent;
