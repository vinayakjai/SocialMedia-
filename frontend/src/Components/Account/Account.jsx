import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPost } from "../../actions/Post";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import "./Account.css"
import { Link } from "react-router-dom";
import User from "../Users/User";
import { logoutUser } from "../../actions/User";
function Account() {
    const alert = useAlert();
    const { loading, error, posts } = useSelector((state) => state.myPosts)
    const { user, loading: userloading } = useSelector((state) => state.user);
    const { error: likeError, message } = useSelector((state) => {

        return state.like
    })
    const dispatch = useDispatch();
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingsToggle, setFollowingsToggle] = useState(false);
    useEffect(() => {
        dispatch(getMyPost());
    }, [dispatch])

    useEffect(() => {
        if (likeError) {
            alert.error(likeError);
            dispatch({ type: 'clearErrors' });
        }

        if (message) {
            alert.success(message)
            dispatch({ type: 'clearMessage' })
        }
    }, [alert, error, message, likeError, dispatch])
   

    const logoutHandler=async ()=>{
       await dispatch(logoutUser());
       alert.success("Logged out successfully")
    }
    return (
        <>{
            loading === true || userloading === true ? <Loader /> : (
                <div className="account">
                    <div className="accountleft">

                        {
                            posts && posts.length > 0 ? posts.map(post => {
                                return (<Post
                                    key={post._id}
                                    postId={post._id}
                                    postImage={post.image.url}

                                    caption={post.caption}
                                    likes={post.likes}
                                    comments={post.comments}
                                    ownerId={post.owner._id}
                                    ownerImage={post.owner.avtar.url}
                                    ownerName={post.owner.name}
                                    isAccount={true}
                                    isDelete={true}


                                />)

                            }) : <Typography variant="h4">You have not posted anything</Typography>
                        }
                    </div>
                    <div className="accountright">
                        <Avatar
                            src={user.avtar.url}
                            sx={{ height: "8vmax", width: "8vmax" }}
                        />

                        <Typography variant="h6">{user.name}</Typography>

                        <div>
                            <button onClick={() => setFollowersToggle(!followersToggle)}>
                                <Typography>Followers</Typography>
                            </button>
                            <Typography>{user.followers.length}</Typography>
                        </div>

                        <div>
                            <button onClick={()=> setFollowingsToggle(!followingsToggle)}>
                                <Typography>Followings</Typography>
                            </button>
                            <Typography>{user.followings.length}</Typography>
                        </div>
                        <div>

                            <Typography>Posts</Typography>

                            <Typography>{user.posts.length}</Typography>
                        </div>
                        <Button variant="contained" onClick={logoutHandler}>Logout</Button>
                        <Link to="/update/profile">Edit Profile</Link>
                        <Link to="/update/password">Change Password</Link>
                        <Button variant="text" sx={{ color: "red", margin: "2vmax" }}>Delete Profile</Button>


                        <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                            <div className="dialogBox">
                                <Typography variant="h6">
                                    Followers
                                    {
                                        user && user.followers.length > 0 ? user.followers.map(follower => {
                                            return (
                                                <User

                                                    key={follower._id}
                                                    userId={follower._id}
                                                    name={follower.name}
                                                    avatar={follower.avtar.url}

                                                />
                                            )
                                        }) : <Typography style={{margin:"2vmax"}}>You have no followers</Typography>
                                    }

                                </Typography>
                            </div>
                        </Dialog>


                        <Dialog open={followingsToggle} onClose={() => setFollowingsToggle(!followingsToggle)}>
                            <div className="dialogBox">
                                <Typography variant="h6">
                                    Followings
                                    {
                                        user && user.followings.length > 0 ? user.followings.map(following => {
                                            return (
                                                <User

                                                    key={following._id}
                                                    userId={following._id}
                                                    name={following.name}
                                                    avatar={following.avtar.url}

                                                />
                                            )
                                        }) : <Typography style={{margin:"2vmax"}}>You did not follwed anyone</Typography>
                                    }

                                </Typography>
                            </div>
                        </Dialog>

                    </div>
                </div>
            )}
        </>
    )
}

export default Account;