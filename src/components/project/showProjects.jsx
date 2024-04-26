import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaUser, FaFileAlt, FaTasks, FaCog, FaArrowLeft,FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import the default styles for react-toastify
import Sidebar from "../backend/sidebar";

function ShowProjects() {
    const [projects, setProjects] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

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
        <Sidebar /> {/* Include the Sidebar component */}
    
        <div className="main-content d-flex justify-content-center align-items-center">
            <div className="vh-100 overflow-auto">
                <div className="w-75 bg-white rounded p-3" style={{ backgroundColor: '#088fad',marginTop:'70px',marginLeft:'300px' }}>
    
                    {/* React-toastify container */}
                    <ToastContainer position="top-right" autoClose={3000} />
    
                    {successMessage && <p className="text-success">{successMessage}</p>}
    
                    <table className="table table-bordered">
                    <thead style={{ backgroundColor: '#088fad', color: 'white' }}>
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
                                    <td style={{ minWidth: '200px' }}>{project.nom}</td>
                                    <td style={{ minWidth: '400px' }}>{project.desc}</td>
                                    <td style={{ minWidth: '200px' }}>{project.responsable}</td>
                                    <td style={{ minWidth: '200px' }}>{project.domaine}</td>
                                    <td style={{ minWidth: '200px' }}>
                                        <Link to={`/updateProject/${project._id}`} className="btn btn-success btn-sm mr-1">
                                            <FaEdit /> 
                                        </Link>
                                        <button onClick={() => handleDelete(project._id, project.nom)} className="btn btn-danger btn-sm mr-1" style={{color :'red'}}>
                                            <FaTrash /> 
                                        </button>
                                        <Link to={`/showProjectback/${project._id}`} className="btn btn-primary btn-sm"style={{color :'#088fad'}}>
                                            <FaEye/>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default ShowProjects;