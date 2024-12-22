import express from 'express';
import { createQuiz, getQuizzes, updateQuiz, deleteQuiz, getQuizById, searchQuizzesByTitle } from '../controllers/quizController';
import { isTeacher } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', isTeacher, createQuiz);
router.get('/', isTeacher, getQuizzes);
router.get('/:id', isTeacher, getQuizById);
router.get('/search', isTeacher, searchQuizzesByTitle);
router.put('/:id', isTeacher, updateQuiz);
router.delete('/:id', isTeacher, deleteQuiz);

export default router;