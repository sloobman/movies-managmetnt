const { Genre, Movie } = require('../models');

exports.getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll({
            include: [Movie]
        });
        res.json(genres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findByPk(req.params.id, {
            include: [Movie]
        });
        if (!genre) return res.status(404).json({ message: 'Genre not found' });
        res.json(genre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createGenre = async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateGenre = async (req, res) => {
    try {
        const [updated] = await Genre.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedGenre = await Genre.findByPk(req.params.id);
            res.json(updatedGenre);
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        const deleted = await Genre.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Genre deleted' });
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};