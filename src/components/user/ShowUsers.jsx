import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Dashboard from "../backend/Dashboard";
import { FaEdit, FaTrash } from 'react-icons/fa'; 

function ShowUsers(){
    const [users, setUsers]= useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users/showUsers')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
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
            <Dashboard /> {/* Include the Sidebar component */}
            <div className="main-content d-flex justify-content-center align-items-center">
                <div className=" vh-100 overflow-auto">
                    <div className="w-100 bg-white rounded p-3">

                        <table className="table">
                            <thead>
                                <tr>
                                <th>Profile Image</th> 
                                    <th>Name</th>
                                    <th>LastName</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Birthdate</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            {/* Display profile image if available */}
                                            {user.profileImage && <img src={`http://localhost:3001/profiles/${user.profileImage}`} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.birthdate}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            {(user.role === "participant" || user.role === "coordinator") && (
                                                <button className="btn btn-primary" onClick={() => updateUserRole(user._id)}>
                                                    {user.role === "participant" ? "Coordinator" : "Undo"}
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                        <Link to={`/updateUser/${user._id}`} className="btn btn-success mr-2"><FaEdit /></Link>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user._id)}><FaTrash /> </button>
                                </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowUsers;
