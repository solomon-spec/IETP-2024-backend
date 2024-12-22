import { Schema, model, Document } from 'mongoose';

interface ISubchapter {
  title: string;
  description: string;
}

interface IChapter {
  title: string;
  description: string;
  subchapters: ISubchapter[];
}

interface ICourse extends Document {
  title: string;
  description: string;
  syllabus: IChapter[];
  profileImage: string;
}

const subchapterSchema = new Schema<ISubchapter>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const chapterSchema = new Schema<IChapter>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subchapters: {
    type: [subchapterSchema],
    required: true,
  },
});

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  syllabus: {
    type: [chapterSchema],
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
});

const Course = model<ICourse>('Course', courseSchema);

export default Course;