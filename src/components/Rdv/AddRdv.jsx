import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap'; 
import { toast } from 'react-toastify'; 
import axiosInstance from '../../axiosInstance';
import './ajoutRdv.css';

function AjoutRdv({ handleAjoutRdv, id }) {
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [docteur, setDocteur] = useState('');
  const [patient, setPatient] = useState('');
  const [dateError, setDateError] = useState(false);
  const [Status, setStatus] = useState('En attente');
  const [RoomUrl, setGeneratedCode] = useState('');

  useEffect(() => {
    if (id) {
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
        setDateError(true);
        window.alert("La date sélectionnée doit être supérieure ou égale à aujourd'hui.");
        return;
      }
  
      const newRdv = { date, heure, docteur, patient, Status };

      // Générer le code uniquement lorsque vous êtes prêt à envoyer le formulaire
      const code = generateRandomCode();
      if (code) {
        newRdv.RoomUrl = code;
      } else {
        throw new Error("La génération du code a échoué.");
      }
  
      await axios.post(`http://localhost:3001/rdv/add`, newRdv);
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
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      // Ajoutez d'autres actions pour gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur.
    }
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    let code = '';
    const charSet = new Set();
    
    while (charSet.size < 12) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const character = characters[randomIndex];
      if (!charSet.has(character)) {
        charSet.add(character);
        code += character;
      }
    }
    
    return code;
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
              setDateError(false);
            }}
          />
          {dateError && <Alert variant="danger">Date must be greater than or equal to today.</Alert>}
        </Form.Group>

        <Form.Group controlId="formHeure">
          <Form.Label>Hour</Form.Label>
          <Form.Control
            type="time"
            placeholder="Heure"
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
          />
        </Form.Group>
       
        <Button id="add-rdv-button" variant="primary" onClick={handleAddRdv} style={{paddingTop:'5px'}}>
          Add
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
