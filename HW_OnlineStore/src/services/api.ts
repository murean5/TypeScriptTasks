import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const getCategories = () => api.get('/categories');
export const createCategory = (name: string) => api.post('/categories', { name });
export const updateCategory = (id: number, name: string) => api.put(`/categories/${id}`, { name });
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);

export const getProducts = () => api.get('/products');
export const createProduct = (product: { name: string; description: string; category: string; quantity: number; price: number; unit: string; img_url: string }) => api.post('/products', product);
export const updateProduct = (id: number, product: { name: string; description: string; category: string; quantity: number; price: number; unit: string; img_url: string }) => api.put(`/products/${id}`, product);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);