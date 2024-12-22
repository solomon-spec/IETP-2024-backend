import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';

export const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, description, syllabus, profileImage } = req.body;

  try {
    const newCourse = new Course({ title, description, syllabus, profileImage });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { title, description, syllabus, profileImage } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, { title, description, syllabus, profileImage }, { new: true });
    if (!updatedCourse) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json(updatedCourse);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};