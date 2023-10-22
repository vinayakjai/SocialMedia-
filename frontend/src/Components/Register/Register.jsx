import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/User";
function Register(){
    const dispatch=useDispatch();
    const [inputData,setInputData]=useState({
        name:"",
        email:"",
        password:"",

    })
    async function handleFormSubmit(e){
        e.preventDefault();
        console.log(inputData)
        dispatch(registerUser(inputData));
        
    }
    function handleInputChange(e){
        const {name,value}=e.target;
        console.log(name,value)
        setInputData({...inputData,[name]:value})
    }
    return (
        <>
        <form onSubmit={handleFormSubmit}>
            <input
             type="name"
             name="name"
             onChange={handleInputChange}
             value={inputData.name}
            
            />
             <input
             type="email"
             name="email"
             onChange={handleInputChange}
             value={inputData.email}
            
            />
             <input
             type="password"
             name="password"
             onChange={handleInputChange}
             value={inputData.password}
            
            />
            <button type="submit">submit</button>
        </form>
        </>
    )
}

export default Register;