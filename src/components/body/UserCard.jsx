import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFeed } from '../../utils/feedSlice'
const UserCard = ({user}) => {
    const{firstName,lastName,photoUrl,gender,age,about,_id} =user
    const dispatch =useDispatch();

  const handleSendRequest = async(status,userId)=>{
    try{
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
        withCredentials: true,
      });
      dispatch(removeUserFeed(userId))
    }catch(err){
      console.log(err.message)
    }
  }




  return (
  
    <div className="card bg-base-400 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="User photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {gender && age && <p>{gender + " " + age}</p>}
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button  onClick={()=>handleSendRequest("ignored",_id)}className="btn btn-primary">Ignore</button>
      <button  onClick={()=>handleSendRequest("interested",_id)}className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )

}

export default UserCard