import authService from "./AuthorizeService";
import { QueryParameterNames } from "./ApiAuthorizationConstants";

export default async function login() {
    var returnUrl = getReturnUrl();
    const state = { returnUrl };
    const result = await authService.signIn(state);
    return result;
}
export async function isUserAuthenticate() {
    return await authService.isAuthenticated();
}
export const LoginResult = {
    Redirect: "redirect",
    Success: "success"
};
export function getReturnUrl(state) {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(QueryParameterNames.ReturnUrl);
    if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
        // This is an extra check to prevent open redirects.
        throw new Error(
            "Invalid return url. The return url needs to have the same origin as the current page."
        );
    }
    return (
        (state && state.returnUrl) || fromQuery || `${window.location.origin}/`
    );
}
