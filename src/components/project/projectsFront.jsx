import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaUser, FaFileAlt, FaTasks, FaCog, FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import Footer from "/src/components/template/footer";
import NavbarSub from '../template/navbarSubadmin';
import './ProjectsFront.css'; // Import CSS file for custom styles

function ProjectsFront() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:3001/projects/showProjects');
            setProjects(result.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleDelete = async (projectId, projectName) => {
        try {
            await axios.delete(`http://localhost:3001/projects/deleteProject/${projectId}`);

            // Show a success message using react-toastify
            toast.success(`${projectName}'s project successfully deleted!`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            fetchData();
        } catch (err) {
            console.error("Error deleting project:", err);
        }
    };

    return (
        <div>
            <NavbarSub/>
            <div className="main-content d-flex justify-content-center align-items-center">
                <div className="vh-100 overflow-auto">
                    <div className="w-100 bg-white rounded p-3">
                        <Link to="/homeprojects" className="go-back-btn">
                            <FaArrowLeft /> Go Back
                        </Link>
                        <h3 style={{ textAlign: 'center', color: '#1A76D1', fontWeight: 'bold' }}><FaTasks /> List Of Projects</h3>

                        <ToastContainer position="top-right" autoClose={3000} />

                        <div className="row">
                            {projects.map((project) => (
                                <div key={project._id} className="col-lg-4 col-md-6 col-12">
                                    <div className="single-schedule" style={{ backgroundColor: 'white', color: '#1A76D1', border: '1px solid #1A76D1', borderRadius: '10px', textAlign: 'center', margin: '10px', transition: 'transform 0.3s', ':hover': { transform: 'scale(1.05)' } }}>
                                        <div className="inner">
                                            <div className="icon">
                                                <FaFileAlt />
                                            </div>
                                            <div className="single-content">
                                                <span style={{ color: '#1A76D1', fontSize: '30px', fontWeight: 'bold' }}>{project.nom}</span>
                                                <h4 style={{ color: '#1A76D1', margin: '10px', fontSize: '18px' }}>{project.desc}</h4>
                                                <p style={{ color: '#1A76D1', margin: '10px', fontSize: '18px' }}>Responsable: <span style={{ color: '#1A76D1', fontWeight: 'bold' }}>{project.responsable}</span></p>
                                                <p style={{ color: '#1A76D1', margin: '10px', fontSize: '18px' }}>Domaine: <span style={{ color: '#1A76D1', fontWeight: 'bold' }}>{project.domaine}</span></p>
                                                <Link to={`/showProject/${project._id}`} className="btn btn-primary" style={{ backgroundColor: '#1A76D1', color: 'white', margin: '10px' }}>
                                                    Take Me There
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ProjectsFront;
