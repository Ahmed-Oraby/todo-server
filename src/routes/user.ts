import express from 'express';
import prisma from '../db';
import { loginUser, registerUser } from '../handlers/user';
import { validateLogin, validateRegister } from '../middleware/userValidation';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;
