import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FaHeart, FaComment, FaPhone } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feed = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

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
                        likes: (project.likes || 0) + 1
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
            const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
            if (!token) {
                toast.error("You must be logged in to comment.");
                return;
            }
            await axios.post(`http://localhost:3001/projects/addComment/${projectId}`, { comment }, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Comment added successfully.");
            // You might want to fetch the project data again here to update the UI with the new comment
            // Or you could locally update the state to display the new comment without refetching
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error("Failed to add comment. Please try again.");
        }
    };
    

    
    return (
        <div className="feed">
            {projects.map((project) => (
                <div key={project._id} className="project-card">
                    <div className="project-info">
                        <h3>{project.nom}</h3>
                        <p>{project.desc}</p>
                        <p><strong>Responsible:</strong> {project.responsable}</p>
                        <p><strong>Domain:</strong> {project.domaine}</p>
                        <p><strong>Likes:</strong> {project.likes || 0}</p>
                    </div>
                    <div className="project-actions">
                        <button className="like-btn" onClick={() => handleLike(project._id)}><FaHeart /> Like</button>
                        <button className="comment-btn"><FaComment /> Comment</button>
                        <button className="contact-btn"><FaPhone /> Contact</button>
                    </div>
                    <div className="comment-section">
                        {project.comments && project.comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p>{comment.userId}</p>
                                <p>{comment.comment}</p>
                                {/* Additional comment details here */}
                            </div>
                        ))}
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
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Feed;