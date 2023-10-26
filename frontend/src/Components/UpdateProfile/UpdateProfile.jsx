import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, registerUser, updateProfileofUser } from "../../actions/User";
import { Avatar, Button, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom"
import "./UpdateProfile.css";
import Loader from "../Loader/Loader";
function UpdateProfile() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {
        loading: updateLoading, error: updateError,
        message
    } = useSelector((state) => state.updateProfile)
    const { loading, error, user } = useSelector((state) => state.user)
    console.log(user);
    const [avtar, setAvtar] = useState("");
    const [avtarPrev, setAvtarPrev] = useState(user.avtar.url);
    const [inputData, setInputData] = useState({

        name: user.name,
        email: user.email,


    })
    const handleImageChange = (e) => {
        console.log("j")
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvtarPrev(Reader.result)
                setAvtar(Reader.result)
            }
        }

    }
    async function handleFormSubmit(e) {
        e.preventDefault();

        const updateProfileInfo = {
            name: inputData.name,
            avtar: avtar,

            email: inputData.email
        }

        await dispatch(updateProfileofUser(updateProfileInfo));
        dispatch(loadUser());

    }
    function handleInputChange(e) {
        const { name, value } = e.target;

        setInputData({ ...inputData, [name]: value })
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (updateError) {
            alert.error(updateError);
            dispatch({ type: "clearErrors" });
        }

        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, error, alert, updateError, message]);
    return (
        <>
            {
                loading ? <Loader /> : (
                    <div className="updateProfile">

                        <form onSubmit={handleFormSubmit} className="updateProfileForm">
                            <Typography variant="h3" style={{ padding: "3vmax" }} >Social App</Typography>

                            <Avatar src={avtarPrev} alt="user" sx={{ height: "10vmax", width: "10vmax" }} />





                            <input
                                type="file"
                                required
                                accept="images/*"
                                onChange={handleImageChange}

                            />
                            <input
                                type="name"
                                name="name"
                                onChange={handleInputChange}
                                value={inputData.name}
                                placeholder="enter name"
                                className="updateProfileInputs"

                            />
                            <input
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                className="updateProfileInputs"
                                value={inputData.email}
                                placeholder="enter email"

                            />


                            <Button disabled={updateLoading} type="submit">Update Profile</Button>

                        </form>
                    </div>

                )
            }
        </>
    )
}

export default UpdateProfile;