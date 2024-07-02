import axios from "axios";
import { RegisterForm } from "../components/Register/useRegisterForm";
import { LoginForm } from "../components/Login/useLoginForm";

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
                } catch (err) {
                    console.error(err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export const createUser = async (state: RegisterForm) => {
    try {
        const response = await axios.post('/api/user/', state);
        if (response.status === 200) {
            loginUser(state);
        }
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }

};

export const loginUser = async (state: LoginForm) => {
    try {
        const response = await axios.post('/api/user/login/', state);
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        window.dispatchEvent(new Event('storage'));
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
};