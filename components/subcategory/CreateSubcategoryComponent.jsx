import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateSubcategoryComponent = () => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

  const handleCreateSubcategory = async () => {
    try {
      const response = await axios.post('http://localhost:3001/subcategories', { subcategory_name: subcategoryName, category_id: categoryId });
      console.log('Nouvelle sous-catégorie créée avec succès:', response.data);
      // Vous pouvez mettre à jour l'état ou afficher un message de succès ici
    } catch (error) {
      console.error('Erreur lors de la création de la sous-catégorie:', error);
      // Traitez les erreurs comme nécessaire
    }
  };

  return (
    <div className="container">
      <h2>Créer une nouvelle sous-catégorie :</h2>
      <div className="mb-3">
        <label className="form-label">Nom de la sous-catégorie :</label>
        <input className="form-control" type="text" value={subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">ID de la catégorie parente :</label>
        <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Sélectionner une catégorie</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.category_name}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleCreateSubcategory}>Créer</button>
    </div>
  );
};

export default CreateSubcategoryComponent;
