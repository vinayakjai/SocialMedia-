import { configureStore } from "@reduxjs/toolkit"
import {getAllUsersReducers, postoffollowingReducers, updatePasswordReducer, updateProfileReducer,  userReducer } from "./Reducers/User";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { deletePostReducer, likeReducer, newpostReducer, postReducer } from "./Reducers/Post";

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
        newPost:newpostReducer,
        deletePost:deletePostReducer,
        updateProfile:updateProfileReducer,
        updatePassword:updatePasswordReducer
     },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware( {serializableCheck: false,}),
    }
)

export default store;