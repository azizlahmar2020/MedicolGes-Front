// Import necessary modules and components
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaCog, FaSignature, FaAlignJustify, FaUser, FaIndustry } from 'react-icons/fa';  // Import relevant icons
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import the default styles for react-toastify
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import Footer from "/src/components/template/footer";
import NavbarSub from '../template/navbarSubadmin';

const defaultTheme = createTheme();

const CreateProjectt = () => {
  const navigate = useNavigate();  // Initialize useNavigate
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

    // Basic form validation
    if (!formData.nom || !formData.desc || !formData.responsable || !formData.domaine) {
      toast.error('Please fill in all fields!', {
        position: 'top-center',
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
      // Send a POST request to create a new project
      const response = await axios.post('http://localhost:3000/projects/createProjectt', formData);

      // Log the created project details
      console.log('Created Project:', response.data.project);

      // Show a success message using react-toastify
      toast.success('Project created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Navigate to the project details page
      navigate(`/showProject/${response.data.project._id}`);

    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div>
      <NavbarSub/>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FaCog />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Project
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nom"
                  label="Name"
                  name="nom"
                  autoComplete="off"
                  value={formData.nom}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <FaSignature style={{ marginRight: '8px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="desc"
                  label="Description"
                  name="desc"
                  multiline
                  rows={4}
                  autoComplete="off"
                  value={formData.desc}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <FaAlignJustify style={{ marginRight: '8px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="responsable"
                  label="Responsable"
                  name="responsable"
                  autoComplete="off"
                  value={formData.responsable}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <FaUser style={{ marginRight: '8px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="domaine"
                  label="Domaine"
                  name="domaine"
                  autoComplete="off"
                  value={formData.domaine}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <FaIndustry style={{ marginRight: '8px' }} />
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Project
            </Button>
          </Box>
        </Box>
        {/* React-toastify container */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Container>
    </ThemeProvider>
    <Footer/>
    </div>
  );
};

export default CreateProjectt;