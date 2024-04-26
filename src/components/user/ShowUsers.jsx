import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import axiosInstance from '../../axiosInstance'; // Import the customized Axios instance
import Sidebar from "../backend/sidebar";

function ShowUsers(){
    const [users, setUsers]= useState([]);
    const [sessionId, setSessionId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('');

    useEffect(() => {
        const fetchSessionId = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found in sessionStorage');
                }
                
                // Fetch the users and session ID
                const response = await axiosInstance.get('/users/showUsers');
                console.log('Response:', response); // Log the entire response
                
                if (response.data && response.data.sessionId) {
                    setSessionId(response.data.sessionId);
                } else {
                    throw new Error('Session ID not found in response data');
                }
            } catch (error) {
                console.error('Error fetching session ID:', error);
            }
        };
        
        fetchSessionId();
    }, []);

    useEffect(() => {
        axiosInstance.get('/users/showUsers')
            .then(result => {
                if (result.data && Array.isArray(result.data.users)) {
                    setUsers(result.data.users);
                } else {
                    throw new Error('Invalid user data received');
                }
            })
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const deleteUser = (userId) => {
        // Send a DELETE request to the backend API endpoint for deleting the user
        axios.delete(`http://localhost:3001/users/deleteUser/${userId}`)
            .then(response => {
                // Filter out the deleted user from the local state
                setUsers(users.filter(user => user._id !== userId));
            })
            .catch(err => console.log(err));
    };
    const updateUserRole = (userId) => {
        const userToUpdate = users.find(user => user._id === userId);
    
        // Determine the new role based on the current role
        let newRole;
        if (userToUpdate.role === "participant") {
            newRole = "coordinator";
        } else if (userToUpdate.role === "coordinator") {
            newRole = "participant";
        } else {
            // If the role is neither participant nor coordinator, do not update
            return;
        }
    
        axios.put(`http://localhost:3001/users/updateUserRole/${userId}`, { newRole })
            .then(response => {
                // Update the role in the local state (users array)
                const updatedUsers = users.map(user =>
                    user._id === userId ? { ...user, role: newRole } : user
                );
                setUsers(updatedUsers); // Assuming setUsers updates the state
                console.log("Role updated to " + newRole); // Log the new role
            })
            .catch(err => console.log(err));
    };
    
     // Filter users based on search query and role
     const filteredUsers = users.filter(user =>
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterRole === '' || user.role === filterRole)
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleRoleFilter = (role) => {
        setFilterRole(role);
    };
    const clearFilters = () => {
        setFilterRole('');
    };
    return (
        <div>
            <Sidebar /> {/* Include the Sidebar component */}
            <div className="main-content ">
                <div className="w-100 vh-100 overflow-auto">
                    <div className=" bg-white rounded p-3" style={{ backgroundColor: '#088fad', marginTop: '70px', marginLeft: '300px' }}>
                        <div className="white_shd full margin_bottom_30">
                            <div className="table_section ">
                                <div className="table-responsive-sm">
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    <div className="role-filter" style={{ marginTop: '20px', marginBottom: '20px', display: 'flex'}}>
                                        <label style={{ marginRight: '30px',fontSize: '16px'}}>Show Only:</label>
                                        <label style={{ fontSize: '16px', marginRight: '10px' }}>
                                            <input type="checkbox" checked={filterRole === 'participant'} onChange={() => handleRoleFilter('participant')} />
                                            Participant
                                        </label>
                                        <label style={{ fontSize: '16px', marginRight: '10px' }}>
                                            <input type="checkbox" checked={filterRole === 'coordinator'} onChange={() => handleRoleFilter('coordinator')} />
                                            Coordinator
                                        </label>
                                        <label style={{ fontSize: '16px', marginRight: '10px' }}>
                                            <input type="checkbox" checked={filterRole === 'sub-admin'} onChange={() => handleRoleFilter('sub-admin')} />
                                            Sub-admin
                                        </label>
                                        <button onClick={clearFilters} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Clear</button>
                                    </div>

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Email</th>
                                                <th>Gender</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.map((user) => (
                                                <tr key={user._id}>
                                                    <td style={{ maxWidth: '50px' }}>
                                                        {user.profileImage && <img src={`http://localhost:3001/profiles/${user.profileImage}`} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', marginRight: '5px' }} />}
                                                        {user.name} {user.lastname}
                                                    </td>
                                                    <td style={{ maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</td>
                                                    <td>{user.gender}</td>
                                                    <td style={{ maxWidth: '60px' }}>
                                                        {(user.role === "participant" || user.role === "coordinator") && (
                                                            <button className="btn btn-primary" onClick={() => updateUserRole(user._id)} style={{ backgroundColor: 'grey' }}>
                                                                {user.role === "participant" ? "Make Coordinator" : "Make Participant"}
                                                            </button>
                                                        )}
                                                        <Link to={`/updateProfile/${user._id}`} className="btn btn-success mr-2" style={{ color: 'white' }}><FaEdit /></Link>
                                                        <button className="btn btn-danger" onClick={() => deleteUser(user._id)} style={{ color: 'white' }}><FaTrash /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ShowUsers;
