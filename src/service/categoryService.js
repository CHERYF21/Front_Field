import axios from "./axios";
import authHeader from "./auth_Header";

const CATEGORY_BACK = "http://localhost:8080";

export const createCategory = (categoryData)=> axios.post(CATEGORY_BACK + "/user/createcategory",categoryData,{headers: authHeader()});

export const listarCategory = () => axios.get(CATEGORY_BACK + "/user/listCategory",{headers: authHeader()});