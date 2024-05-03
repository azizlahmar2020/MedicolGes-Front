import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Sidebar from "../backend/sidebar";
import NavbarSub from "../template/navbarSubadmin";
import Footer from "../template/footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faCalendarAlt, faEnvelope, faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

function EditProfile() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [job, setJob] = useState("");
    const [institution, setInstitution] = useState("");
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [error, setError] = useState("");
    const [isEditProfileClicked, setIsEditProfileClicked] = useState(true);
    const [institutions, setInstitutions] = useState([]);
    const medicalResearchJobs = ["Research Scientist",
    "Laboratory Technician",
    "Medical Writer",
    "Doctor"
]

    ;

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
                setProfileImage(userData.profileImage || "");
                setJob(userData.job || "");
                setInstitution(userData.institution || "");
    
                // Fetch existing institutions
                axios.get(`http://localhost:3001/institutions`)
                    .then(result => {
                        setInstitutions(result.data); 
                        console.log(result.data)
                        // Assuming result.data is an array of institution objects
                    })
                    .catch(err => {
                        console.log(err);
                        setError("Failed to fetch institutions");
                    });
            })
            .catch(err => {
                console.log(err);
                setError("Failed to fetch user data");
            });
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('lastname', lastname);
            formData.append('email', email);
            formData.append('gender', gender);
            formData.append('birthdate', birthdate);
            formData.append('profileImage', profileImage);
            formData.append('job', job);
            formData.append('institution', institution);
            const updateUserResponse = await axios.put(`http://localhost:3001/auth/editProfile/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(updateUserResponse);
        } catch (error) {
            console.error('Error updating user:', error);
            setError("An error occurred while updating user");
        }
    };
    const updateJobAndInstitution = async () => {
        try {
            const updateUserResponse = await axios.put(`http://localhost:3001/users/updateJobAndInstitution/${id}`, {
                job,
                institution
            });
            console.log(updateUserResponse);
        } catch (error) {
            console.error('Error updating job and institution:', error);
            setError("An error occurred while updating job and institution");
        }
    };
    

    const toggleAdditionalInfo = () => {
        setShowAdditionalInfo(!showAdditionalInfo);
        setIsEditProfileClicked(false);
    };

    const toggleEditProfile = () => {
        setIsEditProfileClicked(true);
        setShowAdditionalInfo(false);
    };

    return (
        <div>
            <NavbarSub />
            <div className="container mt-5" style={{marginBottom:'80px'}}>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="card mb-3" >
                            <div className="card-body text-center">

                                {profileImage && <img src={`http://localhost:3001/profiles/${profileImage}`} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '50%', marginLeft:'30px',marginTop:'40px' }} />}
                                <h5 className="card-title" style={{ marginTop: '10px', textAlign: 'center' }}>{name} {lastname}</h5>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'20px' }}>
                                    <button onClick={toggleAdditionalInfo} className="btn" style={{ backgroundColor: '#2b8c7b', width:'170px', height:'38px',color:'white' }}>
                                        { "Add Infos"}
                                        <FontAwesomeIcon icon={showAdditionalInfo ? faTimes : faPlus} style={{ marginLeft: '5px' }} />
                                    </button>
                                    <button onClick={toggleEditProfile} className="btn " style={{ backgroundColor: '#2b8c7b', width:'170px', height:'38px',color:'white',marginLeft: '10px'  }}>
                                        Edit Profile
                                    </button>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card bg-light" >
                            <div className="card-body" style={{ marginBottom: '100px' }}>
                                {isEditProfileClicked ? (
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
                                        <div className="d-grid gap-2 d-flex justify-content-between">
                                            <button type="submit" className="btn rounded-pill" style={{ backgroundColor: '#2b8c7b', width: '170px', height: '38px', color: 'white', marginTop: '15px' }}>
                                                <span style={{ marginRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                Update
                                            </button>
                                            <Link to="/myprofile" className="btn btn-outline-secondary rounded-pill mt-3" style={{ backgroundColor: '#c1121f', width: '170px', height: '38px', color: 'white', paddingTop: '5px', fontSize: '18px' }}>
                                                <span style={{ marginRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                                Cancel
                                            </Link>
                                        </div>
                                    </form>
                                ) : (
                                    <form>
                                    <label htmlFor="job" className="form-label"><strong>Job</strong></label>
                                       <select value={job} onChange={(e) => setJob(e.target.value)} className="form-select">
                                        <option value="">Select Job</option>
                                        {medicalResearchJobs.map((job, index) => (
                                            <option key={index} value={job}>{job}</option>
                                        ))}
                                    </select>
                                    <div className="mb-3">
    <label htmlFor="institution" className="form-label"><strong>Institution</strong></label>
    <select value={institution} onChange={(e) => setInstitution(e.target.value)} className="form-select">
        <option value="">Select Job</option>
        {institutions.map((inst, index) => (
            <option key={index} value={inst.id}> {inst.address}</option>
        ))}
    </select>
</div>


                                        <div className="d-grid gap-2 d-flex justify-content-between">
                                        <button onClick={updateJobAndInstitution} className="btn rounded-pill" style={{ backgroundColor: '#2b8c7b', width: '170px', height: '38px', color: 'white', marginTop: '15px' }}>
                                                <span style={{ marginRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                Update
                                            </button>
                                            <Link to="/myprofile" className="btn btn-outline-secondary rounded-pill mt-3" style={{ backgroundColor: '#c1121f', width: '170px', height: '38px', color: 'white', paddingTop: '5px', fontSize: '18px' }}>
                                                <span style={{ marginRight: '5px' }}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                                Cancel
                                            </Link>
                                        </div>
                                    </form>
                                )}
                                {error && <div className="alert alert-danger">{error}</div>}
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
