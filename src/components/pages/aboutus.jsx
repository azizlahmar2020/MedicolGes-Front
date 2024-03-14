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
                        <p className="card-text">Sarra Sahli, a 23 years old girl who's good at everything she does.</p>
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
                        <p className="card-text">Rayen Jouida, a 23 years old boy who can beat any ass in ea fc.</p>
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
                        <p className="card-text">Aziz Azizi, a 22 years old boy 3andou abann ftayer w s7ifet sohlob feddenya.</p>
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
                        <p className="card-text">Aziz Lahmar, haggani.</p>
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
