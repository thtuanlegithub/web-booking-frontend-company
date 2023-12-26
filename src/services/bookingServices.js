import axios from "axios";
const createBooking = async (bookingData) => {
    try {
        return axios.post('http://localhost:8080/api/booking/create', bookingData);
    } catch (error) {
        console.error("Error - createBooking", error);
    }
}
const fetchBookingPagination = async (page, limit) => {
    try {
        return axios.get(`http://localhost:8080/api/booking/read?page=${page}&limit=${limit}`);
    } catch (error) {
        console.error("Error - fetchBookingPagination", error);
    }
}
const fetchBookingById = async (id) => {
    try {
        return axios.get(`http://localhost:8080/api/booking/read-by-id?id=${id}`);
    } catch (error) {
        console.error("Error - fetchBookingById", error);
    }
}
const updateBooking = async (bookingData) => {
    try {
        return axios.put('http://localhost:8080/api/booking/update', bookingData)
    } catch (error) {
        console.error("Error - updateBooking", error);

    }
}
const deleteBooking = async (bookingData) => {
    try {
        return axios.delete('http://localhost:8080/api/booking/delete', { data: { id: bookingData.id } });
    } catch (error) {
        console.error("Error - deleteBooking", error);
    }
}
export { createBooking, fetchBookingPagination, updateBooking, deleteBooking, fetchBookingById };