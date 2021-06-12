import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
// routes
import TestRoutes from './routes/test';
import IndexRoutes from './routes/index';
import AdminRoutes from './routes/admin';

dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(cors({ origin: process.env.ALLOWED_HOST }))
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/admin/api/v1/', AdminRoutes);
app.use('/api/v1/', IndexRoutes);
app.use('/test', TestRoutes);

export default app;