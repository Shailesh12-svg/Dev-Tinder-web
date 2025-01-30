import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFeed } from "../../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const loggedInUser = useSelector((store) => store.user);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      let filteredFeed = res.data;
      if (loggedInUser?._id) {
        filteredFeed = filteredFeed.filter(
          (user) => user._id !== loggedInUser._id
        );
      }
      dispatch(addFeed(filteredFeed));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSwipe = (direction, userId) => {
    if (direction === "left") {
      handleSendRequest("ignored", userId);
    } else if (direction === "right") {
      handleSendRequest("interested", userId);
    }
    dispatch(removeUserFeed(userId));
  };

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;
  if (feed.length === 0) return <h1 className="text-center mt-20">No users found!</h1>;

  return (
    feed && (
      <div className="flex justify-center items-start min-h-screen pt-20">
        <UserCard
          user={feed[0]}
          onSwipe={handleSwipe}
          onButtonClick={handleSendRequest}
        />
      </div>
    )
  );
};

export default Feed;
