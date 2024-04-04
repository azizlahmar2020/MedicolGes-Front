import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomInput from "../../CustomInput/CustomInput";
import formActions from "./../../store/actions/formActions";
import "./FormResponse.css";
import { history } from "../../store/config";
import NavbarSub from "../../template/navbarSubadmin";
import Footer from "../../template/footer";

const FormResponse = () => {
	let { id } = useParams();

	const dispatch = useDispatch();
	const { data: form } = useSelector((state) => state.form);
	const { action } = useSelector((state) => state.form);
	const [response, setResponse] = useState({});
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		dispatch(formActions.getForm(id));
	}, [id]);

	useEffect(() => {
		if (action === formActions.SAVE_RESPONSE_SUCCESS) {
			history.go(-1);
		}
	}, [action]);

	const saveResponse = () => {
		let filteredResponse = filterResponse();
		let finalResponseObj;
		if (Object.keys(filteredResponse).length) {
			finalResponseObj = {
				id,
				response: filteredResponse,
			};
			dispatch(formActions.saveResponse(finalResponseObj));
			setIsError(false);
		} else {
			setIsError(true);
		}
	};

	const filterResponse = () => {
		let filteredObj = { ...response };
		for (let key in filteredObj) {
			if (filteredObj.hasOwnProperty(key)) {
				if (
					filteredObj[key] == "" ||
					(typeof filteredObj[key] === "object" && Object.keys(filteredObj[key]).length <= 0)
				) {
					delete filteredObj[key];
				}
			}
		}
		return filteredObj;
	};
	
	

	
	
	
    const handleCheckboxChange = (e, que) => {
        const { value, checked } = e.target;
        const responseObj = { ...response };
        if (!responseObj[que.id]) {
            responseObj[que.id] = [];
        }
        if (checked) {
            responseObj[que.id].push(value);
        } else {
            const index = responseObj[que.id].indexOf(value);
            if (index !== -1) {
                responseObj[que.id].splice(index, 1);
            }
        }
        setResponse(responseObj);
    };

    const handleRadioChange = (e, que) => {
        const { value } = e.target;
        const responseObj = { ...response };
        responseObj[que.id] = value;
        setResponse(responseObj);
    };

	const handleOnChange = (e, que, index = -1) => {
		let responseObj = { ...response };
		let ans;
	
		if (que.type === "1" || que.type === "2" || que.type === "3" || que.type === "5") {
			ans = e.target.value;
			responseObj[que.id] = ans;
		} else if (que.type === "4") {
			if (!responseObj[que.id]) {
				responseObj[que.id] = {};
			}
			ans = e.target.checked;
			if (ans) {
				responseObj[que.id][index] = e.target.value;
			} else {
				delete responseObj[que.id][index];
			}
		}
		setResponse(responseObj);
	};
	
	
	
	
	
	return (
		<>
		<NavbarSub/>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8" style={{marginTop:'100px'}}>
                <div className="card">
                    <div className="card-body">
                        <div className="form-container" onFocus={() => setIsError(false)}>
                            {form.length > 0 && (
                                <>
                                    <div className="form-header">
                                        <span className="response-form-title">{form[0].formJson.title}</span>
                                    </div>
                                    {form[0].formJson.body.map((que, index) => (
                                        <React.Fragment key={index}>
                                            <p className="question"> {`${que.id}. ${que.question}`} </p>
                                            {que.type === "1" && (
                                                <CustomInput
                                                    que={que}
                                                    onChange={(e, que, index) => handleOnChange(e, que, index)}
                                                />
                                            )}
                                            {que.type === "2" && (
                                                <input
                                                    type="number"
                                                    className="form-control numeric-input"
                                                    placeholder="Enter a numeric value"
                                                    value={response[que.id] || ""}
                                                    onChange={(e) => handleOnChange(e, que)}
                                                />
                                            )}
                                            {que.type === "3" && (
                                                <input
                                                    type="date"
                                                    className="form-control date-input"
                                                    onChange={(e) => handleOnChange(e, que)}
                                                />
                                            )}

                                            {que.type === "4" && (
                                                que.options.map((option, optionIndex) => (
                                                    <div className="form-check" key={optionIndex}>
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`checkbox-${que.id}-${optionIndex}`}
                                                            value={option}
                                                            onChange={(e) => handleCheckboxChange(e, que)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`checkbox-${que.id}-${optionIndex}`}>
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))
                                            )}
                                            {que.type === "5" && (
                                                que.options.map((option, optionIndex) => (
                                                    <div className="form-check" key={optionIndex}>
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            id={`radio-${que.id}-${optionIndex}`}
                                                            name={`radio-${que.id}`}
                                                            value={option}
                                                            onChange={(e) => handleRadioChange(e, que)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`radio-${que.id}-${optionIndex}`}>
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))
                                            )}
                                        </React.Fragment>
                                    ))}
                                </>
                            )}

                            <div className="form-footer">
                                <button className="btn btn-primary save-response-btn" onClick={() => saveResponse()} style={{backgroundColor:'#088fad'}}>
                                    Save Response
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {isError && (
        <p className="error error-message">
            <span> Please enter response!!! </span>
        </p>
    )}
	<br/>
		<br/>
		<br/>
		<br/>
	<Footer/>
</>

	);
};

export default FormResponse;
