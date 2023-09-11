import express from 'express';
import { createUser, loginUser, getUser } from '../controllers/UserController.js'

const router =  express.Router();

router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/user', getUser);


export { router as userRouter };