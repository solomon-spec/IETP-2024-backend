import { Schema, model, Document } from 'mongoose';

interface IOption {
  text: string;
  isCorrect: boolean;
}

interface IQuestion {
  questionText: string;
  options: IOption[];
}

interface IQuiz extends Document {
  title: string;
  description: string;
  questions: IQuestion[];
}

const optionSchema = new Schema<IOption>({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new Schema<IQuestion>({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    required: true,
    validate: {
      validator: function(options: IOption[]) {
        return options.length >= 2;
      },
      message: 'A question must have at least two options.',
    },
  },
});

const quizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
});

const Quiz = model<IQuiz>('Quiz', quizSchema);

export default Quiz;