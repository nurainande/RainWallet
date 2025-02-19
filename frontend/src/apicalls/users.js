// const { axiosInstance } = require("./");
import { axiosInstance } from ".";
// import axios from "axios"

const backend = import.meta.env.VITE_BACKEND_URL
console.log(backend)

// Login user
export const loginUser = async (payload) => {
    try {
        const { data } = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, payload);
        return data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
};

// Register user
export const RegisterUser = async (payload) => {
    try {
        const { data } = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, payload);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

// Get user info
export const GetUserInfo = async () => {
    try {
        const { data } = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/get-user-info`);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const DeleteUsers = async () => {
    try {
        const { data } = await axiosInstance.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/delete`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};


// get all users

export const GetAllUsers = async () => {
    try {
        const { data } = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/get-all-users`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

// update user verified status

export const UpdateUserVerifiedStatus = async (payload) => {
    try {
        const { data } = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/update-user-verified-status`, payload);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};