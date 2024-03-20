import axios from "./axios";
import authHeader from './auth_Header';

const PRODUCT_BACK = "http://localhost:8080"; // Cambié la URL base


export const createProducts = (newProduct) => axios.post(`${PRODUCT_BACK}/auth/createProduct`, newProduct,{headers: authHeader()});

export const listProducts = () => axios.get(`${PRODUCT_BACK}/auth/listProducts`,{headers: authHeader()});

// Corregir la función updateProducts
export const updateProducts = async (id_product, updatedProduct) => {
    console.log(updatedProduct);
    await axios.put(`${PRODUCT_BACK}/user/${id_product}/update`, updatedProduct,{headers: authHeader()})};
    

// Corregir la función deleteProducts
export const deleteProducts = (id_product) => axios.delete(`${PRODUCT_BACK}/user/${id_product}/delete`,{headers: authHeader()});

// Corregir la función getProductById
export const getProductById = (id_product) => axios.get(`${PRODUCT_BACK}/user/${id_product}/get`,{headers: authHeader()});
