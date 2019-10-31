import React, { useContext } from "react";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { ApplicationPaths } from "./api-authorization/ApiAuthorizationConstants";
import UserContext from "./Context/UserContext";

const logoutPath = {
    pathname: `${ApplicationPaths.LogOut}`,
    state: { local: true }
};

function Navbar() {
    const user = useContext(UserContext);

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
