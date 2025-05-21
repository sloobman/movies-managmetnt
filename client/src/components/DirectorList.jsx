import React, { useState, useEffect } from 'react';
import { getAllDirectors, deleteDirector } from '../services/api';
import { Link } from 'react-router-dom';

const DirectorList = () => {
    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDirectors();
    }, []);

    const fetchDirectors = async () => {
        try {
            const response = await getAllDirectors();
            setDirectors(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching directors:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this director?')) {
            try {
                await deleteDirector(id);
                fetchDirectors();
            } catch (error) {
                console.error('Error deleting director:', error);
            }
        }
    };

    const filteredDirectors = directors.filter(director =>
        `${director.firstName} ${director.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="director-list">
            <div className="controls">
                <Link to="/directors/new" className="btn">Add New Director</Link>
                <input
                    type="text"
                    placeholder="Search directors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Birth Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredDirectors.map(director => (
                    <tr key={director.id}>
                        <td>{director.firstName} {director.lastName}</td>
                        <td>{director.country}</td>
                        <td>{director.birthDate}</td>
                        <td>
                            <Link to={`/directors/edit/${director.id}`} className="btn">Edit</Link>
                            <button onClick={() => handleDelete(director.id)} className="btn danger">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DirectorList;