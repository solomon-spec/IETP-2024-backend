import { Request, Response, NextFunction } from 'express';
import Class from '../models/Class';

export const createClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, courses, students } = req.body;

  try {
    const newClass = new Class({ name, courses, students });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { name, courses, students } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(id, { name, courses, students }, { new: true });
    if (!updatedClass) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }
    res.json(updatedClass);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
