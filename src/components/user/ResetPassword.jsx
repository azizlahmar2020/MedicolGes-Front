// ResetPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../template/navbarGeneral';
import Footer from '../template/footer';
const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const extractedToken = searchParams.get('token');
        setToken(extractedToken);
    }, []);

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:3001/auth/reset-password/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                setMessage('Password reset successfully');
            } else {
                setMessage('Failed to reset password');
            }
        } catch (error) {
            setMessage('An error occurred');
            console.error(error);
        }
    };

    return (
      <div>
      <Navbar/>

      <div style={{ backgroundColor: '', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card mx-auto" style={{ maxWidth: '100%' }}> 
                    <div className="card-body">
                        <div className="row g-0">
                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <img src="./src/assets/img/forgot.png" alt="Descriptive Alt Text" style={{ width: '2000px', height: '250px' }} />
                            </div>
                            <div className="col-md-6">
                                <h2 className="card-title" style={{marginBottom:'30px',marginTop:'20px'}}>Reset Password</h2>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <button onClick={handleResetPassword} className="btn btn-primary" style={{ backgroundColor: '#2b8c7b', width:'170px', height:'38px',color:'white' }}>Reset Password</button>
                                {message && <p>{message}</p>}
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
};

export default ResetPasswordPage;
