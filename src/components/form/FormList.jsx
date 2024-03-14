import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormFields from './FormFields'; // Import the FormFields component

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/form/showforms');
      setForms(response.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleClick = (formId) => {
    setSelectedForm(formId);
  };

  return (
    <div>
      <h2>Forms List</h2>
      <ul>
  {forms.map(form => (
    <li key={form._id} onClick={() => handleClick(form._id)}>
      Form ID: {form._id}
    </li>
  ))}
</ul>

      {selectedForm && (
        <div>
          <h2>Selected Form: {selectedForm}</h2>
          <FormFields components={forms.find(form => form._id === selectedForm).components} />
        </div>
      )}
    </div>
  );
};

export default FormList;
