import express from 'express';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import teacherRoutes from './routes/teacher';
import quizRoutes from './routes/quiz';
import assignmentRoutes from './routes/assignment';
import { setupSwagger } from './swagger';

const app = express();
setupSwagger(app);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/assignments', assignmentRoutes);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default app;