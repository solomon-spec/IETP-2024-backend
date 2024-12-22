import express from 'express';
import { createQuiz, getQuizzes, updateQuiz, deleteQuiz, getQuizById, searchQuizzesByTitle } from '../controllers/quizController';
import { isTeacher } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: Quiz management
 */

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quiz]
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
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           text:
 *                             type: string
 *                           isCorrect:
 *                             type: boolean
 *     responses:
 *       201:
 *         description: Quiz created successfully
 */
router.post('/', isTeacher, createQuiz);

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: List of quizzes
 */
router.get('/', isTeacher, getQuizzes);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Get a quiz by ID
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The quiz ID
 *     responses:
 *       200:
 *         description: Quiz details
 *       404:
 *         description: Quiz not found
 */
router.get('/:id', isTeacher, getQuizById);

/**
 * @swagger
 * /api/quizzes/search:
 *   get:
 *     summary: Search quizzes by title
 *     tags: [Quiz]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title to search for
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of results to return
 *     responses:
 *       200:
 *         description: List of quizzes
 */
router.get('/search', isTeacher, searchQuizzesByTitle);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     summary: Update a quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           text:
 *                             type: string
 *                           isCorrect:
 *                             type: boolean
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 */
router.put('/:id', isTeacher, updateQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     summary: Delete a quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The quiz ID
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 */
router.delete('/:id', isTeacher, deleteQuiz);

export default router;