import React from 'react';
import {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import MoviesPage from './pages/MoviesPage';
import MovieForm from './components/MovieForm';
import DirectorsPage from './pages/DirectorsPage';
import DirectorForm from './components/DirectorForm';
import GenresPage from './pages/GenresPage';
import GenreForm from './components/GenreForm';
import Login from "./components/Login";
import {getCurrentUser} from "./services/auth";
import Register from "./components/Register";

function App() {
    const user = getCurrentUser();

    return (
        <Router>
            <div className="app">
                <Navbar />
                <main className="content">
                    <Routes>
                        <Route path="/" element={
                            (() => {
                                const Redirect = () => {
                                    const navigate = useNavigate();

                                    useEffect(() => {
                                        if (user) {
                                            navigate('/movies');
                                        } else {
                                            navigate('/login');
                                        }
                                    }, [user, navigate]);

                                    return null;
                                };

                                return <Redirect />;
                            })()
                        } />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Маршруты для фильмов */}
                        <Route path="/movies" element={<MoviesPage />} />
                        <Route path="/movies/new" element={<MovieForm />} />
                        <Route path="/movies/edit/:id" element={<MovieForm />} />

                        {/* Маршруты для режиссеров */}
                        <Route path="/directors" element={<DirectorsPage />} />
                        <Route path="/directors/new" element={<DirectorForm />} />
                        <Route path="/directors/edit/:id" element={<DirectorForm />} />

                        {/* Маршруты для жанров */}
                        <Route path="/genres" element={<GenresPage />} />
                        <Route path="/genres/new" element={<GenreForm />} />
                        <Route path="/genres/edit/:id" element={<GenreForm />} />

                        {/* Резервный маршрут для 404 */}
                        <Route path="*" element={<div>Page not found</div>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;