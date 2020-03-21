import http from "./httpService";

const apiEndPoint = "http://localhost:4000/api/register";

export function register(user) {
    return http.post(apiEndPoint, user);
}