import React, { useState } from "react";
import "./Post.css";
import { Avatar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ChatBubbleOutline, DeleteOutline, Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material"
function Post({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete ,
    isAccount 
}) {

    const [liked, setLiked] = useState(false);
    const handleLike = () => {
        setLiked(!liked);
    }
    return (
        <>
            <div className="post">
                <div className="postHeader"> 
                {
                    isAccount? <Button><MoreVert /></Button>:null
                }
                </div>
                <img src={postImage} alt="post" />
                <div className="postDetails">
                    <Avatar src={ownerImage} alt="user" sx={{
                        height: "3vmax",
                        width: "3vmax",
                    }} />

                    <Link to={`/user/${ownerId}`}><Typography fontWeight={700}>{ownerName}</Typography></Link>
                    <Typography

                        fontWeight={100}
                        color="rgba(0,0,0,0.582)"
                        style={{ alignSelf: "center" }}
                    >{caption}</Typography>
                </div>

                <button
                    style={{
                        border: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                        margin: "1vmax 2vmax"
                    }}
                > <Typography>5likes</Typography></button>

                <div className="postFooter">
                    <Button onClick={handleLike}>{
                        liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />
                    }</Button>
                    <Button><ChatBubbleOutline /></Button>
                    {
                    isDelete?<Button><DeleteOutline /></Button>:null
                    }
                </div>

            </div>
        </>
    )
}

export default Post;