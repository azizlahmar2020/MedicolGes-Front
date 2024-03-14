import React from "react";
import Navbar from "./navbarSubadmin";
import Footer from "./footer";
import NavbarSub from "./navbarSubadmin";
function HomeSub() {
  return (
    <div>
	<link rel="stylesheet" type="text/css" href="assets/style.css" />
    
    
    <ul className="pro-features">
        <a className="get-pro" href="#">Get Pro</a>
        <li className="big-title">Pro Version Available on Themeforest</li>
        <li className="title">Pro Version Features</li>
        <li>2+ premade home pages</li>
        <li>20+ html pages</li>
        <li>Color Plate With 12+ Colors</li>
        <li>Sticky Header / Sticky Filters</li>
        <li>Working Contact Form With Google Map</li>
        <div className="button">
            <a href="http://preview.themeforest.net/item/mediplus-medical-and-doctor-html-template/full_screen_preview/26665910?_ga=2.145092285.888558928.1591971968-344530658.1588061879" target="_blank" className="btn">Pro Version Demo</a>
            <a href="https://themeforest.net/item/mediplus-medical-and-doctor-html-template/26665910" target="_blank" className="btn">Buy Pro Version</a>
        </div>
    </ul>
<div>
    <NavbarSub/>
</div>
    
    <section className="slider">
        <div className="hero-slider">
           
           
        <div className="single-slider" style={{backgroundImage: `url('./src/assets/img/slider2.jpg')`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="text">
                            <h1>We Provide <span>Medicol</span> Services That You Can <span>Trust!</span></h1>
                                <p>We provide medical services that you can trust! Our team is dedicated to conducting thorough medical research to improve patient care and find innovative solutions to healthcare challenges.</p>
                                <div className="button">
                                    <a href="#" className="btn">Get Appointment</a>
                                    <a href="#" className="btn primary">Conatct Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="schedule">
        <div className="container">
            <div className="schedule-inner">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 ">
                        <div className="single-schedule first">
                            <div className="inner">
                                <div className="icon">
                                    <i className="fa fa-ambulance"></i>
                                </div>
                                <div className="single-content">
                                    <span>Lorem Amet</span>
                                    <h4>Emergency Cases</h4>
                                    <p>Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.</p>
                                    <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-schedule middle">
                            <div className="inner">
                                <div className="icon">
                                    <i className="icofont-prescription"></i>
                                </div>
                                <div className="single-content">
                                    <span>Fusce Porttitor</span>
                                    <h4>Doctors Timetable</h4>
                                    <p>Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.</p>
                                    <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12">
                        <div className="single-schedule last">
                            <div className="inner">
                                <div className="icon">
                                    <i className="icofont-ui-clock"></i>
                                </div>
                                <div className="single-content">
                                    <span>Donec luctus</span>
                                    <h4>Opening Hours</h4>
                                    <ul className="time-sidual">
                                        <li className="day">Monday - Fridayp <span>8.00-20.00</span></li>
                                        <li className="day">Saturday <span>9.00-18.30</span></li>
                                        <li className="day">Monday - Thusday <span>9.00-15.00</span></li>
                                    </ul>
                                    <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="Feautes section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>We Are Always Ready to Help You & Your Family</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>We are dedicated to providing comprehensive support and assistance to you and your family whenever you need it.




</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-12">
                    <div className="single-features">
                        <div className="signle-icon">
                            <i className="icofont icofont-ambulance-cross"></i>
                        </div>
                        <h3>Emergency Help</h3>
                        <p>In times of crisis or urgent need, we offer immediate assistance and support to address any emergency situation.</p>
                    </div>
                </div>
                <div className="col-lg-4 col-12">
                    <div className="single-features">
                        <div className="signle-icon">
                            <i className="icofont icofont-medical-sign-alt"></i>
                        </div>
                        <h3>Enriched Pharmecy</h3>
                        <p>Our pharmacy is dedicated to providing a comprehensive range of high-quality medications and healthcare products, ensuring your well-being and satisfaction.
</p>
                    </div>
                </div>
                <div className="col-lg-4 col-12">
                    <div className="single-features last">
                        <div className="signle-icon">
                            <i className="icofont icofont-stethoscope"></i>
                        </div>
                        <h3>Medical Treatment</h3>
                        <p>We offer advanced medical treatments tailored to your specific needs, ensuring effective care and optimal recovery for every patient.




</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <div id="fun-facts" className="fun-facts section overlay">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="single-fun">
                        <i className="icofont icofont-home"></i>
                        <div className="content">
                            <span className="counter">3468</span>
                            <p>Hospital Rooms</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="single-fun">
                        <i className="icofont icofont-user-alt-3"></i>
                        <div className="content">
                            <span className="counter">557</span>
                            <p>Specialist Doctors</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="single-fun">
                        <i className="icofont-simple-smile"></i>
                        <div className="content">
                            <span className="counter">4379</span>
                            <p>Happy Patients</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="single-fun">
                        <i className="icofont icofont-table"></i>
                        <div className="content">
                            <span className="counter">32</span>
                            <p>Years of Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <section className="why-choose section" >
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>We Offer Different Services To Improve Your Health</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-12">
                    <div className="choose-left">
                        <h3>Who We Are</h3>
                       <p> We are CodeWizard, a dedicated team comprising four Tunisian students driven by a shared mission to enhance healthcare services in Algeria. Our collective goal is to leverage innovative
                         technologies and strategic solutions to improve access, efficiency, and quality within the healthcare sector. Through our expertise and commitment, we strive to positively impact the lives of individuals and communities by 
                        fostering advancements in medical care and promoting overall well-being. </p>                       <div className="row">
                            <div className="col-lg-6">
                                <ul className="list">
                                    <li><i className="fa fa-caret-right"></i>Maecenas vitae luctus nibh. </li>
                                    <li><i className="fa fa-caret-right"></i>Duis massa massa.</li>
                                    <li><i className="fa fa-caret-right"></i>Aliquam feugiat interdum.</li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul className="list">
                                    <li><i className="fa fa-caret-right"></i>Maecenas vitae luctus nibh. </li>
                                    <li><i className="fa fa-caret-right"></i>Duis massa massa.</li>
                                    <li><i className="fa fa-caret-right"></i>Aliquam feugiat interdum.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="choose-right">
                        <div className="video-image">
                            <div className="promo-video">
                                <div className="waves-block">
                                    <div className="waves wave-1"></div>
                                    <div className="waves wave-2"></div>
                                    <div className="waves wave-3"></div>
                                </div>
                            </div>
                            <a href="https://www.youtube.com/watch?v=RFVXy6CRVR4" className="video video-popup mfp-iframe"><i className="fa fa-play"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="call-action overlay" data-stellar-background-ratio="0.5">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                    <div className="content">
                        <h2>Do you need Emergency Medical Care? Call @ 1234 56789</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor dictum turpis nec gravida.</p>
                        <div className="button">
                            <a href="#" className="btn">Contact Now</a>
                            <a href="#" className="btn second">Learn More<i className="fa fa-long-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="portfolio section" >
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>We Maintain Cleanliness Rules Inside Our Hospital</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="owl-carousel portfolio-slider">
                        <div className="single-pf">
                            <img src="./src/assets/img/pf1.jpg" alt="#"/>
                            <a href="portfolio-details.html" className="btn">View Details</a>
                        </div>
                        <div className="single-pf">
                            <img src="./src/assets/img/pf2.jpg" alt="#"/>
                            <a href="portfolio-details.html" className="btn">View Details</a>
                        </div>
                        <div className="single-pf">
                            <img src="./src/assets/img/pf3.jpg" alt="#"/>
                            <a href="portfolio-details.html" className="btn">View Details</a>
                        </div>
                        <div className="single-pf">
                            <img src="./src/assets/img/pf4.jpg" alt="#"/>
                            <a href="portfolio-details.html" className="btn">View Details</a>
                        </div>
                        <div className="single-pf">
                            <img src="./src/assets/img/pf1.jpg" alt="#"/>
                            <a href="portfolio-details.html" className="btn">View Details</a>
                        </div>
                        <div className="single-pf">
                            <img src="./src/assets/img/pf2.jpg" alt="#"/>
                            <a href="portfolio-details.html" className="btn">View Details</a>
                        </div>
                        <div className="single-pf">
                            <img src="./src/assets/img/pf3.jpg" alt="#"/>
                            <a href="portfolio-details.html" className="btn">View Details</a>
                        </div>
                        <div className="single-pf">
                            <img src="./src/assets/img/pf4.jpg" alt="#"/>
                            <a href="portfolio-details.html" className="btn">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="services section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>We Offer Different Services To Improve Your Health</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-prescription"></i>
                        <h4><a href="service-details.html">General Treatment</a></h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet. </p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-tooth"></i>
                        <h4><a href="service-details.html">Teeth Whitening</a></h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet. </p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-heart-alt"></i>
                        <h4><a href="service-details.html">Heart Surgery</a></h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet. </p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-listening"></i>
                        <h4><a href="service-details.html">Ear Treatment</a></h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet. </p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-eye-alt"></i>
                        <h4><a href="service-details.html">Vision Problems</a></h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet. </p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-blood"></i>
                        <h4><a href="service-details.html">Blood Transfusion</a></h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut imperdiet. </p>	
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="pricing-table section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>We Provide You The Best Treatment In Resonable Price</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="single-table">
                        <div className="table-head">
                            <div className="icon">
                                <i className="icofont icofont-ui-cut"></i>
                            </div>
                            <h4 className="title">Plastic Suggery</h4>
                            <div className="price">
                                <p className="amount">$199<span>/ Per Visit</span></p>
                            </div>	
                        </div>
                        <ul className="table-list">
                            <li><i className="icofont icofont-ui-check"></i>Lorem ipsum dolor sit</li>
                            <li><i className="icofont icofont-ui-check"></i>Cubitur sollicitudin fentum</li>
                            <li className="cross"><i className="icofont icofont-ui-close"></i>Nullam interdum enim</li>
                            <li className="cross"><i className="icofont icofont-ui-close"></i>Donec ultricies metus</li>
                            <li className="cross"><i className="icofont icofont-ui-close"></i>Pellentesque eget nibh</li>
                        </ul>
                        <div className="table-bottom">
                            <a className="btn" href="#">Book Now</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="single-table">
                        <div className="table-head">
                            <div className="icon">
                                <i className="icofont icofont-tooth"></i>
                            </div>
                            <h4 className="title">Teeth Whitening</h4>
                            <div className="price">
                                <p className="amount">$299<span>/ Per Visit</span></p>
                            </div>	
                        </div>
                        <ul className="table-list">
                            <li><i className="icofont icofont-ui-check"></i>Lorem ipsum dolor sit</li>
                            <li><i className="icofont icofont-ui-check"></i>Cubitur sollicitudin fentum</li>
                            <li><i className="icofont icofont-ui-check"></i>Nullam interdum enim</li>
                            <li className="cross"><i className="icofont icofont-ui-close"></i>Donec ultricies metus</li>
                            <li className="cross"><i className="icofont icofont-ui-close"></i>Pellentesque eget nibh</li>
                        </ul>
                        <div className="table-bottom">
                            <a className="btn" href="#">Book Now</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12">
                    <div className="single-table">
                        <div className="table-head">
                            <div className="icon">
                                <i className="icofont-heart-beat"></i>
                            </div>
                            <h4 className="title">Heart Suggery</h4>
                            <div className="price">
                                <p className="amount">$399<span>/ Per Visit</span></p>
                            </div>	
                        </div>
                        <ul className="table-list">
                            <li><i className="icofont icofont-ui-check"></i>Lorem ipsum dolor sit</li>
                            <li><i className="icofont icofont-ui-check"></i>Cubitur sollicitudin fentum</li>
                            <li><i className="icofont icofont-ui-check"></i>Nullam interdum enim</li>
                            <li><i className="icofont icofont-ui-check"></i>Donec ultricies metus</li>
                            <li><i className="icofont icofont-ui-check"></i>Pellentesque eget nibh</li>
                        </ul>
                        <div className="table-bottom">
                            <a className="btn" href="#">Book Now</a>
                        </div>
                    </div>
                </div>
            </div>	
        </div>	
    </section>	
    
    
    
    <section className="blog section" id="blog">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>Keep up with Our Most Recent Medical News.</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-news">
                        <div className="news-head">
                            <img src="./src/assets/img/blog1.jpg" alt="#"/>
                        </div>
                        <div className="news-body">
                            <div className="news-content">
                                <div className="date">22 Aug, 2020</div>
                                <h2><a href="blog-single.html">We have annnocuced our new product.</a></h2>
                                <p className="text">Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-news">
                        <div className="news-head">
                            <img src="./src/assets/img/blog2.jpg" alt="#"/>
                        </div>
                        <div className="news-body">
                            <div className="news-content">
                                <div className="date">15 Jul, 2020</div>
                                <h2><a href="blog-single.html">Top five way for solving teeth problems.</a></h2>
                                <p className="text">Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-news">
                        <div className="news-head">
                            <img src="./src/assets/img/blog3.jpg" alt="#"/>
                        </div>
                        <div className="news-body">
                            <div className="news-content">
                                <div className="date">05 Jan, 2020</div>
                                <h2><a href="blog-single.html">We provide highly business soliutions.</a></h2>
                                <p className="text">Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <div className="clients overlay">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                    <div className="owl-carousel clients-slider">
                        <div className="single-clients">
                            <img src="./src/assets/img/client1.png" alt="#"/>
                        </div>
                        <div className="single-clients">
                            <img src="./src/assets/img/client2.png" alt="#"/>
                        </div>
                        <div className="single-clients">
                            <img src="./src/assets/img/client3.png" alt="#"/>
                        </div>
                        <div className="single-clients">
                            <img src="./src/assets/img/client4.png" alt="#"/>
                        </div>
                        <div className="single-clients">
                            <img src="./src/assets/img/client5.png" alt="#"/>
                        </div>
                        <div className="single-clients">
                            <img src="./src/assets/img/client1.png" alt="#"/>
                        </div>
                        <div className="single-clients">
                            <img src="./src/assets/img/client2.png" alt="#"/>
                        </div>
                        <div className="single-clients">
                            <img src="./src/assets/img/client3.png" alt="#"/>
                        </div>
                        <div className="single-clients">
                            <img src="./src/assets/img/client4.png" alt="#"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <section className="appointment">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>We Are Always Ready to Help You. Book An Appointment</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                    <form className="form" action="#">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <input name="name" type="text" placeholder="Name"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <input name="email" type="email" placeholder="Email"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <input name="phone" type="text" placeholder="Phone"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <div className="nice-select form-control wide" tabIndex="0"><span className="current">Department</span>
                                        <ul className="list">
                                            <li data-value="1" className="option selected ">Department</li>
                                            <li data-value="2" className="option">Cardiac Clinic</li>
                                            <li data-value="3" className="option">Neurology</li>
                                            <li data-value="4" className="option">Dentistry</li>
                                            <li data-value="5" className="option">Gastroenterology</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <div className="nice-select form-control wide" tabIndex="0"><span className="current">Doctor</span>
                                        <ul className="list">
                                            <li data-value="1" className="option selected ">Doctor</li>
                                            <li data-value="2" className="option">Dr. Akther Hossain</li>
                                            <li data-value="3" className="option">Dr. Dery Alex</li>
                                            <li data-value="4" className="option">Dr. Jovis Karon</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                    <input type="text" placeholder="Date" id="datepicker"/>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                <div className="form-group">
                                    <textarea name="message" placeholder="Write Your Message Here....."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5 col-md-4 col-12">
                                <div className="form-group">
                                    <div className="button">
                                        <button type="submit" className="btn">Book An Appointment</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-8 col-12">
                                <p>( We will be confirm by an Text Message )</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-6 col-md-12 ">
                    <div className="appointment-image">
                        <img src="./src/assets/img/contact-img.png" alt="#"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="newsletter section">
        <div className="container">
            <div className="row ">
                <div className="col-lg-6  col-12">
                    <div className="subscribe-text ">
                        <h6>Sign up for newsletter</h6>
                        <p className="">Cu qui soleat partiendo urbanitas. Eum aperiri indoctum eu,<br/> homero alterum.</p>
                    </div>
                </div>
                <div className="col-lg-6  col-12">
                    <div className="subscribe-form ">
                        <form action="./src/assets/mail.php" method="get" target="_blank" className="newsletter-inner">
                            { <input name="EMAIL" placeholder="Your email address" className="common-input" onFocus="this.placeholder = ''"onBlur="this.placeholder = 'Your email address'" required="" type="email" />}
                            <button className="btn">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <Footer/>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-migrate-3.0.0.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/easing.js"></script>
    <script src="js/colors.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap-datepicker.js"></script>
    <script src="js/jquery.nav.js"></script>
    <script src="js/slicknav.min.js"></script>
    <script src="js/jquery.scrollUp.min.js"></script>
    <script src="js/niceselect.js"></script>
    <script src="js/tilt.jquery.min.js"></script>
    <script src="js/owl-carousel.js"></script>
    <script src="js/jquery.counterup.min.js"></script>
    <script src="js/steller.js"></script>
    <script src="js/wow.min.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    </div>
  );
}

export default HomeSub;
