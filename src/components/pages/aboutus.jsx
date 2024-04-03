import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import image1 from '../../assets/img/sarrour.png';
import image2 from '../../assets/img/jouida.png';
import image3 from '../../assets/img/ftayri.png';
import image4 from '../../assets/img/aziz.png';
import Footer from "/src/components/template/footer";

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h2>About Us</h2>
            <div className="image-section">
                <div className="image-wrapper card">
                    <img src={image1} className="card-img-top" alt="Image 1" />
                    <div className="card-body">
                    <p className="card-text" style={{fontWeight:'bold'}}>Sarra Sahli.</p>
                        <p>Age : 23</p>
                        <p>Email: sahli.sarra@esprit.tn</p>
                    </div>
                    <div className="card-footer">
                        <FontAwesomeIcon icon={faFacebook} />
                        &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faGithub} />
                        &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                </div>
                <div className="image-wrapper card">
                    <img src={image2} className="card-img-top" alt="Image 2" />
                    <div className="card-body">
                        <p className="card-text" style={{fontWeight:'bold'}}>Rayen Jouida.</p>
                        <p>Age : 23</p>
                        <p>Email: rayen.jouida@esprit.tn</p>
                    </div>
                    <div className="card-footer">
                        <FontAwesomeIcon icon={faFacebook} />
                        &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faGithub} />
                        &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                </div>
                <div className="image-wrapper card">
                    <img src={image3} className="card-img-top" alt="Image 3" />
                    <div className="card-body">
                    <p className="card-text" style={{fontWeight:'bold'}}>Aziz Azizi.</p>
                        <p>Age : 23</p>
                        <p>Email: aziz.azizi@esprit.tn</p>
                    </div>
                    <div className="card-footer">
                        <FontAwesomeIcon icon={faFacebook} />
                        &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faGithub} />
                        &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                </div>
                <div className="image-wrapper card">
                    <img src={image4} className="card-img-top" alt="Image 4" />
                    <div className="card-body">
                    <p className="card-text" style={{fontWeight:'bold'}}>Mohamed Aziz Lahmar.</p>
                        <p>Age : 23</p>
                        <p style={{fontSize:'15px'}}>Email: lahmar.mohamedaziz@esprit.tn</p>
                    </div>
                    <div className="card-footer">
                        <FontAwesomeIcon icon={faFacebook} />
                        &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faGithub} />
                        &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                </div>
            </div>
            <br></br>            <br></br>
            <br></br>

            <Footer/>

        </div>
    );
};

export default AboutUs;
