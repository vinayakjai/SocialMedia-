
import axios from "axios";

export const loginUser = (loginInfo) => async (dispatch) => {
    try {
       
        dispatch({
            type: "loginRequest"
        })
        const { data } = await axios.post("http://localhost:3200/api/v1/login", loginInfo)
        console.log("-->login data",data)
        dispatch({
            type: "loginSuccess",
            payload: data.user
        })
    } catch (err) {
       dispatch({
        type:'loginFailure',
        payload:err
       })
    }
}


export const loadUser = () => async (dispatch) => {
    try {
      
        dispatch({
            type: "loadUserRequest"
        })
        const  data  = await axios.get("http://localhost:3200/api/v1/me")
        console.log("--->data kcn",data)
        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type:'loadUserFailure',
            payload:err,
        })
      console.log("->",err)
    }
}


export const registerUser = (registerInfo) => async (dispatch) => {
    try {
       
        dispatch({
            type: "registerRequest"
        })
        const { data } = await axios.post("http://localhost:3200/api/v1/register", registerInfo)
        console.log("-->registred data",data)
        dispatch({
            type: "registerSuccess",
            payload: data.user
        })
    } catch (err) {
       dispatch({
        type:'registerFailure',
        payload:err
       })
    }
}

export const getpostoffollowing=()=>async(dispatch)=>{
     try{
         dispatch({
            type:'postoffollowingRequest',

         })

         const {data}=await LineAxisOutlined.get("http://localhost:3200/api/v1/post")

         dispatch({
            type:"postoffollowingSuccess",
            payload:data.posts
         })
     }catch(err){
        dispatch({
            type:"postoffollowingFailure",
            payload:err,
        })
     }
}