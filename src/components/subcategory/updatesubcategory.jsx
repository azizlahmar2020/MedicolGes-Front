import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Subcategory.css';
import { Link } from 'react-router-dom';
import Sidebar from '../backend/sidebar'; 

const UpdateSubcategoryComponent = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState('');

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

  const handleSubcategorySelection = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setUpdatedSubcategoryName(subcategory.subcategory_name);
  };

  const handleUpdateSubcategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3001/subcategories/${selectedSubcategory._id}`, { subcategory_name: updatedSubcategoryName });
      console.log('Sous-catégorie mise à jour avec succès:', response.data);
      alert('La sous-catégorie a été mise à jour avec succès.'); // Afficher une alerte de succès
      window.location.reload(); // Actualiser la page
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la sous-catégorie:', error);
      // Gérer les erreurs en cas d'échec de la mise à jour
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className="mt-5">Choisir une sous-catégorie à mettre à jour :</h2>
          <ul className="list-group mb-3 mt-5">
            {subcategories.map(subcategory => (
              <li key={subcategory._id} className="list-group-item">
                <button className="btn btn-link" onClick={() => handleSubcategorySelection(subcategory)}>{subcategory.subcategory_name}</button>
              </li>
            ))}
          </ul>

          {selectedSubcategory && (
            <div>
              <h3>Mettre à jour la sous-catégorie :</h3>
              <form onSubmit={handleUpdateSubcategory}>
                <div className="mb-3">
                  <label className="form-label">Nouveau nom de sous-catégorie :</label>
                  <input className="form-control" type="text" value={updatedSubcategoryName} onChange={(e) => setUpdatedSubcategoryName(e.target.value)} />
                </div>
                <button style={{ backgroundColor : 'gray'}} className="btn btn-secondary ms-2 mb-5" type="submit">Mettre à jour</button>
              </form>
            </div>
          )}

          {/* Bouton pour retourner à /dashboard */}
          <Link to="/dashboard" className="btn btn-secondary me-3">Retourner à Dashboard</Link>

          {/* Bouton pour retourner à /SubcategoryDetail */}
          <Link to="/SubcategoryDetail" className="btn btn-secondary">Retourner à SubcategoryDetail</Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubcategoryComponent;
