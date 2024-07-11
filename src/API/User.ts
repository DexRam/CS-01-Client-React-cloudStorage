import axios from "./axiosConfig";
import { RegisterForm } from "../components/Register/useRegisterForm";
import { LoginForm } from "../components/Login/useLoginForm";

export const createUser = async (state: RegisterForm) => {
    try {
        console.log("Register")
        console.log(state)
        const response = await axios.post('/api/user/', state);
        console.log(response)
        if (response.status === 201) {
            loginUser(state);
        }
    } catch (error) {
        const errorMessage = error || "Registration failed";
        return errorMessage;
    }
};

export const loginUser = async (state: LoginForm) => {
    try {
        console.log("Login")
        console.log(state)
        const response = await axios.post('/api/user/login/', state);
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        window.dispatchEvent(new Event('storage'));
        console.log(response)
    } catch (error) {
        const errorMessage = error || "Login failed";
        return errorMessage;
    }
};

export const getPermissions = async () => {
    try {
        const response = await axios.get('/api/user/me/', {
        });
        return response.data.is_admin;
    } catch (error) {
        console.error("Get permissions failed:", error);
        return null;
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get('/api/user/');
        return response.data;
    } catch (error) {
        console.error("Get users failed:", error);
        return null;
    }
}