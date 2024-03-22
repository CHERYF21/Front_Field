import authHeader from "./auth_Header";
import axios from "./axios";

const USER_BACK = "http://localhost:8080";

//Entidad Usuario

    export const crearUsuario = (newUser) => axios.post(USER_BACK + "/auth/register", newUser);

    export const loginUser = (credentials) => axios.post(USER_BACK + "/auth/login", credentials);

    export const listUser = () => axios.get(USER_BACK+ "/auth/user-rest/listUser");

    export const deleteUser = (id) => axios.delete(`${USER_BACK}/auth/${id}/deleteuser`,{headers: authHeader()});

    export const updateUser = (id, usuarioActualizado) => axios.put(`${USER_BACK}/auth/${id}/updateUser`,usuarioActualizado,{headers: authHeader()});

    export const verityTokenRequest = () => axios.get("/auth/verify",{headers: authHeader()});

    