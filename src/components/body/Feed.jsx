import axios from "axios"
import { BASE_URL } from "../../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed = () => {
  const dispatch = useDispatch();
  const feed =useSelector((store)=>store.feed)
  const loggedInUser = useSelector((store) => store.user); 
  const getFeed = async()=>{
    if (feed && feed.length > 0) return;
    try{
      const res = await axios.get(BASE_URL+"/user/feed",{withCredentials:true,})
      let filteredFeed = res.data;
      if (loggedInUser?._id) {
        filteredFeed = filteredFeed.filter((user) => user._id !== loggedInUser._id);
      }
      dispatch(addFeed(filteredFeed));
      
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
    getFeed();
  },[])

  if (!feed) return null; // Return null if feed is not yet loaded
  if (feed.length === 0) return <h1>No users found!</h1>;

  return (
    feed&&(
    <div className="flex justify-center  my-10">
      <UserCard user={feed[0]}/>
    </div>
    )
  )
}

export default Feed;