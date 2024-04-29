// ProjectsFront.jsx
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import Footer from "/src/components/template/footer";
import NavbarSub from '../template/navbarSubadmin';
import './ProjectsFront.css'; // Import CSS file for custom styles
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';

function ProjectsFront() {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterField, setFilterField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
      try {
          const result = await axios.get('http://localhost:3001/projects/showProjectsOfUser', {
              headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              },
          });
          setProjects(result.data);
      } catch (err) {
          console.log(err);
      }
  };

  const handleDelete = async (projectId, projectName) => {
      try {
          await axios.delete(`http://localhost:3001/projects/deleteProject/${projectId}`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          });
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


  const filteredProjects = projects.filter((project) => {
      for (const field in project) {
        if (
          project[field] &&
          project[field]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });

  const sortedProjects = filteredProjects.sort((a, b) => {
      const fieldA = a[filterField] ? a[filterField].toLowerCase() : "";
      const fieldB = b[filterField] ? b[filterField].toLowerCase() : "";
      if (fieldA < fieldB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

  return (
    <div>
        <NavbarSub/>
        <div className="main-content d-flex justify-content-center align-items-center">
            <div className="vh-100 overflow-auto">
                <div className="w-100 bg-white rounded p-3">
                    <Link to="/homeprojects" className="go-back-btn">
                    </Link>
                    <h3 style={{ textAlign: 'center', color: '#16a085', fontWeight: 'bold' }}>List Of Projects</h3>

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search projects"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <button className="search-btn"><FaSearch /></button>
                    </div>

                    <div className="filter-bar">
                        <select value={filterField} onChange={e => setFilterField(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="desc">Description</option>
                            <option value="responsable">Responsible</option>
                            <option value="domaine">Domain</option>
                        </select>
                        <button className="sort-btn" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                            {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
                        </button>
                    </div>

                    <ToastContainer position="top-right" autoClose={3000} />

                    <div className="row">
                        {sortedProjects.map((project) => (
                            <div key={project._id} className="col-lg-4 col-md-6 col-12">
                                <MDBCard className="single-schedule">
                                <MDBCardBody>
    <MDBCardTitle>{project.nom}</MDBCardTitle>
    <hr style={{ margin: "10px 0", borderColor: "#7f8c8d", borderWidth: "2px" }} /> {/* Add a divider line */}
    <MDBCardText>{project.desc}</MDBCardText>
    <MDBCardText><strong>Responsable:</strong> {project.responsable}</MDBCardText>
<MDBCardText><strong>Domaine:</strong> {project.domaine}</MDBCardText>
    <Link
        to={`/showProject/${project._id}`}
        className="btn btn-primary"
        style={{
            backgroundColor: '#16a085',
            color: '#ccc',
            borderRadius: '5px'
        }}
    >
        Take Me There
    </Link>
</MDBCardBody>
                                </MDBCard>
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