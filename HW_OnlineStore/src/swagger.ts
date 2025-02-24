import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
    apis: ['../src/routes/*.ts', '../src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

console.log(swaggerSpec);
export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};