import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { FaUserEdit, FaPhoneAlt, FaVideo, FaPaperPlane } from "react-icons/fa"; // ✅ Import icons
import "./Chat.css";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);

  const userId = user?._id;

  //Sending a new Message
  const[messages ,setMessages]=useState([]);
  const [newMessage, setNewMessage] = useState("");


  const sendMessage =()=>{
    const socket = createSocketConnection();
    socket.emit("sendMessage",{firstName:user.firstName,userId,targetUserId,text:newMessage});setNewMessage('')
  }
  

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user?.firstName, userId, targetUserId });

    socket.on('messageReceived',({firstName,text})=>{
      setMessages((messages)=>[...messages,{firstName,text}]);
    })

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user]);
  
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
            <button className="action-button" title="Edit Profile" onClick={() => alert("Edit Profile Clicked")}>
              <FaUserEdit /> {/* ✅ React Icon */}
            </button>
            <button className="action-button" title="Phone Call" onClick={() => alert("Phone Call Clicked")}>
              <FaPhoneAlt /> {/* ✅ React Icon */}
            </button>
            <button className="action-button" title="Video Call" onClick={() => alert("Video Call Clicked")}>
              <FaVideo /> {/* ✅ React Icon */}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
      
        <div className="chat-messages">
  {messages.map((msg, index) => (
    <div key={index} className="chat chat-start">
      <div className="chat-header">
        {msg.firstName}
        <time className="text-xs opacity-50">2 hours ago</time>
      </div>
      <div className="chat-bubble">{msg.text} </div>
      <div className="chat-footer opacity-50">Seen</div>
    </div>
  ))}
</div>


        {/* Input Box */}
        <div className="chat-input">
          <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}type="text" className="input-field" placeholder="Type a message..." />
          <button onClick={sendMessage}className="send-button">
            <FaPaperPlane /> {/* ✅ React Icon */}
          </button>
        </div>
      </div>
    </div>
  );

};

export default Chat;
