import { axiosInstance } from ".";

export const GetAllRequestByUser = async (request) => {
    try {
        const { data } = await axiosInstance.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/requests/get-all-requests-by-user`,
            request
        );
        console.log(data);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
// send a request to another user
export const SendRequest = async (request) => {
    try {
        const { data } = await axiosInstance.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/requests/send-request`,
            request
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};

// update a request status

export const UpdateRequestStatus = async (request) => {
    try {
        const { data } = await axiosInstance.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/requests/update-request-status`,
            request
        );
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
};