import React, {Component} from 'react';
import authService from "./api-authorization/AuthorizeService";
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import {ApplicationPaths} from "./api-authorization/ApiAuthorizationConstants";

const logoutPath = {
    pathname: `${ApplicationPaths.LogOut}`,
    state: {local: true}
};

class Navbar extends Component {
    state = {
        user: null
    };

    componentWillMount = async () => {
        const user = await authService.getUser();
        this.setState({user})
    };

    render() {
        return (
            <nav>
                <p>{this.state.user && this.state.user.name}</p>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>
                    Logout
                </NavLink>
            </nav>
        );
    }
}

export default Navbar;