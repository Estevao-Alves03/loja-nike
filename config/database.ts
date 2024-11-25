import { Sequelize } from 'sequelize';
require('dotenv').config();  

const sequelize = new Sequelize(
    process.env.DB_NAME || 'default_db_name',  
    process.env.DB_USER || 'default_db_user', 
    process.env.DB_PASSWORD || 'default_db_password',
    {
        host: process.env.DB_HOST || 'localhost',  
        port: Number(process.env.DB_PORT) || 5433,  
        dialect: 'postgres',
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('A conexão com o banco de dados foi bem sucedida');
    } catch (error) {
        console.error('Erro ao se conectar com o banco de dados:', error);
    }
})();

export default sequelize;
