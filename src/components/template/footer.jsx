import React from 'react';

const Footer = () => {
    return (
        <footer id="footer" className="footer ">
        <div className="footer-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-footer">
                            <h2>About Us</h2>
                            <p>CodeWizards is a group of four students who are currently studying in ESPRIT.</p>
                            <ul className="social">
                                <li><a href="#"><i className="icofont-facebook"></i></a></li>
                                <li><a href="#"><i className="icofont-google-plus"></i></a></li>
                                <li><a href="#"><i className="icofont-twitter"></i></a></li>
                                <li><a href="#"><i className="icofont-vimeo"></i></a></li>
                                <li><a href="#"><i className="icofont-pinterest"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-footer f-link">
                            <h2>Quick Links</h2>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <ul>
                                        <li><a href="/homesub"><i className="fa fa-caret-right" aria-hidden="true"></i>Home</a></li>
                                        <li><a href="#"><i className="fa fa-caret-right" aria-hidden="true"></i>About Us</a></li>
                                        <li><a href="/feedback"><i className="fa fa-caret-right" aria-hidden="true"></i>Feedback</a></li>
                                        <li><a href="/homeprojects"><i className="fa fa-caret-right" aria-hidden="true"></i>Projects</a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <ul>
                                    <li><a href="/list-form"><i className="fa fa-caret-right" aria-hidden="true"></i>Forms</a></li>	
                                        <li><a href="#"><i className="fa fa-caret-right" aria-hidden="true"></i>Testimonials</a></li>
                                        <li><a href="#"><i className="fa fa-caret-right" aria-hidden="true"></i>FAQ</a></li>
                                        <li><a href="#"><i className="fa fa-caret-right" aria-hidden="true"></i>Contact Us</a></li>	
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-footer">
                            <h2>Open Hours</h2>
                            <p>Our platform is continuously available, ensuring uninterrupted access to our services whenever you need them, day or night
.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-footer">
                            <h2>MediColGes</h2>
                            <p>MedicolGes is a project in collaboration with algeria that aims to improve health care. Feel free to email us</p>
                            <form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
                                <input name="email" placeholder="Email Address" className="common-input" onFocus="this.placeholder = ''"
                                    onBlur="this.placeholder = 'Your email address'" required="" type="email" />
                                <button className="button"><i className="icofont icofont-paper-plane"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="copyright-content">
                            <p>© Copyright 2023  |  All Rights Reserved by <a href="https://www.wpthemesgrid.com" target="_blank">CodeWizards</a> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    
    );
}

export default Footer;
