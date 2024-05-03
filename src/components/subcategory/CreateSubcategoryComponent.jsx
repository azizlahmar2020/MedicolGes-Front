import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Subcategory.css';
import { Link } from 'react-router-dom';
import Sidebar from '../backend/sidebar'; 

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
      alert('La sous-catégorie a été créée avec succès.'); // Afficher une alerte de succès
      window.location.reload(); // Rafraîchir la page
    } catch (error) {
      console.error('Erreur lors de la création de la sous-catégorie:', error);
      // Traitez les erreurs comme nécessaire
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className="mt-5">Créer une nouvelle sous-catégorie :</h2>
          <div className="mb-5 mt-5">
            <label className="form-label mb-5">Nom de la sous-catégorie :</label>
            <input className="form-control mb-5" type="text" value={subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} />
          </div>
          <div className="mb-3 mt-5">
            <label className="form-label mb-5">ID de la catégorie parente :</label>
            <select className="form-control mb-5" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Sélectionner une catégorie</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.category_name}</option>
              ))}
            </select>
          </div>
          <div className=" d-flex  align-items-center mt-5">
            <button className="btn btn-success d-flex  align-items-center me-2" onClick={handleCreateSubcategory}>Créer</button>
            <Link to="/updatesubCategory" className="btn btn-secondary d-flex  align-items-center">Liste des Subcategories</Link>
            <Link to="/dashboard" className="btn btn-secondary d-flex  align-items-center">Retour à Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubcategoryComponent;
