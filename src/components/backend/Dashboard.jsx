import React from "react";
import axios from 'axios';
import axiosInstance from '../../axiosInstance'; // Import the customized Axios instance
import Sidebar from "./sidebar"
import { useState, useEffect } from "react";
import Chart from 'chart.js/auto'; // Import Chart.js library

function Dashboard() {
   const [projectsData, setProjectsData] = useState([]);

   useEffect(() => {
      const fetchDataAndRenderCharts = async () => {
        try {
          const response = await axiosInstance.get('http://localhost:3001/projects/fetchProjects');
          if (!response.data || response.data.length === 0) {
            throw new Error('No projects found');
          }
          setProjectsData(response.data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
      fetchDataAndRenderCharts();
    }, []);
  
    useEffect(() => {
      if (projectsData.length > 0) {
        renderLineChart(projectsData);
        renderPieChart(projectsData);
      }
    }, [projectsData]);
  
    const countProjectsByMonth = (projects) => {
      const monthlyCounts = {};
      projects.forEach((project) => {
        const creationDate = new Date(project.creationDate);
        const month = creationDate.getMonth();
        const year = creationDate.getFullYear();
        const key = `${year}-${month}`;
        if (monthlyCounts[key]) {
          monthlyCounts[key]++;
        } else {
          monthlyCounts[key] = 1;
        }
      });
      const labels = Object.keys(monthlyCounts).sort();
      const values = labels.map((key) => monthlyCounts[key]);
      return { labels, values };
    };
  
    const renderLineChart = (projects) => {
      const data = countProjectsByMonth(projects);
      const ctx = document.getElementById('line_chart');
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Number of Projects Created',
            data: data.values,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          // Add options here if needed
        }
      });
    };
  
    const renderPieChart = (projects) => {
      const labels = projects.map((project) => project.nom);
      const data = projects.map((project) => project.members.length);
      const ctx = document.getElementById('pie_chart');
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      ctx.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderWidth: 1,
          }],
        },
        options: {
         plugins: {
            legend: {
              position: 'bottom' // Position the legend at the bottom
            }
          }
                }
      });
    };
  return (
    <div>

  <div>
<link rel="icon" href="images/fevicon.png" type="image/png" />
      <link rel="stylesheet" href="css/bootstrap.min.css" />
      <link rel="stylesheet" href="./src/components/backend/style.css" />
      <link rel="stylesheet" href="./src/components/backend/css/responsive.css" />
      <link rel="stylesheet" href="./src/components/backend/css/colors.css" />
      <link rel="stylesheet" href="./src/components/backend/css/bootstrap-select.css" />
      <link rel="stylesheet" href="./src/components/backend/css/custom.css" />
    <div className="dashboard dashboard_1">
    <div className="full_container">
       <div className="inner_container">
          <Sidebar/>

          <div id="content">

             <div className="midde_cont">
                <div className="container-fluid">
                  
                     <div className="row column1">
                        <div className="col-md-6 col-lg-3">
                           <div className="full counter_section margin_bottom_30">
                              <div className="couter_icon">
                                 <div> 
                                    <i className="fa fa-user yellow_color"></i>
                                 </div>
                              </div>
                              <div className="counter_no">
                                 <div>
                                    <p className="total_no">5</p>
                                    <p className="head_couter">Users</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                           <div className="full counter_section margin_bottom_30">
                              <div className="couter_icon">
                                 <div> 
                                    <i className="fa fa-clock-o blue1_color"></i>
                                 </div>
                              </div>
                              <div className="counter_no">
                                 <div>
                                    <p className="total_no">4</p>
                                    <p className="head_couter">Projects</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                           <div className="full counter_section ">
                              <div className="couter_icon">
                                 <div> 
                                    <i className="fa fa-cloud-download green_color"></i>
                                 </div>
                              </div>
                              <div className="counter_no">
                                 <div>
                                    <p className="total_no">7</p>
                                    <p className="head_couter">DataSets</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                           <div className="full counter_section ">
                              <div className="couter_icon">
                                 <div> 
                                    <i className="fa fa-comments-o red_color"></i>
                                 </div>
                              </div>
                              <div className="counter_no">
                                 <div>
                                    <p className="total_no">13</p>
                                    <p className="head_couter">Chats</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  
                     <div className="row column1">
  <div className="col-lg-6">
    <div className="white_shd full margin_bottom_30">
      <div className="full graph_head">
        <div className="heading1 margin_0">
          <h2>Projects Created by Month</h2>
        </div>
      </div>
      <div className="map_section padding_infor_info" style={{ height: '350px' }}> 
        <canvas id="line_chart"></canvas>
      </div>
    </div>
  </div>
  <div className="col-lg-6">
    <div className="white_shd full margin_bottom_30">
      <div className="full graph_head">
        <div className="heading1 margin_0">
          <h2>Participants by Project</h2>
        </div>
      </div>
      <div className="map_section padding_infor_info"  style={{ height: '350px',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="pie_chart"></canvas>
      </div>
    </div>
  </div>
</div>



                  </div>
                 
               </div>
            </div>
         </div>
      </div>
      <script src="js/jquery.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/animate.js"></script>
      <script src="js/bootstrap-select.js"></script>
      <script src="js/owl.carousel.js"></script> 
      <script src="js/Chart.min.js"></script>
      <script src="js/Chart.bundle.min.js"></script>
      <script src="js/utils.js"></script>
      <script src="js/analyser.js"></script>
      <script>
      </script>
      <script src="js/chart_custom_style1.js"></script>
      <script src="js/custom.js"></script>
   </div>
   </div>
   </div>
);
}

export default Dashboard;