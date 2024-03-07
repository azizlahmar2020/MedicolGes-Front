import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./chat";
import ChatBox from "../ChatBoxPage/ChatBox";

const socket = io.connect("http://localhost:3001", {
  transports: ['websocket'],
});

function Messenger() {
  const [user1Id, setUser1Id] = useState("");
  const [user2Id, setUser2Id] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState("");

  const joinRoom = async () => {
    try {
      const existingRoomId = await getExistingRoomId(user1Id, user2Id);

      if (existingRoomId) {
        socket.emit("join_room", { roomId: existingRoomId });
        setRoom(existingRoomId);
      } else {
        const newRoomData = await createRoom(user1Id, user2Id);
        if (newRoomData && newRoomData.roomId) {
          socket.emit("join_room", { roomId: newRoomData.roomId });
          setRoom(newRoomData.roomId);
        } else {
          throw new Error("Error creating or joining a new room");
        }
      }

      setShowChat(true);
    } catch (error) {
      console.error("Error joining room:", error.message);
    }
  };

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

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <label>User 1 ID: <input type="text" value={user1Id} onChange={(e) => setUser1Id(e.target.value)} /></label>
          <label>User 2 ID: <input type="text" value={user2Id} onChange={(e) => setUser2Id(e.target.value)} /></label>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatBox socket={socket} username={user1Id} room={room} />
      )}
    </div>
  );
}

export default Messenger;
