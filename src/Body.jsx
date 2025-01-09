import NavBar from "./navBar"
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from 'axios'
import {BASE_URL} from './utils/constants'
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
const Body =()=>{
  const dispatch =useDispatch();
  const navigate =useNavigate();
  const fetchUser =async()=>{
    try{
    const res = await axios.get(BASE_URL +'/profile',{
      withCredentials:true,
    });
    dispatch(addUser(res.data))
  }catch(err){
    if(err.response.status==401){
    navigate("/login")
    }
    console.error(err);
  }
  }
  useEffect(()=>{
    fetchUser();
  },[])
    return(
        <>
        <NavBar/>
        <Outlet/>
        {/* <Footer/> */}
        </>
    )
}

export default Body;