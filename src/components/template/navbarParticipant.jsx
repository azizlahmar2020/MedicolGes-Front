
import React, { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link, useLocation, and useNavigate
import LogoM from '../../assets/img/namem.png'; // Adjust image import path
import Logo from '../../assets/img/logom.png'; // Adjust image import path
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon from react-icons/fa
import axios from 'axios'; // Import axios for making HTTP requests

const NavbarParticipant = () => {
    const location = useLocation(); // Get current location
    const [activeItem, setActiveItem] = useState(location.pathname); // Initialize active menu item with current pathname
    const navigate = useNavigate(); // Initialize navigate function
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userImage, setUserImage] = useState('');

    // Function to handle click on menu items
    const handleClick = (path) => {
        setActiveItem(path); // Set active menu item
    };


    // Function to handle logout
    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Clear session token
        navigate('/index'); // Redirect to index page
    };
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('token');
                console.log('Token:', token); // Log the token for debugging
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:3001/auth/myprofile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Response status:', response.status);
                console.log('Response data:', response.data);

                // Assuming the response data structure contains user name and image URL
                setUserName(response.data.name); // Set user name
                setUserLastName(response.data.lastname); // Set user name
                setUserImage(response.data.profileImage); // Set user image URL
            } catch (error) {
                console.log('Error:', error.message);
                if (error.response && error.response.status === 401) {
                    // Unauthorized, redirect to login
                    navigate('/login');
                }
            }
        };
        fetchProfile();
    }, [navigate]);

    return (
        <header className="header">
            <div className="header-inner">
                <div className="container">
                    <div className="inner">
                        <div className="row">
                        <div className="col-lg-3 col-md-3 col-12">
                            <div className="logo">
                                <a href="index.html"><img src={Logo} alt="#" /></a>
                            </div>
                            <div className="logom">
                                <a href="index.html"><img src={LogoM} alt="#" /></a>
                            </div>

                            <div className="mobile-nav"></div>
                        </div>

                            <div className="col-lg-7 col-md-9 col-12">
                                <div className="main-menu">
                                    <nav className="navigation">
                                        <ul className="nav menu">
                                            <li className={activeItem === '/homeparticipant' ? 'active' : ''}>
                                                <Link to="/homeparticipant" onClick={() => handleClick('/homeparticipant')}>Home <i className="icofont-rounded-down"></i></Link>
                                            </li>
                                            <li className={activeItem === '/profilePatient' ? 'active' : ''}>
                                                <Link to="/profilePatient" onClick={() => handleClick('/profilePatient')}>Profile</Link>
                                            </li>
                                            <li className={activeItem === '/membersPatient' ? 'active' : ''}>
                                                <Link to="/membersPatient" onClick={() => handleClick('/membersPatient')}>Members</Link>
                                            </li>
                                            <li className={activeItem === '/rdvPatient' ? 'active' : ''}>
                                                <Link to="/rdvPatient" onClick={() => handleClick('/rdvPatient')}>Appointments</Link>
                                            </li>
                                            <li className={activeItem === '/feedPatient' ? 'active' : ''}>
                                                <Link to="/feedPatient" onClick={() => handleClick('/feedPatient')}>Feed</Link>
                                            </li>
                                           

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-2 col-12">
                                        <div className="user-info" style={{ display: 'flex', alignItems: 'right' }}>
                    {userImage && <img src={`http://localhost:3001/profiles/${userImage}`} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', marginTop: '10px', marginRight: '10px' }} />}
                    <span className="user-name">      
                    <Link to="/profilePatient">{userName} {userLastName}</Link>
                    </span>
                    <div className="logout-icon" onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                    <FaSignOutAlt size={20} />
                </div>
                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavbarParticipant;
