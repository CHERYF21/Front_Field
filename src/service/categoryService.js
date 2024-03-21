import axios from "./axios";
import authHeader from "./auth_Header";

const CATEGORY_BACK = "http://localhost:8080";

export const createCategory = (nombreCategoria)=> axios.post(CATEGORY_BACK + "/auth/createcategory",nombreCategoria,{headers: authHeader()});

export const listarCategory = () => axios.get(CATEGORY_BACK + "/auth/listCategory",{headers: authHeader()});