import React, { useEffect, useState } from "react";
import './chat.css';
import PropTypes from "prop-types";
import ScrollToBottom from "react-scroll-to-bottom";
import EmojiPicker from 'emoji-picker-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CameraFill } from 'react-bootstrap-icons';
<<<<<<< Updated upstream
=======
import Modal from 'react-modal';
import axios from "axios";
>>>>>>> Stashed changes

function Chat({ socket, username, room ,user2 }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
<<<<<<< Updated upstream
=======
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [userData, setUserData] = useState(null);

  // Fonction pour remplacer les URL dans le texte par des liens HTML
  const replaceURLsWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
  };
>>>>>>> Stashed changes

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (room) {
          const response = await fetch(`http://localhost:3001/Chat/getMessages/${room}`);
          const messages = await response.json();
          setMessageList(messages || []);

          const chatBody = document.getElementById("chat-body");
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [room, messageList]);

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };

      if (socket) {
        socket.emit("send_message", messageData);
      }

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      setIsTyping(false); 
    } else {
      alert("Please enter a message");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const messageData = {
          room,
          author: username,
          image: reader.result,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        };

        if (socket) {
          socket.emit("send_message", messageData);
        }

        setMessageList((list) => [...list, messageData]);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type. Please select an image.");
    }
  };

  const handleEmojiSelect = (emoji) => {
    const emojiString = emoji.emoji;
    setCurrentMessage((prevMessage) => prevMessage + emojiString);
    setIsTyping(false); 
  };


  useEffect(() => {
    const receiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
      console.log("message jee !!", data)
      const chatBody = document.getElementById("chat-body");
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    if (socket) {
      socket.on("receive_message", receiveMessage);

      socket.on("typing", (data) => {
        if (data.author !== username) {
          setIsTyping(true);
        }
      });

      return () => {
        socket.off("receive_message", receiveMessage);
        socket.off("typing");
      };
    }
  }, [socket, username]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);

      socket.emit("typing", { room});
    }


    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/getUser/${user2}`);
        if (response.status === 200) {
          setUserData(response.data); 
          console.log(response.data)// Stocke les données de l'utilisateur dans l'état
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <>
      
      <div className="chat-window">
<<<<<<< Updated upstream
        <div className="chat-header">
          <p>User index</p>
        </div>
=======
      <div className="chat-header">
  {userData && (
    <div className="user-info">
      <img src={`http://localhost:3001/profiles/${userData.profileImage}`} alt="Profile" className="profile-image" />
      <p className="username">{userData.name} {userData.lastname}</p>
    </div>
  )}
</div>


>>>>>>> Stashed changes
        <div id="chat-body" className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => (
              <div
                className="message"
                id={username === messageContent?.author ? 'you' : 'other'}
                key={index}
              >
                {messageContent && (
                  <div>
                    <div className="message-content">
                      {messageContent.message ? (
                        <p dangerouslySetInnerHTML={{ __html: replaceURLsWithLinks(messageContent.message) }}></p>
                      ) : (
                        <img src={messageContent.image} style={{ width: '500px', height: '500px' }} alt="Received Image" />
                      )}
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="message">
                <p>Typing...</p>
              </div>
            )}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <div className="emoji">
            <span role="img" aria-label="emoji" onClick={toggleEmojiPicker}>
              &#128515;
            </span>
          </div>
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyPress={(event) => {
              handleTyping();
              event.key === "Enter" && sendMessage();
            }}
          />
          <div className="actions-container" style={{ display: 'flex', justifyContent: 'space-between', margin: '0 1rem' }}>
            <div className="emoji">
              {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
            </div>
            <div className="fileinput">
              <label htmlFor="fileInput" className="gallery-icon">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <CameraFill size={24} />
              </label>
            </div>
            <div className="button">
              <button onClick={sendMessage}>&#9658;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Chat.propTypes = {
  socket: PropTypes.object,
  username: PropTypes.string.isRequired,
  room: PropTypes.string,
};

export default Chat;
