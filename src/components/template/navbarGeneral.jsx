import React from 'react';

const Navbar = () => {
    return (
        <header className="header" >
        
        <div className="header-inner">
            <div className="container">
                <div className="inner">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-12">
                            <div className="logo">
                                <a href="index.html"><img src="./src/assets/img/logo.png" alt="#"/></a>
                            </div>
                            <div className="mobile-nav"></div>
                        </div>
                        <div className="col-lg-7 col-md-9 col-12">
                            <div className="main-menu">
                                <nav className="navigation">
                                    <ul className="nav menu">
                                        <li className="active"><a href="/index">Home <i className="icofont-rounded-down"></i></a>
                                           
                                        </li>
                                        
                                        <li><a href="#">Pages <i className="icofont-rounded-down"></i></a>
                                            <ul className="dropdown">
                                                <li><a href="404.html">404 Error</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Blogs <i className="icofont-rounded-down"></i></a>
                                            <ul className="dropdown">
                                                <li><a href="blog-single.html">Blog Details</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="contact.html">Contact Us</a></li>
                                        <li><a href="/homepage">Sign up</a></li>
                                        <li><a href="/login">Sign in</a></li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-2 col-12">
                            <div className="get-quote">
                                <a href="appointment.html" className="btn">Book Appointment</a>
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
