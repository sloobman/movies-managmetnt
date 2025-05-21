import React, { useState, useEffect } from 'react';
import { getAllMovies, deleteMovie } from '../services/api';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await getAllMovies();
            setMovies(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            try {
                await deleteMovie(id);
                fetchMovies();
            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        }
    };

    const handleSortChange = (e) => {
        const [field, direction] = e.target.value.split('-');
        setSortField(field);
        setSortDirection(direction);
    };

    const sortedMovies = [...movies].sort((a, b) => {
        const aValue = sortField === 'title' ? a.title : a.releaseYear;
        const bValue = sortField === 'title' ? b.title : b.releaseYear;

        if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredMovies = sortedMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.Director && `${movie.Director.firstName} ${movie.Director.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="movie-list">
            <div className="controls">
                <Link to={`/movies/new`} className="btn">Add New Movie</Link>

                <div className="sort-search-container">
                    <select
                        value={`${sortField}-${sortDirection}`}
                        onChange={handleSortChange}
                        className="sort-select"
                    >
                        <option value="title-asc">Title (A-Z)</option>
                        <option value="title-desc">Title (Z-A)</option>
                        <option value="releaseYear-asc">Year (Oldest first)</option>
                        <option value="releaseYear-desc">Year (Newest first)</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Duration</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredMovies.map(movie => (
                    <tr key={movie.id}>
                        <td>{movie.title}</td>
                        <td>{movie.Director?.firstName} {movie.Director?.lastName}</td>
                        <td>{movie.Genre?.name}</td>
                        <td>{movie.releaseYear}</td>
                        <td>{movie.duration} min</td>
                        <td>{movie.rating}/10</td>
                        <td>
                            <Link to={`/movies/edit/${movie.id}`} className="btn">Edit</Link>
                            <button onClick={() => handleDelete(movie.id)} className="btn danger">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieList;