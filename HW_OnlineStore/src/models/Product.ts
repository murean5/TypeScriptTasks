import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface ProductAttributes {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
    unit: string;
    img_url: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - quantity
 *         - price
 *         - unit
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         quantity:
 *           type: integer
 *           description: The quantity of the product
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *         unit:
 *           type: string
 *           description: The unit of the product
 *         img_url:
 *           type: string
 *           description: The image URL of the product
 *       example:
 *         id: 1
 *         name: Sample Product
 *         description: This is a sample product
 *         category: Sample Category
 *         quantity: 100
 *         price: 9.99
 *         unit: pcs
 *         img_url: http://example.com/sample.jpg
 */
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public category!: string;
    public quantity!: number;
    public price!: number;
    public unit!: string;
    public img_url!: string;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products'
});

export default Product;