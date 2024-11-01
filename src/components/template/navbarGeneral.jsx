import React from 'react';
import { useLocation } from 'react-router-dom';
import logoImage from '../../assets/img/logom.png';
import nameImage from '../../assets/img/namem.png';

const Navbar = () => {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header-inner">
                <div className="container">
                    <div className="inner">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-12">
                            <div className="logo">
                                    <a href="index.html"><img src={logoImage} alt="#" /></a>
                                </div>
                                <div className="logom">
                                    <a href="index.html"><img src={nameImage} alt="#" /></a>
                                </div>

                                <div className="mobile-nav"></div>

                            </div>
                            <div className="col-lg-7 col-md-9 col-12">
                                <div className="main-menu">
                                    <nav className="navigation">
                                        <ul className="nav menu">
                                            <li className={location.pathname === '/index' ? 'active' : ''}><a href="/index">Home <i className="icofont-rounded-down"></i></a>
                                            </li>
                                            <li className={location.pathname === '/feedback' ? 'active' : ''}><a href="/feedback">Feedback</a></li>
                                            <li className={location.pathname === '/projects' ? 'active' : ''}><a href="#">Projects <i className="icofont-rounded-down"></i></a>
                                                <ul className="dropdown">
                                                    <li><a href="/login">Browse project</a></li>
                                                    <li><a href="/login">Ask for participation</a></li>
                                                </ul>
                                            </li>
                                            <li className={location.pathname === '/forms' ? 'active' : ''}><a href="#">Forms <i className="icofont-rounded-down"></i></a>
                                                <ul className="dropdown">
                                                    <li><a href="/login">Browse Forms</a></li>
                                                    <li><a href="/login">Answer a form</a></li>
                                                </ul>
                                            </li>
                                            <li className={location.pathname === '/feedback' ? 'active' : ''}><a href="/feedback">Feedback</a></li>
                                            <li className={location.pathname === '/aboutus' ? 'active' : ''}><a href="/aboutus">About Us</a></li>
                                            <li className={location.pathname === '/medinews/1' ? 'active' : ''}><a href="/medinews/1">News</a></li>

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-2 col-12">
                                <div className="get-quote">
                                    <a href="/self-diagnosis" className="btn" style={{backgroundColor:'#0E90AE',marginTop:'8px', fontSize:'18px',
                                    borderRadius:'4px', width:'200px', height:'40px', paddingTop:'5px', marginLeft:'-14px'}}>Explore Symptoms</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
