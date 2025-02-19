import { axiosInstance } from ".";

// Verify receiver account
export const VerifyAccount = async (payload) => {
    console.log(payload)
    try {
        const { data } = await axiosInstance.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/transactions/verify-account`,
            payload
        );
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
};

export const TranseferFunds = async(payload) => {
    console.log(payload)
    try {
        const { data } = await axiosInstance.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/transactions/transfer-funds`,
            payload
        );
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}

export const GetTransactionsOfUsers = async () => {
    try {
        const { data } = await axiosInstance.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/transactions/get-all-transactions-by-user`
        );
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}

// deposit funds using stripe

export const DepositFunds = async (payload) => {
    try {
        const { data } = await axiosInstance.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/transactions/deposit-funds`,payload
        );
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}