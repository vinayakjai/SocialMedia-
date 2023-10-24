
import axiosinstance from "../helpers/axiosInstance";
import axios from "axios";
export const loginUser = (loginInfo) => async (dispatch) => {
    try {

        dispatch({
            type: "loginRequest"
        })
        const  data  = await axiosinstance.post('/login',loginInfo);
      
        dispatch({
            type: "loginSuccess",
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: 'loginFailure',
            payload: err
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
            payload: err,
        })
        console.log("->", err)
    }
}


export const registerUser = (registerInfo) => async (dispatch) => {
    try {

        dispatch({
            type: "registerRequest"
        })
        
        console.log("-->registred data", data)
        dispatch({
            type: "registerSuccess",
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: 'registerFailure',
            payload: err
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
            payload: err,
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
            payload: err,
        })
        console.log("allUsers", err)
    }
}
