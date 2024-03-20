import axios from "./axios";
import authHeader from "./auth_Header";

const OPINION_BACK = "http://localhost:8080";

export const createOpinion = () => axios.post(OPINION_BACK + "/auth/createOpinion",{headers: authHeader()});

export const listOpinion = () => axios.get(OPINION_BACK + "/auth/listOpinion",{headers: authHeader()});