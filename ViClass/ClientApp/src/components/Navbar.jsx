import React, {useState, useEffect} from 'react';
import authService from "./api-authorization/AuthorizeService";
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import {ApplicationPaths} from "./api-authorization/ApiAuthorizationConstants";

const logoutPath = {
    pathname: `${ApplicationPaths.LogOut}`,
    state: {local: true}
};

function Navbar(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        getUser();
    }, []);

    const getUser = async () => {
        const user = await authService.getUser();
        setUser(user)
    };
    return (
        <nav>
            <p>{user && user.name}</p>
            <NavLink tag={Link} className="text-dark" to={logoutPath}>
                Logout
            </NavLink>
        </nav>
    );
}

export default Navbar;
