import axios from "axios"
import { BASE_URL } from "../../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../../utils/connectionSlice"


const Connections = () => {
  const connections =useSelector(store=>store.connections)
  const dispatch = useDispatch();


const fetchConnections = async()=>{

  try{

    const res = await axios.get(BASE_URL+"/user/connections",{
      withCredentials:true
    })

    console.log(res.data.data)  //fetched the connections properly
    dispatch(addConnections(res.data.data))
  }catch(err){
    console.log(err.message)
  }
}

useEffect(()=>{
  fetchConnections();
},[])

  if(!connections)return;

  if(connections.length==0){
    return <h1>No Connections Found</h1>
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>

    {connections.map((connection)=>{
      const{firstName,lastName,photoUrl,age,gender,about,_id} =connection;
    
      return(
        <div key={_id}className="flex items-center gap-4 p-4 m-4 bg-[#F5EDE2] shadow-md rounded-lg">
    
          <div>
          <img alt ="photo" className ='w-20 h-20 rounded-full ' src={photoUrl}/>
          </div>
          <div className="flex flex-col">
           <h2 className="text-xl font-semibold text-primary">{firstName+" "+lastName}</h2>
           <p className="text-sm text-gray-600">{about}</p>
           {age&& <p>{age + " "+gender}</p>}
            </div>
          
          
          </div>
      );
    })}


    </div>
  )
}

export default Connections