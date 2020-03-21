import http from "./httpService";
import { getToken } from "./storageService";

const apiEndpoint = "http://localhost:4000/api/passwords";

function getOptions() {
    const options = {
        headers: { "x-auth-token": getToken() }
    };
    return options;
}

export function store(body) {
    const options = getOptions();
    return http.put(`${apiEndpoint}/store`, body, options);
}

export function getPasswords() {
    const options = getOptions();
    return http.get(apiEndpoint, options);
}

export function deletePassword(body) {
    const options = getOptions();
    return http.delete(apiEndpoint, { headers: options.headers, data: body });
}