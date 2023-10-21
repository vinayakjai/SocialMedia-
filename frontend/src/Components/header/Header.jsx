import React, { useState } from "react";
import { Link } from "react-router-dom";


import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import "./Header.css";

function Header() {

    const [tab, setTab] = useState(window.location.pathname)
    return (
        <>


            <div className="header">
                <Link to="/" onClick={() => setTab("/")}>
                    {
                        tab === "/" ? <HomeIcon /> : <HomeOutlinedIcon />
                    }
                </Link>
                <Link to="/newpost" onClick={() => setTab("/newpost")}>
                    {
                        tab === "/newpost" ? <AddCircleIcon /> : <AddOutlinedIcon />
                    }

                </Link>
                <Link to="/search" onClick={() => setTab("/search")}>
                    {
                        tab === "/search" ? <SearchIcon /> : <SearchOutlinedIcon />
                              
                    }

                </Link>
                <Link to="/account" onClick={() => setTab("/account")}>
                    {
                        tab === "/account" ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />
                    }

                </Link>
            </div>


        </>
    )
}

export default Header;