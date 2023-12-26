import axios from "axios";
const createCustomer = async (customerData) => {
    try {
        return axios.post('http://localhost:8080/api/customer/create', customerData);
    } catch (error) {
        console.error("Error - createCustomer", error);
    }
}
const fetchCustomerPagination = async (page, limit) => {
    try {
        return axios.get(`http://localhost:8080/api/customer/read?page=${page}&limit=${limit}`);
    } catch (error) {
        console.error("Error - fetchCustomerPagination", error);
    }
}
const fetchCustomerById = async (id) => {
    try {
        return axios.get(`http://localhost:8080/api/customer/read-by-id?id=${id}`);
    } catch (error) {
        console.error("Error - fetchCustomerById", error);
    }
}
const updateCustomer = async (customerData) => {
    try {
        return axios.put('http://localhost:8080/api/customer/update', customerData)
    } catch (error) {
        console.error("Error - updateCustomer", error);

    }
}
const deleteCustomer = async (customerData) => {
    try {
        return axios.delete('http://localhost:8080/api/customer/delete', { data: { id: customerData.id } });
    } catch (error) {
        console.error("Error - deleteCustomer", error);
    }
}
export { createCustomer, fetchCustomerPagination, updateCustomer, deleteCustomer, fetchCustomerById };