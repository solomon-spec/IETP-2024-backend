import { Schema, model, Document } from 'mongoose';

interface IAttachment {
  filename: string;
  url: string;
}

interface IAssignment extends Document {
  title: string;
  description: string;
  attachments: IAttachment[];
}

const attachmentSchema = new Schema<IAttachment>({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const assignmentSchema = new Schema<IAssignment>({
  title: {
    type: String,
    required: true,
    index: 'text', 
  },
  description: {
    type: String,
    required: true,
  },
  attachments: {
    type: [attachmentSchema],
    required: false,
  },
});

const Assignment = model<IAssignment>('Assignment', assignmentSchema);

export default Assignment;