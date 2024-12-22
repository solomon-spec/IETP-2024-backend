import express from 'express';
import { getStudentClasses, getAssignments, getQuizzes, submitAssignment, submitQuiz, getAssignmentSubmissions, getQuizSubmissions } from '../controllers/studentController';
import { isStudent } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management
 */

/**
 * @swagger
 * /api/student/classes:
 *   get:
 *     summary: Get student classes
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: List of classes
 */
router.get('/classes', isStudent, getStudentClasses);

/**
 * @swagger
 * /api/student/classes/{classId}/courses/{courseId}/assignments:
 *   get:
 *     summary: Get assignments for a course
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: List of assignments
 */
router.get('/classes/:classId/courses/:courseId/assignments', isStudent, getAssignments);

/**
 * @swagger
 * /api/student/classes/{classId}/courses/{courseId}/quizzes:
 *   get:
 *     summary: Get quizzes for a course
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: List of quizzes
 */
router.get('/classes/:classId/courses/:courseId/quizzes', isStudent, getQuizzes);

/**
 * @swagger
 * /api/student/assignments/{assignmentId}/submit:
 *   post:
 *     summary: Submit an assignment
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the assignment submission
 *     responses:
 *       201:
 *         description: Assignment submitted successfully
 */
router.post('/assignments/:assignmentId/submit', isStudent, submitAssignment);

/**
 * @swagger
 * /api/student/quizzes/{quizId}/submit:
 *   post:
 *     summary: Submit a quiz
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: The quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     selectedOption:
 *                       type: string
 *     responses:
 *       201:
 *         description: Quiz submitted successfully
 */
router.post('/quizzes/:quizId/submit', isStudent, submitQuiz);

/**
 * @swagger
 * /api/student/assignments/submissions:
 *   get:
 *     summary: Get assignment submissions
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: List of assignment submissions
 */
router.get('/assignments/submissions', isStudent, getAssignmentSubmissions);

/**
 * @swagger
 * /api/student/quizzes/submissions:
 *   get:
 *     summary: Get quiz submissions
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: List of quiz submissions
 */
router.get('/quizzes/submissions', isStudent, getQuizSubmissions);

export default router;