import axios from "./axiosConfig";

export const getUserFiles = async (id: number) => {
    const response = await axios.post("/api/file/user-files/", { id: id });
    return response.data;
}

export const uploadFiles = async (id: number, files: FileList) => {
    try {
        const uploadPromises = Array.from(files).map(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', file.name);
            formData.append('owner', id.toString());

            return axios.post('/api/file/upload-file/', formData, {
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
        const response = await axios.get(`/api/file/${fileId}/download-file/`, { responseType: 'blob' });

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
        return null;
    }
}


export const shareFile = async (fileId: number) => {
    try {
        const response = await axios.post(`/api/file/${fileId}/share-file/`);
        return response.data;
    } catch (error) {
        console.error("File sharing failed:", error);
        return null;
    }
}

export const deleteFile = async (fileId: number) => {
    try {
        const response = await axios.delete(`/api/file/${fileId}/delete-file/`);
        return response.data;
    } catch (error) {
        console.error("File deletion failed:", error);
        return null;
    }
}

export const changeFileName = async (fileId: number, newName: string) => {
    try {
        const response = await axios.patch(`/api/file/${fileId}/update-file/`, { name: newName });
        return response.data;
    } catch (error) {
        console.error("File rename failed:", error);
        return null;
    }
}

export const changeFileComment = async (fileId: number, newComment: string) => {
    try {
        const response = await axios.patch(`/api/file/${fileId}/update-file/`, { comment: newComment });
        return response.data;
    } catch (error) {
        console.error("File comment changing failed:", error);
        return null;
    }
}