import express from 'express';
import { addMaterial, addAssignment, addQuiz, getClassesAndCourses, getAssignmentSubmissions, getQuizSubmissions, gradeAssignmentSubmission, gradeQuizSubmission } from '../controllers/teacherController';
import { isTeacher } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher management
 */

/**
 * @swagger
 * /api/teacher/classes/{classId}/courses/{courseId}/materials:
 *   post:
 *     summary: Add material to a course
 *     tags: [Teacher]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Material added successfully
 */
router.post('/classes/:classId/courses/:courseId/materials', isTeacher, addMaterial);

/**
 * @swagger
 * /api/teacher/classes/{classId}/courses/{courseId}/assignments:
 *   post:
 *     summary: Add assignment to a course
 *     tags: [Teacher]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignmentId:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               points:
 *                 type: number
 *     responses:
 *       201:
 *         description: Assignment added successfully
 */
router.post('/classes/:classId/courses/:courseId/assignments', isTeacher, addAssignment);

/**
 * @swagger
 * /api/teacher/classes/{classId}/courses/{courseId}/quizzes:
 *   post:
 *     summary: Add quiz to a course
 *     tags: [Teacher]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizId:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               points:
 *                 type: number
 *     responses:
 *       201:
 *         description: Quiz added successfully
 */
router.post('/classes/:classId/courses/:courseId/quizzes', isTeacher, addQuiz);

/**
 * @swagger
 * /api/teacher/classes:
 *   get:
 *     summary: Get classes and courses assigned to the teacher
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: List of classes and courses
 */
router.get('/classes', isTeacher, getClassesAndCourses);

/**
 * @swagger
 * /api/teacher/assignments/{assignmentId}/submissions:
 *   get:
 *     summary: Get submissions for an assignment
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: List of assignment submissions
 */
router.get('/assignments/:assignmentId/submissions', isTeacher, getAssignmentSubmissions);

/**
 * @swagger
 * /api/teacher/quizzes/{quizId}/submissions:
 *   get:
 *     summary: Get submissions for a quiz
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: The quiz ID
 *     responses:
 *       200:
 *         description: List of quiz submissions
 */
router.get('/quizzes/:quizId/submissions', isTeacher, getQuizSubmissions);

/**
 * @swagger
 * /api/teacher/assignments/submissions/{submissionId}/grade:
 *   put:
 *     summary: Grade an assignment submission
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The submission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: number
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assignment submission graded successfully
 *       404:
 *         description: Submission not found
 */
router.put('/assignments/submissions/:submissionId/grade', isTeacher, gradeAssignmentSubmission);

/**
 * @swagger
 * /api/teacher/quizzes/submissions/{submissionId}/grade:
 *   put:
 *     summary: Grade a quiz submission
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The submission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: number
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quiz submission graded successfully
 *       404:
 *         description: Submission not found
 */
router.put('/quizzes/submissions/:submissionId/grade', isTeacher, gradeQuizSubmission);

export default router;