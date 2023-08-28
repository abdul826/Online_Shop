import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import { notFound,errorHandler } from './middlewre/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoute.js';
import uploadRoutes from './routes/uploadRoute.js';

const port = 8000;
// Dotenv
dotenv.config();

// COnnect DB
connectDB();
const app = express();

// Body PArser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Cookie PArser
app.use(cookieParser());

app.use(cors());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Paypal Integration
app.get('/api/config/paypal', (req,res)=>{{
    res.send({clientId: process.env.PAYPAL_CLIENT_ID});
}});

// PAth resolve
 const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log(`Running on port ${port}`));