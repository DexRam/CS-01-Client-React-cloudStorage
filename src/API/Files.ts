import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

axios.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export const getUserFiles = async () => {
    const response = await axios.post("/api/file/userFiles/");
    return response.data;
}