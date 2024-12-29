import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import movieRoutes from '../routes/movieRoutes';
import authRoutes from '../routes/authRoutes';
import connectDB from '../config/database';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);

jest.mock('jsonwebtoken');

beforeAll(async () => {
    await connectDB();
    (jwt.sign as jest.Mock).mockReturnValue('mock_test_token');
    (jwt.verify as jest.Mock).mockImplementation((token, secret) => {
        return { user: { id: 'mock_user_id', role: 'admin' } };
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('MovieController Integration Tests', () => {
    let token: string;

    beforeAll(() => {
        token = 'mock_test_token';
    });

    it('should add a new movie', async () => {
        const response = await request(app)
            .post('/api/movies/add')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'New Movie',
                genre: 'Action',
                rating: 5,
                streamingLink: 'http://example.com'
            });
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('New Movie');
    });

    it('should list all movies', async () => {
        const response = await request(app)
            .get('/api/movies')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should search for movies by title', async () => {
        const response = await request(app)
            .get('/api/movies/search')
            .query({ title: 'Test Movie' })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should update a movie', async () => {
        const addResponse = await request(app)
            .post('/api/movies/add')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Movie to Update',
                genre: 'Drama',
                rating: 4,
                streamingLink: 'http://example.com'
            });
        const movieId = addResponse.body._id;

        const updateResponse = await request(app)
            .put(`/api/movies/${movieId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Movie',
                genre: 'Drama',
                rating: 4,
                streamingLink: 'http://example.com'
            });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.title).toBe('Updated Movie');
    });

    it('should delete a movie', async () => {
        const addResponse = await request(app)
            .post('/api/movies/add')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Movie to Delete',
                genre: 'Horror',
                rating: 3,
                streamingLink: 'http://example.com'
            });
        const movieId = addResponse.body._id;

        const deleteResponse = await request(app)
            .delete(`/api/movies/${movieId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(deleteResponse.status).toBe(200);
    });
});