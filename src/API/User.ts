import axios from "./axiosConfig";
import { RegisterForm } from "../components/Register/useRegisterForm";
import { LoginForm } from "../components/Login/useLoginForm";

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