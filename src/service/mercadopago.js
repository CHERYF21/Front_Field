import axios from "axios";
import authHeader from './auth_Header';

const BACK_MERCADO = "http://localhost:8080";

export const ventaMercado = (cart) => axios.post(`${BACK_MERCADO}/auth/create`, cart,{headers: authHeader()});