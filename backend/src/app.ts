// src/app.ts
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import lessonRoutes from './routes/lessonRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);

export default app;