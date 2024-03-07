import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importez XLSX depuis la bibliothèque 'xlsx'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateInstitutionForm = () => {
  const [institutions, setInstitutions] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedSubcategory, setUpdatedSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/institutions');
        setInstitutions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des institutions:', error);
      }
    };
    if (showList) {
      fetchInstitutions();
    }
  }, [showList]);

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

  const handleUpdateButtonClick = (institution) => {
    setSelectedInstitution(institution);
    setUpdatedAddress(institution.address);
    setUpdatedCategory(institution.category);
    setUpdatedSubcategory(institution.subcategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        address: updatedAddress,
        category: updatedCategory,
        subcategory: updatedSubcategory
      };

      await axios.patch(`http://localhost:3001/institutions/${selectedInstitution._id}`, updatedData);
      console.log('Institution mise à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'institution:', error);
    }
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    const data = institutions.map(institution => ({
      Address: institution.address,
      Category: institution.category,
      Subcategory: institution.subcategory
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Institutions');

    XLSX.writeFile(workbook, 'institutions.xlsx');
  };

  return (
    <div className="container">
      <h2>Choisir une institution à mettre à jour :</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowList(true)}>Afficher la liste des institutions</button>
      {showList && (
        <ul className="list-group">
          {institutions.map(institution => (
            <li key={institution._id} className="list-group-item">
              <div>
                <strong>Adresse:</strong> {institution.address}
              </div>
              <button className="btn btn-secondary" onClick={() => handleUpdateButtonClick(institution)}>Update</button>
            </li>
          ))}
        </ul>
      )}

      {selectedInstitution && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nouvelle adresse:</label>
            <input className="form-control" type="text" value={updatedAddress} onChange={(e) => setUpdatedAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nouvelle catégorie:</label>
            <select className="form-control" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.category_name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Nouvelle sous-catégorie:</label>
            <select className="form-control" value={updatedSubcategory} onChange={(e) => setUpdatedSubcategory(e.target.value)}>
              <option value="">Sélectionner une sous-catégorie</option>
              {subcategories.map(subcat => (
                <option key={subcat._id} value={subcat._id}>{subcat.subcategory_name}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">Mettre à jour l'institution</button>
        </form>
      )}

      {/* Ajoutez le bouton d'exportation vers Excel */}
      <button className="btn btn-success" onClick={exportToExcel}>Exporter vers Excel</button>

      {/* Ajoutez un lien vers SingleInstitutionDetail */}
      <Link to="/singleInstitution" className="btn btn-primary">detail d'institution unique</Link>
    </div>
  );
};

export default UpdateInstitutionForm;
