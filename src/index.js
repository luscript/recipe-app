import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './routes/users.js'
import {recipesRouter} from './routes/recipes.js'
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
dotenv.config();


const app =  express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads/'
}));
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

mongoose.connect("mongodb+srv://luscript:lucia123@recipes.c6deqw7.mongodb.net/recipes?retryWrites=true&w=majority");

app.listen(3001, () => console.log('Server running on port 3001'));