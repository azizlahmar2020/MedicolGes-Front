import React, { useState } from "react";
import Modal from 'react-modal';

const customStyles = {
  content: {
    width: '600px', // Increase width
    height: '400px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
  },
  
};

const AddMemberModal = ({ isOpen, closeModal, handleAddMember }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/users/getUserByEmail/${searchValue}`);
      if (response.status === 404) {
        setSearchResult(null);
        setErrorMessage("User not found");
      } else if (response.status === 200) {
        const data = await response.json();
        setSearchResult(data); // Set the searchResult state with the user data
        setErrorMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddMemberToProject = () => {
    if (searchResult) {
      handleAddMember(searchResult._id); // Pass the user ID to the handleAddMember function
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Member"
      style={customStyles}
    >
      <h2>Add Member</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {searchResult && (
        <div>
          <h3>Search Result:</h3>
          <p>Name: {searchResult.name}</p>
          <p>Email: {searchResult.email}</p>
        </div>
      )}
       <button style={customStyles.button} onClick={handleAddMemberToProject}>Add Member</button>
      <button style={customStyles.cancelButton} onClick={closeModal}>Cancel</button>
    </Modal>
  );
};

export default AddMemberModal;