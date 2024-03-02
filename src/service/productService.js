import axios from "./axios";

const PRODUCT_BACK = "http://localhost:8080";

//CRUD Durango

export const createProducts = (NewProduct) => axios.post(PRODUCT_BACK + "/createProduct", NewProduct); 

export const listProductS = () => axios.get(PRODUCT_BACK + "/listProducts");




 