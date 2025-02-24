import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, category, quantity, price, unit, img_url } = req.body;
        if (!name || !description || !category || !quantity || !price || !unit) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const product = await Product.create({ name, description, category, quantity, price, unit, img_url });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + (error as Error).message });
    }
};
export const getProducts = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        const products = await Product.findAndCountAll({ limit, offset });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + (error as Error).message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + (error as Error).message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, category, quantity, price, unit, img_url } = req.body;

        if (!name || !description || !category || quantity === undefined || price === undefined || unit === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name;
        product.description = description;
        product.category = category;
        product.quantity = quantity;
        product.price = price;
        product.unit = unit;
        product.img_url = img_url || null;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + (error as Error).message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + (error as Error).message });
    }
};