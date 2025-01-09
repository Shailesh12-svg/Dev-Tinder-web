import React, { useState } from 'react'
import UserCard from './UserCard';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../utils/userSlice';
const EditProfile = ({user}) => {
    //React hooks
    const[firstName,setFirstName]=useState(user.firstName||"");
    const[lastName,setLastName]=useState(user.lastName||"");
    const[age,setAge]=useState(user.age||"");
    const[gender,setGender]=useState(user.gender||"");
    const[about,setAbout]=useState(user.about||"");
    const[photoUrl,setPhotoUrl]=useState(user.photoUrl||"");
    const[showToast,setShowToast]=useState(false)
    const dispatch=useDispatch();
    const handleUpdateProfile =async()=>{
        
        try{
            const response = await axios.patch(BASE_URL+"/profile/edit",{
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about},
                {
                withCredentials:true,

            })
            dispatch(addUser(response?.data?.user))
            //Notification
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false)
            },3000)
        }catch(err){
            console.log(err.message)
        }
    }   




  return (
    <>
    <div className='flex justify-center my-10'>
    <div className="flex justify-center mx-10">
    <div className="card bg-accent-400 w-96 shadow-xl">
  <div className="card-body">
    <h1 className="card-title justify-center">Edit Profile</h1>
    <div>
    <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input 
  type="text" 
  value={firstName}  
  className="input input-bordered w-full max-w-xs"
  onChange={(e)=>setFirstName(e.target.value)}
  />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input 
  type="text" 
  value={lastName} 
  className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>setLastName(e.target.value)}
  />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Age</span>
  </div>
  <input 
  type="text" 
  value={age} 
  className="input input-bordered w-full max-w-xs" 
  onChange={(e) => setAge(Number(e.target.value))}
  />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Gender</span>
  </div>
  <input 
  type="text" 
  value={gender} 
  className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>setGender(e.target.value)}
  />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">About</span>
  </div>
  <input 
  type="text" 
  value={about} 
  className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>setAbout(e.target.value)}
  />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Photo Url</span>
  </div>
  <input 
  type="text" 
  value={photoUrl} 
  className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>setPhotoUrl(e.target.value)}
  />
</label>
    </div>
    <div className="card-actions justify-center">
      <button 
      onClick={handleUpdateProfile}
      className="btn btn-primary"
      >Update Profile</button>
    </div>
  </div>
</div>
</div>
<UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
</div>
{showToast&&(<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated successfully.</span>
  </div>
</div>
)}
</>
  )
  
}

export default EditProfile