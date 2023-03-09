import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {

    return (
        <>
            <h1>nav bar</h1>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/data">Data</NavLink></li>
            </ul>
        </>
    )

}

export default Nav