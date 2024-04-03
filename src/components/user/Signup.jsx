import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from '../template/navbarGeneral'; // Adjust the path as per your project structure
import Footer from '/src/components/template/footer'; // Adjust the path as per your project structure
import './signup.css';

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
            const result = await axios.post(`http://localhost:3001/auth/register/${role}`, formData, {
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
        <div>
            <Navbar />
            <section className="signup">
                <link rel="stylesheet" type="text/css" href="/css/signup.css" />
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up <i className="zmdi zmdi-account-add"></i></h2>
                            <form onSubmit={handleSubmit} className="register-form" id="register-form">
                                <div className="form-group">
                                    <div className="name-group">
                                        <input type="text" name="name" id="name" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
                                        <input type="text" name="lastname" id="lastname" placeholder="Your Lastname" onChange={(e) => setLastname(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" id="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Repeat your password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>
                                    <div className="radio-group">
                                        <label>
                                            <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} />
                                            Male
                                        </label>
                                        <label>
                                            <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} />
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthdate">Birth Date:</label>
                                    <input type="date" name="birthdate" id="birthdate" onChange={(e) => setBirthdate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="profileImage">Profile Picture:</label>
                                    <input type="file" name="profileImage" id="profileImage" onChange={(e) => setProfileImage(e.target.files[0])} />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit"  id="signup" className="form-submit-reg" value="Register" />
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
            <Footer />
        </div>
    );
}

export default Signup;
