import { Request, Response, NextFunction } from 'express';
import Class from '../models/Class';
import AssignmentSubmission from '../models/AssignmentSubmission';
import QuizSubmission from '../models/QuizSubmission';

export const getStudentClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const classes = await Class.find({ students: req.user?.userId });
    res.json(classes);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAssignments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { classId, courseId } = req.params;

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

    res.json(course.assignments);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getQuizzes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { classId, courseId } = req.params;

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

    res.json(course.quizzes);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const submitAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { assignmentId } = req.params;
  const { url } = req.body;

  try {
    const newSubmission = new AssignmentSubmission({
      assignmentId,
      studentId: req.user?.userId,
      submissionDate: new Date(),
      url,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Assignment submitted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const submitQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { quizId } = req.params;
  const { answers } = req.body;

  try {
    const newSubmission = new QuizSubmission({
      quizId,
      studentId: req.user?.userId,
      submissionDate: new Date(),
      answers,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Quiz submitted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAssignmentSubmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const submissions = await AssignmentSubmission.find({ studentId: req.user?.userId });
      res.json(submissions);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  
  export const getQuizSubmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const submissions = await QuizSubmission.find({ studentId: req.user?.userId });
      res.json(submissions);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };