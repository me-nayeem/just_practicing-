import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//import custom error handler
import { errorHandler } from './middlewares/errorHandler.js';
import {getUsers} from './models/getUsers.model.js';

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/',getUsers);

//error handling middleware
app.use(errorHandler);

//start server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});