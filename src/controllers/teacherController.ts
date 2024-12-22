import { Request, Response, NextFunction } from 'express';
import Class from '../models/Class';
import AssignmentSubmission from '../models/AssignmentSubmission';
import QuizSubmission from '../models/QuizSubmission';

export const addMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { classId, courseId } = req.params;
  const { title, description, url } = req.body;

  try {
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }

    const course = classDoc.courses.find(course => course.courseId.toString() === courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    if (course.instructor.toString() !== req.user?.userId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    course.materials.push({ title, description, url });
    await classDoc.save();

    res.status(201).json({ message: 'Material added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const addAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { classId, courseId } = req.params;
  const { assignmentId, dueDate, points } = req.body;

  try {
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }

    const course = classDoc.courses.find(course => course.courseId.toString() === courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    if (course.instructor.toString() !== req.user?.userId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    course.assignments.push({ assignmentId, dueDate, points });
    await classDoc.save();

    res.status(201).json({ message: 'Assignment added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const addQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { classId, courseId } = req.params;
  const { quizId, dueDate, points } = req.body;

  try {
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }

    const course = classDoc.courses.find(course => course.courseId.toString() === courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    if (course.instructor.toString() !== req.user?.userId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    course.quizzes.push({ quizId, dueDate, points });
    await classDoc.save();

    res.status(201).json({ message: 'Quiz added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getClassesAndCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const classes = await Class.find({ 'courses.instructor': req.user?.userId });
    res.json(classes);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAssignmentSubmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { assignmentId } = req.params;

  try {
    const submissions = await AssignmentSubmission.find({ assignmentId });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getQuizSubmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { quizId } = req.params;

  try {
    const submissions = await QuizSubmission.find({ quizId });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const gradeQuizSubmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { submissionId } = req.params;
    const { grade, comments } = req.body;
  
    try {
      const submission = await QuizSubmission.findByIdAndUpdate(submissionId, { grade, comments }, { new: true });
      if (!submission) {
        res.status(404).json({ message: 'Submission not found' });
        return;
      }
      res.json(submission);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  export const gradeAssignmentSubmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { submissionId } = req.params;
    const { grade, comments } = req.body;
  
    try {
      const submission = await AssignmentSubmission.findByIdAndUpdate(submissionId, { grade, comments }, { new: true });
      if (!submission) {
        res.status(404).json({ message: 'Submission not found' });
        return;
      }
      res.json(submission);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

