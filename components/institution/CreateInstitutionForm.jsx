import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateInstitutionForm = () => {
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showForm, setShowForm] = useState(false); // État pour contrôler l'affichage du formulaire

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
      // Rafraîchir la page après la création réussie
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création de l\'institution:', error);
      // Traitez les erreurs comme nécessaire
    }
  };

  return (
    <div className="container">
      {!showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>Créer une nouvelle institution</button>
      )}
      {showForm && (
        <div>
          <h2>Créer une nouvelle institution</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Adresse:</label>
              <input className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Catégorie:</label>
              <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.category_name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Sous-catégorie:</label>
              <select className="form-control" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
                <option value="">Sélectionner une sous-catégorie</option>
                {subcategories.map(subcat => (
                  <option key={subcat._id} value={subcat._id}>{subcat.subcategory_name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" type="submit">Créer Institution</button>
            {/* Ajoutez un lien vers UpdateInstitutionForm */}
            <Link to="/updateInstitution" className="btn btn-primary ml-2">Aller à la mise à jour</Link>
          </form>
        </div>
        
      )}
    </div>
  );
};

export default CreateInstitutionForm;
