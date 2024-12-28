import { Router } from 'express';
import MovieController from '../controllers/movieController';
import checkAdmin from '../middlewares/authMiddleware';

const router = Router();
const movieController = new MovieController();

// Define routes for movie-related endpoints
router.get('/', movieController.listMovies);
router.get('/search', movieController.searchMovies);
router.post('/add', checkAdmin, movieController.addMovie);
router.put('/:id', checkAdmin, movieController.updateMovie);
router.delete('/:id', checkAdmin, movieController.deleteMovie);

export default router;