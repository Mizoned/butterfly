import axios from 'axios';

const getEnvVariable = (key: string) => {
    if (import.meta.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }

    return import.meta.env[key]
} 

export const API_URL = getEnvVariable("VITE_APP_API_URL");

export const API = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

API.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});