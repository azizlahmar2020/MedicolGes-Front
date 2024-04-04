import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../backend/sidebar'; // Importez le composant Sidebar

const SingleInstitutionDetail = () => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [institutionStats, setInstitutionStats] = useState({ totalInstitutions: 0 });

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/institutions');
        setInstitutions(response.data);
        // Mettre à jour les statistiques
        setInstitutionStats({ totalInstitutions: response.data.length });
      } catch (error) {
        console.error('Erreur lors de la récupération des institutions:', error);
      }
    };
    fetchInstitutions();
  }, []);

  useEffect(() => {
    const selected = institutions.find(inst => inst._id === selectedInstitutionId);
    setSelectedInstitution(selected);
  }, [selectedInstitutionId, institutions]);

  const handleInstitutionSelection = () => {
    setSearchTerm('');
  };

  const handleDeleteInstitution = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette institution ?')) {
      try {
        await axios.delete(`http://localhost:3001/institutions/${selectedInstitutionId}`);
        console.log('Institution supprimée avec succès');
        // Mettre à jour les statistiques après la suppression
        setInstitutionStats({ totalInstitutions: institutionStats.totalInstitutions - 1 });
        // Rafraîchir la page
        window.location.reload();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'institution:', error);
      }
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar /> 
        </div>
        <div className="col-md-9 mt-5"> 
          <h2 className=" mt-5">Choisir une institution :</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Rechercher une institution"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={handleInstitutionSelection} 
          />
          <select className="form-select mb-3 mt-5" onChange={(e) => setSelectedInstitutionId(e.target.value)} value={selectedInstitutionId}>
            <option value="">Sélectionner une institution</option>
            {institutions.filter(institution => institution.address.toLowerCase().includes(searchTerm.toLowerCase())).map(institution => (
              <option key={institution._id} value={institution._id}>{institution.address}</option>
            ))}
          </select>

          <div>
            <p className=" mt-5">Nombre total d'institutions : {institutionStats.totalInstitutions}</p>
          </div>

          <div>
            <h2 className=" mt-5">Détails de l'institution sélectionnée :</h2>
            {selectedInstitution ? (
              <div className=" mt-5">
                <p>ID: {selectedInstitution._id}</p>
                <p>Adresse: {selectedInstitution.address}</p>
                <p>Catégorie: {selectedInstitution.category}</p>
                <p>Sous-catégorie: {selectedInstitution.subcategory}</p>
                <button className="btn btn-danger ms-2" style={{ backgroundColor: 'red' }} onClick={handleDeleteInstitution}>Supprimer l'institution</button>
              </div>
            ) : (
              <p className=" mt-5">Veuillez sélectionner une institution pour afficher ses détails.</p>
            )}
          </div>

          <div className="mt-3 d-inline-flex align-items-center">
            <Link to="/dashboard"  className="btn btn-primary d-flex  align-items-center mr-2">Retourner au dashboard</Link>
            <Link to="/updateinstitution" className="btn btn-danger ms-2" style={{ backgroundColor: 'yellow' }}>Modifier l'institution</Link>
            <Link to="/createInstitution" className="btn btn-success">Aller à la page d'ajout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInstitutionDetail;
