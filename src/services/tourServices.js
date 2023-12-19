import axios from "axios";
const createTour = async (tourData) => {
    try {
        return axios.post('http://localhost:8080/api/tour/create', tourData);
    } catch (error) {
        console.error("Error - createTour", error);
    }
}
const fetchTourPagination = async (page, limit) => {
    try {
        return axios.get(`http://localhost:8080/api/tour/read?page=${page}&limit=${limit}`);
    } catch (error) {
        console.error("Error - fetchTourPagination", error);
    }
}
const fetchTourById = async (id) => {
    try {
        return axios.get(`http://localhost:8080/api/tour/read-by-id?id=${id}`);
    } catch (error) {
        console.error("Error - fetchTourById", error);
    }
}
const updateTour = async (tourData) => {
    try {
        return axios.put('http://localhost:8080/api/tour/update', tourData)
    } catch (error) {
        console.error("Error - updateTour", error);

    }
}
const deleteTour = async (tourData) => {
    try {
        return axios.delete('http://localhost:8080/api/tour/delete', { data: { id: tourData.id } });
    } catch (error) {
        console.error("Error - deleteTour", error);
    }
}
export { createTour, fetchTourPagination, updateTour, deleteTour, fetchTourById };