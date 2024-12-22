import { Request, Response, NextFunction } from 'express';
import Quiz from '../models/Quiz';

export const createQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, description, questions } = req.body;

  try {
    const newQuiz = new Quiz({ title, description, questions });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getQuizzes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { title, description, questions } = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, { title, description, questions }, { new: true });
    if (!updatedQuiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    res.json(updatedQuiz);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const getQuizById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
  
    try {
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
      }
      res.json(quiz);
    } catch (err) {
      console.error(err);
      next(err);
    }
};

export const searchQuizzesByTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
const { title, limit = 5 } = req.query;

try {
    const quizzes = await Quiz.find(
    { $text: { $search: title as string } },
    { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(Number(limit));

    res.json(quizzes);
} catch (err) {
    console.error(err);
    next(err);
}
};
