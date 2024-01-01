import axios from "axios";

const companyLogin = async (userData) => {
    try {
        return axios.post('http://localhost:8080/api/company-login', userData);
    } catch (error) {
        console.error("Error - login", error);
    }
}

export { companyLogin }