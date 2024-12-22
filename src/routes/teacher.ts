import express from 'express';
import { addMaterial, addAssignment, addQuiz, getClassesAndCourses, getAssignmentSubmissions, getQuizSubmissions, gradeAssignmentSubmission, gradeQuizSubmission } from '../controllers/teacherController';
import { isTeacher } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/classes/:classId/courses/:courseId/materials', isTeacher, addMaterial);
router.post('/classes/:classId/courses/:courseId/assignments', isTeacher, addAssignment);
router.post('/classes/:classId/courses/:courseId/quizzes', isTeacher, addQuiz);
router.get('/classes', isTeacher, getClassesAndCourses);
router.get('/assignments/:assignmentId/submissions', isTeacher, getAssignmentSubmissions);
router.get('/quizzes/:quizId/submissions', isTeacher, getQuizSubmissions);
router.put('/assignments/submissions/:submissionId/grade', isTeacher, gradeAssignmentSubmission);
router.put('/quizzes/submissions/:submissionId/grade', isTeacher, gradeQuizSubmission);

export default router;