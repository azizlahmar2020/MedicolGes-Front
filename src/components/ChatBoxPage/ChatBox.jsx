import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSync } from '@fortawesome/free-solid-svg-icons';

import Chat from '../Chat/chat';
import './ChatBox.css';

const socket = io.connect("http://localhost:3001", {
  transports: ['websocket'],
});

export default function ChatBox({ username, room }) {
  const [roomData, setRoomData] = useState({
    roomId: "",
    showChat: false,
  });

  const [user1Id, setUser1Id] = useState("");
  const [user2Id, setUser2Id] = useState("");

  const [userRooms, setUserRooms] = useState([]);

  const getUsersNames = async (userIds) => {
    try {
      const response = await axios.post('http://localhost:3001/Chat/getUsersNames', { userIds });
      if (!response.ok) {
        throw new Error(`Error in response: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.userNames;
    } catch (error) {
      console.error("Error fetching user names:", error.message);
      return [];
    }
  };

  const getRoomsForUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/Chat/getRoom/${userId}`);
      if (!response.ok) {
        throw new Error(`Error in response: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setUserRooms(data.otherMembers);
    } catch (error) {
      console.error("Error fetching user rooms:", error.message);
    }
  };

  useEffect(() => {
    if (roomData.showChat) {
      getRoomsForUser(user1Id);
    }
  }, [roomData.showChat, user1Id]);

  const getExistingRoomId = async (userId1, userId2) => {
    try {
      const response = await fetch(`http://localhost:3001/Chat/getExistingRoom/${userId1}/${userId2}`);
      if (!response.ok) {
        throw new Error(`Error in response: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.roomId;
    } catch (error) {
      console.error("Error fetching existing room data:", error.message);
      return null;
    }
  };

  const createRoom = async (emitterId, receiverId) => {
    try {
      const response = await fetch(`http://localhost:3001/Chat/getOrCreateRoom/${emitterId}/${receiverId}`);
      if (!response.ok) {
        throw new Error(`Error in response: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating new room:", error.message);
      return null;
    }
  };

  const joinRoom = async () => {
    try {
      const existingRoomId = await getExistingRoomId(user1Id, user2Id);

      if (existingRoomId) {
        socket.emit("join_room", { roomId: existingRoomId });
        setRoomData({ roomId: existingRoomId, showChat: true });
        getRoomsForUser(user1Id);
      } else {
        const newRoomData = await createRoom(user1Id, user2Id);
        if (newRoomData && newRoomData.roomId) {
          socket.emit("join_room", { roomId: newRoomData.roomId });
          setRoomData({ roomId: newRoomData.roomId, showChat: true });
          getRoomsForUser(user1Id);
        } else {
          throw new Error("Error creating or joining a new room");
        }
      }
    } catch (error) {
      console.error("Error joining room:", error.message);
    }
  };

  const joinRoomWithUser = async (selectedUserId) => {
    try {
      const existingRoomId = await getExistingRoomId(user1Id, selectedUserId);

      if (existingRoomId) {
        socket.emit("join_room", { roomId: existingRoomId });
        setRoomData({ roomId: existingRoomId, showChat: true });
        getRoomsForUser(user1Id);
      } else {
        const newRoomData = await createRoom(user1Id, selectedUserId);
        if (newRoomData && newRoomData.roomId) {
          socket.emit("join_room", { roomId: newRoomData.roomId });
          setRoomData({ roomId: newRoomData.roomId, showChat: true });
          getRoomsForUser(user1Id);
        } else {
          throw new Error("Error creating or joining a new room");
        }
      }
    } catch (error) {
      console.error("Error joining room:", error.message);
    }
  };

  return (
    <>
      <div className='row'>
        <div className='coloo3 col-md-3'>
          <div className='header'>
            <div className='search-container'>
              <FontAwesomeIcon icon={faSearch} className='search-icon' />
              <input className='search' placeholder='Search' />
              <FontAwesomeIcon icon={faSync} className='loop-icon' />
            </div>
            <div className="joinChatContainer">
              <h3>Join A Chat</h3>
              <label>User 1 ID: <input type="text" value={user1Id} onChange={(e) => setUser1Id(e.target.value)} /></label>
              <label>User 2 ID: <input type="text" value={user2Id} onChange={(e) => setUser2Id(e.target.value)} /></label>
              <button onClick={joinRoom}>Join A Room</button>
              <div>
              <div className='Liste'>
          <h4>Utilisateurs avec lesquels vous avez discuté :</h4>
          <ul>
  {userRooms.map((userId, index) => (
    <li key={index} className="user-list-item" onClick={() => joinRoomWithUser(userId)}>
      <img src={`../../../public/ChatImage/-person_90382.png`} alt="user" className="user-image" />
      {userId}
    </li>
  ))}
</ul>

         
        </div>

              </div>
              
            </div>
          </div>
        </div>
        
        <div className='colooo6 col-md-6'>
          <div className='contenu'>
            <div className='chat-container'>
              <Chat socket={socket} username={user1Id} room={roomData.roomId} />
            </div>
          </div>
        </div>
        <div className='coloo2 col-md-2'>Liste d'amis !!</div>
        
      </div>
    </>
  );
}
