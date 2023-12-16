import axios from "axios";
const fetchAllPackage = async (page, limit) => {
    try {
        return axios.get(`http://localhost:8080/api/package/read?page=${page}&limit=${limit}`);
    } catch (error) {
        console.error("Error - fetchAllPackage", error);
    }
}
const createPackage = async (packageData) => {
    try {
        return axios.post('http://localhost:8080/api/package/create', packageData);
    } catch (error) {
        console.error("Error - createPackage", error);
    }
}
const deletePackage = async (packageData) => {
    try {
        return axios.delete('http://localhost:8080/api/package/delete', { data: { id: packageData.id } });
    } catch (error) {
        console.error("Error - deletePackage", error);

    }
}
const updatePackage = async (packageData) => {
    try {
        return axios.put('http://localhost:8080/api/package/update', packageData)
    } catch (error) {
        console.error("Error - updatePackage", error);

    }
}
export { fetchAllPackage, createPackage, deletePackage, updatePackage };