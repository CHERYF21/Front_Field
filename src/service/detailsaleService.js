    import axios from "./axios";
    import authHeader from "./auth_Header";

    const DETAIL_BACK = "http://localhost:8080";

    export const createDetail = (detailData) => axios.post(DETAIL_BACK + "/auth/createSdetail", detailData,{headers: authHeader()});

    export const listDetail = () => axios.get(DETAIL_BACK + "/auth/listSdetail",{headers: authHeader()});

    export const updateDetail = (id, detailData) => axios.put(`${DETAIL_BACK}/auth/updateSdetail/${id}`, detailData,{headers: authHeader()});

    export const deleteDetail = (id) => axios.delete(`${DETAIL_BACK}/auth/deleteSdetail/${id}`,{headers: authHeader()}); // Corregido: Usar axios.delete para enviar una solicitud de tipo DELETE
