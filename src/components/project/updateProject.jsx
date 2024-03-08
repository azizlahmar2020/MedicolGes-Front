// Import necessary modules and components
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { FaFileAlt, FaTasks, FaUser, FaCog, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import the default styles for react-toastify
import Footer from "/src/components/template/footer";
import NavbarSub from '../template/navbarSubadmin';
function UpdateProject() {
    const { projectId } = useParams();
    const [project, setProject] = useState({
        nom: "",
        desc: "",
        responsable: "",
        domaine: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch project details for the specified projectId
        axios.get(`http://localhost:3000/projects/getProject/${projectId}`)
            .then(result => setProject(result.data))
            .catch(err => console.log(err));
    }, [projectId]);

    const handleUpdate = async () => {
        try {
            // Send a PUT request to update the project
            const result = await axios.put(`http://localhost:3000/projects/updateProject/${projectId}`, project);
            console.log("Project updated successfully:", result.data);

            // Show a success message using react-toastify
            toast.success(`${result.data.nom}'s project officially updated!`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Redirect to ShowProjects after a short delay
            setTimeout(() => {
                navigate("/showProjects");
            }, 2000); // 5000 milliseconds (5 seconds) delay
        } catch (err) {
            console.log("Error updating project:", err);
        }
    };

    const handleDelete = async () => {
        try {
            // Send a DELETE request to delete the project
            const result = await axios.delete(`http://localhost:3000/projects/deleteProject/${projectId}`);
            console.log("Project deleted successfully:", result.data.message);

            // Show a success message using react-toastify
            toast.success(`${result.data.nom}'s project officially deleted!`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Redirect to ShowProjects after a short delay
            setTimeout(() => {
                navigate("/showProjects");
            }, 1000); // 1000 milliseconds (1 second) delay
        } catch (err) {
            console.log("Error deleting project:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prevProject => ({
            ...prevProject,
            [name]: value,
        }));
    };

    return (
        <div>
            <NavbarSub/>
            <div className="main-content d-flex justify-content-center align-items-center">
                <div className=" vh-100 overflow-auto">
                    <div className="w-100 bg-white rounded p-3">
                        <h2>Update Project</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nom" className="form-label"><FaFileAlt /> Project Name</label>
                                <input type="text" className="form-control" id="nom" name="nom" value={project.nom} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label"><FaTasks /> Description</label>
                                <textarea className="form-control" id="desc" name="desc" value={project.desc} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="responsable" className="form-label"><FaUser /> Responsable</label>
                                <input type="text" className="form-control" id="responsable" name="responsable" value={project.responsable} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="domaine" className="form-label"><FaCog /> Domaine</label>
                                <input type="text" className="form-control" id="domaine" name="domaine" value={project.domaine} onChange={handleChange} required />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}><FaCheckCircle /> Update Project</button>
                            <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}><FaTrash /> Delete Project</button>
                        </form>
                        {/* React-toastify container */}
                        <ToastContainer position="top-right" autoClose={3000} />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default UpdateProject;