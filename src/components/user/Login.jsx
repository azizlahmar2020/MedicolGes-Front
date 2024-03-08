import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3001/auth/login', { email, password });
            console.log(result);
            if (result && result.data && result.data.token) {
                sessionStorage.setItem('token', result.data.token);
                navigate('/myprofile');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="login">
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <div className="container text-center" style={{marginTop:"200px"}}> {/* Added text-center class */}
                <div className="row justify-content-center">
                    <div className="col-lg-60"> {/* Changed column size to 8 */}
                            <div className="card-body d-flex">
                                <div className="flex-fill mr-3"> {/* Added mr-3 class for margin */}
                                    <h2 className="card-title" style={{marginTop:"15px"}}>Login</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Your Email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name="password" id="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-block" style={{ backgroundColor: '#1A76D1' }}>Login</button>
                                        </div>
                                    </form>
                                    <div className="mt-3">
                                        <Link to="/homepage" className="btn btn-link">Create an account</Link>
                                    </div>
                                </div>
                                <div className="flex-fill d-flex align-items-center justify-content-center" style={{ maxWidth: "40%" }}> {/* Adjusted max-width */}
                                    <img src='/images/login.jpg' className="img-fluid" alt="login image" /> {/* Removed inline styling */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default Login;
