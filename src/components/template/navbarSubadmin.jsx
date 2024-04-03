import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link, useLocation, and useNavigate
import LogoM from '../../assets/img/namem.png'; // Adjust image import path
import Logo from '../../assets/img/logom.png'; // Adjust image import path

const NavbarSub = () => {
    const location = useLocation(); // Get current location
    const [activeItem, setActiveItem] = useState(location.pathname); // Initialize active menu item with current pathname
    const navigate = useNavigate(); // Initialize navigate function

    // Function to handle click on menu items
    const handleClick = (path) => {
        setActiveItem(path); // Set active menu item
    };

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
                                            <li className={activeItem === '/homeprojects' ? 'active' : ''}>
                                                <Link to="/homeprojects" onClick={() => handleClick('/homesub')}>Home <i className="icofont-rounded-down"></i></Link>
                                            </li>
                                            <li className={activeItem === '/myprofile' ? 'active' : ''}>
                                                <Link to="/myprofile" onClick={() => handleClick('/myprofile')}>My profile</Link>
                                            </li>
                                            <li className={activeItem === '/listprofiles' ? 'active' : ''}>
                                                <Link to="/listprofiles" onClick={() => handleClick('/listprofiles')}>Members</Link>
                                            </li>
                                            <li className={activeItem === '/projectfront' ? 'active' : ''}>
                                                <Link to="/projectfront" onClick={() => handleClick('/homeprojects')}>My projects</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-2 col-12">
                                <div className="get-quote">
                                    {/* Logout Button */}
                                    <button onClick={handleLogout} className="btn-logout" style={{width:'150px', height:'40px', marginTop:'10px', 
                                    backgroundColor:'#0B8FAD',color:'white', borderRadius:'20px'}}>Logout</button>
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
