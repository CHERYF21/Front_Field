import axios from "./axios";
import authHeader from "./auth_Header";

const OPINION_BACK = "http://localhost:8080";

export const createOpinion = () => axios.post(OPINION_BACK + "/user" + "/createOpinion",{headers: authHeader()});

export const listOpinion = () => axios.get(OPINION_BACK + "/user" + "listOpinion",{headers: authHeader()});