import axios from 'axios';
import { authHeader } from "./auth";

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});


api.interceptors.request.use(config => {
    const headers = authHeader();
    if (headers.Authorization) {
        config.headers = { ...config.headers, ...headers };
    }
    return config;
}, error => {
    return Promise.reject(error);
});


api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);

export const getAllMovies = () => api.get('/movies');
export const getMovieById = (id) => api.get(`/movies/${id}`);
export const createMovie = (movieData) => api.post('/movies', movieData);
export const updateMovie = (id, movieData) => api.put(`/movies/${id}`, movieData);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

export const getAllDirectors = () => api.get('/directors');
export const getAllGenres = () => api.get('/genres');

export const getDirectorById = (id) => api.get(`/directors/${id}`);
export const createDirector = (directorData) => api.post('/directors', directorData);
export const updateDirector = (id, directorData) => api.put(`/directors/${id}`, directorData);
export const deleteDirector = (id) => api.delete(`/directors/${id}`);

export const getGenreById = (id) => api.get(`/genres/${id}`);
export const createGenre = (genreData) => api.post('/genres', genreData);
export const updateGenre = (id, genreData) => api.put(`/genres/${id}`, genreData);
export const deleteGenre = (id) => api.delete(`/genres/${id}`);

export default api;