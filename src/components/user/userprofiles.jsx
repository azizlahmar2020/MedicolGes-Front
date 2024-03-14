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

function UserProfiles(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users/showUsers')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    // Function to format birthdate
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    const handleStartChat = (userId) => {
        axios.get(`http://localhost:3001/auth/getIdMyProfile`)
            .then(response => {
                // Log the entire response for debugging
                console.log("Server response:", response);
                console.log("Data received:", response.data);
                // Attempt to access the sessionId for further debugging
                const sessionId = response.data.userSession ? response.data.userSession.sessionId : 'DefaultSessionId';
                console.log("Session ID:", sessionId);
                navigate(`/ChatBox/${sessionId}/${userId}`);
            })
            .catch(err => console.log(err));
    };
    
    const [sessionId, setSessionId] = useState('');


    useEffect(() => {
        const fetchSessionId = async () => {
          try {
            const response = await axios.get('http://localhost:3001/auth/getIdMyProfile');
            setSessionId(response.data.sessionId);
          } catch (error) {
            console.error('Error fetching session ID:', error);
          }
        };
    
        fetchSessionId();
      }, []);
    
    return (
        <div>
        <NavbarSub/>
        <div className="container">

            <div className="row">
                {/* Showing Candidates */}
                <div className="row mb-4">
    <div className="col-12 text-center">
        <h6 className="mb-0" style={{ color: '#1A76D1',fontSize: '24px' }}>We have a total of {users.length} Candidates</h6>
    </div>
</div>
                {/* Candidate Cards */}
                <div className="row">
                    {users.map(user => (
                        <div className="col-sm-6 col-lg-6 mb-4 candidate-list" key={user._id}>
                            <div className="candidate-list-image">
                                {user.profileImage && <img src={`http://localhost:3001/profiles/${user.profileImage}`} alt="Profile" style={{ width: '300px', height: '100px', borderRadius: '50%' }} />}

                            </div>
                            <div className="candidate-list-details">
                                <div className="candidate-list-info">
                                    <div className="candidate-list-title">
                                        <h5>{user.name} {user.lastname}</h5>
                                    </div>
                                    <div className="candidate-list-option">
                                        <ul className="list-unstyled">
                                            <li><FontAwesomeIcon icon={user.gender === 'male' ? faMars : faVenus} className="pr-1" /> {user.gender}</li>
                                            <li><FontAwesomeIcon icon={faCalendarAlt} className="pr-1" /> {formatDate(user.birthdate)}</li>
                                            <li><i className="fas fa-envelope pr-1"></i>{user.email}</li>
                                            <li><i className="fas fa-user-cog pr-1"></i>{user.role}</li>
                                            
                                        </ul>
                                        

                                        <button className="chat-button">
  {/* Utilisez la balise Link pour créer un lien vers "/ChatBox" */}
  <Link to={`/ChatBox/${'65e9c8448058e341eff2111e'}/${user._id}`} className="btn btn-link">
    <FontAwesomeIcon icon={faComment} />
    Start Chat
  </Link>
</button>


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
                        <Footer/>
        </div>
    );
}

export default UserProfiles;
