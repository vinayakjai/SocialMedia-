import { configureStore } from "@reduxjs/toolkit"
import { postoffollowingReducers, userReducer } from "./Reducers/User";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
const initialState = {

}
const store = configureStore(
    
    {
     reducer:{
        user:userReducer,
        postoffollowing:postoffollowingReducers
     },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware( {serializableCheck: false,}),
    }
)

export default store;