import express from 'express';
import { registerUser, getUsers, updateUser } from '../controllers/userController';
import { createClass, getClasses, updateClass, deleteClass } from '../controllers/classController';
import { createCourse, getCourses, updateCourse, deleteCourse } from '../controllers/courseController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();
// User routes
router.post('/register', isAdmin, registerUser);
router.get('/users', isAdmin, getUsers);
router.put('/users/:id', isAdmin, updateUser);

// Class routes
router.post('/classes', isAdmin, createClass);
router.get('/classes', isAdmin, getClasses);
router.put('/classes/:id', isAdmin, updateClass);
router.delete('/classes/:id', isAdmin, deleteClass);

// Course routes
router.post('/courses', isAdmin, createCourse);
router.get('/courses', isAdmin, getCourses);
router.put('/courses/:id', isAdmin, updateCourse);
router.delete('/courses/:id', isAdmin, deleteCourse);


export default router;