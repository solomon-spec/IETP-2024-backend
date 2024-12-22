// src/app.ts
import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();

app.use(express.json());
// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the user routes
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default app;