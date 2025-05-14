import axios from 'axios'


export const api = axios.create({
    // baseURL: process.env.BASE_URL,
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
})


api.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem("USER_TOKEN")
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})