// HomeProject.js
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa';
import './homeProject.css';  // Import the CSS file
import Navbar from "/src/components/template/navbarSubadmin";
import Footer from "/src/components/template/footer";
import NavbarSub from "../template/navbarSubadmin";
const HomeProject = () => {
    return (
        <div>
            <NavbarSub/>
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 mb-5">
                    {/* Content on the left */}
                    <h1 className="mb-2 welcome-text" style={{marginTop: '80px'}}>Welcome to Project Management</h1>
                    <p className="lead mb-5">
                        Explore and manage your projects with ease. Discover how project creations in MediColGes contribute to enriching medical research and advancing healthcare solutions.
                    </p>
                    <div className="mt-4">
    <Link to="/createProjectt" className="btn btn-blue me-2" style={{ color: 'white', padding: '12px 24px', fontSize: '16px' }}>Create a New Project</Link>
    <Link to="/projectfront" className="btn btn-transparent-blue" style={{ padding: '12px 24px', fontSize: '16px' }}>Take a Look at Your Previous Projects</Link>
</div>
                </div>
                <div className="col-md-6">
                    {/* Image on the right */}
                    <img src='./src/assets/img/project.png' alt="Medical Research Image" className="img-fluid" />
                </div>
            </div>
<div>
    <br></br><br></br>    <br></br><br></br>

</div>
            {/* Additional section with more space */}
            <div className="row justify-content-center align-items-center mt-5 additional-section">
                <div className="col-md-6">
                    {/* Image on the left */}
                    <img src='/images/health.jpg' alt="Custom Forms Image" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    {/* Content on the right */}
                    <h1 className="mb-3 welcome-text">Custom Forms Management</h1>
                    <p className="lead mb-5">
                    Enhance project efficiency by creating custom forms tailored to your specific project needs. These custom forms can streamline data collection, improve collaboration among team members, and ultimately contribute to the success of your projects.
                    </p>
                    <div className="mt-4">
                    <Link to="/list-form" className="btn btn-blue me-2" style={{ color: 'white', padding: '12px 24px', fontSize: '16px' }}>Explore Custom Forms</Link>
                        {/* Add another Link if needed */}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default HomeProject;