import express from 'express';
import { createAssignment, getAssignments, updateAssignment, deleteAssignment, getAssignmentById, searchAssignmentsByTitle } from '../controllers/assignmentController';
import { isTeacher } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Assignment
 *   description: Assignment management
 */

/**
 * @swagger
 * /api/assignments:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignment]
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
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     url:
 *                       type: string
 *     responses:
 *       201:
 *         description: Assignment created successfully
 */
router.post('/', isTeacher, createAssignment);

/**
 * @swagger
 * /api/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignment]
 *     responses:
 *       200:
 *         description: List of assignments
 */
router.get('/', isTeacher, getAssignments);

/**
 * @swagger
 * /api/assignments/{id}:
 *   get:
 *     summary: Get an assignment by ID
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment details
 *       404:
 *         description: Assignment not found
 */
router.get('/:id', isTeacher, getAssignmentById);

/**
 * @swagger
 * /api/assignments/search:
 *   get:
 *     summary: Search assignments by title
 *     tags: [Assignment]
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
 *         description: List of assignments
 */
router.get('/search', isTeacher, searchAssignmentsByTitle);

/**
 * @swagger
 * /api/assignments/{id}:
 *   put:
 *     summary: Update an assignment
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     url:
 *                       type: string
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       404:
 *         description: Assignment not found
 */
router.put('/:id', isTeacher, updateAssignment);

/**
 * @swagger
 * /api/assignments/{id}:
 *   delete:
 *     summary: Delete an assignment
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The assignment ID
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found
 */
router.delete('/:id', isTeacher, deleteAssignment);

export default router;