// ChatList.js

import React from 'react';
import PropTypes from 'prop-types';

const ChatList = ({ userRooms, joinRoomWithUser, unreadConversations }) => {
  return (
    <div className='Liste'>
      <h4 className='conv'> Conversation: </h4>
      <ul>
        {userRooms.map((userId, index) => (
          <li key={index} className={`user-list-item ${unreadConversations.includes(userId) ? 'unread' : ''}`} onClick={() => joinRoomWithUser(userId)}>
            <div className="message-info">
              <img src={`../../../public/ChatImage/-person_90382.png`} alt="user" className="user-image" />
              <div className="message-details">
                <div className={`message-username ${unreadConversations.includes(userId) ? 'unread' : ''}`}>
                  {userId}
                </div>
                {/* Ajoutez d'autres détails du message ici si nécessaire */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ChatList.propTypes = {
  userRooms: PropTypes.array.isRequired,
  joinRoomWithUser: PropTypes.func.isRequired,
  unreadConversations: PropTypes.array.isRequired,
};

export default ChatList;
