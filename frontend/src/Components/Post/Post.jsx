import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert"
import "./Post.css";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { ChatBubbleOutline, DeleteOutline, Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, likePost } from "../../actions/Post";
import { getpostoffollowing } from "../../actions/User";
import User from "../Users/User";
import CommentCard from "../commentCard/CommentCard";
function Post({
    postId,
    caption,
    postImage,
    likes,
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete=false,
    isAccount=false
}) {



    const dispatch = useDispatch();

    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [liked, setLiked] = useState(false);
    const { user } = useSelector((state) => state.user);

    const alert = useAlert();
    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        if (isAccount) {
           console.log("bring my post")
        } else {
            dispatch(getpostoffollowing());
        }


    }


    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));
        if (isAccount) {
            console.log("bring my post")
         } else {
             dispatch(getpostoffollowing());
         }

    }

    useEffect(() => {
        {
            likes.map(like => {
                if (like._id === user._id) {
                    setLiked(true);
                }
            })
        }
    }, [likes, user._id])

    return (
        <>
            <div className="post">
                <div className="postHeader">
                    {
                        isAccount ? <Button><MoreVert /></Button> : null
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
                    onClick={() => setLikesUser(!likesUser)}

                    disabled={likes.length === 0 ? true : false}
                > <Typography>{likes.length}likes</Typography></button>

                <div className="postFooter">
                    <Button onClick={handleLike}>{
                        liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />
                    }</Button>
                    <Button onClick={() => setCommentToggle(!commentToggle)}>
                        <ChatBubbleOutline />
                    </Button>
                    {
                        isDelete ? <Button><DeleteOutline /></Button> : null
                    }
                </div>
                <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                    <div className="dialogBox">
                        <Typography variant="h6">
                            Liked By
                            {
                                likes.map(userswholikedthepost => {
                                    return <User

                                        key={userswholikedthepost._id}
                                        userId={userswholikedthepost._id}
                                        name={userswholikedthepost.name}
                                        avatar={userswholikedthepost.avtar.url}

                                    />


                                })
                            }
                        </Typography>
                    </div>
                </Dialog>

                <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
                    <div className="dialogBox">
                        <Typography variant="h6">
                            Comments

                        </Typography>
                        <form className="commentForm" onSubmit={addCommentHandler}>
                            <div className="addCommentContainer">
                                <input className="commentInput"
                                    type="text"
                                    value={commentValue}
                                    onChange={(e) => setCommentValue(e.target.value)}
                                    placeholder="Comment Here"
                                    required
                                />
                                <Button type="submit" variant="contained">Add</Button>
                            </div>

                            <div className="allComments">


                                {
                                    comments.length > 0 ? comments.map(comment => {
                                      
                                        return <CommentCard
                                            key={comment._id}
                                            userId={comment.user._id}
                                            name={comment.user.name}
                                            avtar={comment.user.avtar.url}
                                            comment={comment.comment}
                                            commentId={comment._id}
                                            postId={postId}
                                            isAccount={isAccount}
                                        />
                                    }) : <Typography variant="h5">No Comments yet</Typography>

                                }

                            </div>
                        </form>
                    </div>
                </Dialog>
            </div>

        </>
    )
}

export default Post;