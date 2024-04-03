import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import de FontAwesome
import { faArrowRight, faRandom } from '@fortawesome/free-solid-svg-icons'; // Import des icônes

import "./style.css"; // Import du fichier CSS externe

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${roomCode}`);
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    const charSet = new Set();
    
    while (charSet.size < 12) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const character = characters[randomIndex];
      if (!charSet.has(character)) {
        charSet.add(character);
        code += character;
      }
    }
    
    return code;
  };

  const handleGenerateCode = () => {
    const code = generateRandomCode();
    setGeneratedCode(code);
  };

  return (
    <div className="relative h-screen ">
      <div className="hero-info">
        <div className="borderrr flex flex-col items-center justify-center pb-8">
          <h1 className="title-video">Meet App</h1>
        </div>

        <form onSubmit={submitCode} className="enter-code-form">
          <div className="flex flex-col justify-center items-center">
          <img src='../../../public/images/3915274.png'></img>

            <label className="enter-code-label">
              Enter Room Code
            </label>
           
            <input
              type="text"
              required
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="enter-code-input"
            />
          </div>
          <button type="submit" className="enter-code-button btn">
            <FontAwesomeIcon icon={faArrowRight} className="icon" />
            Go
          </button>
        </form>
        
        <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="generate-code-title">Generate Code</h1>
          <button onClick={handleGenerateCode} className="generate-code-button">
            <FontAwesomeIcon icon={faRandom} className="icon" />
            Generate
          </button>
          <p className="generated-code-text">
            Generated Code:
          </p>
          <p> {generatedCode}</p>
        </div>
      </div>

    </div>
  );
};

export default Home;
