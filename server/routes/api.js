const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies');
const directorController = require('../controllers/directors');
const genreController = require('../controllers/genres');
const authController = require('../controllers/auth');
const authMiddleware = require('../controllers/middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.use(authMiddleware);

router.get('/movies', movieController.getAllMovies);
router.get('/movies/:id', movieController.getMovieById);
router.post('/movies', movieController.createMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

// Director routes
router.get('/directors', directorController.getAllDirectors);
router.get('/directors/:id', directorController.getDirectorById);
router.post('/directors', directorController.createDirector);
router.put('/directors/:id', directorController.updateDirector);
router.delete('/directors/:id', directorController.deleteDirector);

// Genre routes
router.get('/genres', genreController.getAllGenres);
router.get('/genres/:id', genreController.getGenreById);
router.post('/genres', genreController.createGenre);
router.put('/genres/:id', genreController.updateGenre);
router.delete('/genres/:id', genreController.deleteGenre);

module.exports = router;