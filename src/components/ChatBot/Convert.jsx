import React, { useCallback, useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import PropTypes from 'prop-types';
import "./ChatWindow.css"
function ImageToText({ ImageUrl }) {
  const [selectedImage, setSelectedImage] = useState(ImageUrl);
  const [textResult, setTextResult] = useState("");
  const [loading, setLoading] = useState(false);
console.log(ImageUrl)
  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      const { data } = await Tesseract.recognize(selectedImage, 'eng');
      setTextResult(data.text);
    } catch (error) {
      console.error('Error converting image to text:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  const handleChangeImage = e => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("");
    }
  };

  return (
    <div className="App">
      <h1>Image To Text</h1>
      
      <div className="result">
        {loading && <p>Loading...</p>}
        {textResult && !loading && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}

ImageToText.propTypes = {
  ImageUrl: PropTypes.string.isRequired
};

export default ImageToText;
