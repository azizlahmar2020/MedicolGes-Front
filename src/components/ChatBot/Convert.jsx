import React, { useCallback, useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import PropTypes from 'prop-types';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ChatWindow.css"
import { toast } from 'react-toastify';
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
  const copyTextResult = () => {
    navigator.clipboard.writeText(textResult);
    toast.success('Texte copié avec succès !', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="App">
      <h1 className='TitleImage_Text'>Image to text</h1>
      
      <div className="result">
        {loading && <p>Loading...</p>}
        {textResult && !loading && (
          <div className="box-p">
                      <FontAwesomeIcon icon={faCopy} className="copy-iconTextImage" onClick={copyTextResult} />

            <p className='textResultImage'>{textResult}</p>
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
