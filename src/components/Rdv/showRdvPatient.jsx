import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './ShowRdv.css';
import axiosInstance from '../../axiosInstance';
import NavbarSub from "../template/navbarSubadmin";
import Footer from "/src/components/template/footer";

function ShowRDV() {
  const [rdvs, setRDVs] = useState([]);
  const [users, setUsers] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const fetchSessionId = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in sessionStorage');
            }
            
            // Fetch the users and session ID
            const response = await axiosInstance.get('/users/showUsers');
            console.log('Response:', response); // Log the entire response
            
            if (response.data && response.data.sessionId) {
                setSessionId(response.data.sessionId);
            } else {
                throw new Error('Session ID not found in response data');
            }
        } catch (error) {
            console.error('Error fetching session ID:', error);
        }
    };
    
    fetchSessionId();
}, []);

  useEffect(() => {
    const fetchRDVs = async () => {
      try {
        // Fetch RDVs only if sessionId is available
        if (sessionId) {
          const response = await axios.get(`http://localhost:3001/rdv/getPatientRdv/${sessionId}`);
          console.log('Response:', sessionId);
          setRDVs(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous :', error);
      }
    };

    fetchRDVs();
  }, [sessionId]); // Trigger the effect when sessionId changes

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:3001/users/getUser/${userId}`);
        setUsers(prevState => ({
          ...prevState,
          [userId]: response.data
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    };

    rdvs.forEach(rdv => {
      if (rdv.docteur && !users[rdv.docteur]) {
        fetchUser(rdv.docteur);
      }
      if (rdv.patient && !users[rdv.patient]) {
        fetchUser(rdv.patient);
      }
    });
  }, [rdvs, users]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const filteredRDVs = rdvs.filter(rdv => {
    const patientName = `${users[rdv.patient]?.name} ${users[rdv.patient]?.lastname}`.toLowerCase();
    const doctorName = `${users[rdv.docteur]?.name} ${users[rdv.docteur]?.lastname}`.toLowerCase();
    return patientName.includes(searchTerm.toLowerCase()) || doctorName.includes(searchTerm.toLowerCase());
  }).filter(rdv => {
    if (selectedDate) {
      const rdvDate = new Date(rdv.date);
      const selectedDateObj = new Date(selectedDate);
      return rdvDate.getFullYear() === selectedDateObj.getFullYear() &&
             rdvDate.getMonth() === selectedDateObj.getMonth() &&
             rdvDate.getDate() === selectedDateObj.getDate();
    }
    return true;
  });
  

  return (
    <>
            <NavbarSub/>

      <h1 className='titre_rdv'>Rendez-vous disponibles :</h1>
   <div className='rdv_page'>
      <div className='search-container row mt-2'>
  <div className='col-md-6'>
    <div className='search-wrapper'>
      <input
        className='searchRDV form-control'
        placeholder='Rechercher par nom ou prénom'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>
  <div className='col-md-3'>
      <input type="date" className='filterdate' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
  </div>
</div>


      <div className='liste_rdv'>
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredRDVs.length === 0 ? (
            <div style={{ width: "100%" }}>
              <h1>Aucun rendez-vous trouvé.</h1>
            </div>
          ) : (
            filteredRDVs.map((rdv) => (
              <Card key={rdv._id} style={{ width: '22rem', margin: '10px' }}>
                <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <Card.Title>Date : {formatDate(rdv.date)}</Card.Title>
                      <Card.Text style={{ width: '200px', borderRadius: '50%' }}>
                        Heure : {rdv.heure}
                        <br />
                        Docteur : {users[rdv.docteur]?.name} {users[rdv.docteur]?.lastname}
                        <br />
                        Patient : {users[rdv.patient]?.name} {users[rdv.patient]?.lastname}
                      </Card.Text>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      {users[rdv.patient]?.profileImage && <img src={`http://localhost:3001/profiles/${users[rdv.patient]?.profileImage}`} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
                    </div>
                  </div>
                  </Card.Body>
              </Card>
            ))
          )}
        </Row>
      </div>
     
      </div>
      <Footer/>
    </>
  );
}

export default ShowRDV;
