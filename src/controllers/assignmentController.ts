import { Request, Response, NextFunction } from 'express';
import Assignment from '../models/Assignment';

export const createAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, description, attachments } = req.body;

  try {
    const newAssignment = new Assignment({ title, description, attachments });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAssignments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAssignmentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      res.status(404).json({ message: 'Assignment not found' });
      return;
    }
    res.json(assignment);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const searchAssignmentsByTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, limit = 5 } = req.query;

  try {
    const assignments = await Assignment.find(
      { $text: { $search: title as string } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(Number(limit));

    res.json(assignments);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { title, description, attachments } = req.body;

  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(id, { title, description, attachments }, { new: true });
    if (!updatedAssignment) {
      res.status(404).json({ message: 'Assignment not found' });
      return;
    }
    res.json(updatedAssignment);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (!deletedAssignment) {
      res.status(404).json({ message: 'Assignment not found' });
      return;
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};