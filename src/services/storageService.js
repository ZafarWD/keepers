import jwtDecode from "jwt-decode";

export function loginWithJwt(token) {
    localStorage.setItem("token", token);
}

export function getCurrentUser() {
    return localStorage.getItem("token") ?
        jwtDecode(localStorage.getItem("token")) :
        null;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function logout() {
    console.log("helo");
    return localStorage.removeItem("token");
}