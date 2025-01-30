import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice"; // Assuming you have this action to set user in Redux
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = () => {
      try {
        // Step 1: Extract token and user data from query parameters (or from cookies)
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token"); // Assuming the backend sends this as a query param
        const user = JSON.parse(queryParams.get("user")); // Assuming `user` is serialized JSON in the URL



        console.log(token)

        if (token && user) {
          // Step 2: Store user data in Redux
          dispatch(addUser(user));


          // Step 4: Navigate to the /feed page
          navigate("/feed");
        } else {
          setError("No token or user data received from server.");
        }
      } catch (err) {
        setError("Something went wrong while processing Google login.");
      }
    };

    handleGoogleCallback();
  }, [dispatch, navigate]);

  return (
    <div>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>Loading... Redirecting...</div>
      )}
    </div>
  );
};

export default GoogleCallback;
