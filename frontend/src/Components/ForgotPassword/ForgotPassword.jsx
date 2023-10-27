import React,{useEffect, useState} from "react";
import {useAlert} from "react-alert";
import "./ForgotPassword.css"
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { forgotPassword, loginUser } from "../../actions/User";
function ForgotPassword() {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {error,loading,message}=useSelector((state)=>state.forgotPassword);
    const [email,setEmail]=useState("");
    const submitHandler=async (e)=>{
        e.preventDefault();
       await dispatch(forgotPassword(email));

    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"});
        }
        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"});
        }
    },[dispatch,alert,message,error]);
   
    return (
        <>
            <div className="forgotPassword">
                <form className="forgotPasswordForm" onSubmit={submitHandler}>
                    <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        className="forgotPasswordInputs"
                      
                     
                    />
               
                  
                    <Button  disabled={loading}
                    type="submit">Send-Token</Button>
                </form>
            </div>
        </>
    )
}
export default ForgotPassword;