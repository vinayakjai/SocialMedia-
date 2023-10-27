import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import User from "../Users/User";
import { followAndUnfollowUser, userPosts, userProfile } from "../../actions/User";
function UserProfile() {
    const dispatch = useDispatch();
    const alert = useAlert();


    const { user: me } = useSelector((state) => state.user);
    const { loading: userPostsLoading, error: userPostsError, posts } = useSelector((state) => state.userPosts)
    const { user, loading: userProfileloading, error: userProfileError } = useSelector((state) => state.userProfile);
    const { error: likeError, message } = useSelector((state) => {

        return state.like
    })
    const { error: followAndUnfollowError, loading: followAndUnfollowLoading, message: followAndUnfollowMessage } = useSelector((state) => state.followAndUnfollowUser);


    const params = useParams();
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingsToggle, setFollowingsToggle] = useState(false);
    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);

    const followHandler = async() => {
        setFollowing(!following);
       await dispatch(followAndUnfollowUser(user._id));
        dispatch(userProfile(params.id))
    }

    useEffect(() => {
        dispatch(userPosts(params.id));
        dispatch(userProfile(params.id))
       
       

    }, [dispatch,params.id])

    useEffect(()=>{
        if (me._id === params.id) {
            setMyProfile(true);
        }
        if(user){
            user.followers.forEach(eachUser=>{
                if(eachUser._id===me._id){
                    setFollowing(true);
                }else{
                    setFollowing(false);
                }
            })
        }
    },[user,me._id,params.id])

    useEffect(() => {

        if (likeError) {
            alert.error(likeError);
            dispatch({ type: 'clearErrors' });
        }
        if (followAndUnfollowError) {
            alert.error(followAndUnfollowError);
            dispatch({ type: 'clearErrors' });
        }
        if (userPostsError) {
            alert.error(userPostsError);
            dispatch({ type: 'clearErrors' });
        }
        if (userProfileError) {
            alert.error(userProfileError);
            dispatch({ type: 'clearErrors' });
        }
        if (followAndUnfollowMessage) {
            alert.success(followAndUnfollowMessage);
            dispatch({ type: 'clearMessage' });
        }

        if (message) {
            alert.success(message)
            dispatch({ type: 'clearMessage' })
        }
    }, [alert, message, likeError,
        dispatch, followAndUnfollowError,
        followAndUnfollowMessage, userProfileError, userPostsError
    ])

    

    return (
        <>{
            userPostsLoading === true || userProfileloading === true ? <Loader /> : (
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

                            }) : <Typography variant="h4">User has not made any post</Typography>
                        }
                    </div>
                    <div className="accountright">
                        {
                            user && (
                                <>
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
                                        <button onClick={() => setFollowingsToggle(!followingsToggle)}>
                                            <Typography>Followings</Typography>
                                        </button>
                                        <Typography>{user.followings.length}</Typography>
                                    </div>
                                    <div>

                                        <Typography>Posts</Typography>

                                        <Typography>{user.posts.length}</Typography>
                                    </div>
                                    {
                                        myProfile ? null : (
                                            <Button variant="contained"
                                                style={{ backgroundColor: following ? "red" : "blue" }}
                                                onClick={followHandler}
                                                disabled={followAndUnfollowLoading}>{
                                                    following ? "unfollow" : "follow"
                                                }
                                            </Button>
                                        )
                                    }




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
                                                    }) : <Typography style={{ margin: "2vmax" }}>You have no followers</Typography>
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
                                                    }) : <Typography style={{ margin: "2vmax" }}>You did not follwed anyone</Typography>
                                                }

                                            </Typography>
                                        </div>
                                    </Dialog>

                                </>

                            )
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default UserProfile;