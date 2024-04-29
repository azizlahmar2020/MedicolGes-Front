import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Category.css';
import Sidebar from '../backend/sidebar'; 

const CreateCategoryComponent = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post('http://localhost:3001/categories', { category_name: categoryName });
      console.log('Catégorie créée avec succès:', response.data);
      setCategoryName('');
      // Afficher une alerte pour indiquer le succès de l'ajout
      window.alert('Catégorie ajoutée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className=" mt-5">Créer une nouvelle catégorie :</h2>
          <div className="input-group mb-5 mt-5">
          <input type="text" className="form-control mt-5" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          <button className="btn btn-success mt-5" type="button" onClick={handleCreateCategory} style={{ height: 'calc(2.25rem + 12px)' }}>Créer</button>
        </div>
          <Link to="/dashboard" className="btn btn-secondary mr-2">Retour au dashboard</Link>
          <Link to="/UpdateCategory" className="btn btn-secondary">voir la liste des categories</Link>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryComponent;
