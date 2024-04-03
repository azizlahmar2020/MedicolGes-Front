import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import axiosInstance from '../../axiosInstance'; // Import the customized Axios instance
import Sidebar from "../backend/sidebar";

function ShowUsers(){
    const [users, setUsers]= useState([]);
    const [sessionId, setSessionId] = useState('');

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
        
        if (userToUpdate.role !== "participant") {
          // Do not update role if the current role is not "participant"
          return;
        }
        
        const newRole = "coordinator";
      
        axios.put(`http://localhost:3001/users/updateUserRole/${userId}`, { newRole })
          .then(response => {
            // Update the role in the local state (users array)
            const updatedUsers = users.map(user =>
              user._id === userId ? { ...user, role: newRole } : user
            );
            setUsers(updatedUsers);
            console.log("Role updated in the server"); // Optional: Log a message indicating the role update
          })
          .catch(err => console.log(err));
      };
    return (
        <div>
        <Sidebar /> {/* Include the Sidebar component */}
        <div className="main-content ">
            <div className="w-100 vh-100 overflow-auto">
                <div className=" bg-white rounded p-3">
                        <div class="white_shd full margin_bottom_30">
                           
                            <div class="table_section ">
                                <div class="table-responsive-sm">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Email</th>
                                                <th>Gender</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user._id}>
                                                    <td style={{ maxWidth: '50px' }}>
                                                        {user.profileImage && <img src={`http://localhost:3001/profiles/${user.profileImage}`} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%',marginRight:'5px' }} />}
                                                         {user.name} {user.lastname}
                                                    </td>
                                                    <td style={{ maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</td>
                                                    <td>{user.gender}</td>
                                                    <td style={{ maxWidth: '60px'}}>
                                                        {(user.role === "participant" || user.role === "coordinator") && (
                                                            <button className="btn btn-primary" onClick={() => updateUserRole(user._id)}>
                                                                {user.role === "participant" ? "Coordinator" : "Undo"}
                                                            </button>
                                                        )}
                                                    
                                                        <Link to={`/updateProfile/${user._id}`} className="btn btn-success mr-2" style={{color:'white'}}><FaEdit /></Link>
                                                        <button className="btn btn-danger" onClick={() => deleteUser(user._id)} style={{color:'red'}}><FaTrash /></button>
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
