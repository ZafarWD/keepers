import http from "./httpService";

const apiEndpoint = "http://localhost:4000/api/login";
export function login(user) {
    return http.post(apiEndpoint, user);
}