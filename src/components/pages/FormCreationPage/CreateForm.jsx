import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import "../FormCreationPage/CreateForm.css";
import { useDispatch, useSelector } from "react-redux";
import formActions from '../../store/actions/formActions'; 
import NavbarSub from "../../template/navbarSubadmin";
import Footer from "../../template/footer";
import axios from 'axios';

const CreateForm = () => {
	const [formBody, setFormBody] = useState([]);
	const [formTitle, setFormTitle] = useState("New Form");
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState([]);
	const [questionType, setQuestionType] = useState(0);
	const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);
    const [userId, setUserId] = useState(null); // State to hold the user session ID

	const dispatch = useDispatch();
	const { action } = useSelector((state) => state.form);

	
	useEffect(() => {
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
					console.log('User ID:', data.userId);
				} else {
					console.error('Failed to fetch user session ID:', response.statusText);
				}
			} catch (error) {
				console.error('Error fetching user session ID:', error.message);
			}
		};
	
		fetchUserId(); // Call the function to fetch user session ID
	}, []);
	
	
	const addQuestion = () => {
		setAddQuestionModalVisible(true);
	};

	const addNewQuestion = () => {
		setAddQuestionModalVisible(false);
		let formBodyArr = [...formBody];
		let questionObj = {
			id: formBodyArr.length + 1,
			type: questionType,
			question: question,
			options: options,
		};
		formBodyArr.push(questionObj);
		setFormBody(formBodyArr);
		resetQuestionModal();
	};

	const onQuestionTypeChange = (e) => {
		setQuestionType(e.target.value);
	};

	const questionInputChange = (e) => {
		setQuestion(e.target.value);
	};

	const optionInputChange = (e) => {
		let rawOptions = e.target.value;
		let optionsArr = [...rawOptions.trim().split("\n")];
		optionsArr = optionsArr.filter((item) => !!item);
		setOptions(optionsArr);
	};

	const saveForm = async () => {
		const formJson = {
			title: formTitle,
			body: formBody,
			userId: userId, // Include user session ID in form data
		};
	
		try {
			// Dispatch the saveForm action and await its completion
			await dispatch(formActions.saveForm(formJson));
	
			// If the saveForm action succeeds, clear the form data and navigate back
			setFormBody([]);
			setFormTitle("New Form");
			// Assuming you have a function to navigate back, you can call it here
			// e.g., navigateBack();
		} catch (error) {
			// If there's an error, log it or handle it as needed
			console.error('Error saving form:', error);
			// Optionally, you can display an error message to the user
		}
	};
	
	

	const resetQuestionModal = () => {
		setOptions([]);
		setQuestionType(0);
		setQuestion("");
	};

	const cancelNewQuestion = () => {
		resetQuestionModal();
		setAddQuestionModalVisible(false);
	};

	useEffect(() => {
		if (action === formActions.SAVE_FORM_SUCCESS) {
			history.back();
		}
	}, [action]);

	return (
		<div>
			<NavbarSub/>
		<div className="container">
		<div className="row justify-content-center">
			<div className="col-md-9" style={{marginTop:'70px'}}>
				<div className="card" >
					<div className="card-header" style={{backgroundColor:'#7ac0b8'}}>Create Form</div>

					<div className="card-body">
						<div className="form-group">
							<label htmlFor="formTitle">Form Title</label>
							<input
								id="formTitle"
								type="text"
								className="form-control"
								placeholder="Form Title"
								value={formTitle}
								onChange={(e) => setFormTitle(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<button className="btn btn-primary mr-2" onClick={() => addQuestion()} style={{backgroundColor:'#5ca199'}}>Add Question</button>
							<button className="btn btn-success" onClick={() => saveForm()} style={{backgroundColor:'#088fad'}}>Save</button>
						</div>

						<div className="form-group">
							{formBody.map((que, index) => (
								<div key={index}>
									<p className="question"> {`${que.id}. ${que.question}`} </p>
									{que.type === "1" && (
										<div>
											<textarea
												className={"question-text-input question-text-input-" + que.id}
												cols="60"
												rows="4"
												placeholder="Enter your answer here"
												value={""}
												readOnly={true}
											/>
										</div>
									)}
									{que.type === "2" && (
										<div>
											<input
												type="number"
												className="form-control"
												placeholder="Enter a numeric value"
												value={question}
												onChange={(e) => questionInputChange(e)}
											/>
										</div>
									)}
									{que.type === "3" && (
										<div>
											<input
												type="date"
												className="form-control"
												onChange={(e) => handleOnChange(e, que)}
											/>
										</div>
									)}
									{que.type === "4" && (
										<div>
											{que.options.map((opn, index) => (
												<div className="form-check" key={index}>
													<input
														type="checkbox"
														className="form-check-input"
														value={opn}
														checked={false}
														readOnly={true}
													/>
													<label className="form-check-label">{opn}</label>
												</div>
											))}
										</div>
									)}
									{que.type === "5" && (
										<div>
											{que.options.map((opn, index) => (
												<div className="form-check" key={index}>
													<input
														type="radio"
														className="form-check-input"
														value={opn}
														checked={false}
														readOnly={true}
														name={`answer-radio-${que.id}`}
													/>
													<label className="form-check-label">{opn}</label>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		<Modal isOpen={addQuestionModalVisible}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add New Question</h5>
						<button type="button" className="close" onClick={() => cancelNewQuestion()} >
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label htmlFor="question">Enter question:</label>
							<input
								id="question"
								type="text"
								className="form-control"
								placeholder="Enter your question"
								value={question}
								onChange={(e) => questionInputChange(e)}
							/>
						</div>
						<div className="form-group">
							<label>Select the answer type:</label>
							<select className="form-control" onChange={(e) => onQuestionTypeChange(e)} defaultValue={0}>
								<option value="0" hidden>--Select--</option>
								<option value="1">Text</option>
								<option value="2">Number</option>
								<option value="3">Date</option>
								<option value="4">Checkbox</option>
								<option value="5">Radio</option>
							</select>
						</div>
						{questionType > 3 && (
							<div className="form-group">
								<label>Enter Options (line separated):</label>
								<textarea
									className="form-control"
									cols="60"
									rows="3"
									placeholder="Enter your options here"
									onChange={(e) => optionInputChange(e)}
								/>
							</div>
						)}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={() => addNewQuestion()} disabled={questionType <= 0 || question === "" || (questionType > 3 && options.length <= 0)}  style={{backgroundColor:'#5ca199'}}>Add</button>
						<button type="button" className="btn btn-secondary" onClick={() => cancelNewQuestion()} style={{backgroundColor:'#088fad'}}>Cancel</button>
					</div>
				</div>
			</div>
		</Modal>
		<br/>
		<br/>
		<br/>
		<br/>

		<Footer/>
	</div>
);
};

export default CreateForm;

const itemEnum = {
	1: "text",
	2: "number",
	3: "date",
	4: "checkBox",
	5: "radio",
};

