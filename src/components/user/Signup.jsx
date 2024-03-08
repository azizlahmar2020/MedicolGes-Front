import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("male"); // Default value set to male
    const [birthdate, setBirthdate] = useState("");
    const [profileImage, setProfileImage] = useState(null); // State to store the selected profile image
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const role = location.pathname.split('/').pop();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('gender', gender);
        formData.append('birthdate', birthdate);
        formData.append('profileImage', profileImage); // Append the selected profile image to the form data

        try {
            const result = await axios.post(`http://localhost:3000/auth/register/${role}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(result);
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError("Email already exists");
            } else {
                console.log(err);
                setError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <section className="signup">
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form onSubmit={handleSubmit} className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="lastname" id="lastname" placeholder="Your Lastname" onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Repeat your password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender"><i className="zmdi zmdi-male-female"></i></label>
                                <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)} style={{ width: '100%', padding: '3px', fontSize: '16px' }} className="select-gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                </select>

                            </div>
                            <div className="form-group">
                                <label htmlFor="birthdate"><i className="zmdi zmdi-calendar"></i></label>
                                <input type="date" name="birthdate" id="birthdate" onChange={(e) => setBirthdate(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profileImage"><i className="zmdi zmdi-image"></i></label>
                                <input type="file" name="profileImage" id="profileImage" onChange={(e) => setProfileImage(e.target.files[0])} />
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure>
                            <img src="/images/register.jpg" alt="sign up image" />
                        </figure>
                        <Link to="/login" className="signup-image-link">I am already a member</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;
