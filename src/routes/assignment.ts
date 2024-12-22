import express from 'express';
import { createAssignment, getAssignments, updateAssignment, deleteAssignment, getAssignmentById, searchAssignmentsByTitle } from '../controllers/assignmentController';
import { isTeacher } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', isTeacher, createAssignment);
router.get('/', isTeacher, getAssignments);
router.get('/:id', isTeacher, getAssignmentById);
router.get('/search', isTeacher, searchAssignmentsByTitle);
router.put('/:id', isTeacher, updateAssignment);
router.delete('/:id', isTeacher, deleteAssignment);

export default router;