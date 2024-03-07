import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SingleInstitutionDetail = () => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/institutions');
        setInstitutions(response.data);
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

  const handleInstitutionSelection = (event) => {
    setSelectedInstitutionId(event.target.value);
  };

  const handleDeleteInstitution = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette institution ?')) {
      try {
        await axios.delete(`http://localhost:3001/institutions/${selectedInstitutionId}`);
        console.log('Institution supprimée avec succès');
        // Vous pouvez également mettre à jour l'état des institutions ici si nécessaire
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'institution:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Choisir une institution :</h2>
      <select className="form-select mb-3" onChange={handleInstitutionSelection} value={selectedInstitutionId}>
        <option value="">Sélectionner une institution</option>
        {institutions.map(institution => (
          <option key={institution._id} value={institution._id}>{institution.address}</option>
        ))}
      </select>

      <div>
  <h2>Détails de l'institution sélectionnée :</h2>
  {selectedInstitution ? (
    <div>
      <p>ID: {selectedInstitution._id}</p>
      <p>Adresse: {selectedInstitution.address}</p>
      <p>Catégorie: {selectedInstitution.category}</p>
      <p>Sous-catégorie: {selectedInstitution.subcategory}</p>
      {/* Ajoutez d'autres détails ici si nécessaire */}
      <button className="btn btn-danger" onClick={handleDeleteInstitution}>Supprimer l'institution</button>
    </div>
  ) : (
    <p>Veuillez sélectionner une institution pour afficher ses détails.</p>
  )}
</div>

    </div>
  );
};

export default SingleInstitutionDetail;
