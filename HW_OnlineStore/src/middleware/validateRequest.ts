import { Request, Response, NextFunction } from 'express';

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, category, quantity, price } = req.body;
    if (!name || !description || !category || !quantity || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    next();
};

export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    next();
};