import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import movieRoutes from './routes/movieRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();
app.use(express.json());

// Base routes
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect to DB
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1); // Terminate the process with an error code
  }
};

start();

export default app;