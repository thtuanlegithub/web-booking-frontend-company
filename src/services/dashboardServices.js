import axios from "axios";
const getTourPlanning = async () => {
    try {
        return axios.get('http://localhost:8080/api/tourplanning');
    } catch (error) {
        console.error("Error getTourPlanning", error);
    }
}

export { getTourPlanning }