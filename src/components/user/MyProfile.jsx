import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaTransgender, FaBirthdayCake, FaCog } from 'react-icons/fa';
import NavbarSub from "/src/components/template/navbarSubadmin";
import Footer from "/src/components/template/footer";
import NavbarSub from "../template/navbarSubadmin";
import './myprofile.css';

function MyProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('token');
                console.log('Token:', token); // Add this line to log the token
                if (!token) {
                    navigate('/login');
                    return;
                }

                try {
                    // Log request headers before making the request
                    console.log('Request headers before fetch:', {
                        Authorization: `Bearer ${token}`,
                    });

                    const response = await axios.get('http://localhost:3001/auth/myprofile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Response status:', response.status);
                    console.log('Response data:', response.data);

                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log('Error:', error.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Unauthorized, redirect to login
                    navigate('/login');
                } else {
                    setError(error.message);
                    setLoading(false);
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div> 
        <div className="container align-center">
                <NavbarSub/>
            <div className="container" style={{ backgroundColor: '038cfc', padding: '20px', borderRadius: '10px' }}>
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        {user.profileImage && <img src={`http://localhost:3001/profiles/${user.profileImage}`} alt="Profile" style={{ width: '300px', height: '300px', borderRadius: '50%' }} />}
                                        <div className="mt-3">
                                            <h4>{user.name} {user.lastname}</h4>
                                            <p className="text-secondary mb-1">{user.role}</p>
                                            <p className="text-muted font-size-sm">{user.email}</p>
                                            {user.role === "sub-admin" && (
                                                <button className="btn btn-outline-primary" onClick={() => navigate('/projectfront')} style={{backgroundColor:'#2b8c7b', color:'white', width:'200px', height:'40px', borderRadius:'5px', borderColor:'white'}}>Projects</button>
                                            )}
                                                <button className="btn btn-outline-primary" style={{backgroundColor:'#2b8c7b', color:'white', width:'100px', height:'40px', borderRadius:'5px', borderColor:'white'}}>Chat</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-8">
                            {/* Card with user details */}
                            <div className="card mb-3" style={{ backgroundColor: 'white', padding: '155px', borderRadius: '10px' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0"><FaUser className="mr-2" />Full Name</h6>
                                        </div>
                                        <div className="col-sm-9">
                                            {user.name} {user.lastname}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0"><FaTransgender className="mr-2" />Gender</h6>
                                        </div>
                                        <div className="col-sm-9">
                                            {user.gender}

                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0"><FaTransgender className="mr-2" />Gender</h6>
                                            </div>
                                            <div className="col-sm-9">
                                                {user.gender}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0"><FaBirthdayCake className="mr-2" />Birthdate</h6>
                                            </div>
                                            <div className="col-sm-9">
                                                {user.birthdate}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Add other user information fields as needed */}

                                </div>
                                            {/* "Edit Profile" button */}
                            </div>
                            
                            {/* Cards with project status */}
                            {/* Include logic to display project status based on user's data */}

                        </div>


                    </div>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}

export default MyProfile;
