import { Schema, model, Document, Types } from 'mongoose';

interface IAssignmentSubmission extends Document {
  assignmentId: Types.ObjectId;
  studentId: Types.ObjectId;
  submissionDate: Date;
  url: string;
}

const assignmentSubmissionSchema = new Schema<IAssignmentSubmission>({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
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
  url: {
    type: String,
    required: true,
  },
});

const AssignmentSubmission = model<IAssignmentSubmission>('AssignmentSubmission', assignmentSubmissionSchema);

export default AssignmentSubmission;