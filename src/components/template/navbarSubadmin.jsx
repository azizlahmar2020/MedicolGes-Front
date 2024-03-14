import React from 'react';

const NavbarSub = () => {
    return (
        <header className="header" >
        
        <div className="header-inner">
            <div className="container">
                <div className="inner">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-12">
                        <div className="logo">
                                <a href="index.html"><img src="./src/assets/img/m.png" alt="#"/></a>
                            </div>
                            <div className="logom">
                                <a href="index.html"><img src="./src/assets/img/medicol.png" alt="#"/></a>
                            </div>
                            <div className="mobile-nav"></div>
                        </div>
                        <div className="col-lg-7 col-md-9 col-12">
                            <div className="main-menu">
                                <nav className="navigation">
                                    <ul className="nav menu">
                                        <li className="active"><a href="/homesub">Home <i className="icofont-rounded-down"></i></a>
                                           
                                        </li>
                                        <li><a href="/myprofile">My profile</a></li>
                                        <li><a href="/listprofiles">Members</a></li>
                                        <li><a href="/homeprojects">My projects</a></li>

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

export default NavbarSub;
