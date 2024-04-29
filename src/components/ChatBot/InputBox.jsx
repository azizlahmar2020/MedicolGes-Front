import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const InputBox = ({ sendMessage, loading }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [loading]); // Scroll to bottom when loading changes

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="input-box">
      {loading && <FontAwesomeIcon style={{ height: '40px', width: '40px', color: 'white' }} icon={faSpinner} spin />}
      <input
        disabled={loading}
        type="text"
        className="form-control"
        placeholder="Ask me anything..."
        value={loading ? "Loading..." : input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default InputBox;
