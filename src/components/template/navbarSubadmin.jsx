import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon from react-icons/fa

const NavbarSub = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userImage, setUserImage] = useState('');

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

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/index');
    };

    return (
        <header className="header">
            <div className="header-inner">
                <div className="container">
                    <div className="inner">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-12">
                                <div className="logo">
                                    <a href="index.html"><img src="./src/assets/img/logoM.jpeg" alt="#" style={{ width: '500px' }} /></a>
                                </div>
                                <div className="logom">
                                    <a href="index.html"><img src="./src/assets/img/Capture.PNG" alt="#" /></a>
                                </div>
                                <div className="mobile-nav"></div>
                            </div>
        <div className="col-lg-7 col-md-9 col-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div className="main-menu">
        <nav className="navigation">
            <ul className="nav menu">
                <li><a href="/homesub">Home <i className="icofont-rounded-down"></i></a></li>
                <li><a href="/myprofile">My profile</a></li>
                <li><a href="/listprofiles">Members</a></li>
                <li className="active"><a href="/homeprojects">My projects</a></li>
            </ul>
        </nav>
    </div>
    <div className="user-info" style={{ display: 'flex', alignItems: 'right' }}>
        {userImage && <img src={`http://localhost:3001/profiles/${userImage}`} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', marginTop: '10px', marginRight: '10px' }} />}
        <span className="user-name">{userName} {userLastName}</span>
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

export default NavbarSub;
