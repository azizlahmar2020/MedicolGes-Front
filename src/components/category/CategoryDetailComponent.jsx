import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Category.css';
import { Link } from 'react-router-dom';
import Sidebar from '../backend/sidebar'; 

const CategoryDetailComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [categoryStats, setCategoryStats] = useState({ totalCategories: 0 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/categories`);
        setCategories(response.data);
        // Mettre à jour les statistiques
        setCategoryStats({ totalCategories: response.data.length });
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
        // Mettre à jour les statistiques après la suppression
        setCategoryStats({ totalCategories: categoryStats.totalCategories - 1 });
        // Rafraîchir la page après la suppression réussie
        window.location.reload();
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className=" mt-5">Choisir une catégorie :</h2>
          <ul className="list-group mb-3 mt-5">
            {categories.map(category => (
              <li key={category._id} className="list-group-item">
                <button className="btn btn-link" onClick={() => handleCategorySelection(category._id)}>{category.category_name}</button>
              </li>
            ))}
          </ul>

          <div>
            <p className=" mt-5">Nombre total de catégories : {categoryStats.totalCategories}</p>
            {/* Autres statistiques peuvent être affichées ici */}
          </div>

          <div>
            <h2 className=" mt-5">Détails de la catégorie sélectionnée :</h2>
            {categoryDetails ? (
              <div>
                <p className=" mt-5">ID: {categoryDetails._id}</p>
                <p>Nom: {categoryDetails.category_name}</p>
                {/* Autres détails de la catégorie */}
                <button style={{ backgroundColor: 'red' }} className="btn btn-secondary ms-2" onClick={handleDeleteCategory}>Supprimer la catégorie</button>
                <Link to="/UpdateCategory" style={{ backgroundColor: 'yellow' }} className="btn btn-secondary ml-3">Modifier la catégorie</Link>
                <Link to="/createCategory"  className="btn btn-success ml-3">cree une catégorie</Link>
                <Link to="/dashboard" className="btn btn-secondary">Retour à Dashboard</Link>

              </div>
            ) : (
              <p>Veuillez sélectionner une catégorie pour afficher ses détails.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailComponent;
