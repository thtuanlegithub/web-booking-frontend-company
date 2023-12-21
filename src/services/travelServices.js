import axios from "axios";
const createTravel = async (travelData) => {
    try {
        return axios.post('http://localhost:8080/api/travel/create', travelData);
    } catch (error) {
        console.error("Error - createTravel", error);
    }
}
const fetchTravelPagination = async (page, limit) => {
    try {
        return axios.get(`http://localhost:8080/api/travel/read?page=${page}&limit=${limit}`);
    } catch (error) {
        console.error("Error - fetchTravelPagination", error);
    }
}
const fetchTravelById = async (id) => {
    try {
        return axios.get(`http://localhost:8080/api/travel/read-by-id?id=${id}`);
    } catch (error) {
        console.error("Error - fetchTravelById", error);
    }
}
const updateTravel = async (travelData) => {
    try {
        return axios.put('http://localhost:8080/api/travel/update', travelData)
    } catch (error) {
        console.error("Error - updateTravel", error);

    }
}
const deleteTravel = async (travelData) => {
    try {
        return axios.delete('http://localhost:8080/api/travel/delete', { data: { id: travelData.id } });
    } catch (error) {
        console.error("Error - deleteTravel", error);
    }
}
export { createTravel, fetchTravelPagination, updateTravel, deleteTravel, fetchTravelById };