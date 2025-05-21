import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGenreById, createGenre, updateGenre } from '../services/api';

const GenreForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genre, setGenre] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGenre = async () => {
            if (id) {
                try {
                    const response = await getGenreById(id);
                    setGenre(response.data);
                } catch (error) {
                    console.error('Error fetching genre:', error);
                }
            }
            setLoading(false);
        };

        fetchGenre();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenre(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateGenre(id, genre);
            } else {
                await createGenre(genre);
            }
            navigate('/genres');
        } catch (error) {
            console.error('Error saving genre:', error);
        }
    };

    if (loading && id) return <div className="loading">Loading...</div>;

    return (
        <div className="genre-form">
            <h2>{id ? 'Edit Genre' : 'Add New Genre'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={genre.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={genre.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <button type="submit" className="btn primary">
                    {id ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default GenreForm;