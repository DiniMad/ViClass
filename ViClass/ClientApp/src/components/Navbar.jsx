import React, {useState, useEffect} from 'react';
import authService from "./api-authorization/AuthorizeService";
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import {ApplicationPaths} from "./api-authorization/ApiAuthorizationConstants";

const logoutPath = {
    pathname: `${ApplicationPaths.LogOut}`,
    state: {local: true}
};

function Navbar() {


        // noinspection JSIgnoredPromiseFromCall

    return (
        <nav>
            {user && (
                <>
                    {/* TODO: It is better to change the link parameter to username instead of userid*/}
                    <Link to={`/user/${user.sub}`}>
                        <p>{user && user.name}</p>
                    </Link>
                    <NavLink tag={Link} className="text-dark" to={logoutPath}>
                        Logout
                    </NavLink>
                </>
            )}
        </nav>
    );
}

export default Navbar;
