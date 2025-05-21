import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDirectorById, createDirector, updateDirector } from '../services/api';

const DirectorForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [director, setDirector] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        country: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDirector = async () => {
            if (id) {
                try {
                    const response = await getDirectorById(id);
                    setDirector(response.data);
                } catch (error) {
                    console.error('Error fetching director:', error);
                }
            }
            setLoading(false);
        };

        fetchDirector();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDirector(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateDirector(id, director);
            } else {
                await createDirector(director);
            }
            navigate('/directors');
        } catch (error) {
            console.error('Error saving director:', error);
        }
    };

    if (loading && id) return <div className="loading">Loading...</div>;

    return (
        <div className="director-form">
            <h2>{id ? 'Edit Director' : 'Add New Director'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={director.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={director.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Birth Date:</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={director.birthDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={director.country}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn primary">
                    {id ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default DirectorForm;