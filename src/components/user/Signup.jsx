import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../template/navbarGeneral";
import Footer from "../template/footer";

import './signup.css';

function Signup() {
    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "male", // Default value set to male
        birthdate: "",
        
    });
    const [profileImage, setProfileImage] = useState(null); // State to store the selected profile image
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const role = location.pathname.split('/').pop();
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the custom popup

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = userData.name ? "" : "This field is required.";
        tempErrors.lastname = userData.lastname ? "" : "This field is required.";
        tempErrors.email = /\S+@\S+\.\S+/.test(userData.email) ? "" : "Email is not valid.";
        tempErrors.password = userData.password.length >= 8 ? "" : "Password must be at least 8 characters long.";
        tempErrors.confirmPassword = userData.password === userData.confirmPassword ? "" : "Passwords do not match.";
        tempErrors.birthdate = userData.birthdate ? "" : "This field is required.";

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        Object.keys(userData).forEach(key => formData.append(key, userData[key]));
        if (profileImage) formData.append('profileImage', profileImage);

        try {
            const result = await axios.post(`http://localhost:3001/auth/register/${role}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowPopup(true); // Show custom popup after successful registration

        } catch (err) {
            if (err.response && err.response.status === 409) {
                setErrors(prev => ({ ...prev, global: "Email already exists" }));
            } else {
                console.log(err);
                setErrors(prev => ({ ...prev, global: "An error occurred. Please try again later." }));
            }
        }
    };

    return (
        <section className="signup">
            <div>
                <link rel="stylesheet" type="text/css" href="/css/signup.css" />
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <form onSubmit={handleSubmit} className="register-form" id="register-form">
                                {/* Name and Lastname */}
                                <div className="form-group">
                                    <div className="name-group">
                                        <input type="text" name="name" placeholder="Your Name" value={userData.name} onChange={handleChange} />
                                        {errors.name && <p className="error">{errors.name}</p>}
                                        <input type="text" name="lastname" placeholder="Your Lastname" value={userData.lastname} onChange={handleChange} />
                                        {errors.lastname && <p className="error">{errors.lastname}</p>}
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="form-group">
                                    <input type="email" name="email" placeholder="Your Email" value={userData.email} onChange={handleChange} />
                                    {errors.email && <p className="error">{errors.email}</p>}
                                </div>
                                {/* Password and Confirm Password */}
                                <div className="form-group">
                                    <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} />
                                    {errors.password && <p className="error">{errors.password}</p>}
                                    <input type="password" name="confirmPassword" placeholder="Repeat your password" value={userData.confirmPassword} onChange={handleChange} />
                                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                                </div>
                                {/* Gender Selection */}
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" value={userData.gender} onChange={handleChange} style={{ width: '100%', padding: '3px', fontSize: '16px' }} className="select-gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                {/* Birthdate */}
                                <div className="form-group">
                                    <label>Birthdate</label>
                                    <input type="date" name="birthdate" value={userData.birthdate} onChange={handleChange} />
                                    {errors.birthdate && <p className="error">{errors.birthdate}</p>}
                                </div>
                                {/* Profile Image Upload */}
                                <div className="form-group">
                                    <label>Profile Image</label>
                                    <input type="file" name="profileImage" onChange={(e) => setProfileImage(e.target.files[0])} />
                                </div>
                                {/* Error message */}
                                {errors.global && <p className="error global-error">{errors.global}</p>}

                                {/* Submit Button */}
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" className="form-submit-reg" value="Register" />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src="/images/register.jpg" alt="sign up" />
                            </figure>
                            <Link to="/login" className="signup-image-link">I am already a member</Link>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
       
            </div>
        {showPopup && (
        <div className="custom-popup" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
            <div className="custom-popup-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
            <p>Please check your email to validate your account.</p>
            <p>If you haven't received any email, please check that you entered a valid one.</p>
            <button style={{ padding: '8px 16px', borderRadius: '3px', backgroundColor: '#ff5c5c', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setShowPopup(false)}>Close</button>
            </div>
        </div>
        )}
        </section>
    );
}

export default Signup;
