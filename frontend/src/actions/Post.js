import axiosinstance from "../helpers/axiosInstance";


export const likePost = (idofpost) => async (dispatch) => {
    try {
        dispatch({
            type: 'likeRequest',

        })


        const { data } = await axiosinstance.get(`/post/${idofpost}`);


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



export const addCommentOnPost = (idofpost, comment) => async (dispatch) => {
    try {
        dispatch({
            type: 'addCommentRequest',

        })

       
        const { data } = await axiosinstance.put(`/post/comment/${idofpost}`, {
            comment
        },
            {
                headers: {
                    "content-type": "application/json"
                }
            }

        );
        
        

        dispatch({
            type: "addCommentSuccess",
            payload: data.message
        })

    } catch (err) {
        dispatch({
            type: "addCommentFailure",
            payload: err,
        })
        console.log("addComment", err)
    }
}




export const deleteCommentOnPost = (idofpost, commentId) => async (dispatch) => {
   
    try {
        dispatch({
            type: 'deleteCommentRequest',

        })

        const commentIdInfo={
            data:{commentId}
        }
      
        const { data } = await axiosinstance.delete(`/post/comment/${idofpost}`,commentIdInfo,
            {
                headers: {
                    "content-type": "application/json"
                }
            }

        );
          

        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message
        })

    } catch (err) {
        dispatch({
            type: "deleteCommentFailure",
            payload: err,
        })
        console.log("deleteComment", err)
    }
}





export const getMyPost = () => async (dispatch) => {
    try {
        dispatch({
            type: 'postRequest',

        })

       
        const { data } = await axiosinstance.get(`/my/posts`);
        
        

        dispatch({
            type: "postSuccess",
            payload: data.posts
        })

    } catch (err) {
        dispatch({
            type: "postFailure",
            payload: err.response.data.message,
        })
        console.log("posts", err)
    }
}




export const createPost = (caption,image) => async (dispatch) => {
    try {
        dispatch({
            type: 'newpostRequest',

        })

       
        const { data } = await axiosinstance.post(`/post/upload`,{
          caption,
          image
        });
        
        

        dispatch({
            type: "newpostSuccess",
            payload: data.message
        })

    } catch (err) {
        dispatch({
            type: "newpostFailure",
            payload: err.response.data.message,
        })
        console.log("newpost", err)
    }
}





export const updateCaption = (idofpost,caption) => async (dispatch) => {
    try {
        dispatch({
            type: 'updateCaptionRequest',

        })

       
        const { data } = await axiosinstance.put(`/post/${idofpost}`,{
         caption
        });
        
        

        dispatch({
            type: "updateCaptionSuccess",
            payload: data.message
        })

    } catch (err) {
        dispatch({
            type: "updateCaptionFailure",
            payload: err.response.data.message,
        })
        console.log("updateCaption", err)
    }
}
