import { Request, Response } from 'express';
import { MovieService } from '../services/movieService';

class MovieController {
    private movieService: MovieService;

    constructor() {
        this.movieService = new MovieService();
    }

    public listMovies = async (req: Request, res: Response): Promise<void> => {
        try {
            const movies = await this.movieService.listMovies();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving movies', error });
        }
    };

    public searchMovies = async (req: Request, res: Response): Promise<void> => {
        const { title, genre } = req.query as { title?: string, genre?: string };
        if (!title && !genre) { 
            res.status(400).json({ message: 'At least one query parameter (title or genre) is required' });
            return;
        }
        try {
            
            const movies = await this.movieService.searchMovies(title || '', genre || '');
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Error searching movies', error });
        }
    };

    public addMovie = async (req: Request, res: Response): Promise<void> => {
        const movieData = req.body;
        try {
            const newMovie = await this.movieService.addMovie(movieData);
            res.status(201).json(newMovie);
        } catch (error) {
            res.status(500).json({ message: 'Error adding movie', error });
        }
    };

    public updateMovie = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const movieData = req.body;
        try {
            const updatedMovie = await this.movieService.updateMovie(id, movieData);
            res.status(200).json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: 'Error updating movie', error });
        }
    };

    public deleteMovie = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            await this.movieService.deleteMovie(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting movie', error });
        }
    };
}

export default MovieController;