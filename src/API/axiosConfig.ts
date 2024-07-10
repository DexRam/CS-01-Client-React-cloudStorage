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

axios.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const { data } = await axios.post('/token/refresh/', {
                        refresh: refreshToken,
                    });
                    localStorage.setItem('accessToken', data.access);
                    axios.defaults.headers.Authorization = `Bearer ${data.access}`;
                    return axios(originalRequest);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axios;
