const { Director, Movie } = require('../models');

exports.getAllDirectors = async (req, res) => {
    try {
        const directors = await Director.findAll({
            include: [Movie]
        });
        res.json(directors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDirectorById = async (req, res) => {
    try {
        const director = await Director.findByPk(req.params.id, {
            include: [Movie]
        });
        if (!director) return res.status(404).json({ message: 'Director not found' });
        res.json(director);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDirector = async (req, res) => {
    try {
        const director = await Director.create(req.body);
        res.status(201).json(director);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateDirector = async (req, res) => {
    try {
        const [updated] = await Director.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDirector = await Director.findByPk(req.params.id);
            res.json(updatedDirector);
        } else {
            res.status(404).json({ message: 'Director not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteDirector = async (req, res) => {
    try {
        const deleted = await Director.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Director deleted' });
        } else {
            res.status(404).json({ message: 'Director not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};