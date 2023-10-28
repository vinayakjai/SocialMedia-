import React from "react";
import "./CommentCard.css"
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost, getMyPost } from "../../actions/Post";
import { getpostoffollowing } from "../../actions/User";
function CommentCard({
    userId, name, avtar, comment, commentId, postId, isAccount
}) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const deleteCommentHandler =async () => {
        await dispatch(deleteCommentOnPost(postId,commentId))
        if (isAccount) {
           dispatch(getMyPost());
        } else {
            dispatch(getpostoffollowing());
        }

    }

   
    return (
        <>
            <div className="commentUser">
                <Link to={`/user/${userId}`}>
                    <img src={avtar} alt={name} />
                    <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
                    <Typography variant="p">{comment}</Typography>
                </Link>

                {
                    isAccount ? (
                        <Button onClick={deleteCommentHandler}>
                            <Delete />
                        </Button>
                    ) : userId === user._id ? (
                        <Button onClick={deleteCommentHandler}>
                            <Delete />
                        </Button>
                    ) : null
                }
            </div>
        </>
    )
}

export default CommentCard;