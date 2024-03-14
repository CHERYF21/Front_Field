    import axios from "./axios";

    const DETAIL_BACK = "http://localhost:8080";

    export const createDetail = (detailData) => axios.post(DETAIL_BACK + "/user/createSdetail", detailData);

    export const listDetail = () => axios.get(DETAIL_BACK + "/user/listSdetail");

    export const updateDetail = (id, detailData) => axios.put(`${DETAIL_BACK}/user/updateSdetail/${id}`, detailData);

    export const deleteDetail = (id) => axios.delete(`${DETAIL_BACK}/user/deleteSdetail/${id}`); // Corregido: Usar axios.delete para enviar una solicitud de tipo DELETE
