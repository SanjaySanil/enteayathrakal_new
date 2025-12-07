import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            // Assuming Bearer token standard, though backend check logic might need to be adjusted if not using standard Bearer middleware
            // My backend auth middleware isn't implemented yet! I need to implement it to verify token.
            // But for now I'll send it.
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
