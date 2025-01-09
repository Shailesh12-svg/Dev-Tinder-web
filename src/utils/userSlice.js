import { createSlice } from '@reduxjs/toolkit'; // Correct way


const userSlice = createSlice({
    name:'user',
    initialState:null,
    reducers:{
        //Actions methods 

        addUser:(state,action)=>{
            return action.payload;
        },

        removeUser:(state)=>{
            return null
        }
    }
});

export const{addUser,removeUser}=userSlice.actions;
export default userSlice.reducer;