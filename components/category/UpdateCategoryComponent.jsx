import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateCategoryComponent = ({ categoryId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');

  useEffect(() => {
    // Récupérer toutes les catégories au chargement du composant
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setUpdatedCategoryName(category.category_name);
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.patch(`http://localhost:3001/categories/${selectedCategory._id}`, { category_name: updatedCategoryName });
      console.log('Catégorie mise à jour avec succès:', response.data);
      setUpdatedCategoryName('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
    }
  };

  return (
    <div className="container">
      <h2>Mettre à jour une catégorie :</h2>
      <div className="mb-3">
        <select className="form-select" value={selectedCategory} onChange={(e) => handleCategorySelection(JSON.parse(e.target.value))}>
          <option value="">Sélectionner une catégorie</option>
          {categories.map(category => (
            <option key={category._id} value={JSON.stringify(category)}>{category.category_name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" value={updatedCategoryName} onChange={(e) => setUpdatedCategoryName(e.target.value)} />
        <button className="btn btn-primary" onClick={handleUpdateCategory}>Mettre à jour</button>
      </div>
    </div>
  );
};

export default UpdateCategoryComponent;
