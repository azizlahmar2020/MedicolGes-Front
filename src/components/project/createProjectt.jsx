import React, { useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Import the react-toastify CSS file
import { Navbar } from "react-bootstrap";
import NavbarSub from "../template/navbarSubadmin";

const CreateProjectt = () => {
  useEffect(() => {
      const script = document.createElement('script');
      script.src = './src/assets/js1/jquery.min.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
          $('.form-control').each(function () {
              floatedLabel($(this));
          });

          $('.form-control').on('input', function () {
              floatedLabel($(this));
          });

          function floatedLabel(input) {
              var $field = input.closest('.form-group');
              if (input.val()) {
                  $field.addClass('input-not-empty');
              } else {
                  $field.removeClass('input-not-empty');
              }
          }
      };

      return () => {
          document.body.removeChild(script);
      };
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
      nom: '',
      desc: '',
      responsable: '',
      domaine: '',
  });

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.nom || !formData.desc || !formData.responsable || !formData.domaine) {
          toast.error('Please fill in all fields!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
          return;
      }

      try {
        const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await axios.post('http://localhost:3001/projects/createProjectt', formData, axiosConfig);
  
        console.log('Created Project:', response.data.project);
  

          toast.success('Project created successfully!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });

          navigate(`/showProject/${response.data.project._id}`);

      } catch (error) {
          console.error('Error creating project:', error);
      }
  };

    return (
        <div>
            <NavbarSub/>
            {/* Add meta tags and external CSS links */}
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Booking Form HTML Template</title>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet" />
            <link type="text/css" rel="stylesheet" href="./src/assets/cssproject/bootstrap.min.css" />
            <link type="text/css" rel="stylesheet" href="./src/assets/cssproject/style.css" />
            <link rel="stylesheet" type="text/css" href="./src/assets/style.css" />

            <div id="booking" className="section" style={{backgroundImage: `url('./src/assets/img/signup-bg.jpg')`}}>

                <div className="section-center" >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="booking-cta">
                                <h1 style={{ color: '#088fad' }}>CREATE YOUR PROJECT</h1>
                                    <p>Medical research plays a crucial role in improving patient care. By conducting research projects, we contribute to the collective effort of finding solutions to complex medical challenges.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-md-offset-1">
                                <div className="booking-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="nom"
                                                placeholder="Name"
                                                value={formData.nom}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="tel"
                                                name="responsable"
                                                placeholder="Responsable"
                                                value={formData.responsable}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="domaine"
                                                placeholder="Domaine"
                                                value={formData.domaine}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="desc"
                                                placeholder="Description"
                                                value={formData.desc}
                                                onChange={handleChange}
                                                style={{ height: '120px' }}
                                            />
                                        </div>

                                        <div className="form-btn">
                                        <button className="submit-btn" type="submit" style={{ backgroundColor: '#088fad', color: 'white', transition: 'background-color 0.3s', cursor: 'pointer' }}>
  Create Project
</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* React-toastify container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default CreateProjectt;
