import axios from "./axios";

const USER_BACK = "http://localhost:8080";

//Entidad Usuario

    export const crearUsuario = (NewUser) => axios.post(USER_BACK + "/create", NewUser);

    export const saveUser = () => axios.get(USER_BACK + "/lista");