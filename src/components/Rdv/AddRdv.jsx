import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap'; // Importer Alert depuis react-bootstrap
import { toast } from 'react-toastify'; 
import axiosInstance from '../../axiosInstance';

function AjoutRdv({ handleAjoutRdv, id }) {
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [docteur, setDocteur] = useState('');
  const [patient, setPatient] = useState('');
  const [dateError, setDateError] = useState(false); // Ajouter un état pour gérer l'erreur de date

  useEffect(() => {
    if (id) {
      console.log (id)
      setPatient(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in sessionStorage');
        }

        const response = await axiosInstance.get('/users/showUsers');
        if (response.data && response.data.sessionId) {
          setDocteur(response.data.sessionId);
        } else {
          throw new Error('Session ID not found in response data');
        }
      } catch (error) {
        console.error('Error fetching session ID:', error);
      }
    };

    fetchSessionId();
  }, []);

  const handleAddRdv = async () => {
    try {
      const today = new Date();
      const selectedDate = new Date(date);

      if (selectedDate < today) {
        
        setDateError(true); // Définir l'état de l'erreur de date sur true
        window.alert("selectedDate < today")
        return;
      }

      const newRdv = { date, heure, docteur, patient };
      await axios.post(`http://localhost:3001/rdv/add`, newRdv);
      console.log(id)
      handleAjoutRdv(newRdv);
      toast.success('Rendez-vous ajouté avec succès !', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du rendez-vous :', error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setDateError(false); // Réinitialiser l'état de l'erreur de date à false lorsque la date change
            }}
          />
          {dateError && <Alert variant="danger">La date doit être supérieure ou égale à aujourd'hui</Alert>} {/* Afficher l'erreur si dateError est true */}
        </Form.Group>

        <Form.Group controlId="formHeure">
          <Form.Label>Heure</Form.Label>
          <Form.Control
            type="time"
            placeholder="Heure"
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAddRdv}>
          Ajouter
        </Button>
      </Form>
    </div>
  );
}

AjoutRdv.propTypes = {
  handleAjoutRdv: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AjoutRdv;
