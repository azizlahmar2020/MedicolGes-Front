import React, { useEffect, useState } from "react";
import axios from 'axios';
import './listprofilesStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Navbar from "/src/components/template/navbarSubadmin";
import Footer from "/src/components/template/footer";
import NavbarSub from "../template/navbarSubadmin";
function UserProfiles(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users/showUsers')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    // Function to format birthdate
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    
    return (
        <div>
        <NavbarSub/>
        <div className="container">

            <div className="row">
                {/* Showing Candidates */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h6 className="mb-0">Showing {users.length} Candidates</h6>
                    </div>
                </div>
                {/* Candidate Cards */}
                <div className="row">
                    {users.map(user => (
                        <div className="col-sm-6 col-lg-4 mb-4 candidate-list" key={user._id}>
                            <div className="candidate-list-image">
                                {user.profileImage && <img src={`http://localhost:3000/profiles/${user.profileImage}`} alt="Profile" />}
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
  <FontAwesomeIcon icon={faComment} />
  Start Chat
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
