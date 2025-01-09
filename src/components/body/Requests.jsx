import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../../utils/requestSlice';
import { addConnections } from '../../utils/connectionSlice';

const Requests = () => {
  const requests = useSelector(store => store.requests);
  const dispatch = useDispatch();

  // Function to fetch requests
  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.connectionRequest)); // Dispatch the received requests
    } catch (err) {
      console.log('Error fetching requests:', err.message);
    }
  };

  // Function to handle accepting requests
  const handleAccept = async (status, _id) => {
    try {
      // Properly format the POST request URL
      await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {
        withCredentials: true,
      });
      // You may want to dispatch another action to update the state here or refresh the requests list
      console.log('Request accepted');
      dispatch(removeRequests(_id))
    } catch (err) {
      console.log('Error accepting request:', err.message);
    }
  };

  // Fetch requests on mount
  useEffect(() => {
    getRequest();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (!requests) return null; // Return null if requests are not yet loaded

  if (requests.length === 0) {
    return <h1>No Requests Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } = request.fromUserId;

        return (
          <div key={_id} className="flex items-center gap-4 p-4 m-4 bg-[#F5EDE2] shadow-md rounded-lg">
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-primary">{`${firstName} ${lastName}`}</h2>
              <p className="text-sm text-gray-600">{about}</p>
              {age && <p>{`${age} ${gender}`}</p>}
            </div>
            <div className="card-actions justify-end">
              {/* Pass status and _id to handleAccept when clicked */}
              <button
                onClick={() => handleAccept('accepted', request._id)} 
                className="btn btn-primary"
              >
                Accept
              </button>
              <button 
                onClick={() => handleAccept('rejected', request._id)} 
                className="btn btn-secondary"
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
