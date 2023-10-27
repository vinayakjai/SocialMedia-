import React, { useState, useEffect } from "react";
import "./ResetPassword.css"
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, resetPassword, updatePassword } from "../../actions/User";

function ResetPassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params=useParams();

    const { error, loading, message } = useSelector((state) => state.resetPassword)
    const [newPassword,setNewPassword]=useState("");
    const updatePasswordHandler = async (e) => {
        e.preventDefault();
       await dispatch(resetPassword(newPassword,params.token)) 



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
            <div className="resetPassword">
                <form className="resetPasswordForm" onSubmit={updatePasswordHandler}>
                    <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>
                   
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="enter newpassword"
                        required
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                        className="resetPasswordInputs"
                    />
                    <Link to="/"><Typography>Login</Typography></Link>
                    <Typography>or</Typography>
                    <Link to="/forgot/password/"><Typography>Request Another Token</Typography></Link>
                    <Button disabled={loading} type="submit">Reset-Password</Button>
                </form>
            </div>
        </>
    )
}
export default ResetPassword;