import axios from "./axios";

const USER_BACK = "http://localhost:8080";

//Entidad Usuario

    export const crearUsuario = (user) => axios.post(USER_BACK + "/register", user);

    export const saveUser = (user) => axios.get(USER_BACK + "/lista",user);

    export const listUser = () => axios.get(USER_BACK+ "/user/user-rest/listUser");

    