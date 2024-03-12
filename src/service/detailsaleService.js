import axios from "./axios";

const DETAILL_BACK = "http://localhost:8080";

export const createDetail = (detailData) => axios.post(DETAILL_BACK + "/user" + "/createSdetail" , detailData);

export const listDetail = () => axios.get(DETAILL_BACK + "/user/listSdetail");