import { Request, Response } from 'express';
import MovieController from '../controllers/movieController';
import {MovieService}from '../services/movieService';

jest.mock('../services/movieService');

describe('MovieController', () => {
    let controller: MovieController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        controller = new MovieController();
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };

        // Mock the methods of MovieService
        (MovieService.prototype.listMovies as jest.Mock).mockResolvedValue([{ title: 'Test Movie' }]);
        (MovieService.prototype.searchMovies as jest.Mock).mockResolvedValue([{ title: 'Test Movie' }]);
        (MovieService.prototype.addMovie as jest.Mock).mockResolvedValue({ title: 'Test Movie' });
        (MovieService.prototype.updateMovie as jest.Mock).mockResolvedValue({ title: 'Updated Movie' });
        (MovieService.prototype.deleteMovie as jest.Mock).mockResolvedValue({ title: 'Deleted Movie' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('should instantiate MovieService', () => {
            expect(controller['movieService']).toBeInstanceOf(MovieService);
        });
    });

    describe('listMovies', () => {
        it('should respond with 200 and a list of movies', async () => {
            await controller.listMovies(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([{ title: 'Test Movie' }]);
        });
    });

    describe('searchMovies', () => {
        it('should respond with 200 and a list of movies', async () => {
            mockReq.query = { title: 'Test' };
            await controller.searchMovies(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith([{ title: 'Test Movie' }]);
        });

        it('should return 500 on error', async () => {
            mockReq.query = { title: 'ErrorTest' };
            (controller['movieService'].searchMovies as jest.Mock).mockRejectedValue(new Error('Error'));
            await controller.searchMovies(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error searching movies', error: new Error('Error') });
        });

        

        describe('MovieController', () => {
            let controller: MovieController;
            let mockReq: Partial<Request>;
            let mockRes: Partial<Response>;

            beforeEach(() => {
                controller = new MovieController();
                mockReq = {};
                mockRes = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                    send: jest.fn(),
                };

                (MovieService.prototype.listMovies as jest.Mock).mockResolvedValue([{ title: 'Test Movie' }]);
                (MovieService.prototype.searchMovies as jest.Mock).mockResolvedValue([{ title: 'Test Movie' }]);
                (MovieService.prototype.addMovie as jest.Mock).mockResolvedValue({ title: 'Test Movie' });
                (MovieService.prototype.updateMovie as jest.Mock).mockResolvedValue({ title: 'Updated Movie' });
                (MovieService.prototype.deleteMovie as jest.Mock).mockResolvedValue({});
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('constructor', () => {
                it('should instantiate MovieService', () => {
                    expect(controller['movieService']).toBeInstanceOf(MovieService);
                });
            });

            describe('listMovies', () => {
                it('should respond with 200 and a list of movies', async () => {
                    await controller.listMovies(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(200);
                    expect(mockRes.json).toHaveBeenCalledWith([{ title: 'Test Movie' }]);
                });

                it('should respond with 500 on error', async () => {
                    (controller['movieService'].listMovies as jest.Mock).mockRejectedValue(new Error('Error'));
                    await controller.listMovies(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(500);
                    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error retrieving movies', error: new Error('Error') });
                });
            });

            describe('searchMovies', () => {
                it('should return 400 if no query parameters are provided', async () => {
                    mockReq.query = {};
                    await controller.searchMovies(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(400);
                    expect(mockRes.json).toHaveBeenCalledWith({ message: 'At least one query parameter (title or genre) is required' });
                });

                it('should respond with 200 and a list of movies', async () => {
                    mockReq.query = { title: 'Test' };
                    await controller.searchMovies(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(200);
                    expect(mockRes.json).toHaveBeenCalledWith([{ title: 'Test Movie' }]);
                });

                it('should return 500 on error', async () => {
                    mockReq.query = { title: 'ErrorTest' };
                    (controller['movieService'].searchMovies as jest.Mock).mockRejectedValue(new Error('Error'));
                    await controller.searchMovies(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(500);
                    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error searching movies', error: new Error('Error') });
                });
            });

            describe('addMovie', () => {
                it('should respond with 201 and the new movie', async () => {
                    mockReq.body = { title: 'New Movie' };
                    await controller.addMovie(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(201);
                    expect(mockRes.json).toHaveBeenCalledWith({ title: 'Test Movie' });
                });

                it('should respond with 500 on error', async () => {
                    (controller['movieService'].addMovie as jest.Mock).mockRejectedValue(new Error('Error'));
                    await controller.addMovie(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(500);
                    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error adding movie', error: new Error('Error') });
                });
            });

            describe('updateMovie', () => {
                it('should respond with 200 and the updated movie', async () => {
                    mockReq.params = { id: '123' };
                    mockReq.body = { title: 'Updated Title' };
                    await controller.updateMovie(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(200);
                    expect(mockRes.json).toHaveBeenCalledWith({ title: 'Updated Movie' });
                });

                it('should respond with 500 on error', async () => {
                    (controller['movieService'].updateMovie as jest.Mock).mockRejectedValue(new Error('Error'));
                    mockReq.params = { id: '123' };
                    await controller.updateMovie(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(500);
                    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error updating movie', error: new Error('Error') });
                });
            });

            describe('deleteMovie', () => {
                it('should respond with 200 on successful deletion', async () => {
                    mockReq.params = { id: '123' };
                    await controller.deleteMovie(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(200);
                    expect(mockRes.send).toHaveBeenCalled();
                });

                it('should respond with 500 on error', async () => {
                    (controller['movieService'].deleteMovie as jest.Mock).mockRejectedValue(new Error('Error'));
                    mockReq.params = { id: '123' };
                    await controller.deleteMovie(mockReq as Request, mockRes as Response);
                    expect(mockRes.status).toHaveBeenCalledWith(500);
                    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error deleting movie', error: new Error('Error') });
                });
            });
        });
    });

    
});