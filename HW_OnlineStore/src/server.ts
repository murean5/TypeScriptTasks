import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import { setupSwagger } from './swagger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

setupSwagger(app);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});