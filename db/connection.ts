import {Sequelize} from 'sequelize'


const db = new Sequelize('ts-server' , 'mysql' , 'mysql' , {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;