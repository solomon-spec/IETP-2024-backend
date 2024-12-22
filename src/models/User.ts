import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
  },
});

const User = model<IUser>('User', userSchema);

export default User;