import express from 'express';
import { registerUser, getUsers, updateUser } from '../controllers/userController';
import { createClass, getClasses, updateClass, deleteClass } from '../controllers/classController';
import { createCourse, getCourses, updateCourse, deleteCourse } from '../controllers/courseController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post('/register', isAdmin, registerUser);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', isAdmin, getUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/users/:id', isAdmin, updateUser);

/**
 * @swagger
 * /api/admin/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               courses:
 *                 type: array
 *                 items:
 *                   type: object
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Class created successfully
 */
router.post('/classes', isAdmin, createClass);

/**
 * @swagger
 * /api/admin/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of classes
 */
router.get('/classes', isAdmin, getClasses);

/**
 * @swagger
 * /api/admin/classes/{id}:
 *   put:
 *     summary: Update a class
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               courses:
 *                 type: array
 *                 items:
 *                   type: object
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       404:
 *         description: Class not found
 */
router.put('/classes/:id', isAdmin, updateClass);

/**
 * @swagger
 * /api/admin/classes/{id}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 */
router.delete('/classes/:id', isAdmin, deleteClass);

/**
 * @swagger
 * /api/admin/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Admin]
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
 *               syllabus:
 *                 type: array
 *                 items:
 *                   type: object
 *               profileImage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post('/courses', isAdmin, createCourse);

/**
 * @swagger
 * /api/admin/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get('/courses', isAdmin, getCourses);

/**
 * @swagger
 * /api/admin/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               syllabus:
 *                 type: array
 *                 items:
 *                   type: object
 *               profileImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */
router.put('/courses/:id', isAdmin, updateCourse);

/**
 * @swagger
 * /api/admin/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete('/courses/:id', isAdmin, deleteCourse);

export default router;