import React,{useState} from "react";
import "./Login.css"
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loginUser } from "../../actions/User";
function Login() {
    const dispatch=useDispatch();
    const [inputData,setInputData]=useState({
       email:"",
       password:""
    })
    function handleInputData(e){
        const {name,value}=e.target;
       
       
        setInputData({...inputData,[name]:value})
         
    }
    const loginHandler=(e)=>{
             e.preventDefault();
             
             
             dispatch(loginUser(inputData))
    }
    
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
                        value={inputData.email}
                        onChange={handleInputData}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        required 
                        value={inputData.password}
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