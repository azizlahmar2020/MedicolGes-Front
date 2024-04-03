import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './login.css';
import Navbar from "../template/navbarGeneral";
import Footer from "../template/footer";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3001/auth/login', { email, password });
            console.log(result);
            if (result && result.data && result.data.token) {
                sessionStorage.setItem('token', result.data.token);
                navigate('/homesub');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
        <section className="login">
            <link rel="stylesheet" type="text/css" href="../../../public/css/style.css" />
            <div className="container text-center" style={{ marginTop: "200px" }}>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card-body d-flex">
                            <div className="flex-fill">
                                <h2 className="card-title" style={{ marginTop: "15px" , marginBottom:'70px'}}>Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Your Email"
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group password-input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div
                                            className="eye-icon"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            ) : (
                                                <FontAwesomeIcon icon={faEye} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="btn"
                                            style={{ backgroundColor: '#2b8c7b', width:'170px', height:'38px',color:'white' }}
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <Link to="/forgot-password">Forgot Password</Link>

                                </form>
                                <div className="mt-3">
                                    <Link to="/homepage" className="btn btn-link" style={{marginBottom:'20px', marginTop:'5px', backgroundColor:'transparent', border:'transparent', color:'#2b8c7b'}}>Create an account</Link>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex align-items-center justify-content-end">
                                <img src='/images/login.jpg' className="img-fluid" alt="login image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}

export default Login;
