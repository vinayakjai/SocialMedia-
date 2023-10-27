import { configureStore } from "@reduxjs/toolkit"
import {
    getAllUsersReducers, deleteProfileReducer,
    postoffollowingReducers, updatePasswordReducer, updateProfileReducer,
    userReducer, forgotPasswordReducer, resetPasswordReducer,
    userPostsReducer,userProfileReducer, followUserReducer
} from "./Reducers/User";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { deletePostReducer, likeReducer, newpostReducer, postReducer } from "./Reducers/Post";

const initialState = {

}
const store = configureStore(

    {
        reducer: {
            user: userReducer,
            postoffollowing: postoffollowingReducers,
            allUsers: getAllUsersReducers,
            like: likeReducer,
            myPosts: postReducer,
            newPost: newpostReducer,
            deletePost: deletePostReducer,
            updateProfile: updateProfileReducer,
            updatePassword: updatePasswordReducer,
            deleteProfile: deleteProfileReducer,
            forgotPassword: forgotPasswordReducer,
            resetPassword: resetPasswordReducer,
            userPosts: userPostsReducer,
            userProfile: userProfileReducer,
            followAndUnfollowUser:followUserReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }),
    }
)

export default store;