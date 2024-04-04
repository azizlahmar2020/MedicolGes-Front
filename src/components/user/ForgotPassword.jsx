import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../template/navbarGeneral';
import Footer from '../template/footer';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
            console.error(error);
        }
    };

    return (
        <div>
                   <Navbar/>

        <div style={{ backgroundColor: '', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="container" >
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card mx-auto" style={{ maxWidth: '100%'}}> 
              <div className="row g-0">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                <img src="./src/assets/img/preview.jpg" alt="Descriptive Alt Text" style={{ width: '2000px', height: '400px' }} />
                </div>
                <div className="col-md-5">
                  <h1 style={{marginBottom:'30px',marginTop:'30px'}}>Forgot password?</h1>

                    <h5 className="card-title" style={{marginBottom:'30px'}}>Enter your email and we will send you a link to reset your password</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="row justify-content-center">
                      <div style={{marginBottom:'30px'}}>
                        <label className="card-title" htmlFor="email" style={{fontSize:'18px'}}>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      {message && <p className="mt-3">{message}</p>}

                      <button type="submit" className="btn btn-primary"style={{ backgroundColor: '#2b8c7b', width:'170px', height:'38px',color:'white' }}>Submit</button>
                      <Link to="/login" className="btn btn-primary"style={{ backgroundColor: '#2b8c7b', width:'170px', height:'38px',color:'white' }}>Back to Login</Link>


                      </div>
                    </form>
                    <div className="mt-3">
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
      </div>

    );
}

export default ForgotPassword;
