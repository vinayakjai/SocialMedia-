import { configureStore } from "@reduxjs/toolkit"
import {getAllUsersReducers, postoffollowingReducers, userReducer } from "./Reducers/User";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { likeReducer, newpostReducer, postReducer } from "./Reducers/Post";

const initialState = {

}
const store = configureStore(
    
    {
     reducer:{
        user:userReducer,
        postoffollowing:postoffollowingReducers,
        allUsers:getAllUsersReducers,
        like:likeReducer,
        myPosts:postReducer,
        newPost:newpostReducer
     },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware( {serializableCheck: false,}),
    }
)

export default store;