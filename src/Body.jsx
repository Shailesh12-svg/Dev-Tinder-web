import NavBar from "./navBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/profile', {
        withCredentials: true,
      });

      // Check if response data exists before dispatching
      if (res && res.data) {
        dispatch(addUser(res.data));
      }
    } catch (err) {
      // Handle errors and check if error response exists
      if (err.response && err.response.status === 401) {
        navigate("/home");
      } else {
        console.error('Error fetching user data:', err);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Run only once when the component mounts

  return (
    <>
      {/* <NavBar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Body;
