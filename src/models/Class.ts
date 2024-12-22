import { Schema, model, Document, Types } from 'mongoose';

interface IMaterial {
  title: string;
  description: string;
  url: string;
}

interface IAssignment {
  assignmentId: Types.ObjectId;
  dueDate: Date;
  points: number;
}

interface IQuiz {
  quizId: Types.ObjectId;
  dueDate: Date;
  points: number;
}

interface ICourse {
  courseId: Types.ObjectId;
  instructor: Types.ObjectId;
  materials: IMaterial[];
  assignments: IAssignment[];
  quizzes: IQuiz[];
}

interface IClass extends Document {
  name: string;
  courses: ICourse[];
  students: Types.ObjectId[];
}

const materialSchema = new Schema<IMaterial>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const assignmentSchema = new Schema<IAssignment>({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const quizSchema = new Schema<IQuiz>({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const courseSchema = new Schema<ICourse>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  materials: [materialSchema],
  assignments: [assignmentSchema],
  quizzes: [quizSchema],
});

const classSchema = new Schema<IClass>({
  name: {
    type: String,
    required: true,
  },
  courses: [courseSchema],
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
});

const Class = model<IClass>('Class', classSchema);

export default Class;