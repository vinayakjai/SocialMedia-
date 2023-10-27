import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, loadUser, registerUser, updateProfileofUser } from "../../actions/User";
import { Avatar, Button, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom"
import "./Search.css";
import Loader from "../Loader/Loader";
import User from "../Users/User";
function Search() {
    const dispatch = useDispatch();
    const alert = useAlert();


    const [name, setName] = useState("");
    const { users, loading, error } = useSelector((state) => state.allUsers)

    async function handleFormSubmit(e) {
        e.preventDefault();
        dispatch(getAllUsers(name));


    }


    return (
        <>
            {
                (
                    <div className="search">

                        <form onSubmit={handleFormSubmit} className="searchForm">
                            <Typography variant="h3" style={{ padding: "3vmax" }} >Social App</Typography>

                            <input
                                type="name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="enter name"
                                className="searchInputs"


                            />

                            <Button disabled={loading} type="submit">Search</Button>

                            <div className="searchResults">
                                {
                                    users && users.map(user => {
                                        return <User
                                            key={user._id}
                                            userId={user.id}
                                            name={user.name}
                                            avatar={user.avtar.url}
                                        />
                                    })
                                }
                            </div>

                        </form>


                    </div>

                )
            }
        </>
    )
}

export default Search;