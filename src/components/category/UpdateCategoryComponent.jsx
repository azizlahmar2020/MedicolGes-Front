import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Category.css';
import Sidebar from '../backend/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const UpdateCategoryComponent = ({ categoryId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false); 

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory && isEditing) {
      setUpdatedCategoryName(selectedCategory.category_name);
    }
  }, [selectedCategory, isEditing]);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.patch(`http://localhost:3001/categories/${selectedCategory._id}`, { category_name: updatedCategoryName });
      console.log('Catégorie mise à jour avec succès:', response.data);
      setUpdatedCategoryName('');
      setIsEditing(false); 
      window.alert('Catégorie mise à jour avec succès !');
      // Rafraîchir les catégories après la modification
      fetchCategories();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const shouldDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:3001/categories/${categoryId}`);
        const updatedCategories = categories.filter(category => category._id !== categoryId);
        setCategories(updatedCategories);
        window.alert('Catégorie supprimée avec succès !');
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    }
  };

  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className="mt-5">Mettre à jour une catégorie :</h2>
          <div className="mb-3 mt-5">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-3 mt-5">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nom de la catégorie</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map(category => (
                  <tr key={category._id}>
                    <td>{isEditing && selectedCategory._id === category._id ? (
                      <input
                        type="text"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                      />
                    ) : category.category_name}</td>
                    <td>
                      {isEditing && selectedCategory._id === category._id ? (
                        <Button variant="success" onClick={handleUpdateCategory}>
                          <FontAwesomeIcon icon={faSave} /> Enregistrer
                        </Button>
                      ) : (
                        <>
                          <Link to={`/UpdateCategory `}>
                            <Button variant="info">
                              <FontAwesomeIcon icon={faInfoCircle} /> Détails
                            </Button>
                          </Link>
                          <Button variant="success" onClick={() => handleCategorySelection(category)}>
                            <FontAwesomeIcon icon={faEdit} /> Modifier
                          </Button>
                          <button className="btn btn-danger mr-2" onClick={() => handleDeleteCategory(category._id)}>
                            <FontAwesomeIcon icon={faTrash} /> Supprimer
                          </button>
                          
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/CreateCategory" className="btn btn-primary">retourner</Link>
          <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryComponent;
