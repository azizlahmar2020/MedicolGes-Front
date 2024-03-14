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
                                        <li className="active"><a href="/index">Home <i className="icofont-rounded-down"></i></a>
                                           
                                        </li>
                                        
                                        <li><a href="#" style={{ fontSize: '18px' }}>Projects <i className="icofont-rounded-down"></i></a>
    <ul className="dropdown">
        <li><a href="404.html">Browse project</a></li>
        <li><a href="404.html">Ask for participation</a></li>
    </ul>
</li>

<li><a href="#" style={{ fontSize: '18px' }}>Forms <i className="icofont-rounded-down"></i></a>
    <ul className="dropdown">
        <li><a href="blog-single.html">Browse Forms</a></li>
        <li><a href="blog-single.html">Answer a form</a></li>
    </ul>
</li>

<li><a href="/feedback" style={{ fontSize: '18px' }}>Feedback</a></li>
<li><a href="/homepage" style={{ fontSize: '18px' }}>Sign up</a></li>
<li><a href="/login" style={{ fontSize: '18px' }}>Sign in</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-2 col-12">
                            <div className="get-quote">
                            <a href="appointment.html" className="btn" style={{ backgroundColor: '#1A76D1', marginTop :'7px' , fontSize: '18px' , height:'40px', width:'180px', padding:'5px' }}>Book Appointment</a>
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