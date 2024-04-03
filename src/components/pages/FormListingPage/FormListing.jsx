import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa"; // Import copy icon
import formActions from "./../../store/actions/formActions";
import "./FormListing.css";

const FormListing = () => {
    const dispatch = useDispatch();
    const { data: formList, totalResponses } = useSelector((state) => state.form);

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
                            <th> Copy Link </th> {/* New column for copy button */}
                        </tr>
                        {formList.map((form, index) => {
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