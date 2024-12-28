import MovieModel, { Movie } from '../models/Movie';

export class MovieService {
    public async listMovies(): Promise<Movie[]> {
        return await MovieModel.find(); // Retrieve all movies
    }

    public async searchMovies(title: string, genre: string): Promise<Movie[]> {
        return await MovieModel.find({
            $and: [
            { title: new RegExp(title, 'i') }, // Case-insensitive search by title
            { genre: new RegExp(genre, 'i') }  // Case-insensitive search by genre
            ]
        });
    }

    public async addMovie(movieData: Partial<Movie>): Promise<Movie> {
        const movie = new MovieModel(movieData);
        return await movie.save(); // Save new movie
    }

    public async updateMovie(id: string, movieData: Partial<Movie>): Promise<Movie | null> {
        return await MovieModel.findByIdAndUpdate(id, movieData, { new: true }); // Update movie and return updated doc
    }

    public async deleteMovie(id: string): Promise<void> {
        await MovieModel.findByIdAndDelete(id); // Delete movie
    }
}
