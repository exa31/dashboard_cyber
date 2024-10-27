import axios from "axios";

export const axiosInstanceData = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const axiosInstancePostDataProducts = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})