import mongoose, { Document, Schema } from 'mongoose';

export interface Movie extends Document {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
}

const movieSchema: Schema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    streamingLink: { type: String, required: true }
}, {
    collection: 'movieLobby', 
    versionKey: false
});

const MovieModel = mongoose.model<Movie>('movieLobby', movieSchema);

export default MovieModel;