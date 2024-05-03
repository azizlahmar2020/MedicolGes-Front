import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Subcategory.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../backend/sidebar'; 

const UpdateSubcategoryComponent = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDeleteSubcategory = async () => {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3001/subcategories/${selectedSubcategory._id}`);
        alert('La sous-catégorie a été supprimée avec succès.');
        window.location.reload();
      } catch (error) {
        console.error('Erreur lors de la suppression de la sous-catégorie:', error);
        // Gérer les erreurs en cas d'échec de la suppression
      }
    }
  };

  // Filtrer les sous-catégories en fonction de la recherche
  const filteredSubcategories = subcategories.filter(subcategory =>
    subcategory.subcategory_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className="mt-5">Choisir une sous-catégorie à mettre à jour :</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Rechercher une sous-catégorie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Nom de la sous-catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubcategories.map(subcategory => (
                <tr key={subcategory._id}>
                  <td>{subcategory.subcategory_name}</td>
                  <td>
                    <button className="btn btn-link" onClick={() => handleSubcategorySelection(subcategory)}>
                      <FontAwesomeIcon icon={faEdit} /> Modifier
                    </button>
                    <button className="btn btn-link">
                      <FontAwesomeIcon icon={faInfoCircle} />  Détails
                    </button>
                    {(selectedSubcategory && filteredSubcategories.length > 0) && (
                      <button className="btn btn-link" onClick={handleDeleteSubcategory}>
                        <FontAwesomeIcon icon={faTrash} /> Supprimer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
          <Link to="/dashboard" className="btn btn-secondary me-3">Dashboard</Link>

          {/* Bouton pour retourner à /SubcategoryDetail */}
          <Link to="/createsubcategory" className="btn btn-secondary">Retourner </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubcategoryComponent;
