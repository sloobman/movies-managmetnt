import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, createMovie, updateMovie, getAllDirectors, getAllGenres } from '../services/api';

const MovieForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: '',
        releaseYear: '',
        duration: '',
        rating: 0,
        directorId: '',
        genreId: ''
    });
    const [directors, setDirectors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [directorsRes, genresRes] = await Promise.all([getAllDirectors(), getAllGenres()]);
                setDirectors(directorsRes.data);
                setGenres(genresRes.data);

                if (id) {
                    const movieRes = await getMovieById(id);
                    const fetchedMovie = movieRes.data;

                    setMovie({
                        title: fetchedMovie.title,
                        releaseYear: fetchedMovie.releaseYear || '',
                        duration: fetchedMovie.duration || '',
                        rating: fetchedMovie.rating || 0,
                        directorId: fetchedMovie.director_id || '',
                        genreId: fetchedMovie.genre_id || ''
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prev => ({
            ...prev,
            [name]: name === 'duration' || name === 'rating' ? parseInt(value, 10) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const preparedMovie = {
                title: movie.title,
                releaseYear: parseInt(movie.releaseYear, 10),
                duration: parseInt(movie.duration, 10),
                rating: parseFloat(movie.rating),
                director_id: parseInt(movie.directorId, 10),
                genre_id: parseInt(movie.genreId, 10)
            };

            if (id) {
                await updateMovie(id, preparedMovie);
            } else {
                await createMovie(preparedMovie);
            }
            navigate('/movies');
        } catch (error) {
            console.error('Error saving movie:', error.response ? error.response.data : error.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="movie-form">
            <h2>{id ? 'Edit Movie' : 'Add New Movie'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Director:</label>
                    <select
                        name="directorId"
                        value={movie.directorId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Director</option>
                        {directors.map(director => (
                            <option key={director.id} value={director.id}>
                                {director.firstName} {director.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Genre:</label>
                    <select
                        name="genreId"
                        value={movie.genreId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Genre</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Release Year:</label>
                    <input
                        type="number"
                        name="releaseYear"
                        value={movie.releaseYear}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Duration (minutes):</label>
                    <input
                        type="number"
                        name="duration"
                        value={movie.duration}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Rating (0-10):</label>
                    <input
                        type="number"
                        name="rating"
                        value={movie.rating}
                        onChange={handleChange}
                        min="0"
                        max="10"
                        step="0.1"
                        required
                    />
                </div>

                <button type="submit" className="btn primary">
                    {id ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default MovieForm;