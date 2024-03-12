import axios from "./axios";

const CATEGORY_BACK = "http://localhost:8080";

export const createCategory = (categoryData)=> axios.post(CATEGORY_BACK + "/user/createcategory",categoryData);

export const listarCategory = () => axios.get(CATEGORY_BACK + "/user/listCategory");