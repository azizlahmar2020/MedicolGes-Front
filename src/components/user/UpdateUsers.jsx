import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Dashboard from "../backend/Dashboard";

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");
    
    useEffect(() => {
        // Fetch user data to pre-fill the form
        axios.get(`http://localhost:3000/users/getUser/${id}`)
            .then(result => {
                const userData = result.data;
                setName(userData.name || "");
                setLastname(userData.lastname || "");
                setEmail(userData.email || "");
                setGender(userData.gender || "");
                setBirthdate(userData.birthdate || "");
            })
            .catch(err => {
                console.log(err);
                setError("Failed to fetch user data");
            });
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Create a FormData object to store form data including the profile image
            const formData = new FormData();
            formData.append('name', name);
            formData.append('lastname', lastname);
            formData.append('email', email);
            formData.append('gender', gender);
            formData.append('birthdate', birthdate);
            formData.append('profileImage', profileImage); // Append the profile image
            
            // Send a PUT request to update the user data
            const updateUserResponse = await axios.put(`http://localhost:3000/users/updateUser/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Handle successful update
            console.log(updateUserResponse);
            // Redirect or perform any other action upon successful update
        } catch (error) {
            // Handle errors
            console.error('Error updating user:', error);
            setError("An error occurred while updating user");
        }
    };
    
    return (
        <div>
            <Dashboard />
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'white' }}>
                <div className="bg-white p-3 rounded w-25">
                    <h1>Update User</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control rounded-0" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname"><strong>Lastname</strong></label>
                            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control rounded-0" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control rounded-0" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender"><strong>Gender</strong></label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-control rounded-0">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate"><strong>Birthdate</strong></label>
                            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="form-control rounded-0" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="profileImage"><strong>Profile Image</strong></label>
                            <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="form-control rounded-0" />
                        </div>                    
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-success w-100 rounded-0" style={{ backgroundColor: '#031738' }}>Update</button>
                    </form>
                    <Link to="/showUsers" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Cancel</Link>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
