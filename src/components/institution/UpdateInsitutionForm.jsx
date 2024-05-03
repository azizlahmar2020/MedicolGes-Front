import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Institution.css';
import Sidebar from '../backend/sidebar'; // Importez le composant Sidebar

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
      window.alert('Institution mise à jour avec succès'); // Afficher une alerte
      window.location.reload(); // Rafraîchir la page après la mise à jour
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

  // Fonction pour importer depuis Excel
  const importFromExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Analysez les données Excel et effectuez les actions nécessaires
      console.log(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Gestionnaire de changement de fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromExcel(file);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className="mt-5">Choisir une institution à mettre à jour :</h2>
          {showList && (
            <div >
              <div className=" d-flex  align-items-center mt-5">
              <button className="btn btn-primary d-flex  align-items-center mt-3 " onClick={() => setShowList(false)}>Masquer la liste des institutions</button>
              <button className="btn btn-success d-flex  align-items-center mt-3" onClick={exportToExcel}>Exporter vers Excel</button>

              <Link to="/singleInstitution" className="btn btn-primary d-flex  align-items-center mt-3">Détail d'une institution unique</Link>
              </div>
              {/* Ajoutez le bouton d'importation */}
              <input type="file" className="form-control-file mt-3" accept=".xlsx, .xls" onChange={handleFileChange} />

              {/* Ajoutez un lien vers /dashboard */}
              <Link to="/dashboard" className="btn btn-secondary mt-3">Retour à Dashboard</Link>

              {/* Ajoutez un lien vers /createInstitution */}
              <Link to="/createInstitution" className="btn btn-secondary mt-3">Créer une institution</Link>
            </div>
          )}

          {!showList && (
            <button className="btn btn-success mb-3 mt-5" onClick={() => setShowList(true)}>Afficher la liste des institutions</button>
          )}

          {showList && (
            <ul className="list-group mt-5">
              {institutions.map(institution => (
                <li key={institution._id} className="list-group-item mt-5">
                  <div>
                    <strong>Adresse:</strong> {institution.address}
                  </div>
                  <button className="btn btn-success mt-5" onClick={() => handleUpdateButtonClick(institution)}>Update</button>
                </li>
              ))}
            </ul>
          )}

          {selectedInstitution && (
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-5">
                <label>Nouvelle adresse:</label>
                <input className="form-control mt-5" type="text" value={updatedAddress} onChange={(e) => setUpdatedAddress(e.target.value)} />
              </div>
              <div className="form-group mt-5">
                <label>Nouvelle catégorie:</label>
                <select className="form-control mt-5" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.category_name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-5">
                <label>Nouvelle sous-catégorie:</label>
                <select className="form-control mt-5" value={updatedSubcategory} onChange={(e) => setUpdatedSubcategory(e.target.value)}>
                  <option value="">Sélectionner une sous-catégorie</option>
                  {subcategories.map(subcat => (
                    <option key={subcat._id} value={subcat._id}>{subcat.subcategory_name}</option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary d-flex  align-items-center mt-5" type="submit">Mettre à jour l'institution</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateInstitutionForm;
