import authHeader from "./auth_Header";
import axios from "./axios";

export const RegisterRequest = (property) => axios.post("/user/register",property,{headers:authHeader()});