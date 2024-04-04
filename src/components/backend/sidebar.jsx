import React, { useState,useEffect } from 'react';
import {  useNavigate } from 'react-router-dom'; // Import Link, useLocation, and useNavigate
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon from react-icons/fa
import axios from 'axios'; // Import axios for making HTTP requests

function Sidebar() {
   const [userName, setUserName] = useState('');
   const [userLastName, setUserLastName] = useState('');
   const [userImage, setUserImage] = useState('');
   const navigate = useNavigate(); // Initialize navigate function

   useEffect(() => {
      const fetchProfile = async () => {
          try {
              const token = sessionStorage.getItem('token');
              console.log('Token:', token); // Log the token for debugging
              if (!token) {
                  navigate('/login');
                  return;
              }

              const response = await axios.get('http://localhost:3001/auth/myprofile', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });

              console.log('Response status:', response.status);
              console.log('Response data:', response.data);

              // Assuming the response data structure contains user name and image URL
              setUserName(response.data.name); // Set user name
              setUserLastName(response.data.lastname); // Set user name
              setUserImage(response.data.profileImage); // Set user image URL
          } catch (error) {
              console.log('Error:', error.message);
              if (error.response && error.response.status === 401) {
                  // Unauthorized, redirect to login
                  navigate('/login');
              }
          }
      };
      fetchProfile();
  }, [navigate]);

  
    // Function to handle logout
    const handleLogout = () => {
      sessionStorage.removeItem('token'); // Clear session token
      navigate('/index'); // Redirect to index page
  };

  return (
    <div>
    <link rel="icon" href="images/fevicon.png" type="image/png" />
      <link rel="stylesheet" href="css/bootstrap.min.css" />
      <link rel="stylesheet" href="./src/components/backend/style.css" />
      <link rel="stylesheet" href="./src/components/backend/css/responsive.css" />
      <link rel="stylesheet" href="./src/components/backend/css/colors.css" />
      <link rel="stylesheet" href="./src/components/backend/css/bootstrap-select.css" />
      <link rel="stylesheet" href="./src/components/backend/css/custom.css" />
<nav id="sidebar">
<div className="sidebar_blog_1">
   <div className="sidebar-header">
      <div className="logo_section">
         <a href="index.html"><img className="logo_icon img-responsive" src="css/logoM.jpg" alt="no" /></a>
      </div>
   </div>
   
</div>
<div className="sidebar_blog_2">
<div className="heading1 margin_0">
  <h4>General</h4>
  <div className="user-info" style={{ display: 'flex', alignItems: 'right' }}>
                    {userImage && <img src={`http://localhost:3001/profiles/${userImage}`} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', marginTop: '10px', marginRight: '10px' }} />}
                    <span className="user-name">      
                    <p style={{color:'white',marginTop:'20px'}}> {userName} {userLastName}</p>
                    </span>
                    <div className="logout-icon" onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '10px',marginTop:'6px' }}>
                    <FaSignOutAlt size={20} />
                </div>
                </div>
</div>
   <ul className="list-unstyled components">
      <li className="active">
         <a href="/dashboard"><i className="fa fa-dashboard yellow_color"></i> <span>Dashboard</span></a>
        
      </li>
      <li><a href="/showProjects"><i className="fa fa-clock-o orange_color"></i> <span>Projects</span></a></li>
      
      <li><a href="/CreateCategory"><i className="fa fa-table purple_color2"></i> <span>Categories</span></a></li>
      <li>
         <a href="/CreateSubcategory" ><i className="fa fa-object-group white_color"></i> <span>SubCategories</span></a>
         
      </li>
      <li>
         <a href="/submissions" ><i className="fa fa-book white_color"></i> <span>Feedbacks</span></a>
         
      </li>
      <li><a href="/createInstitution"><i className="fa fa-map purple_color2"></i> <span>Institutions</span></a></li>
      <li><a href="/showUsers"><i className="fa fa-user pink_color"></i> <span>Users</span></a></li>
   </ul>
</div>
</nav>

<div className="topbar">
                  <nav className="navbar navbar-expand-lg navbar-light">
                     <div className="topbar">
                        <button type="button" id="sidebarCollapse" className="sidebar_toggle"><i className="fa fa-bars"></i></button>
                        <div className="logo_section">
                        </div>
                        
                     </div>
                  </nav>
               </div>
</div>
);
}

export default Sidebar;