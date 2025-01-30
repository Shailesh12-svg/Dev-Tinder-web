import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

import { useParams } from "react-router-dom";
import './Chat.css'
import { createSocketConnection } from "../../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();

  const user = useSelector((store)=>store.user)

  const userId =user?._id;
  

  // Define the missing functions
  const handleProfile = () => alert("Edit Profile Clicked");
  const handleCall = () => alert("Phone Call Clicked");
  const handleVideoCall = () => alert("Video Call Clicked");

  useEffect(()=>{
    const socket = createSocketConnection();

    socket.emit("joinChat",{userId,targetUserId});

    return ()=>{
      socket.disconnect();
    }
  },[])

  return (
    <div>
      {/* Right Panel: Chat View */}
      <div className="chat-view">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-profile">
            <div className="profile-avatar">P</div>
            <div className="profile-details">
              <p className="profile-name">Profile Name</p>
              <p className="profile-status">Active now</p>
            </div>
          </div>
          <div className="chat-actions">
            <button className="action-button" title="Edit Profile" onClick={handleProfile}>
              <i className="fas fa-user-edit"></i>
            </button>
            <button className="action-button" title="Phone Call" onClick={handleCall}>
              <i className="fas fa-phone-alt"></i>
            </button>
            <button className="action-button" title="Video Call" onClick={handleVideoCall}>
              <i className="fas fa-video"></i>
            </button>
          </div>
        </div> {/* ✅ Added missing closing tag for chat-header */}

        {/* Chat Messages */}
        <div className="chat-messages">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className={`chat-message ${i % 2 === 0 ? "message-left" : "message-right"}`}>
              <div className={`message-bubble ${i % 2 === 0 ? "bubble-left" : "bubble-right"}`}>
                {`This is message ${i + 1}`}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="chat-input">
          <input type="text" className="input-field" placeholder="Type a message..." />
          <button className="send-button">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div> {/* ✅ Properly closed chat-view div */}
    </div>
  );
};

export default Chat;


