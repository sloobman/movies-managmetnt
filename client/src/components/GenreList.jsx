import React, { useState, useEffect } from 'react';
import { getAllGenres, deleteGenre } from '../services/api';
import { Link } from 'react-router-dom';

const GenreList = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await getAllGenres();
            setGenres(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this genre?')) {
            try {
                await deleteGenre(id);
                fetchGenres();
            } catch (error) {
                console.error('Error deleting genre:', error);
            }
        }
    };

    const filteredGenres = genres.filter(genre =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="genre-list">
            <div className="controls">
                <Link to={`/genres/new`} className="btn">Add New Genre</Link>
                <input
                    type="text"
                    placeholder="Search genres..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredGenres.map(genre => (
                    <tr key={genre.id}>
                        <td>{genre.name}</td>
                        <td>{genre.description}</td>
                        <td>
                            <Link to={`/genres/edit/${genre.id}`} className="btn">Edit</Link>
                            <button onClick={() => handleDelete(genre.id)} className="btn danger">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GenreList;