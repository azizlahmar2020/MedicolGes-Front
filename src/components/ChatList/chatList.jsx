import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './ChatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Footer from "/src/components/template/footer";

const ChatList = ({ userRooms, joinRoomWithUser, unreadConversations }) => {
  const [userData, setUserData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const isUnread = (userId) => {
    return unreadConversations.includes(userId);
  };

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:3001/users/getUser/${userId}`);
        if (response.status === 200) {
          setUserData(prevUserData => ({
            ...prevUserData,
            [userId]: response.data
          }));
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    const fetchDataForMissingUsers = async () => {
      const missingUsers = userRooms.filter(userId => !userData[userId]);
      await Promise.all(missingUsers.map(userId => fetchUser(userId)));
    };

    fetchDataForMissingUsers();
  }, [userRooms, userData]);

  const filteredUserRooms = userRooms.filter(userId => userData[userId] && userData[userId].name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className='search-container'>
        <div className='search-wrapper'>
          <input
            className='search'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
        </div>
      </div>
      <div className='Liste'>
        <h4 className='conv'> Conversation: </h4>
        <ul>
          {filteredUserRooms.map((userId, index) => (
            <li key={index} className={`user-list-item ${isUnread(userId) ? 'unread' : ''}`} onClick={() => joinRoomWithUser(userId)}>
              <div className="message-info">
                {userData[userId] && (
                  <>
                    <img src={`http://localhost:3001/profiles/${userData[userId].profileImage}`} alt="Profile" className="user-image" />
                    <div className="message-details">
                      <div className={`message-username ${isUnread(userId) ? 'unread' : ''}`}>
                        {userData[userId].name}
                      </div>
                      {/* Ajoutez d'autres détails du message ici si nécessaire */}
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

ChatList.propTypes = {
  userRooms: PropTypes.array.isRequired,
  joinRoomWithUser: PropTypes.func.isRequired,
  unreadConversations: PropTypes.array.isRequired,
};

export default ChatList;
