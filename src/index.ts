import express from 'express';
import path from 'path';
import helmet from 'helmet';
// routes
import TestRoutes from './routes/test';
import IndexRoutes from './routes/index';
import AdminRoutes from './routes/admin';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/admin/api/v1/', AdminRoutes);
app.use('/api/v1/', IndexRoutes);
app.use('/test', TestRoutes);

export default app;