import axios from "./axios";

const SALE_BACK = "http://localhost:8080";

export const createSale = (saleData)=> axios.post(SALE_BACK + "/createSale",saleData);

export const listSale = ()=> axios.get(SALE_BACK + "/listSale");

