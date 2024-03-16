import axios from './axios';
import authHeader from "./auth_Header";

const UNIT_BACK = "http://localhost:8080";

export const listUnit = () => axios.get(`${UNIT_BACK}/saleunit/listunit`,{headers: authHeader()});