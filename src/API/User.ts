import axios from "./axiosConfig";
import { RegisterForm } from "../components/Register/useRegisterForm";
import { LoginForm } from "../components/Login/useLoginForm";

export const getUsers = async () => {
    try {
        const response = await axios.get('/api/user/');
        return response.data;
    } catch (error) {
        console.error("Get users failed:", error);
        return null;
    }
}

export const toggleUserRole = async (id: number) => {
    try {
        const { data: user } = await axios.get(`/api/user/${id}/`);
        const is_admin = !user.is_admin;
        const { data: updatedUser } = await axios.patch(`/api/user/${id}/`, { is_admin: is_admin });
        return updatedUser;
    } catch (error) {
        console.error("Toggle user role failed:", error);
        return null;
    }
}
export const createUser = async (state: RegisterForm, redirect?: boolean) => {
    try {
        const response = await axios.post('/api/user/', state);
        (response)
        if (response.status === 201 && redirect) {
            loginUser(state);
        }
    } catch (error) {
        const errorMessage = error || "Registration failed";
        return errorMessage;
    }
};

export const loginUser = async (state: LoginForm) => {
    try {
        const response = await axios.post('/api/user/login/', state);
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        window.dispatchEvent(new Event('storage'));
        (response)
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

export const deleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`/api/user/${id}/`);
        return response.data;
    } catch (error) {
        console.error("User deletion failed:", error);
        return null;
    }
}