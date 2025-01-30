import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

  const navigate =useNavigate();
  const handleButtonClick = () => {
    console.log("Going to Login Page")
    navigate("/login");
  };
  return (
    <div className="h-screen bg-cover bg-center pt-16" style={{ backgroundImage: 'url("https://img1.wsimg.com/isteam/stock/2017/:/rs=w:2046,m")' }}>
      <div className="flex flex-col justify-between h-full bg-black bg-opacity-50">
        
        {/* Top Heading */}
        <div className="text-center text-white px-4 mt-10">
          <h1 className="font-montserrat text-4xl font-extrabold mb-4">
            C O D E R C L U S T E R
          </h1>
        </div>

        {/* Centered Heading */}
        <div className="text-center text-white px-4 flex-grow flex items-center justify-center flex-col">
          <h1 className="font-smooch text-5xl mb-4">Connect, Share, Code!</h1>
          <button className="bg-blue-600 text-white p-3 rounded-full w-40 hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 transition-all" onClick={handleButtonClick}>
            Create Account
          </button>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-white px-4 mb-10">
          <p className="text-lg mt-4">Join our community and collaborate on amazing projects!</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
