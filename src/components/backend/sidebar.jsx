import React from "react";
function Sidebar() {

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

</div>
   <ul className="list-unstyled components">
      <li className="active">
         <a href="/dashboard"><i className="fa fa-dashboard yellow_color"></i> <span>Dashboard</span></a>
        
      </li>
      <li><a href="/showProjects"><i className="fa fa-clock-o orange_color"></i> <span>Projects</span></a></li>
      
      <li><a href="/CategoryDetail"><i className="fa fa-table purple_color2"></i> <span>Categories</span></a></li>
      <li>
         <a href="/SubcategoryDetail" ><i className="fa fa-object-group white_color"></i> <span>SubCategories</span></a>
         
      </li>
      <li>
         <a href="/submissions" ><i className="fa fa-book white_color"></i> <span>Feedbacks</span></a>
         
      </li>
      <li><a href="/singleInstitution"><i className="fa fa-map purple_color2"></i> <span>Institutions</span></a></li>
      <li><a href="/showUsers"><i className="fa fa-user pink_color"></i> <span>Users</span></a></li>
      <li><a href="settings.html"><i className="fa fa-cog yellow_color"></i> <span>Settings</span></a></li>
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