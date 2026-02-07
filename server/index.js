import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//import custom error handler
import { errorHandler } from './middlewares/errorHandler.js';
import UserRoutes from './routes/auth.route.js';

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth', UserRoutes);

//error handling middleware
app.use(errorHandler);

//start server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});