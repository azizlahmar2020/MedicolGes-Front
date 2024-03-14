import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const BuildForm = () => {
  const formBuilderRef = useRef(null);

  useEffect(() => {
    const fbEditor = document.getElementById('fb-editor');
    const options = {
      controlOrder: [
        'button',     // Include button
        'checkbox',   // Include checkbox
        'date',       // Include date field
        'file',       // Include file uploader
        'select',     // Include select
        'text',       // Include text field
        'textarea',   // Include textarea
      ],
    };
    formBuilderRef.current = $(fbEditor).formBuilder(options);
  }, []);

  const handleGetData = async () => {
    try {
      // Get form data in JSON format using formBuilder's getData method
      const formDataJson = formBuilderRef.current.actions.getData('json');
      const formData = JSON.parse(formDataJson); // Parse JSON string to JavaScript object

      // Send the form data to the server for storage
      const response = await axios.post('http://localhost:3001/form/saveform', formData);

      // Display success message
      console.log('Form data saved successfully:', response.data);
      alert('Form data saved successfully');
    } catch (error) {
      // Display error message
      console.error('Error saving form data:', error);
      alert('Error saving form data. Please try again.');
    }
  };

  return (
    <div>
      <div id="fb-editor">
        {/* Form builder will be rendered here */}
      </div>
      {/* Button to get form data in JSON format and save it */}
      <button onClick={handleGetData}>Save Form Data</button>
    </div>
  );
};

export default BuildForm;
