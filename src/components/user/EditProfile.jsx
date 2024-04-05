import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Sidebar from "../backend/sidebar";
import NavbarSub from "../template/navbarSubadmin";
import Footer from "../template/footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faCalendarAlt, faEnvelope, faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
function EditProfile() {
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
                setProfileImage(userData.profileImage || ""); // Ajout de l'image de profil

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

        <NavbarSub />
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            {/* Placeholder for user profile image */}
                    
                            {profileImage && <img src={`http://localhost:3001/profiles/${profileImage}`} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />}
                            <h5 className="card-title" style={{marginTop:'20px',textAlign:'left'}}>{name} {lastname}</h5>
                            <p className="card-text"style={{marginTop:'20px',textAlign:'left'}}><FontAwesomeIcon icon={faEnvelope} /> {email}</p>
                            <p className="card-text"style={{marginTop:'20px',textAlign:'left'}}><FontAwesomeIcon icon={faVenus} /><FontAwesomeIcon icon={faMars} />  {gender}</p>
                            <p className="card-text"style={{marginTop:'20px',textAlign:'left'}}><FontAwesomeIcon icon={faCalendarAlt} />  {birthdate}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card bg-light">
                        <div className="card-body" style={{marginBottom:'40px'}}>
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
                                <div className="d-grid gap-2 d-flex justify-content-between">
    <button type="submit" className="btn rounded-pill" style={{ backgroundColor: '#2b8c7b', width:'170px', height:'38px',color:'white',marginTop:'15px' }}>
        <span style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faCheck} />
        </span>
        Update
    </button>
    <Link to="/myprofile" className="btn btn-outline-secondary rounded-pill mt-3"style={{ backgroundColor: '#c1121f', width:'170px', height:'38px',color:'white',paddingTop:'5px',fontSize:'18px' }}>
        <span style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faTimes} />
        </span>
        Cancel
    </Link>
</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
);
}

export default EditProfile;
