import axios from 'axios';
import {useUserStore} from "@/stores/user";

export default function jwtInterceptorSetup() {
    axios.interceptors.request.use(function(config) {
        const store = useUserStore();
        const token = store.jwtToken;
        if(store.isLoged && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}

export function isTokenExpired(token: any) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}
