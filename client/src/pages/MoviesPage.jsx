import React from 'react';
import MovieList from '../components/MovieList';

const MoviesPage = () => {
    return (
        <div className="page">
            <h1>Movies Management</h1>
            <MovieList />
        </div>
    );
};

export default MoviesPage;