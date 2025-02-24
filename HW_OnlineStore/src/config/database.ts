import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    port: 6432,
    dialect: 'postgres',
});

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('All tables have been created or already exist.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

initializeDatabase();

export default sequelize;