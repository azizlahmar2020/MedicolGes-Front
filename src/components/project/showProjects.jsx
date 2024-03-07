import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaUser, FaFileAlt, FaTasks, FaCog, FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import the default styles for react-toastify
import Footer from "/src/components/template/footer";
import NavbarSub from '../template/navbarSubadmin';

function ShowProjects() {
    const [projects, setProjects] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:3000/projects/showProjects');
            setProjects(result.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleDelete = async (projectId, projectName) => {
        try {
            await axios.delete(`http://localhost:3000/projects/deleteProject/${projectId}`);

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
                <div className=" vh-100 overflow-auto">
                    <div className="w-100 bg-white rounded p-3">
                        <Link to="/homeprojects" className="go-back-btn">
                            <FaArrowLeft /> Go Back
                        </Link>
                        <h3>List Of Projects</h3>

                        {/* React-toastify container */}
                        <ToastContainer position="top-right" autoClose={3000} />

                        {successMessage && <p className="text-success">{successMessage}</p>}

                        <table className="table">
                            <thead>
                                <tr>
                                    <th><FaFileAlt /> Name</th>
                                    <th><FaTasks /> Description</th>
                                    <th><FaUser /> Responsable</th>
                                    <th><FaCog /> Domaine</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project._id}>
                                        <td>{project.nom}</td>
                                        <td>{project.desc}</td>
                                        <td>{project.responsable}</td>
                                        <td>{project.domaine}</td>
                                        <td>
                                            <Link to={`/updateProject/${project._id}`} className="btn btn-success">
                                                <FaEdit /> Edit
                                            </Link>
                                            <button onClick={() => handleDelete(project._id, project.nom)} className="btn btn-danger">
                                                <FaTrash /> Delete
                                            </button>
                                            <Link to={`/showProject/${project._id}`} className="btn btn-primary">
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ShowProjects;