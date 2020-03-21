import http from "./httpService";
import { getToken } from "./storageService";

const apiEndpoint = "http://localhost:4000/api/passwords";

export function generate(body) {
    const options = {
        headers: { "x-auth-token": getToken() }
    };
    return http.post(`${apiEndpoint}/generate`, body, options);
}