import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Sidebar from "../backend/sidebar";

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
        axios.get(`http://localhost:3001/users/getUser/${id}`)
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
            const updateUserResponse = await axios.put(`http://localhost:3001/auth/editProfile/${id}`, formData, {
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
            <link rel="icon" href="images/fevicon.png" type="image/png" />
      <link rel="stylesheet" href="../../../src/components/backend/css/bootstrap.min.css" />
      <link rel="stylesheet" href="../../../src/components/backend/style.css" />
      <link rel="stylesheet" href="../../../src/components/backend/css/responsive.css" />
      <link rel="stylesheet" href="../../../src/components/backend/css/colors.css" />
      <link rel="stylesheet" href="../../../src/components/backend/css/bootstrap-select.css" />
      <link rel="stylesheet" href="../../../src/components/backend/css/custom.css" />
            <Sidebar />
            <div className="container">
    <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-8 bg-white p-8 rounded">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label"><strong>Lastname</strong></label>
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label"><strong>Gender</strong></label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-select">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label"><strong>Birthdate</strong></label>
                    <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="profileImage" className="form-label"><strong>Profile Image</strong></label>
                    <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="form-control" />
                </div>                    
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success rounded-pill">Update</button>
                    <Link to="/showUsers" className="btn btn-outline-secondary rounded-pill mt-3">Cancel</Link>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
    );
}

export default UpdateUser;
