import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Subcategory.css';
import { Link } from 'react-router-dom';
import Sidebar from '../backend/sidebar'; 

const SubcategoryDetailComponent = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [refresh, setRefresh] = useState(false); // État de rafraîchissement

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
  }, [refresh]); // Rafraîchir lorsque l'état de rafraîchissement change

  const handleSubcategorySelection = async (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleDeleteSubcategory = async () => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette sous-catégorie ?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/subcategories/${selectedSubcategory._id}`);
        console.log('Sous-catégorie supprimée avec succès');
        setRefresh(!refresh); // Modifier l'état de rafraîchissement pour déclencher un rafraîchissement
      } catch (error) {
        console.error('Erreur lors de la suppression de la sous-catégorie:', error);
      }
    } else {
      console.log("Suppression annulée");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="mt-5 mb-4">Choisir une sous-catégorie pour afficher les détails :</h2>
          <ul className="list-group mb-4">
            {subcategories.map(subcategory => (
              <li key={subcategory._id} className="list-group-item">
                <button className="btn btn-link text-dark" onClick={() => handleSubcategorySelection(subcategory)}>
                  {subcategory.subcategory_name}
                </button>
              </li>
            ))}
            <p className="mt-5 mb-4">Nombre total de sous-catégories : {subcategories.length}</p> {/* Affichage du nombre total de sous-catégories */}
          </ul>

          {selectedSubcategory && (
            <div>
              <h3>Détails de la sous-catégorie :</h3>
              <p>ID: {selectedSubcategory._id}</p>
              <p>Nom: {selectedSubcategory.subcategory_name}</p>
              <button className="btn btn-danger ms-2" style={{ backgroundColor: 'red' }} onClick={handleDeleteSubcategory}>Supprimer la sous-catégorie</button>
              <Link to="/updatesubcategory" style={{ backgroundColor: 'yellow' }} className="btn btn-secondary ms-2">Modifier la sous-catégorie</Link>
            </div>
          )}

          <div className="mt-4">
            <Link to="/dashboard" className="btn btn-secondary me-3">Retourner à Dashboard</Link>
            <Link to="/createsubcategory" className="btn btn-success">Créer une sous-catégorie</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryDetailComponent;
