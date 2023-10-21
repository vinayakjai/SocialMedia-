import axios from "axios";
export const loginUser = (loginInfo) => async (dispatch) => {
    try {
       
        dispatch({
            type: "loginRequest"
        })
        const { data } = await axios.post("http://localhost:3200/api/v1/login", loginInfo)
        console.log("--->data",data)
        dispatch({
            type: "loginSuccess",
            payload: data.user
        })
    } catch (err) {
       console.log("->",err);
    }
}
