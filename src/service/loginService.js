import axios from "./axios";


const LOGIN_BACK = "http://localhost:8080";


export const validarUser = ( Credentials ) => axios.post(LOGIN_BACK + "/login" , Credentials );