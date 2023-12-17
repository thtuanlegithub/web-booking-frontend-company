import axios from "axios";
const createTour = async (tourData) => {
    try {
        return axios.post('http://localhost:8080/api/tour/create', tourData);
    } catch (error) {
        console.error("Error - createTour", error);
    }
}

export { createTour };