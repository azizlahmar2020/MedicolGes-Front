import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate


const NavbarSub = () => {
    const navigate = useNavigate(); // Initialize navigate function

    // Function to handle logout
    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Clear session token
        navigate('/index'); // Redirect to index page
    };

    return (
        <header className="header">
            <div className="header-inner">
                <div className="container">
                    <div className="inner">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-12">
                                <div className="logo">
                                    <a href="index.html"><img src="./src/assets/img/m.png" alt="#" /></a>
                                </div>
                                <div className="logom">
                                    <a href="index.html"><img src="./src/assets/img/medicol.png" alt="#" /></a>
                                </div>
                                <div className="mobile-nav"></div>
                            </div>
                            <div className="col-lg-7 col-md-9 col-12">
                                <div className="main-menu">
                                    <nav className="navigation">
                                        <ul className="nav menu">
                                            <li className="active"><a href="/homesub">Home <i className="icofont-rounded-down"></i></a></li>
                                            <li><a href="/myprofile">My profile</a></li>
                                            <li><a href="/listprofiles">Members</a></li>
                                            <li><a href="/homeprojects">My projects</a></li>
                                            <li><a href="/rdv">My RDV</a></li>

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-2 col-12">
                                <div className="get-quote">
                                    {/* Logout Button */}
                                    <button onClick={handleLogout} className="btn-logout" style={{width:'150px', height:'40px', marginTop:'10px', 
                                    backgroundColor:'#1A76D1',color:'white', borderRadius:'20px'}}>Logout</button>
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
