import { Typography } from "@mui/material";
import React from "react";
import "./NotFound.css"
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <div className="container">
                <div className="contentContainer">
                    <Typography variant="h2">Page Not Found</Typography>
                </div>

                <Link to="/" className="HomeButton">Go to Home</Link>
            </div>
        </>
    )
}

export default NotFound;