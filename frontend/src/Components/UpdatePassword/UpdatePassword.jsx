import React, { useState, useEffect } from "react";
import "./UpdatePassword.css"
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updatePassword } from "../../actions/User";

function UpdatePassword() {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, message } = useSelector((state) => state.updatePassword)
    const [inputData, setInputData] = useState({
        oldPassword: "",
        newPassword: "",
    })
    function handleInputData(e) {
        const { name, value } = e.target;


        setInputData({ ...inputData, [name]: value })

    }
    const updatePasswordHandler = async (e) => {
        e.preventDefault();

        const updatePasswordInfo = inputData;
        console.log(updatePasswordInfo)
          await dispatch(updatePassword(updatePasswordInfo))
          dispatch(loadUser());



    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, alert, error, message])
    return (
        <>
            <div className="updatePassword">
                <form className="updatePasswordForm" onSubmit={updatePasswordHandler}>
                    <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="enter oldpassword"
                        required
                        value={inputData.oldPassword}
                        onChange={handleInputData}
                        className="updatePasswordInputs"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="enter newpassword"
                        required
                        value={inputData.newPassword}
                        onChange={handleInputData}
                        className="updatePasswordInputs"
                    />

                    <Button disabled={loading} type="submit">Change-Password</Button>
                </form>
            </div>
        </>
    )
}
export default UpdatePassword;