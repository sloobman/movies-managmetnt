const { Movie, Director, Genre } = require('../models');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: [Director, Genre]
        });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id, {
            include: [Director, Genre]
        });
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const [updated] = await Movie.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedMovie = await Movie.findByPk(req.params.id, {
                include: [Director, Genre]
            });
            res.json(updatedMovie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const deleted = await Movie.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Movie deleted' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};