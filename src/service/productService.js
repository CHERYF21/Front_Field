import axios from "./axios";

const PRODUCT_BACK = "http://localhost:8080";

//CRUD Durango

export const createProducts = (NewProduct) => axios.post(PRODUCT_BACK + "/createProduct", NewProduct); 

export const listProductS = () => axios.get(PRODUCT_BACK + "/listProducts");

export const updateProducts =({id}) => axios.put(PRODUCT_BACK + "/{id}/update"); 

export const deleteProducts =({id}) => axios.delete(PRODUCT_BACK + "/{id}/delete");

export const getProductById =({id}) => axios.get(PRODUCT_BACK + "/{id}/get");



 