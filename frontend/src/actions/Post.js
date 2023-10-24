import axiosinstance from "../helpers/axiosInstance";


export const likePost = (idofpost) => async (dispatch) => {
    try {
        dispatch({
            type: 'likeRequest',

        })

    
        const {data}=await axiosinstance.get(`/post/${idofpost}`);
       
       
        dispatch({
            type: "likeSuccess",
            payload: data.message
        })
        
    } catch (err) {
        dispatch({
            type: "likeFailure",
            payload: err,
        })
        console.log("likeUser", err)
    }
}
