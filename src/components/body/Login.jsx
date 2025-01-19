import { useState } from "react"
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { addUser } from "../../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../utils/constants"
const Login = () => {
  // React hooks state variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle login requests
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      console.log("Navigating to home page")
      navigate('/home');
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong..");
      console.log("Invalid Credentials", err.message);
    }
  };

  // Handle signup requests
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      console.log("Navigating to Login page")
      setIsLoginForm(true)
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong..");
      console.log("Signup Error", err.message);
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
    <div className="flex justify-center my-10">
      <div className="card bg-accent-400 w-96 shadow-xl">
        <div className="card-body">
          <h1 className="card-title justify-center">{isLoginForm ? "Login Page" : "Signup Page"}</h1>
          <form onSubmit={handleSubmit}>
            {/* First Name - for Signup */}
            {!isLoginForm && (
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            )}
            {/* Last Name - for Signup */}
            {!isLoginForm && (
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            )}
            {/* Email ID */}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="email"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </label>
            {/* Password */}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <p className="text-red-500">{error}</p>

            {/* Submit Button */}
            <div className="card-actions justify-center">
              <button type="submit" className="btn btn-primary">
                {isLoginForm ? "Login" : "Signup"}
              </button>
            </div>
          </form>

          {/* Switch to Signup/Login form */}
          <div className="text-center mt-4">
            <button
              className="text-sm text-blue-500"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Don't have an account? Signup here" : "Already have an account? Login here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
