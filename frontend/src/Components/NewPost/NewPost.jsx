import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import "./NewPost.css"
import { Button, Typography } from "@mui/material";
import { createPost } from "../../actions/Post";
import { useAlert } from "react-alert";

function NewPost() {
    const dispatch=useDispatch();
    const alert=useAlert();
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const {loading,error,message}=useSelector((state)=>state.newPost);
    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        const Reader=new FileReader();
          Reader.readAsDataURL(file);
        Reader.onload=()=>{
            if(Reader.readyState===2){
                setImage(Reader.result);
            }
        }
      
    }
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(createPost(caption,image));
    }
    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch({type:'clearError'});
      }
      if(message){
        alert.success(message);
        dispatch({type:'clearMessage'});
      }
    },[dispatch,error,message,alert])
    return (
        <>
            <div className="newPost">
                <form className="newPostForm" onSubmit={submitHandler}>
                    <Typography variant="h3">New Post</Typography>

                    {
                    image && <img
                               src={image}
                               alt="post" 
                              
                            />
                    }
                      <input
                        type="file"
                        accept="image/*"
                         onChange={handleImageChange}
                    />
                    <input
                        type="text"
                        placeholder="caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    <Button
                    disabled={loading} type="submit">Post</Button>


                </form>
            </div>
        </>
    )
}

export default NewPost;