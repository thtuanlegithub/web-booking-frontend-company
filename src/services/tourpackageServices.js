import axios from "axios";
const fetchTourPackageList = async () => {
    try {
        return axios.get('http://localhost:8080/api/tourpackage/read');
    } catch (error) {
        console.error("Error - fetchTourPackage", error);
    }
}
export { fetchTourPackageList };