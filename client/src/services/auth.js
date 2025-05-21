import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (username, email, password) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
};


export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const authHeader = () => {
    const user = getCurrentUser();
    if (user && user.token) {
        return { 'Authorization': `Bearer ${user.token}` };
    } else {
        return {};
    }
};