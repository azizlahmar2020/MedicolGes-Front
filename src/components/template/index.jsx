import React, { useState } from "react";
import Footer from "./footer";
import Navbar from "./navbarGeneral";
import { Modal } from "react-bootstrap";
import ChatBot from '../ChatBot/ChatWindow'; 

function HomeSub() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    // Fonction pour ouvrir le chatbot
    const openChatbot = () => setIsChatbotOpen(true);

    // Fonction pour fermer le chatbot
    const closeChatbot = () => setIsChatbotOpen(false);
    const handleCloseModal = () => {
        setIsChatbotOpen(false);
    };
  return (
    <div>
	<link rel="stylesheet" type="text/css" href="assets/style.css" />
    
    
    
            
    <ul className="pro-features">
                {/* Bouton pour ouvrir le chatbot */}
                <a className="get-pro" onClick={openChatbot}>Ask me</a>
                <li className="big-title">Pro Version Available on Themeforest</li>
                <li className="title">Pro Version Features</li>
                <li>2+ premade home pages</li>
                <li>20+ html pages</li>
                <li>Color Plate With 12+ Colors</li>
                <li>Sticky Header / Sticky Filters</li>
                <li>Working Contact Form With Google Map</li>

                {/* Composant ChatBot */}
                <Modal style={{border:'none'}} show={isChatbotOpen} onHide={handleCloseModal}>
                    
                 
                        <ChatBot closeChatbot={closeChatbot} />
                  
                </Modal>
            </ul>
        
<div>
    <Navbar/>
</div>
    
    <section className="slider">
        <div className="hero-slider">
           
           
        <div className="single-slider" style={{backgroundImage: `url('./src/assets/img/slider.jpg')`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="text" style={{fontSize:'19px'}}>
                            <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
                                <p>We provide medical services that you can trust! Our team is dedicated to conducting thorough medical research to improve patient care and find innovative solutions to healthcare challenges.</p>
                                <div className="button">
                                <a href="/homepage" className="btn" style={{ width: '30%', height: '45px', fontSize: '22px', borderRadius: '4px', paddingTop:'5px' }}>Register Now</a>
                                    <a href="/login" className="btn primary" style={{width:'20%', height:'45px', fontSize:'20px', paddingTop:'5px',borderRadius: '4px'}}>Login</a>
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
                                    <span>Browse projects</span>
                                    <h4>Projects</h4>
                                    <p>Browse various projects made by different doctors and project initiators and have the 
                                        chane to participate in one.
                                    </p>
                                    <a href="#">TAKE ME THERE<i className="fa fa-long-arrow-right"></i></a>
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
                                    <span>Explore forms</span>
                                    <h4>Forms</h4>
                                    <p>Take a look at the trending forms that can help doctors and project initatiors to have a more 
                                        accurate diagnosis.
                                    </p>
                                    <a href="#">TAKE ME THERE<i className="fa fa-long-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12">
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
    
    <section className="why-choose section" >
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>We Offer Different Services To Improve Your Health</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>Discover a range of services aimed at enhancing your well-being, including:</p>
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
                        <p>Discover a range of services aimed at enhancing your well-being, including:

</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-prescription"></i>
                        <h4><a href="service-details.html">General Treatment</a></h4>
                        <p>Explore a range of wellness strategies and treatment options for various health concerns on our platform.

</p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-tooth"></i>
                        <h4><a href="service-details.html">Teeth Whitening</a></h4>
                        <p>Discover safe and effective methods to brighten your smile with our expert tips and product recommendations.

</p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-heart-alt"></i>
                        <h4><a href="service-details.html">Heart Surgery</a></h4>
                        <p>Get guidance and support for heart surgery, from understanding the procedure to post-operative care.

</p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-listening"></i>
                        <h4><a href="service-details.html">Ear Treatment</a></h4>
                        <p>Find relief from ear-related issues with our comprehensive resources on diagnosis and management.

</p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-eye-alt"></i>
                        <h4><a href="service-details.html">Vision Problems</a></h4>
                        <p>Learn about common vision problems and find solutions to maintain optimal eye health on our platform.

</p>	
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-service">
                        <i className="icofont icofont-blood"></i>
                        <h4><a href="service-details.html">Blood Transfusion</a></h4>
                        <p>Access information and support for blood transfusions, including donation guidelines and recipient resources.






</p>	
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
                        <h2>Keep up with The Recent Medical News in Algeria.</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>Everything you need to know about health in algeria in one simple click.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-news">
                        <div className="news-head">
                            <img src="./src/assets/img/algeria1.png" alt="#"/>
                        </div>
                        <div className="news-body">
                            <div className="news-content">
                                <div className="date">24 Sep 2019
</div>
                                <h2><a href="blog-single.html">Eight babies die in Algeria hospital fire: Emergency services | News | Al Jazeera</a></h2>
                                <p className="text">Government opens inquiry after pre-dawn blaze at maternity hospital in Oued Souf.

.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-news">
                        <div className="news-head">
                            <img src="./src/assets/img/algeria2.png" alt="#"/>
                        </div>
                        <div className="news-body">
                            <div className="news-content">
                                <div className="date">11 Dec 2020</div>
                                <h2><a href="blog-single.html">The Perils of Pregnancy.</a></h2>
                                <p className="text">Algerian soon-to-be mothers go through terrifying experiences while navigating the country’s overburdened healthcare systems.

</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-news">
                        <div className="news-head">
                            <img src="./src/assets/img/algeria3.png" alt="#"/>
                        </div>
                        <div className="news-body">
                            <div className="news-content">
                                <div className="date">27 Feb 2023</div>
                                <h2><a href="blog-single.html">They come, they stay -- stories of Chinese doctors in Algeria
.</a></h2>
                                <p className="text">Over the past 60 years, Chinese doctors have treated about 27.37 million Algeri..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    
    <section className="appointment">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>We Are Always Ready to Help You. Book An Appointment</h2>
                        <img src="./src/assets/img/section-img.png" alt="#"/>
                        <p>what are you waiting for ? Book an appointment right now!</p>
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
