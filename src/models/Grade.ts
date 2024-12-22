import { Schema, model, Document, Types } from 'mongoose';

interface IGrade extends Document {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  submissionId: Types.ObjectId;
  submissionType: 'AssignmentSubmission' | 'QuizSubmission';
  grade: number;
  comments?: string;
}

const gradeSchema = new Schema<IGrade>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  submissionId: {
    type: Schema.Types.ObjectId,
    refPath: 'submissionType',
    required: true,
  },
  submissionType: {
    type: String,
    required: true,
    enum: ['AssignmentSubmission', 'QuizSubmission'],
  },
  grade: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
});

const Grade = model<IGrade>('Grade', gradeSchema);

export default Grade;