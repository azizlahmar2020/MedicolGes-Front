import React, { useEffect, useState } from "react";
import axios from 'axios';
import './listprofilesStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Navbar from "/src/components/template/navbarSubadmin";
import Footer from "/src/components/template/footer";
import NavbarSub from "../template/navbarSubadmin";
import ChatBox from "../ChatBoxPage/ChatBox";
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance'; // Import the customized Axios instance
import "./userprofiles.css"; // Import CSS file for custom styles


function UserProfiles() {
    const [users, setUsers] = useState([]);
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
                        <div className="col-sm-3 col-lg-3 mb-6" style={{marginTop:'30px'}} key={user._id}>
                            <div className="card p-2" style={{width:'250px'}}>
                                <div className="image d-flex flex-column justify-content-center align-items-center">
                                        {user.profileImage && <img src={`http://localhost:3001/profiles/${user.profileImage}`} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />}
                                    <span className="name mt-3" style={{fontSize:'22px',fontWeight:'bold'}}>{user.name} {user.lastname}</span>
                                    <span className="idd">{user.email}</span>
                                    <span className="idd1"> {user.role}</span>
                                    <button className="btn-link" style={{ border: 'none', background: 'none', fontSize: '30px' }}>
                                        <Link to={`/ChatBox/${sessionId}/${user._id}`}>
                                            <FontAwesomeIcon icon={faComment} />
                                        </Link>
                                    </button>


                                    <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                                        <span><i className="fa fa-twitter"></i></span>
                                        <span><i className="fa fa-facebook-f"></i></span>
                                        <span><i className="fa fa-instagram"></i></span>
                                        <span><i className="fa fa-linkedin"></i></span>
                                    </div>
                                    <div className="px-2 rounded mt-4 date">
                                        <span className="join">Joined May, 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                {/* Add pagination logic here */}
            </div>
        </div>
        <Footer />
    </div>
);
}


export default UserProfiles;
