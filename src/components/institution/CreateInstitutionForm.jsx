import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Institution.css';
import Sidebar from '../backend/sidebar'; // Importez le composant Sidebar
import institutionImage from '../../assets/images/institutionImage.jpg'; // Importez votre image

const CreateInstitutionForm = () => {
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/institutions', {
        address: address,
        category: category,
        subcategory: subcategory
      });
  
      console.log('Institution créée avec succès:', response.data);
      // Afficher l'alerte
      alert('Institution créée avec succès!');
      // Rafraîchir la page après la création réussie
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création de l\'institution:', error);
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
          <div className="row">
            <div className="col-md-6 mt-5">
              <img src={institutionImage} alt="Institution" className="img-fluid mt-5" />
            </div>
            <div className="col-md-6 mt-5">
              <h2 className=" mt-5">Créer une nouvelle institution</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-5">
                  <label>Adresse:</label>
                  <input className="form-control mt-5" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group mt-5">
                  <label>Catégorie:</label>
                  <select className="form-control mt-5" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.category_name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-5">
                  <label>Sous-catégorie:</label>
                  <select className="form-control mt-5" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
                    <option value="">Sélectionner une sous-catégorie</option>
                    {subcategories.map(subcat => (
                      <option key={subcat._id} value={subcat._id}>{subcat.subcategory_name}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary d-flex  align-items-center mt-5" type="submit">Créer Institution</button>
                <div className="mt-3 d-inline-flex align-items-center">
                <Link to="/updateInstitution" className="btn btn-secondary d-flex  align-items-center mt-5">Aller à la mise à jour</Link>
                <Link to="/dashboard" className="btn btn-secondary mt-5">Retourner à Dashboard</Link>
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInstitutionForm;
