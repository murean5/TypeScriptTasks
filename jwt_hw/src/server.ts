import express from 'express';
import './config/passport';

import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
