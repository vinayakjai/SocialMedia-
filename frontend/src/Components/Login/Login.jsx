import React,{useEffect, useState} from "react";
import {useAlert} from "react-alert";
import "./Login.css"
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../actions/User";
function Login() {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {error}=useSelector((state)=>state.user);
    const {message}=useSelector((state)=>state.deleteProfile);
    const [inputData,setInputData]=useState({
     
    })
    function handleInputData(e){
        const {name,value}=e.target;
       
       
        setInputData({...inputData,[name]:value})
         
    }
    const loginHandler=(e)=>{
             e.preventDefault();
             
             const formData=inputData;
             
             dispatch(loginUser(formData))
             setInputData({})
            
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
    },[dispatch,alert,error,message])
    return (
        <>
            <div className="login">
                <form className="login-form" onSubmit={loginHandler}>
                    <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        required
                        value={inputData.email || " "}
                        onChange={handleInputData}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        required 
                        value={inputData.password || ""}
                         onChange={handleInputData}
                        />
                    <Link to="/forgot/password">
                        <Typography>
                            forgotpassword
                        </Typography>
                    </Link>
                    <Link to="/register">
                        <Typography>
                            New User?
                        </Typography>
                    </Link>
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </>
    )
}
export default Login;