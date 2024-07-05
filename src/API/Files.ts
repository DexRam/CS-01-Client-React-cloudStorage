import axios from "./axiosConfig";

export const getUserFiles = async () => {
    const response = await axios.post("/api/file/userFiles/");
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

export const downloadFile = async (fileId: string) => {
    console.log(`Downloading file ${fileId} `)
}

export const renameFile = async (fileId: string, newName: string) => {
    try {
        const response = await axios.patch(`/api/file/${fileId}/`, { name: newName });
        return response.data;
    } catch (error) {
        console.error("File rename failed:", error);
        return null;
    }
}

export const shareFile = async (fileId: string, userId: string) => {
    try {
        const response = await axios.post(`/api/file/${fileId}/share/`, { user_id: userId });
        return response.data;
    } catch (error) {
        console.error("File sharing failed:", error);
        return null;
    }
}

export const deleteFile = async (fileId: string) => {
    try {
        const response = await axios.delete(`/api/file/${fileId}/`);
        return response.data;
    } catch (error) {
        console.error("File deletion failed:", error);
        return null;
    }
}
