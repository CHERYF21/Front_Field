import axios from "./axios";

const OPINION_BACK = "http://localhost:8080";

export const createOpinion = () => axios.post(OPINION_BACK + "/user" + "/createOpinion");

export const listOpinion = () => axios.get(OPINION_BACK + "/user" + "listOpinion");