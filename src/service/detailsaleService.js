    import axios from "./axios";
    import authHeader from "./auth_Header";

    const DETAIL_BACK = "http://localhost:8080";

    export const createDetail = (detailData) => axios.post(DETAIL_BACK + "/user/createSdetail", detailData,{headers: authHeader()});

    export const listDetail = () => axios.get(DETAIL_BACK + "/user/listSdetail",{headers: authHeader()});

    export const updateDetail = (id, detailData) => axios.put(`${DETAIL_BACK}/user/updateSdetail/${id}`, detailData,{headers: authHeader()});

    export const deleteDetail = (id) => axios.delete(`${DETAIL_BACK}/user/deleteSdetail/${id}`,{headers: authHeader()}); // Corregido: Usar axios.delete para enviar una solicitud de tipo DELETE
