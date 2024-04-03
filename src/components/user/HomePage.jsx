import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles.css';
import Navbar from "../template/navbarGeneral";
import Footer from "../template/footer";


function HomePage() {
  return (
    <div>
    <Navbar/>
    <div className='container' style={{backgroundColor:''}}>
      <h2 style={{marginTop:'50px' ,marginBottom:'50px',textAlign: 'center' }}>Register As :</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to="/register/sub-admin" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <div className="card" style={{ width: '300px' }}>
            <img className="card-img-top" src="images/subadmin.jpg" alt="Card image" />
            <div className="card-body" style={{ height: '200px' }}>
              <h4 className="card-title" style={{ textAlign: 'center' }}>Project Initiator</h4>
              <p className="card-text" style={{ textAlign: 'center' }}>Responsible for the creation, management, and supervision of the medical data collection projects they initiate.</p>
            </div>
          </div>
        </Link>
        <Link to="/register/participant" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <div className="card" style={{ width: '300px' }}>
            <img className="card-img-top" src="images/participant.jpg" alt="Card image" />
            <div className="card-body" style={{ height: '200px' }}>
              <h4 className="card-title" style={{ textAlign: 'center' }}>Participant</h4>
              <p className="card-text" style={{ textAlign: 'center' }}>Actively contribute to the collection and analysis of medical data </p>
            </div>
          </div>
        </Link>
        <Link to="/register/patient" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <div className="card" style={{ width: '300px' }}>
            <img className="card-img-top" src="images/patient.jpg" alt="Card image" />
            <div className="card-body" style={{ height: '200px' }}>
              <h4 className="card-title" style={{ textAlign: 'center' }}>Patient</h4>
              <p className="card-text" style={{ textAlign: 'center' }}>can contribute to medical data.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default HomePage;