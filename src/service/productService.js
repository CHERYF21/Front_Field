import axios from "./axios";

const PRODUCT_BACK = "http://localhost:8080"; // Cambié la URL base

// CRUD Durango

export const createProducts = (newProduct) => axios.post(`${PRODUCT_BACK}/user/createProduct`, newProduct);

export const listProducts = () => axios.get(`${PRODUCT_BACK}/user/listProducts`);

// Corregir la función updateProducts
export const updateProducts = (id, updatedProduct) => axios.put(`${PRODUCT_BACK}/user/${id}/update`, updatedProduct);

// Corregir la función deleteProducts
export const deleteProducts = (id) => axios.delete(`${PRODUCT_BACK}/user/${id}/delete`);

// Corregir la función getProductById
export const getProductById = (id) => axios.get(`${PRODUCT_BACK}/user/${id}/get`);
