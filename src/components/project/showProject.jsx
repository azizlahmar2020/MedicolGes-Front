import React, { useEffect, useState } from "react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";

import { useParams, Link } from "react-router-dom";
import { FaSpinner, FaTag, FaAlignLeft, FaUser, FaCode, FaTable, FaComment, FaArrowLeft } from "react-icons/fa";
import Footer from "/src/components/template/footer";
import NavbarSub from "../template/navbarSubadmin";
import ProjectPdf from "./projectpdf";

const ShowProject = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(true);

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
      <NavbarSub />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="bg-white rounded p-3">
              <Link to="/showprojects" className="go-back-btn">
                <FaArrowLeft /> Go Back
              </Link>
              <h3 className="mb-4">
                <FaTable /> Project Details
              </h3>
              {loading ? (
                <p className="text-center">
                  <FaSpinner className="fa-spin" /> Loading...
                </p>
              ) : (
                <>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row">
                          <FaAlignLeft /> Name
                        </th>
                        <td>{projectDetails.nom}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <FaCode /> Description
                        </th>
                        <td>{projectDetails.desc}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <FaUser /> Responsable
                        </th>
                        <td>{projectDetails.responsable}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <FaCode /> Domaine
                        </th>
                        <td>{projectDetails.domaine}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary feedback-button">
                      <FaComment /> Drop a Feedback
                    </button>
                    <Link to={`/formBuilder`} className="btn btn-primary feedback-button">
                      Create a Custom Form
                    </Link>
                    <button className="btn btn-primary" onClick={exportToPdf}>
                      Export to PDF
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowProject;
