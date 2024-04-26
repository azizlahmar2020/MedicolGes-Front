import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FaHeart, FaComment, FaPhone } from 'react-icons/fa';

import "./feed.css"; // Import CSS file for custom styles
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "/src/components/template/footer";
import NavbarSub from "../template/navbarSubadmin";
import NavbarParticipant from "../template/navbarParticipant";

const FeedPatient = () => {
    const [projects, setProjects] = useState([]);
    const [projectComments, setProjectComments] = useState({});

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        // Assuming projects are already loaded
        const loadAllComments = async () => {
            let commentsForAllProjects = {};
            for (let project of projects) {
                commentsForAllProjects[project._id] = await fetchCommentsWithUserDetails(project.comments);
            }
            setProjectComments(commentsForAllProjects);
        };
    
        if (projects.length) {
            loadAllComments();
        }
    }, [projects]); 

    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:3001/projects/showProjects');
            setProjects(result.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleLike = async (projectId) => {
        try {
            await axios.post(`http://localhost:3001/projects/likeProject/${projectId}`);
            setProjects(projects.map(project => {
                if (project._id === projectId) {
                    return {
                        ...project,

                        likes: (project.likes || 0) + 1,
                        liked: true // Add a liked property to track if the project is liked
                    };
                }
                return project;
            }));
        } catch (error) {
            console.error('Error liking project:', error);
        }
    };
    const handleComment = async (projectId, comment) => {
        try {
          const token = sessionStorage.getItem('token');
          if (!token) {
            toast.error("You must be logged in to comment.");
            return;
          }
      
          const response = await axios.post(
            `http://localhost:3001/projects/addComment/${projectId}`,
            { comment },
            { headers: { Authorization: `Bearer ${token}` } }
          );
      
          // Update the projects state with the newly added comment
          const updatedProjects = projects.map(project => {
            if (project._id === projectId) {
              return {
                ...project,
                comments: [...project.comments, response.data.project.comments[project.comments.length]]
              };
            }
            return project;
          });
      
          setProjects(updatedProjects);
      
          toast.success("Comment added successfully.");
        } catch (error) {
          console.error('Error adding comment:', error);
          toast.error("Failed to add comment. Please try again.");
        }
      };

     // Function to fetch user details from userId
     const fetchUserDetails = async (userId) => {
        try {
            const result = await axios.get(`http://localhost:3001/users/getUser/${userId}`);
            return result.data; // Assuming the API returns user details
        } catch (error) {
            console.error('Error fetching user details:', error);
            return null;
        }
    };
    const fetchCommentsWithUserDetails = async (comments) => {
        try {
            // Check if comments is an array or can be converted to an array
            if (!Array.isArray(comments)) {
                if (typeof comments === 'undefined' || comments === null) {
                    console.error('Comments is undefined or null:', comments);
                } else {
                    console.error('Comments is not an array and cannot be converted to an array:', comments);
                }
                return []; // Return an empty array
            }
    
            const commentsWithUserDetails = [];
            for (const comment of comments) {
                if (typeof comment === 'object' && comment !== null) {
                    const userDetails = await fetchUserDetails(comment.userId);
                    if (userDetails) {
                        commentsWithUserDetails.push({
                            ...comment,
                            userDetails
                        });
                    }
                } else {
                    console.error('Invalid comment object:', comment);
                }
            }
            return commentsWithUserDetails;
        } catch (error) {
            console.error('Error fetching comments with user details:', error);
            return []; // Return an empty array in case of errors
        }
    };
   
    
  

    return (
        <div>            <NavbarParticipant/>
        
        <div className="feed-container">

            {projects.map((project) => (
                <div key={project._id} className="project-card-custom">
                    <div className="project-info-custom">
                        <h3>{project.nom}</h3>
                        <p>{project.desc}</p>
                        <p><strong>Responsible:</strong> {project.responsable}</p>
                        <p><strong>Domain:</strong> {project.domaine}</p>

                        <div className="likes-section"><FaHeart /> {project.likes || 0} Likes</div> {/* Updated likes section */}
                    </div>
                    <div className="project-actions-custom">
                        <button className={`like-btn-custom ${project.liked ? 'liked' : ''}`} onClick={() => handleLike(project._id)}><FaHeart /> Like</button> {/* Add 'liked' class if project is liked */}
                        <button className="comment-btn-custom"><FaComment /> Comment</button>
                        <button className="contact-btn-custom"><FaPhone /> Contact</button>
                    </div>
                    <div className="comment-section-custom">
                    {project.comments && project._id in projectComments && (
                        <ul>
                            {projectComments[project._id].map((comment, index) => (
                            <li key={index}>
                            <div className="comment" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={`http://localhost:3001/profiles/${comment.userDetails.profileImage}`} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                <div>
                                    <strong>{comment.userDetails.name}</strong>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        </li>
                        
                            ))}
                        </ul>
                    )}
                        <textarea className="comment-textarea" placeholder="Write a comment..." onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                const comment = e.target.value.trim();
                                if (comment) {
                                    handleComment(project._id, comment);
                                    e.target.value = '';
                                }
                            }
                        }} />

                        {/* Display comments here */}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};


export default FeedPatient;
