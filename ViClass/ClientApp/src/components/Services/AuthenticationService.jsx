import authService, {AuthenticationResultStatus} from "../api-authorization/AuthorizeService";
import {QueryParameterNames} from "../api-authorization/ApiAuthorizationConstants";

export const clientSignIn = async () => {
    const returnUrl = getReturnUrl();
    const state = {returnUrl};

    const result = await authService.signIn(state);

    switch (result.status) {
        case AuthenticationResultStatus.Redirect:
            window.location.replace(result.redirectUrl);
            break;
        case AuthenticationResultStatus.Success:
            window.location.replace(getReturnUrl(result.state));
            break;
        case AuthenticationResultStatus.Fail:
            console.error("Login failed.");
            break;
        default:
            throw new Error(`Invalid status result ${result.status}.`);
    }
};
const getReturnUrl = (state) => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(QueryParameterNames.ReturnUrl);

    if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
        // This is an extra check to prevent open redirects.
        throw new Error(
            "Invalid return url. The return url needs to have the same origin as the current page."
        );
    }

    return (
        (state && state.returnUrl) ||
        fromQuery ||
        `${window.location.origin}/dashboard/`
    );
};