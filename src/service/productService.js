import axios from "./axios";

const PRODUCT_BACK = "http://localhost:8080";

//CRUD Durango

export const createProducts = (NewProduct) => axios.post(PRODUCT_BACK + "/createProduct", NewProduct); 

export const listProductS = () => axios.get(PRODUCT_BACK + "/listProducts");
// Corregir la función updateProducts
export const updateProducts = (id, updatedProduct) => axios.put(`${PRODUCT_BACK}/${id}/update`, updatedProduct);

// Corregir la función deleteProducts
export const deleteProducts = (id) => axios.delete(`${PRODUCT_BACK}/${id}/delete`);

// Corregir la función getProductById
export const getProductById = (id) => axios.get(`${PRODUCT_BACK}/${id}/get`);

 