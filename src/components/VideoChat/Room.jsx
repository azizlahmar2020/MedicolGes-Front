import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarSub from "../template/navbarSubadmin";
import Footer from "../template/footer"; // Chemin relatif corrigé
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axiosInstance from "../../axiosInstance";

function RoomCall() {
  const [userData, setUserData] = useState({});
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in sessionStorage');
        }

        // Fetch the users and session ID
        const response = await axiosInstance.get('/users/showUsers');
        console.log('Response:', response.data); // Log the entire response

        if (response.data && response.data.sessionId) {
          setSessionId(response.data.sessionId);
        } else {
          throw new Error('Session ID not found in response data');
        }
      } catch (error) {
        console.error('Error fetching session ID:', error);
      }
    };

    fetchSessionId();
  }, []);

  useEffect(() => {
    const fetchUser = async (sessionId) => {
      try {
        const response = await axiosInstance.get(`http://localhost:3001/users/getUser/${sessionId}`);
        if (response.status === 200) {
          setUserData(response.data);
          console.log("User data:", response.data);
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (sessionId) {
      fetchUser(sessionId);
    }
  }, [sessionId]);

  const Room = () => {
    console.log(userData);

    const { roomID } = useParams();
    const meeting = async (element) => {
      const appID = 946219318;
      const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
       userData.name,
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    return (
      <>
        <NavbarSub />
        <div ref={meeting} style={{ width: "98,9vw", height: "100vh" }}></div>
        <Footer />
      </>
    );
  };

  return <Room />;
}

export default RoomCall;
