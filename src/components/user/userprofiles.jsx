import React, { useEffect, useState } from "react";
import axios from 'axios';
import './userprofiles.css'; // Import CSS file for custom styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import NavbarSub from "../template/navbarSubadmin";
import Footer from "../template/footer";
import ChatBox from "../ChatBoxPage/ChatBox";
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance'; // Import the customized Axios instance
import AjoutRdv from "../Rdv/AddRdv";
import { Button, Modal } from "react-bootstrap";

function UserProfiles() {
    const [users, setUsers] = useState([]);
    const [sessionId, setSessionId] = useState('');
    const [showModal, setShowModal] = useState(false); // State for the modal

    const handleAjoutRdv = async (newRdv) => {
        try {
            // Logic to add the appointment
            setShowModal(false); // Close the modal after adding
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true); // Open the modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

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
        axiosInstance.get('/users/showUsers')
            .then(result => {
                if (result.data && Array.isArray(result.data.users)) {
                    setUsers(result.data.users);
                } else {
                    throw new Error('Invalid user data received');
                }
            })
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div>
            <NavbarSub />
            <div className="container">
                <div className="row mb-4">
                    <div className="row">
                        {users.map(user => (
                            <div className="col-sm-6 col-lg-6 mb-4 candidate-list" key={user._id}>
                                <div className="candidate-list-image">
                                    {user.profileImage && <img src={`http://localhost:3001/profiles/${user.profileImage}`} alt="Profile" style={{ width: '300px', height: '100px', borderRadius: '50%' }} />}
                                    <div className="candidate-list-option">
                                        <ul className="list-unstyled">
                                            <li><FontAwesomeIcon icon={user.gender === 'male' ? faMars : faVenus} className="pr-1" /> {user.gender}</li>
                                            <li><FontAwesomeIcon icon={faCalendarAlt} className="pr-1" /> {formatDate(user.birthdate)}</li>
                                            <li><i className="fas fa-envelope pr-1"></i>{user.email}</li>
                                            <li><i className="fas fa-user-cog pr-1"></i>{user.role}</li>
                                        </ul>

                                        <button className="custom-chat-button btn btn-link">
                                            <Link to={`/ChatBox/${sessionId}/${user._id}`}>
                                                <FontAwesomeIcon icon={faComment} />
                                                Start Chat
                                            </Link>
                                        </button>

                                        <Modal show={showModal} onHide={handleCloseModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Ajouter un Rendez-vous</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <AjoutRdv handleAjoutRdv={handleAjoutRdv} id={user._id} /> 
                                            </Modal.Body>
                                        </Modal>

                                        <button className="custom-chat-button btn btn-link" onClick={handleOpenModal }>
                                            <FontAwesomeIcon icon={faComment} />
                                            Ajouter un rendez-vous
                                        </button>

                                        <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                                            <span><i className="fa fa-twitter"></i></span>
                                            <span><i className="fa fa-facebook-f"></i></span>
                                            <span><i className="fa fa-instagram"></i></span>
                                            <span><i className="fa fa-linkedin"></i></span>
                                        </div>
                                    </div>
                                    <div className="px-2 rounded mt-4 date">
                                        <span className="join">Joined May, 2021</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserProfiles;
