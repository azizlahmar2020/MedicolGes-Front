import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MDEditor from "@uiw/react-md-editor";
import InputBox from "./InputBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import "./ChatWindow.css"; 

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Header = () => {
  return (
    
    <div className="header_ChatBot">

     <div className="borderrr">
         <div style={{alignItems:'center', display:'flex'  ,marginRight:'auto'}}> 
         <img src="../../../public/images/BotImage.png" style={{width:'110px',height:'80px',marginLeft:'35px'}} alt="user" className="bot" />
        
          <h1 className="title-ChatBot " style={{marginLeft:'10px' ,marginTop:'30px',marginRight:'26px'}}>MedicolGesBot</h1></div>
          <p className="exp-text">Experience MedicolGesBot’s largest and most capable AI model</p>
        </div>
        
    </div>
  );
};

const ChatWindow = () => {
  const chatContainerRef = useRef(null);
  const bottomOfChatRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isAtBottom = scrollTop + clientHeight === scrollHeight;
        setShowScrollButton(!isAtBottom);
      }
    };

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessage = async (inputText) => {
    if (!inputText) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", timestamp: new Date() },
    ]);

    setLoading(true);

    try {
      const result = await model.generateContent(inputText);
      const text = result.response.text();

      const isCode = text.includes("```");

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: "ai",
          timestamp: new Date(),
          isCode,
        },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("generateContent error: ", error);
    }
  };

  const handleScrollToBottom = () => {
    scrollToBottom();
  };

  return (
    <div className="chatBot-app">
    <div className={`chat-window`}>
     
      <Header />
     
      <div className="bgaa"> 
     
      <div className="Ici_Logo">      <img src="../../../public/images/nouveau_Logo.png" alt="user" className="hello_logo" />
</div>
      <div className="chatBot-container" ref={chatContainerRef}>

        {messages.map((message, index) => (
          <div key={index} className={`messageBot ${message.sender}`}>
            {message.isCode ? (
              <MDEditor.Markdown
                source={message.text}
                style={{ whiteSpace: "pre-wrap" }}
              />
            ) : (
              <>

                <p className="messageBot-text">{message.text}</p>
                <span className="time">
                  {message.timestamp
                    ? dayjs(message.timestamp).format("DD.MM.YYYY HH:mm:ss")
                    : ""}
                </span>
              </>
            )}
          </div>
        ))}
        <div ref={bottomOfChatRef}></div>
        
      </div>
     
     
 
      </div>
     
 <InputBox sendMessage={sendMessage} loading={loading} />
     
    </div>
    </div>
  );
};

export default ChatWindow;
