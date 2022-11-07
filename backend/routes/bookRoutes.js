import express from 'express';
const router = express.Router();
import { authorizeUser, protect } from '../middleware/auth.js';

import { createBook, getAllBooks, getSingleBook, updateBook, deleteBook } from '../controllers/books.controller.js'

//get all users route
router.route('/').post(protect, authorizeUser(['admin', 'students', 'teachers']), createBook)
router.route('/').get(protect, getAllBooks)
router.route('/:id').get(getSingleBook)
router.route('/:id').put(protect, authorizeUser(['admin', 'teachers']), updateBook)
router.route('/:id').delete(protect, authorizeUser(['admin']), deleteBook)

export default router