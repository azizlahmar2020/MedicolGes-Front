import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import axios from 'axios'; // Import axios
import formActions from "./../../store/actions/formActions";
import "./FormListing.css";

const FormListing = () => {
    const dispatch = useDispatch();
    const { data: formList, totalResponses } = useSelector((state) => state.form);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch user session ID when the component mounts
        const fetchUserId = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const axiosConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:3001/api/verify-token', axiosConfig);

                if (response.status === 200) {
                    const data = response.data;
                    setUserId(data.userId); // Set the user session ID in state
                    console.log('User ID:', data.userId, 'Type:', typeof data.userId);
                } else {
                    console.error('Failed to fetch user session ID:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user session ID:', error.message);
            }
        };

        fetchUserId(); // Call the function to fetch user session ID
    }, []);

    useEffect(() => {
        dispatch(formActions.getForms());
    }, [dispatch]);

    useEffect(() => {
        console.log("forms", formList);
        console.log("Response Count", totalResponses);
    });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="form-listing-container">
            {formList.length <= 0 && (
                <p className="no-form-text">There is no form, please create one by pressing below 'create form' button.</p>
            )}
            {formList.length > 0 && (
                <table className="form-list">
                    <tbody>
                        <tr>
                            <th> Name </th>
                            <th> URL </th>
                            <th> Created At </th>
                            <th> Total Responses </th>
                        </tr>
                        {formList.map((form, index) => {
console.log('Form User ID:', form.formJson.userId, 'Type:', typeof form.formJson.userId);

                            if (form.formJson.userId === userId) {
                                const title = form.formJson.title;
                                const { url, date } = form;
                                const formURL = window.location.protocol + "//" + window.location.host + "/form-response/" + url;
                                return (
                                    <tr key={index}>
                                        <td>{title}</td>
                                        <td>
                                            <div className="link-container">
                                                <Link to={"/form-response/" + url}>{formURL}</Link>
                                                <button className="copy-button" onClick={() => copyToClipboard(formURL)}>
                                                    <FaCopy />
                                                </button>
                                            </div>
                                        </td>
                                        <td>{date}</td>
                                        <td> {totalResponses[url] || 0}</td>
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                </table>
            )}

            <div className="button-container">
                <Link to="/create-form">
                    <button id="create-form-btn">Create form</button>
                </Link>
            </div>
        </div>
    );
};

export default FormListing;
