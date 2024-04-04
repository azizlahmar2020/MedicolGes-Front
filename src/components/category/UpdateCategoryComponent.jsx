import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Category.css';
import Sidebar from '../backend/sidebar';

const UpdateCategoryComponent = ({ categoryId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setUpdatedCategoryName(category.category_name);
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.patch(`http://localhost:3001/categories/${selectedCategory._id}`, { category_name: updatedCategoryName });
      console.log('Catégorie mise à jour avec succès:', response.data);
      setUpdatedCategoryName('');
      // Afficher une alerte pour indiquer le succès de la mise à jour
      window.alert('Catégorie mise à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
    }
  };
  

  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0"> {/* Ajoutez la classe p-0 pour supprimer les marges */}
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className=" mt-5">Mettre à jour une catégorie :</h2>
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
            <select className="form-select mt-5" value={selectedCategory} onChange={(e) => handleCategorySelection(JSON.parse(e.target.value))}>
              <option value="">Sélectionner une catégorie</option>
              {filteredCategories.map(category => (
                <option key={category._id} value={JSON.stringify(category)}>{category.category_name}</option>
              ))}
            </select>
          </div>
          <div className="mb-5 mt-5">
            <input type="text" className="form-control mt-5" value={updatedCategoryName} onChange={(e) => setUpdatedCategoryName(e.target.value)} />
            <button  style={{ backgroundColor: 'gray' }} className="btn btn-secondary ml-3 mt-5" onClick={handleUpdateCategory}>Mettre à jour</button>
          </div>
          <Link to="/CategoryDetail" className="btn btn-secondary">Retour</Link>
          <Link to="/dashboard" className="btn btn-secondary">dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryComponent;
