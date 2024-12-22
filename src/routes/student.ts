import express from 'express';
import { getStudentClasses, getAssignments, getQuizzes, submitAssignment, submitQuiz, getAssignmentSubmissions, getQuizSubmissions } from '../controllers/studentController';
import { isStudent } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/classes', isStudent, getStudentClasses);
router.get('/classes/:classId/courses/:courseId/assignments', isStudent, getAssignments);
router.get('/classes/:classId/courses/:courseId/quizzes', isStudent, getQuizzes);
router.post('/assignments/:assignmentId/submit', isStudent, submitAssignment);
router.post('/quizzes/:quizId/submit', isStudent, submitQuiz);
router.get('/assignments/submissions', isStudent, getAssignmentSubmissions);
router.get('/quizzes/submissions', isStudent, getQuizSubmissions);

export default router;