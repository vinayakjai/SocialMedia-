import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css"
import User from "../Users/User";
import Post from "../Post/Post";
import { getAllUsers, getpostoffollowing } from "../../actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";


function Home() {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.postoffollowing)
  const { users, loading: usersLoading } = useSelector((state) => state.allUsers);
  const { error:likeError, message } = useSelector((state) => {

    return state.like
  })
  console.log(message);
  const alert = useAlert();
  useEffect(() => {
    
    dispatch(getpostoffollowing());
    dispatch(getAllUsers());
  }, [dispatch])

  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
      dispatch({type:'clearErrors'});
    }

    if (message) {
      alert.success(message)
      dispatch({ type: 'clearMessage' })
    }
  }, [alert, error, message,likeError,dispatch])
  return (

    loading === true || usersLoading === true ? (<Loader />) : (
      <div className="home">
        <div className="homeleft">

          {
            posts && posts.length > 0 ? posts.map((post) => (


              <Post
                key={post._id}
                postId={post._id}
                postImage={post.image.url}

                caption={post.caption}
                likes={post.likes}
                comments={post.comments}
                ownerId={post.owner._id}
                ownerImage={post.owner.avtar.url}
                ownerName={post.owner.name}


              />


            )) :
              <Typography variant="h6">No Post yet</Typography>
          }
        </div>
        <div className="homeright">
          {
            users && users.length > 0 ? (users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avtar.url}
              />
            ))) : <Typography variant="h5">no users got</Typography>
          }
        </div>
      </div>
    )
  )
}

export default Home;

