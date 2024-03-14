import React from 'react';

const FormFields = ({ components }) => {
  
  const renderComponent = (component) => {
    switch (component.type) {
      case 'paragraph':
        return <p key={component._id} className="form-text">{component.label}</p>;
      case 'file':
        return <input type="file" key={component._id} className="form-control" />;
      case 'date':
        return <input type="date" key={component._id} className="form-control" />;
      case 'radio-group':
        return (
          <div key={component._id}>
            <label className="form-label">{component.label}</label>
            {component.options.map(option => (
              <div key={option._id} className="form-check">
                <input type="radio" id={option._id} name={component._id} value={option.value} className="form-check-input" />
                <label htmlFor={option._id} className="form-check-label">{option.label}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  
  
      // Add cases for other component types as needed
    
  return (
    <div>
      {components.map(component => (
        <div key={component._id}>
          {renderComponent(component)}
        </div>
      ))}
    </div>
  );
};

export default FormFields;
