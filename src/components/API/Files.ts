import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export const getFiles = async () => {
    const response = await axios.get("/api/file/");
    return response.data;
}


export const getFile = async (id: number) => {
    const response = await axios.get(`/api/file/${id}/`);
    return response.data;
}


export const deleteFile = async (id: number) => {
    const response = await axios.delete(`/api/file/${id}/`);
    return response.data;
}