import express from 'express';
const router = express.Router();
import { authorizeUser, protect } from '../middleware/auth.js';

import { loginUser, getAllUsers, registerUser } from '../controllers/user.Controller.js'

//get all users route
router.route('/').get(protect, authorizeUser(['admin']), getAllUsers)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router