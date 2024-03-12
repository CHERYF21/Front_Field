import axios from "./axios";

export const loginRequest = (user) => axios.post("/user/login", user);
export const registerRequest = (user) => axios.post("/user/register", user);