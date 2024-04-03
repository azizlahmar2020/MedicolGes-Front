// ChatBox.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Popup } from 'react-chat-elements'
import { ChatItem } from 'react-chat-elements'
import Footer from "/src/components/template/footer";

import io from "socket.io-client";

import Chat from '../Chat/chat';
import './ChatBox.css';
import { useParams } from 'react-router-dom';
import NavbarSub from '../template/navbarSubadmin';
import ChatList from '../ChatList/chatList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import VideoCall from '../VideoChat/HomeVideo'
const socket = io.connect("http://localhost:3001", {
  transports: ['websocket'],
});

export default function ChatBox() {
  const { idsession, iduserselection } = useParams();

  const [roomData, setRoomData] = useState({
    roomId: "",
    showChat: false,
  });

  const [user1Id, setUser1Id] = useState(idsession);
  const [user2Id, setUser2Id] = useState(iduserselection);
  const [searchTerm, setSearchTerm] = useState('');

  const [user2name, setUser2name] = useState(user2Id);

  const [userRooms, setUserRooms] = useState([]);
  const [unreadConversations, setUnreadConversations] = useState([]);

 


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
    // Fonction pour joindre la salle automatiquement
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

    // Appeler joinRoom automatiquement au chargement du composant
    joinRoom();
  }, [user1Id, user2Id]); // Ajout des dépendances user1Id et user2Id

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

  const joinRoomWithUser = async (selectedUserId) => {
    try {
      const existingRoomId = await getExistingRoomId(user1Id, selectedUserId);
      console.log(selectedUserId);
      setUser2name(selectedUserId)
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
          setUser1Id(selectedUserId);
        } else {
          throw new Error("Error creating or joining a new room");
        }
      }
    } catch (error) {
      console.error("Error joining room:", error.message);
    }
  };

  const handleNewMessage = (roomId) => {
    if (!unreadConversations.includes(roomId)) {
      setUnreadConversations((prevUnread) => [...prevUnread, roomId]);
    }
  };

  useEffect(() => {
    // Écoutez l'événement 'new_message' pour gérer les nouveaux messages
    socket.on('new_message', ({ roomId }) => {
      handleNewMessage(roomId);
    });

    return () => {
      // Nettoyez l'écouteur lors du démontage du composant
      socket.off('new_message');
    };
  }, [unreadConversations]);

  return (
    <>
     
      <div className='chatpage row'> <NavbarSub />
        <div className='coloo3 col-md-3'>
          <div className='header-test'>
           
            <div className="joinChatContainer">
              <div>
                <ChatList
                  userRooms={userRooms}
                  joinRoomWithUser={joinRoomWithUser}
                  unreadConversations={unreadConversations}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='colooo6 col-md-6'>
          <div className='contenu'>
            <div className='chat-container'>
            <Chat socket={socket} username={ user1Id} user2={user2name} room={roomData.roomId} />
            </div>
          </div>
        </div>
        <div className='coloo2 col-md-2'>
             <VideoCall></VideoCall>
        </div>
<Footer className='footer' />


</div>
    </>
  );
}
