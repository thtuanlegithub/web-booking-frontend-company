import axios from "axios";
const createDiscount = async (discountData) => {
    try {
        return axios.post('http://localhost:8080/api/discount/create', discountData);
    } catch (error) {
        console.error("Error - createDiscount", error);
    }
}
const fetchDiscountPagination = async (page, limit) => {
    try {
        console.log("Fetch discount pagination");
        return axios.get(`http://localhost:8080/api/discount/read?page=${page}&limit=${limit}`);
    } catch (error) {
        console.error("Error - fetchDiscountPagination", error);
    }
}
const fetchDiscountById = async (id) => {
    try {
        return axios.get(`http://localhost:8080/api/discount/read-by-id?id=${id}`);
    } catch (error) {
        console.error("Error - fetchDiscountById", error);
    }
}
const updateDiscount = async (discountData) => {
    try {
        return axios.put('http://localhost:8080/api/discount/update', discountData)
    } catch (error) {
        console.error("Error - updateDiscount", error);

    }
}
const deleteDiscount = async (discountData) => {
    try {
        return axios.delete('http://localhost:8080/api/discount/delete', { data: { id: discountData.id } });
    } catch (error) {
        console.error("Error - deleteDiscount", error);
    }
}
export { createDiscount, fetchDiscountPagination, updateDiscount, deleteDiscount, fetchDiscountById };