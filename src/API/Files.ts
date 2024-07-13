import axios from "./axiosConfig";

export const getUserFiles = async (id?: number) => {
    const response = await axios.post("/api/file/userFiles/", { id: id });
    return response.data;
}

export const uploadFiles = async (files: FileList) => {
    try {
        const uploadPromises = Array.from(files).map(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', file.name);

            return axios.post('/api/file/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        });

        const responses = await Promise.all(uploadPromises);
        return responses.map(response => response.data);
    } catch (error) {
        console.error("File upload failed:", error);
        return null;
    }
}

export const downloadFile = async (fileId: number, filename: string) => {
    try {
        const response = await axios.get(`/api/file/${fileId}/download`, { responseType: 'blob' });

        const url = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("File downloading failed:", error);
    }
}

export const changeFileName = async (fileId: number, newName: string) => {
    try {
        const response = await axios.patch(`/api/file/${fileId}/`, { name: newName });
        return response.data;
    } catch (error) {
        console.error("File rename failed:", error);
        return null;
    }
}

export const shareFile = async (fileId: number) => {
    try {
        const response = await axios.post(`/api/file/${fileId}/share/`);
        return response.data;
    } catch (error) {
        console.error("File sharing failed:", error);
        return null;
    }
}

export const deleteFile = async (fileId: number) => {
    try {
        const response = await axios.delete(`/api/file/${fileId}/`);
        return response.data;
    } catch (error) {
        console.error("File deletion failed:", error);
        return null;
    }
}

export const changeFileComment = async (fileId: number, newComment: string) => {
    try {
        const response = await axios.patch(`/api/file/${fileId}/`, { comment: newComment });
        return response.data;
    } catch (error) {
        console.error("File comment changing failed:", error);
        return null;
    }
}