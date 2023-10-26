import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/User";
import { Avatar, Button, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom"
import "./Register.css";
function Register() {
    const dispatch = useDispatch();
    const alert=useAlert();
    const {loading,error}=useSelector((state)=>state.user)
    const [avtar, setAvtar] = useState("");
    const [inputData, setInputData] = useState({

        name: "",
        email: "",
        password: "",

    })
    const handleImageChange = (e) => {
        const file = e.target.files[0];
       
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvtar(Reader.result)
            }
        }

    }
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const registerUserInfo={
             name:inputData.name,
             avtar:avtar,
             password:inputData.password,
             email:inputData.email
        }

         dispatch(registerUser(registerUserInfo));

    }
    function handleInputChange(e) {
        const { name, value } = e.target;

        setInputData({ ...inputData, [name]: value })
    }

    useEffect(()=>{
        if(error){
           alert.error(error);
           dispatch({type:"clearErrors"});
        }
    },[dispatch,error,alert]);
    return (
        <>
            <div className="register">

                <form onSubmit={handleFormSubmit} className="registerForm">
                    <Typography variant="h3" style={{ padding: "3vmax" }} >Social App</Typography>

                    <Avatar src={avtar} alt="user" sx={{ height: "10vmax", width: "10vmax" }} />





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
                        className="registerInputs"

                    />
                    <input
                        type="email"
                        name="email"
                        onChange={handleInputChange}
                        className="registerInputs"
                        value={inputData.email}
                        placeholder="enter email"

                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        value={inputData.password}
                        placeholder="enter password"
                        className="registerInputs"

                    />

                    <Link to="/"><Typography>Already Registred? login Now</Typography></Link>
                    <Button disabled={loading} type="submit">Register</Button>

                </form>
            </div>

        </>
    )
}

export default Register;