import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();






  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };
  
  const handleGoogleLogin = async () => {
    
      window.location.href = "http://localhost:8000/auth/google"; // Redirect to Google OAuth
    
  };
  const handleGoogleCallback = async () => {
    // Step 2: On successful authentication, you will be redirected back to the frontend, handle token
    try {
      const res = await axios.get("http://localhost:8000/auth/google/callback");  // This should return the token
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);  // Store token in localStorage or Redux
        navigate("/feed");  // Redirect to feed page after successful login
      } else {
        setError("No token received from server.");
      }
    } catch (err) {
      setError("Something went wrong with Google login.");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      setIsLoginForm(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {isLoginForm ? "Welcome Back" : "Create an Account"}
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          {isLoginForm
            ? "Login to continue to your account"
            : "Sign up to get started"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLoginForm && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLoginForm(!isLoginForm)}
            className="text-blue-500 hover:underline focus:outline-none transition"
          >
            {isLoginForm
              ? "Don't have an account? Sign up here"
              : "Already have an account? Log in here"}
          </button>
          <div className="mt-4">
            <button
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
              onClick={handleGoogleLogin}
            >
              OR SIGN IN WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

