import axios from "./axios";

const SALE_BACK = "http://localhost:8080";

export const createSale = (saleData)=> axios.post(SALE_BACK + "/user/createSale",saleData);

export const listSale = () => axios.get(SALE_BACK + "/user/listSale");

//export const updateSale = (id_sale, editedSale) => axios.put(SALE_BACK + "/user/updateSale" + id_sale,  editedSale);
export const updateSale = async (id_sale, editedSale) => {
    console.log(editedSale);
    await axios.put(`${SALE_BACK}/user/updateSale/${id_sale}`, editedSale)};


//export const deleteSale = (id_sale)=> axios.delete(SALE_BACK + "/user/deleteSale" + id_sale);
export const deleteSale = (id_sale) => axios.delete(`${SALE_BACK}/user/deleteSale/${id_sale}`);