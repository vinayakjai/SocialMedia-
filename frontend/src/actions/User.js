
import axiosinstance from "../helpers/axiosInstance";
import axios from "axios";
export const loginUser = (loginInfo) => async (dispatch) => {
    try {

        dispatch({
            type: "loginRequest"
        })
        const  {data } = await axiosinstance.post('/login',loginInfo);
      
        dispatch({
            type: "loginSuccess",
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: 'loginFailure',
            payload: err.response.data.message
        })
    }
}






export const loadUser = () => async (dispatch) => {
    try {

        dispatch({
            type: "loadUserRequest"
        })
        const {data} = await axiosinstance.get('/me')
        
        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: 'loadUserFailure',
            payload:  err.response.data.message,
        })
        console.log("->", err)
    }
}


export const registerUser = (registerInfo) => async (dispatch) => {
    try {

        dispatch({
            type: "registerRequest"
        })
        
        const {data}=await axiosinstance.post(`/register`,registerInfo)
        dispatch({
            type: "registerSuccess",
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: 'registerFailure',
            payload:  err.response.data.message
        })
    }
}

export const getpostoffollowing = () => async (dispatch) => {
    try {
        dispatch({
            type: 'postoffollowingRequest',

        })

        const { data } = await axiosinstance.get('/post')
       

        dispatch({
            type: "postoffollowingSuccess",
            payload: data.posts
        })
        
    } catch (err) {
        dispatch({
            type: "postoffollowingFailure",
            payload:  err.response.data.message,
        })
        console.log("postfollow", err)
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: 'allUsersRequest',

        })

    
        const {data}=await axiosinstance.get('/users');
       
        dispatch({
            type: "allUsersSuccess",
            payload: data.users
        })
        
    } catch (err) {
        dispatch({
            type: "allUsersFailure",
            payload:  err.response.data.message,
        })
        console.log("allUsers", err)
    }
}



export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'logoutUserRequest',

        })

    
        const {data}=await axiosinstance.get('/logout');
       
        dispatch({
            type: "logoutUserSuccess",
            payload: data.message
        })
        
    } catch (err) {
        dispatch({
            type: "logoutUserFailure",
            payload:  err.response.data.message,
        })
        console.log("logoutUser", err)
    }
}









export const updateProfileofUser = (updateProfileInfo) => async (dispatch) => {
    try {

        dispatch({
            type: "updateProfileRequest"
        })
        
        const {data}=await axiosinstance.put(`/update/profile`,updateProfileInfo)
        dispatch({
            type: "updateProfileSuccess",
            payload: data.message
        })
    } catch (err) {
        dispatch({
            type: 'updateProfileFailure',
            payload:  err.response.data.message
        })
       
    }
}




export const updatePassword = (updatePasswordInfo) => async (dispatch) => {
    try {

        dispatch({
            type: "updatePasswordRequest"
        })
        
        const {data}=await axiosinstance.put(`/update/password`,updatePasswordInfo)
        dispatch({
            type: "updatePasswordSuccess",
            payload: data.message
        })
    } catch (err) {
        dispatch({
            type: 'updatePasswordFailure',
            payload:  err.response.data.message
        })
        console.log(err);
    }
}


export const deleteProfile=()=>async(dispatch)=>{
    try{
       dispatch({type:"deleteProfileRequest"});
       const {data}=await axiosinstance.delete('/delete/me');

       dispatch({type:"deleteProfileSuccess",payload:data.message})

    }catch(err){
        dispatch({
            type:"deleteProfileFailure",
            payload:err.response.data.message
        })
    }
}




export const forgotPassword=(email)=>async(dispatch)=>{
    try{
       dispatch({type:"forgotPasswordRequest"});
       const {data}=await axiosinstance.post('/forgot/password',{
        email
       });

       dispatch({type:"forgotPasswordSuccess",payload:data.message})

    }catch(err){
        dispatch({
            type:"forgotPasswordFailure",
            payload:err.response.data.message
        })
    }
}




export const resetPassword=(newPassword,token)=>async(dispatch)=>{
    try{
       dispatch({type:"resetPasswordRequest"});
       const {data}=await axiosinstance.post(`/forgot/password/reset/${token}`,{
          newPassword
       });

       dispatch({type:"resetPasswordSuccess",payload:data.message})

    }catch(err){
        dispatch({
            type:"resetPasswordFailure",
            payload:err.response.data.message
        })
    }
}


export const userPosts=(userId)=>async(dispatch)=>{
    try{
       dispatch({type:"userPostsRequest"});
       
       const {data}=await axiosinstance.get(`/userposts/${userId}`);

       dispatch({type:"userPostsSuccess",payload:data.posts})

    }catch(err){
        dispatch({
            type:"userPostsFailure",
            payload:err.response.data.message
        })
    }
}




export const userProfile=(userId)=>async(dispatch)=>{
    try{
       dispatch({type:"userProfileRequest"});
       const {data}=await axiosinstance.get(`/user/${userId}`);
      
       dispatch({type:"userProfileSuccess",payload:data.user})

    }catch(err){
        dispatch({
            type:"userProfileFailure",
            payload:err.response.data.message
        })
    }
}





export const followAndUnfollowUser=(userId)=>async(dispatch)=>{
    try{
       dispatch({type:"followUserRequest"});
       const {data}=await axiosinstance.get(`/follow/${userId}`);
      
       dispatch({type:"followUserSuccess",payload:data.message})

    }catch(err){
        dispatch({
            type:"followUserFailure",
            payload:err.response.data.message
        })
    }
}

