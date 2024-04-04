import React, { useEffect, useState } from "react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import { useParams, Link } from "react-router-dom";
import { FaSpinner, FaComment, FaUserPlus, FaFilePdf } from "react-icons/fa";
import ProjectPdf from "./projectpdf";
import AddMemberModal from "../project/addmembers";
import "./showProject.css";
import Sidebar from "../backend/sidebar";


const ShowProjBack = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddMember = async (projectId, memberId) => {
    try {

      if (!projectId) {
        setError("Project ID is missing.");
        return;
      }
      const response = await axios.post(`http://localhost:3001/projects/addMember/${projectId}/${memberId}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/projects/getProject/${projectId}`);
        setProjectDetails(result.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjectDetails();
  }, [projectId]);


  const exportToPdf = async () => {
    const pdfBlob = await pdf(<ProjectPdf projectDetails={projectDetails} />).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project_details.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
            <link rel="icon" href="images/fevicon.png" type="image/png" />
      <link rel="stylesheet" href="../../../src/components/backend/css/bootstrap.min.css" />
      <link rel="stylesheet" href="../../../src/components/backend/style.css" />
      <link rel="stylesheet" href="../../../src/components/backend/css/responsive.css" />
      <link rel="stylesheet" href="../../../src/components/backend/css/colors.css" />
      <link rel="stylesheet" href="../../../src/components/backend/css/bootstrap-select.css" />
      <link rel="stylesheet" href="../../../src/components/backend/css/custom.css" />
      
      <Sidebar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <legend className="card-legend">{projectDetails.nom}</legend>
              <div className="card-body">
                {loading ? (
                  <p className="text-center"><FaSpinner className="fa-spin" /> Loading...</p>
                ) : (
                  <>
                    <p className="project-info">
                      <span className="project-name">{projectDetails.nom}</span> is created by <strong>{projectDetails.responsable}</strong> which is a research in <strong>{projectDetails.domaine}</strong> field. It is about {projectDetails.desc}.
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <button className="btn btn-primary feedback-button" onClick={exportToPdf}style={{backgroundColor:'#0D819C'}}> 
                        <FaComment /> Leave a Feedback
                      </button>
                      <Link to={`/create-form`} className="btn btn-primary feedback-button" style={{backgroundColor:'#0D819C' , color:'white'}}>
                        Create a Custom Form
                      </Link>
                      <button className="btn btn-primary export-button" onClick={exportToPdf} style={{backgroundColor:'#0D819C'}}>
                        <FaFilePdf /> Export to PDF
                      </button>
                      <button className="btn btn-secondary add-member-button" onClick={() => setModalIsOpen(true)} style={{backgroundColor:'#0D819C'}}>
                        <FaUserPlus /> Add Member
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>


      <AddMemberModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        handleAddMember={(userId) => handleAddMember(projectId, userId)}
      />
    </div>
  );
};

export default ShowProjBack;
