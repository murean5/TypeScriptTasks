import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface CategoryAttributes {
    id: number;
    name: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    public id!: number;
    public name!: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *       example:
 *         id: 1
 *         name: Sample Category
 */
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories'
});

export default Category;