import { Schema, model, Document, Types } from 'mongoose';

interface IAnswer {
  questionId: Types.ObjectId;
  selectedOption: string;
}

interface IQuizSubmission extends Document {
  quizId: Types.ObjectId;
  studentId: Types.ObjectId;
  submissionDate: Date;
  answers: IAnswer[];
}

const answerSchema = new Schema<IAnswer>({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
});

const quizSubmissionSchema = new Schema<IQuizSubmission>({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  submissionDate: {
    type: Date,
    required: true,
  },
  answers: {
    type: [answerSchema],
    required: true,
  },
});

const QuizSubmission = model<IQuizSubmission>('QuizSubmission', quizSubmissionSchema);

export default QuizSubmission;