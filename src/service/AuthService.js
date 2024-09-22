import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/users"

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/signup', registerObj);
export const loginAPICall = (username, password) =>
    axios.post(`${AUTH_REST_API_BASE_URL}/login`, {
        username,
        password
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Login failed", error.response || error.message);
            throw error;
        });

