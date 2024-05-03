import React from 'react';
import Navbar from '../template/navbarGeneral'; // Update import
import Footer from "../template/footer";

const Symptoms = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <iframe
        src="http://localhost:8501/"
        title="Symptoms"
        width="1920"
        height="1080"
        allowFullScreen
      />
      <Footer /> {/* Include the Footer component */}
    </div>
  );
}

export default Symptoms;
